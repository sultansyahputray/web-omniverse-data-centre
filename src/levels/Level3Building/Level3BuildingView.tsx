import React, { useState, useEffect } from 'react';
import { BuildingSubView, CameraView, RegionKey, RegionZoneItem, ScreenPosition, SiteMetric, TimeOfDay } from '../../types';
import { Level3Header } from './Level3Header';
import { Level3TelemetryCard } from './Level3TelemetryCard';
import { PowerPathTelemetryCard } from './PowerPathTelemetryCard';
import { CoolingDetailsTelemetryCard } from './CoolingDetailsTelemetryCard';
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
        if (currentSubView === 'cooling_details') return 'COOLING';
        return 'MAIN BUILDING';
    };

    return (
        <div className="level3-building-overlay">
            {/* Top-Left: Header with Back button & Top-Right Action Buttons */}
            <Level3Header
                regionMetric={regionMetric}
                subView={currentSubView}
                onBack={onBackToRegion}
                onBackToCutaway={handleBackToCutaway}
                onPowerDetails={handlePowerDetailsClick}
                onCoolingDetails={handleCoolingDetailsClick}
            />

            {/* Left Sidebar: Normal Cutaway Telemetry OR Power Path OR Cooling Telemetry */}
            {currentSubView === 'power_details' && <PowerPathTelemetryCard />}
            {currentSubView === 'cooling_details' && <CoolingDetailsTelemetryCard />}
            {currentSubView === 'cutaway' && <Level3TelemetryCard />}

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


