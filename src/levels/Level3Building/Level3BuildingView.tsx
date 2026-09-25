import React, { useState, useEffect } from 'react';
import { BuildingSubView, CameraView, RegionKey, RegionZoneItem, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { Level3Header } from './Level3Header';
import { Level3TelemetryCard } from './Level3TelemetryCard';
import { PowerPathTelemetryCard } from './PowerPathTelemetryCard';
import { CoolingDetailsTelemetryCard } from './CoolingDetailsTelemetryCard';
import { CoolingMode } from './CoolingModeToggleBar';
import { HallItem, Level3HallsOverlay } from './Level3HallsOverlay';
import { TimeOfDaySelector } from '../Level2Region/TimeOfDaySelector';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { REGION_ZONES } from '../Level2Region/Level2RegionView';
import { FloatingZoneTag } from '../Level2Region/FloatingZoneTag';
import level3BuildingData from '../../data/level3Building.json';
import level3PowerDetailsData from '../../data/level3PowerDetails.json';
import level3CoolingDetailsData from '../../data/level3CoolingDetails.json';
import { GLOBAL_TIMERS, getTimerMs } from '../../config';
import './Level3Building.css';

interface Level3BuildingViewProps {
    activeRegion: RegionKey;
    regionMetric?: SiteMetric;
    timeOfDay: TimeOfDay;
    cameraView?: CameraView;
    subView?: BuildingSubView;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToRegion: () => void;
    onSubViewChange?: (view: BuildingSubView) => void;
    onSelectTimeOfDay: (time: TimeOfDay) => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectZone?: (zone: RegionZoneItem) => void;
    onSelectHall?: (hall: HallItem) => void;
    onPowerDetails?: () => void;
    onCoolingDetails?: () => void;
}

export const Level3BuildingView: React.FC<Level3BuildingViewProps> = ({
    regionMetric,
    timeOfDay,
    cameraView = 'iso',
    subView = 'cutaway',
    screenPositions,
    onBackToRegion,
    onSubViewChange,
    onSelectTimeOfDay,
    onSelectCameraView,
    onSelectZone,
    onSelectHall,
    onPowerDetails,
    onCoolingDetails
}) => {
    // Manage internal subView state, synchronized with prop if controlled
    const [currentSubView, setCurrentSubView] = useState<BuildingSubView>(subView);
    const [coolingMode, setCoolingMode] = useState<CoolingMode>('liquid');
    const [valueIndex, setValueIndex] = useState<number>(0);

    // Interval rotasi data: Value 1 -> Value 2 -> Value 3 (mengacu ke GLOBAL_TIMERS.region_building_time di config.ts)
    useEffect(() => {
        const intervalMs = getTimerMs(GLOBAL_TIMERS.region_building_time);
        const timer = setInterval(() => {
            setValueIndex((prev) => (prev + 1) % 3);
        }, intervalMs);
        return () => clearInterval(timer);
    }, []);

    const cutawayMetrics = level3BuildingData.values[valueIndex] || level3BuildingData.values[0];
    const powerDetailsMetrics = level3PowerDetailsData.values[valueIndex] || level3PowerDetailsData.values[0];
    const coolingModeKey = coolingMode === 'air' ? 'air' : 'liquid';
    const coolingDetailsMetrics = level3CoolingDetailsData[coolingModeKey]?.values[valueIndex] || level3CoolingDetailsData.liquid.values[0];

    useEffect(() => {
        setCurrentSubView(subView);
    }, [subView]);

    const isDetailView = currentSubView === 'power_details' || currentSubView === 'cooling_details';

    const handlePowerDetailsClick = () => {
        const nextView = currentSubView === 'power_details' ? 'cutaway' : 'power_details';
        setCurrentSubView(nextView);
        if (onSubViewChange) {
            onSubViewChange(nextView);
        }
        if (onPowerDetails) {
            onPowerDetails();
        }
    };

    const handleCoolingDetailsClick = () => {
        const nextView = currentSubView === 'cooling_details' ? 'cutaway' : 'cooling_details';
        setCurrentSubView(nextView);
        if (onSubViewChange) {
            onSubViewChange(nextView);
        }
        if (onCoolingDetails) {
            onCoolingDetails();
        }
    };

    const handleBackToCutaway = () => {
        setCurrentSubView('cutaway');
        if (onSubViewChange) {
            onSubViewChange('cutaway');
        }
    };

    // Only consider live tracking active if screenPositions contains Region/Building zone keys
    const hasBuildingTracking = Boolean(
        screenPositions && REGION_ZONES.some((zone) => zone.id in screenPositions)
    );

    const getViewCubeFocusLabel = () => {
        if (currentSubView === 'power_details') return 'POWER PATH';
        if (currentSubView === 'cooling_details') return coolingMode === 'air' ? 'AIR COOLING' : 'LIQUID COOLING';
        return 'MAIN BUILDING';
    };

    return (
        <div className="level3-building-overlay">
            {/* Top-Left: Header with Back button & Top-Right Action Buttons */}
            <Level3Header
                regionMetric={regionMetric}
                subView={currentSubView}
                coolingMode={coolingMode}
                onCoolingModeChange={setCoolingMode}
                onBack={onBackToRegion}
                onBackToCutaway={handleBackToCutaway}
                onPowerDetails={handlePowerDetailsClick}
                onCoolingDetails={handleCoolingDetailsClick}
            />

            {/* Left Sidebar: Normal Cutaway Telemetry OR Power Path OR Cooling Telemetry */}
            {currentSubView === 'power_details' && <PowerPathTelemetryCard data={powerDetailsMetrics} />}
            {currentSubView === 'cooling_details' && (
                <CoolingDetailsTelemetryCard
                    data={coolingDetailsMetrics}
                    coolingMode={coolingMode}
                />
            )}
            {currentSubView === 'cutaway' && (
                <Level3TelemetryCard
                    gpuComputingUtilisation={cutawayMetrics.gpuComputingUtilisation}
                    facilityPower={cutawayMetrics.facilityPower}
                    itLoad={cutawayMetrics.itLoad}
                    pue={cutawayMetrics.pue}
                    coolingLoad={cutawayMetrics.coolingLoad}
                    activeAlarm={cutawayMetrics.activeAlarm}
                />
            )}

            {/* 3D Floating Hall Tags: In detail modes (power/cooling), NOC is hidden, only halls are shown */}
            <Level3HallsOverlay
                screenPositions={screenPositions}
                onSelectHall={onSelectHall}
                hideNoc={isDetailView}
            />

            {/* 3D Floating Utility / Exterior Zone Tags (hidden in Power & Cooling Details modes) */}
            {!isDetailView &&
                REGION_ZONES.filter((z) => !z.isMain).map((zone) => {
                    const screenPos = screenPositions ? screenPositions[zone.id] : undefined;
                    const isVisible = hasBuildingTracking ? Boolean(screenPos && screenPos.visible) : true;

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
                    focusLabel={getViewCubeFocusLabel()}
                    currentView={cameraView}
                    onSelectView={onSelectCameraView || (() => { })}
                />
            </div>
        </div>
    );
};


