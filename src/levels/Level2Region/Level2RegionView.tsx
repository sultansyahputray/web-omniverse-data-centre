import React from 'react';
import { CameraView, RegionKey, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { RegionHeader } from './RegionHeader';
import { TimeOfDaySelector } from './TimeOfDaySelector';
import { AdaptiveViewCube } from './AdaptiveViewCube';
import { RegionFacilityCard } from './RegionFacilityCard';
import { FloatingZoneTag } from './FloatingZoneTag';
import './Level2Region.css';

interface Level2RegionViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    cameraView?: CameraView;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToGlobal: () => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectZone?: (zoneName: string) => void;
}

export const Level2RegionView: React.FC<Level2RegionViewProps> = ({
    activeRegion,
    regionMetric,
    timeOfDay,
    cameraView = 'iso',
    screenPositions,
    onBackToGlobal,
    onSelectTimeOfDay,
    onSelectCameraView,
    onSelectZone
}) => {
    const focusTitle = regionMetric?.title ? `${regionMetric.title}` : `${activeRegion} DATA CENTRE`;
    const buildingScreenPos = screenPositions
        ? (screenPositions['example_building'] || screenPositions['main_building'])
        : undefined;

    return (
        <div className="level2-region-overlay">
            {/* Top-Left: Back Button + Region Title */}
            <RegionHeader regionMetric={regionMetric} onBack={onBackToGlobal} />

            {/* Left Sidebar: Telemetry Card (Facility Load, Cooling, Availability, Power, PUE) */}
            <RegionFacilityCard
                facilityLoad={54}
                coolingCapacity={58}
                availability={regionMetric?.availabilityPct || 99.9}
                activePower="156.6 kW"
                pue="1.30"
            />

            {/* Floating 3D Zone Tag above example_building */}
            <FloatingZoneTag
                label="Main Building"
                screenPosition={buildingScreenPos}
                defaultPosition={{ x: 54, y: 38 }}
                onClick={() => (onSelectZone ? onSelectZone('Main Building') : undefined)}
            />

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
