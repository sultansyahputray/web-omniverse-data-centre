import React from 'react';
import { CameraView, RegionKey, RegionZoneItem, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { Level3Header } from './Level3Header';
import { Level3TelemetryCard } from './Level3TelemetryCard';
import { HallItem, Level3HallsOverlay } from './Level3HallsOverlay';
import { TimeOfDaySelector } from '../Level2Region/TimeOfDaySelector';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { REGION_ZONES } from '../Level2Region/Level2RegionView';
import { FloatingZoneTag } from '../Level2Region/FloatingZoneTag';
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
    onSelectZone?: (zone: RegionZoneItem) => void;
    onSelectHall?: (hall: HallItem) => void;
}

export const Level3BuildingView: React.FC<Level3BuildingViewProps> = ({
    regionMetric,
    timeOfDay,
    cameraView = 'iso',
    screenPositions,
    onBackToRegion,
    onSelectTimeOfDay,
    onSelectCameraView,
    onSelectZone,
    onSelectHall
}) => {
    const hasLiveTracking = Boolean(screenPositions && Object.keys(screenPositions).length > 0);

    return (
        <div className="level3-building-overlay">
            {/* Top-Left: Header with Back to Region button */}
            <Level3Header regionMetric={regionMetric} onBack={onBackToRegion} />

            {/* Left Sidebar: Building Telemetry */}
            <Level3TelemetryCard />

            {/* 3D Floating Hall Tags & Floor Levels */}
            <Level3HallsOverlay
                screenPositions={screenPositions}
                onSelectHall={onSelectHall}
            />

            {/* 3D Floating Utility / Exterior Zone Tags (remains visible in Level 3) */}
            {REGION_ZONES.filter(z => !z.isMain).map((zone) => {
                const screenPos = screenPositions ? screenPositions[zone.id] : undefined;
                const isVisible = hasLiveTracking ? Boolean(screenPos && screenPos.visible) : true;

                return (
                    <FloatingZoneTag
                        key={zone.id}
                        label={zone.label}
                        screenPosition={screenPos}
                        defaultPosition={zone.defaultPos}
                        isVisible={isVisible}
                        isMain={false}
                        onClick={() => (onSelectZone ? onSelectZone(zone) : undefined)}
                    />
                );
            })}

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

