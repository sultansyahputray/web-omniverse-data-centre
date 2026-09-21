import React from 'react';
import { CameraView, RegionKey, RegionZoneItem, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { RegionHeader } from './RegionHeader';
import { TimeOfDaySelector } from './TimeOfDaySelector';
import { AdaptiveViewCube } from './AdaptiveViewCube';
import { RegionFacilityCard } from './RegionFacilityCard';
import { FloatingZoneTag } from './FloatingZoneTag';
import './Level2Region.css';

export const REGION_ZONES: RegionZoneItem[] = [
    {
        id: 'example_building',
        label: 'Main Building',
        primPath: '/World/region/example_building',
        defaultPos: { x: 54, y: 38 }
    },
    {
        id: 'power_station',
        label: 'Power Service Zone',
        primPath: '/World/region/power_station',
        defaultPos: { x: 30, y: 56 }
    },
    {
        id: 'generator_yard',
        label: 'Generator Yard',
        primPath: '/World/region/generator_yard',
        defaultPos: { x: 42, y: 64 }
    },
    {
        id: 'fuel_compound',
        label: 'Fuel Compound',
        primPath: '/World/region/fuel_compound',
        defaultPos: { x: 50, y: 70 }
    },
    {
        id: 'chiller_yard',
        label: 'Chiller Yard',
        primPath: '/World/region/chiller_yard',
        defaultPos: { x: 64, y: 62 }
    },
    {
        id: 'cooling_station',
        label: 'Cooling Service Zone',
        primPath: '/World/region/cooling_station',
        defaultPos: { x: 75, y: 55 }
    },
    {
        id: 'fire_water_unit',
        label: 'Fire Brigade',
        primPath: '/World/region/fire_water_unit',
        defaultPos: { x: 82, y: 65 }
    },
    {
        id: 'operation_office',
        label: 'Operation Office',
        primPath: '/World/region/operation_office',
        defaultPos: { x: 66, y: 74 }
    }
];

interface Level2RegionViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    cameraView?: CameraView;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToGlobal: () => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectZone?: (zone: RegionZoneItem) => void;
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

            {/* 8 Floating 3D Zone Tags across Region */}
            {REGION_ZONES.map((zone) => {
                const screenPos = screenPositions ? screenPositions[zone.id] : undefined;
                return (
                    <FloatingZoneTag
                        key={zone.id}
                        label={zone.label}
                        screenPosition={screenPos}
                        defaultPosition={zone.defaultPos}
                        onClick={() => (onSelectZone ? onSelectZone(zone) : undefined)}
                    />
                );
            })}

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
