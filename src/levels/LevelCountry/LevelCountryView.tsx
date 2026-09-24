import React from 'react';
import { SiteMetric, PortfolioTotals, ScreenPosition, RegionKey } from '../../types';
import { CountryHeader } from './CountryHeader';
import { Level1Footer } from '../Level1Earth/Level1Footer';
import { CountryCoordinateCard } from './CountryCoordinateCard';
import { Level1GlobeControls } from '../Level1Earth/Level1GlobeControls';
import './LevelCountry.css';

interface CardPlacement {
    placement?: 'left' | 'right';
    offsetY?: number;
    offsetX?: number;
}

/**
 * 4-Quadrant layout mapping matching user specification (Lampiran 2):
 * - TH (Thailand): Top-Left quadrant, anchored to the LEFT of the Thailand dot (over Bay of Bengal)
 * - MY (Malaysia): Top-Right quadrant, anchored to the RIGHT of the Malaysia dot (over South China Sea)
 * - SG (Singapore): Bottom-Left quadrant, anchored to the LEFT of SG dot and positioned below (over Indian Ocean)
 * - BTM (Batam): Bottom-Right quadrant, anchored to the RIGHT of BTM dot and positioned below (over Java Sea)
 */
const COUNTRY_QUADRANT_PLACEMENTS: Record<string, CardPlacement> = {
    TH: {
        placement: 'left',
        offsetY: 0
    },
    MY: {
        placement: 'right',
        offsetY: -3
    },
    SG: {
        placement: 'left',
        offsetY: 8
    },
    BTM: {
        placement: 'right',
        offsetY: 8
    }
};

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

            {/* Dynamically Tracked Floating 3D Country Cards in 4 Non-Overlapping Quadrants */}
            {metrics.map((metric) => {
                const placementInfo = COUNTRY_QUADRANT_PLACEMENTS[metric.key] || {
                    placement: 'left',
                    offsetY: 0
                };

                return (
                    <CountryCoordinateCard
                        key={metric.key}
                        metric={metric}
                        isActive={activePoint === metric.key}
                        screenPosition={screenPositions[metric.key]}
                        placement={placementInfo.placement}
                        offsetY={placementInfo.offsetY}
                        offsetX={placementInfo.offsetX}
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
