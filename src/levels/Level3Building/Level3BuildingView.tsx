import React from 'react';
import { CameraView, RegionKey, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { Level3Header } from './Level3Header';
import { Level3TelemetryCard } from './Level3TelemetryCard';
import { Level3HallsOverlay } from './Level3HallsOverlay';
import { TimeOfDaySelector } from '../Level2Region/TimeOfDaySelector';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import './Level3Building.css';

interface Level3BuildingViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    cameraView?: CameraView;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToRegion: () => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
    onSelectCameraView?: (view: CameraView) => void;
}

export const Level3BuildingView: React.FC<Level3BuildingViewProps> = ({
    regionMetric,
    timeOfDay,
    cameraView = 'iso',
    screenPositions,
    onBackToRegion,
    onSelectTimeOfDay,
    onSelectCameraView
}) => {
    return (
        <div className="level3-building-overlay">
            {/* Top-Left: Header with Back to Region button */}
            <Level3Header regionMetric={regionMetric} onBack={onBackToRegion} />

            {/* Left Sidebar: Building Telemetry */}
            <Level3TelemetryCard />

            {/* 3D Floating Hall Tags & Floor Levels */}
            <Level3HallsOverlay
                screenPositions={screenPositions}
                onSelectHall={(hall) => {
                    console.log(`[Level3] Hall clicked: ${hall.title}`);
                }}
            />

            {/* Bottom-Right: Time of Day + ViewCube */}
            <div className="level3-bottom-right-controls">
                <TimeOfDaySelector currentTime={timeOfDay} onSelectTime={onSelectTimeOfDay} />
                <AdaptiveViewCube
                    focusLabel="MAIN BUILDING"
                    currentView={cameraView}
                    onSelectView={onSelectCameraView || (() => { })}
                />
            </div>
        </div>
    );
};
