import React from 'react';
import { RegionKey, SiteMetric, TimeOfDay } from '../../types';
import { RegionHeader } from './RegionHeader';
import { TimeOfDaySelector } from './TimeOfDaySelector';
import { RegionStatsOverlay } from './RegionStatsOverlay';
import './Level2Region.css';

interface Level2RegionViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    onBackToGlobal: () => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
}

export const Level2RegionView: React.FC<Level2RegionViewProps> = ({
    activeRegion,
    regionMetric,
    timeOfDay,
    onBackToGlobal,
    onSelectTimeOfDay
}) => {
    return (
        <div className="level2-region-overlay">
            {/* Top-Left: Back Button + Region Title */}
            <RegionHeader regionMetric={regionMetric} onBack={onBackToGlobal} />

            {/* Top-Right: Region Telemetry / Stats */}
            <div className="level2-top-right-stats">
                <RegionStatsOverlay regionMetric={regionMetric} />
            </div>

            {/* Bottom-Left: Ground Status Badge */}
            <div className="level2-bottom-left-info">
                <div className="ground-status-indicator">
                    <span className="ground-status-pulse" />
                    <span className="ground-status-text">
                        {activeRegion} TERRAIN // ACTIVE RUNTIME
                    </span>
                </div>
            </div>

            {/* Bottom-Right: Time-of-Day (Pagi / Sore / Malam) Dropdown */}
            <div className="level2-bottom-right-controls">
                <TimeOfDaySelector currentTime={timeOfDay} onSelectTime={onSelectTimeOfDay} />
            </div>
        </div>
    );
};
