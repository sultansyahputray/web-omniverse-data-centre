import React from 'react';
import { SiteMetric, PortfolioTotals, ScreenPosition, RegionKey } from '../../types';
import { CountryHeader } from './CountryHeader';
import { Level1Footer } from '../Level1Earth/Level1Footer';
import { CoordinateCard } from '../../CoordinateCard';
import { Level1GlobeControls } from '../Level1Earth/Level1GlobeControls';
import './LevelCountry.css';

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

            {/* Dynamically Tracked Floating 3D Country Cards (SG, BTM, MY, TH) */}
            {metrics.map((metric) => (
                <CoordinateCard
                    key={metric.key}
                    metric={metric}
                    isActive={activePoint === metric.key}
                    screenPosition={screenPositions[metric.key]}
                    onClick={onSelectCountry}
                />
            ))}

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
