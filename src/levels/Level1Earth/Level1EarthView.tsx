import React from 'react';
import { SiteMetric, PortfolioTotals, ScreenPosition, RegionKey } from '../../types';
import { GlobalHeader } from './GlobalHeader';
import { Level1Footer } from './Level1Footer';
import { CoordinateCard } from '../../CoordinateCard';
import { PortfolioTotalDashboard } from '../../PortfolioTotalDashboard';

interface Level1EarthViewProps {
    metrics: SiteMetric[];
    totals: PortfolioTotals;
    activePoint: RegionKey | null;
    screenPositions: Record<string, ScreenPosition>;
    onSelectRegion: (key: RegionKey) => void;
}

export const Level1EarthView: React.FC<Level1EarthViewProps> = ({
    metrics,
    totals,
    activePoint,
    screenPositions,
    onSelectRegion
}) => {
    return (
        <div className="level1-earth-overlay">
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

            {/* Bottom-Left Overall Portfolio Total Dashboard */}
            <PortfolioTotalDashboard totals={totals} />

            {/* Bottom-Right Subtitle / Branding */}
            <Level1Footer />
        </div>
    );
};
