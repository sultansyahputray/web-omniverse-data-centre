import React from 'react';
import { SiteMetric, PortfolioTotals, ScreenPosition, RegionKey } from '../../types';
import { CountryHeader } from './CountryHeader';
import { Level1Footer } from '../Level1Earth/Level1Footer';
import { CoordinateCard } from '../../CoordinateCard';
import { Level1GlobeControls } from '../Level1Earth/Level1GlobeControls';
import './LevelCountry.css';

interface CardPlacement {
    placement?: 'left' | 'right';
    offsetY?: number;
    offsetX?: number;
}

/**
 * Computes non-overlapping, collision-free placements for country cards.
 * Automatically distributes Singapore, Batam, Malaysia, and Thailand so all
 * cards and connector lines remain completely visible without overlapping.
 */
function computeAntiCollisionPlacements(
    metrics: SiteMetric[],
    screenPositions: Record<string, ScreenPosition>
): Record<string, CardPlacement> {
    const placements: Record<string, CardPlacement> = {};

    const visibleKeys = metrics
        .map((m) => m.key)
        .filter((k) => screenPositions[k] && screenPositions[k].visible);

    // 1. Initial default placements based on horizontal quadrant of the screen
    for (const key of visibleKeys) {
        const pos = screenPositions[key];
        placements[key] = {
            placement: pos.x < 55 ? 'left' : 'right',
            offsetY: 0,
            offsetX: 0
        };
    }

    // 2. Specific smart cluster separation for Singapore & Batam (geographically adjacent hubs):
    if (visibleKeys.includes('SG') && visibleKeys.includes('BTM')) {
        const posSG = screenPositions['SG'];
        const posBTM = screenPositions['BTM'];
        const dist = Math.hypot(posSG.x - posBTM.x, posSG.y - posBTM.y);

        // When SG and BTM dots are near each other on screen:
        if (dist < 22) {
            // Anchor Singapore card to the LEFT and lift UP
            placements['SG'] = {
                placement: 'left',
                offsetY: -7,
                offsetX: 0
            };
            // Anchor Batam card to the RIGHT and lower DOWN
            placements['BTM'] = {
                placement: 'right',
                offsetY: 7,
                offsetX: 0
            };
        }
    }

    // 3. Iterative pairwise collision detection & repulsion for all cards
    for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < visibleKeys.length; i++) {
            const k1 = visibleKeys[i];
            const p1 = screenPositions[k1];
            const pl1 = placements[k1];
            if (!p1 || !pl1) continue;

            for (let j = i + 1; j < visibleKeys.length; j++) {
                const k2 = visibleKeys[j];
                const p2 = screenPositions[k2];
                const pl2 = placements[k2];
                if (!p2 || !pl2) continue;

                // Card approximate center in percentage:
                const c1X = pl1.placement === 'left' ? p1.x - 8 : p1.x + 8;
                const c1Y = p1.y + (pl1.offsetY || 0);

                const c2X = pl2.placement === 'left' ? p2.x - 8 : p2.x + 8;
                const c2Y = p2.y + (pl2.offsetY || 0);

                const overlapX = 16 - Math.abs(c1X - c2X);
                const overlapY = 15 - Math.abs(c1Y - c2Y);

                if (overlapX > 0 && overlapY > 0) {
                    const spread = Math.min(overlapY / 2 + 3, 10);
                    if (c1Y <= c2Y) {
                        pl1.offsetY = (pl1.offsetY || 0) - spread;
                        pl2.offsetY = (pl2.offsetY || 0) + spread;
                    } else {
                        pl1.offsetY = (pl1.offsetY || 0) + spread;
                        pl2.offsetY = (pl2.offsetY || 0) - spread;
                    }
                }
            }
        }
    }

    return placements;
}

interface LevelCountryViewProps {
    metrics: SiteMetric[];
    totals: PortfolioTotals;
    activePoint: RegionKey | null;
    screenPositions: Record<string, ScreenPosition>;
    onSelectCountry: (key: RegionKey) => void;
    onBackToGlobal: () => void;
    onRotateEarth?: (direction: 'left' | 'right', stepDeg?: number) => void;
    onZoomEarth?: (action: 'in' | 'out') => void;
    onResetCountry?: () => void;
}

export const LevelCountryView: React.FC<LevelCountryViewProps> = ({
    metrics,
    totals,
    activePoint,
    screenPositions,
    onSelectCountry,
    onBackToGlobal,
    onRotateEarth,
    onZoomEarth,
    onResetCountry
}) => {
    const isDraggingRef = React.useRef<boolean>(false);
    const lastTriggerXRef = React.useRef<number>(0);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only on left mouse click directly on backdrop/overlay
        if (e.button === 0) {
            isDraggingRef.current = true;
            lastTriggerXRef.current = e.clientX;
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || !onRotateEarth) return;
        const dx = e.clientX - lastTriggerXRef.current;
        // Each 16px of horizontal drag smoothly shifts the globe by 3.0 degrees
        if (Math.abs(dx) >= 16) {
            lastTriggerXRef.current = e.clientX;
            onRotateEarth(dx < 0 ? 'left' : 'right', 3.0);
        }
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
    };

    // Calculate smart anti-collision placements so cards never overlap
    const cardPlacements = React.useMemo(() => {
        return computeAntiCollisionPlacements(metrics, screenPositions);
    }, [metrics, screenPositions]);

    return (
        <div
            className="level-country-overlay"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            {/* Top-Left: Back to Global Button + Southeast Asia Cluster Title */}
            <CountryHeader onBack={onBackToGlobal} />

            {/* Dynamically Tracked Floating 3D Country Cards with Smart Collision Avoidance */}
            {metrics.map((metric) => {
                const placementInfo = cardPlacements[metric.key];
                return (
                    <CoordinateCard
                        key={metric.key}
                        metric={metric}
                        isActive={activePoint === metric.key}
                        screenPosition={screenPositions[metric.key]}
                        placement={placementInfo?.placement}
                        offsetY={placementInfo?.offsetY}
                        offsetX={placementInfo?.offsetX}
                        onClick={onSelectCountry}
                    />
                );
            })}

            {/* Earth Spin & Zoom Controls */}
            {onRotateEarth && onZoomEarth && (
                <Level1GlobeControls
                    onRotate={onRotateEarth}
                    onZoom={onZoomEarth}
                    onReset={onResetCountry}
                />
            )}

            {/* Bottom-Right Subtitle / Branding */}
            <Level1Footer />
        </div>
    );
};
