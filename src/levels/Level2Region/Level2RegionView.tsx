import React, { useState, useEffect } from 'react';
import { CameraView, RegionKey, RegionZoneItem, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { RegionHeader } from './RegionHeader';
import { TimeOfDaySelector } from './TimeOfDaySelector';
import { AdaptiveViewCube } from './AdaptiveViewCube';
import { RegionFacilityCard } from './RegionFacilityCard';
import { FloatingZoneTag } from './FloatingZoneTag';
import level2BuildingData from '../../data/level2Building.json';
import { GLOBAL_TIMERS, getTimerMs } from '../../config';
import './Level2Region.css';

export const REGION_ZONES: RegionZoneItem[] = [
    {
        id: 'example_building',
        label: 'Main Building',
        primPath: '/World/region/example_building',
        defaultPos: { x: 54, y: 38 },
        isMain: true
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

    // Rotation across Value 1, Value 2, Value 3 from level2Building.json using global timer
    const [telemetryIndex, setTelemetryIndex] = useState<number>(0);

    useEffect(() => {
        const intervalMs = getTimerMs(GLOBAL_TIMERS.region_building_time);
        const timer = setInterval(() => {
            setTelemetryIndex((prev) => (prev + 1) % level2BuildingData.values.length);
        }, intervalMs);
        return () => clearInterval(timer);
    }, []);

    const currentTelemetry = level2BuildingData.values[telemetryIndex];

    // Only consider live tracking active if screenPositions actually contains Region zone keys.
    // If it only contains Level 1 Earth keys (SG, AUS, JPN), fallback to showing default positions.
    const hasRegionTracking = Boolean(
        screenPositions && REGION_ZONES.some((zone) => zone.id in screenPositions)
    );

    return (
        <div className="level2-region-overlay">
            {/* Top-Left: Back Button + Region Title */}
            <RegionHeader regionMetric={regionMetric} onBack={onBackToGlobal} />

            {/* Left Sidebar: Telemetry Card (Facility Load, Cooling Utilization, GPU Compute Utilization, Active Power, PUE, Active Alarm) */}
            <RegionFacilityCard
                facilityLoad={currentTelemetry.facilityLoad}
                coolingUtilization={currentTelemetry.coolingUtilisation}
                gpuComputeUtilization={currentTelemetry.gpuComputeUtilisation}
                activePower={level2BuildingData.activePower}
                pue={currentTelemetry.pue}
                activeAlarm={currentTelemetry.activeAlarm}
            />

            {/* 8 Floating 3D Zone Tags across Region with occlusion awareness */}
            {REGION_ZONES.map((zone) => {
                const screenPos = screenPositions ? screenPositions[zone.id] : undefined;
                // If live 3D tracking data is arriving for this region from Omniverse Kit:
                // Strictly respect screenPos.visible (occluded by building / behind camera = hidden).
                // If region coordinates have not arrived yet, keep buttons visible at default positions.
                const isVisible = hasRegionTracking ? Boolean(screenPos && screenPos.visible) : true;

                return (
                    <FloatingZoneTag
                        key={zone.id}
                        label={zone.label}
                        screenPosition={screenPos}
                        defaultPosition={zone.defaultPos}
                        isVisible={isVisible}
                        isMain={Boolean(zone.isMain || zone.id === 'example_building')}
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
