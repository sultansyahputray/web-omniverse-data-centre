import React from 'react';
import { SiteMetric, PortfolioTotals, ScreenPosition, RegionKey } from '../../types';
import { GlobalHeader } from './GlobalHeader';
import { Level1Footer } from './Level1Footer';
import { CoordinateCard } from '../../CoordinateCard';
import { Level1GlobeControls } from './Level1GlobeControls';
import { PortfolioTotalDashboard } from '../../PortfolioTotalDashboard';

interface Level1EarthViewProps {
    metrics: SiteMetric[];
    totals: PortfolioTotals;
    activePoint: RegionKey | null;
    screenPositions: Record<string, ScreenPosition>;
    onSelectRegion: (key: RegionKey) => void;
    onRotateEarth?: (direction: 'left' | 'right', stepDeg?: number) => void;
    onZoomEarth?: (action: 'in' | 'out') => void;
    onResetEarth?: () => void;
}

export const Level1EarthView: React.FC<Level1EarthViewProps> = ({
    metrics,
    totals,
    activePoint,
    screenPositions,
    onSelectRegion,
    onRotateEarth,
    onZoomEarth,
    onResetEarth
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
            className="level1-earth-overlay"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            {/* Top-Left Global Title */}
            <GlobalHeader />

            {/* Dynamically Tracked Floating 3D Region Cards */}
            {metrics.map((metric) => (
                <CoordinateCard
                    key={metric.key}
                    metric={metric}
                    isActive={activePoint === metric.key}
                    screenPosition={screenPositions[metric.key]}
                    onClick={onSelectRegion}
                />
            ))}

            {/* Earth Spin & Zoom Controls (Locked pitch with 23.44° axial tilt) */}
            {onRotateEarth && onZoomEarth && (
                <Level1GlobeControls
                    onRotate={onRotateEarth}
                    onZoom={onZoomEarth}
                    onReset={onResetEarth}
                />
            )}

            {/* Bottom-Left Overall Portfolio Total Dashboard */}
            {/* <PortfolioTotalDashboard totals={totals} /> */}

            {/* Bottom-Right Subtitle / Branding */}
            <Level1Footer />
        </div>
    );
};
