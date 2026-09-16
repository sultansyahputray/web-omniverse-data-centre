import React from 'react';
import { CameraView, RegionKey, SiteMetric, TimeOfDay } from '../../types';
import { RegionHeader } from './RegionHeader';
import { TimeOfDaySelector } from './TimeOfDaySelector';
import { RegionStatsOverlay } from './RegionStatsOverlay';
import { AdaptiveViewCube } from './AdaptiveViewCube';
import './Level2Region.css';

interface Level2RegionViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    cameraView?: CameraView;
    onBackToGlobal: () => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
    onSelectCameraView?: (view: CameraView) => void;
}

export const Level2RegionView: React.FC<Level2RegionViewProps> = ({
    activeRegion,
    regionMetric,
    timeOfDay,
    cameraView = 'iso',
    onBackToGlobal,
    onSelectTimeOfDay,
    onSelectCameraView
}) => {
    const focusTitle = regionMetric?.title ? `${regionMetric.title}` : `${activeRegion} DATA CENTRE`;

    return (
        <div className="level2-region-overlay">
            {/* Top-Left: Back Button + Region Title */}
            <RegionHeader regionMetric={regionMetric} onBack={onBackToGlobal} />

            {/* Top-Right: Region Telemetry / Stats */}
            <div className="level2-top-right-stats">
                <RegionStatsOverlay regionMetric={regionMetric} />
            </div>

            {/* Bottom-Right Controls: Time-of-Day Dropdown (Top) + 3D Dice ViewCube (Bottom) */}
            <div className="level2-bottom-right-controls">
                <TimeOfDaySelector currentTime={timeOfDay} onSelectTime={onSelectTimeOfDay} />
                <AdaptiveViewCube
                    focusLabel={focusTitle}
                    currentView={cameraView}
                    onSelectView={onSelectCameraView || (() => { })}
                />
            </div>
        </div>
    );
};

