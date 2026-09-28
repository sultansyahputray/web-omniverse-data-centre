import React, { useState, useEffect } from 'react';
import { CameraView, RegionKey, ScreenPosition, SiteMetric } from '../../types';
import { HALL_OPTIONS, Level4Header } from './Level4Header';
import { BreadcrumbItem } from '../../reusable/Breadcrumb';
import { Level4ComputingCard } from './Level4ComputingCard';
import { Level4PowerSummaryCard } from './Level4PowerSummaryCard';
import { Level4CoolingSummaryCard } from './Level4CoolingSummaryCard';
import { HallRowItem, Level4FloatingRows, RowPlacement, DEFAULT_HALL_ROW_PLACEMENTS } from './Level4FloatingRows';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { LoadScenarioSelector } from '../../reusable/LoadScenarioSelector';
import { HeatmapCheckbox } from '../../reusable/HeatmapCheckbox';
import { GLOBAL_TIMERS, getTimerMs } from '../../config';
import level4HallData from '../../data/level4Hall.json';
import './Level4Hall.css';

/**
 * Row Button Placement Offsets & Anchors:
 * Mengacu langsung ke DEFAULT_HALL_ROW_PLACEMENTS di Level4FloatingRows.tsx
 */
export const HALL_ROW_PLACEMENTS: Record<string, RowPlacement> = DEFAULT_HALL_ROW_PLACEMENTS;

interface Level4HallViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    currentScenario?: string;
    isHeatmap?: boolean;
    breadcrumbItems?: BreadcrumbItem[];
    screenPositions?: Record<string, ScreenPosition>;
    rowPlacements?: Record<string, RowPlacement>;
    onBackToBuilding: () => void;
    onSelectHall: (hallId: string) => void;
    onSelectRow?: (row: HallRowItem) => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectScenario?: (scenario: string) => void;
    onToggleHeatmap?: (active: boolean) => void;
    onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
}

const TIME_STEPS = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];

export const Level4HallView: React.FC<Level4HallViewProps> = ({
    activeHallId,
    regionMetric,
    cameraView = 'iso',
    currentScenario = 'Normal Load',
    isHeatmap,
    breadcrumbItems,
    screenPositions,
    rowPlacements = HALL_ROW_PLACEMENTS,
    onBackToBuilding,
    onSelectHall,
    onSelectRow,
    onSelectCameraView,
    onSelectScenario,
    onToggleHeatmap,
    onBreadcrumbClick
}) => {
    const [selectedRow, setSelectedRow] = useState<HallRowItem | null>(null);
    const [internalHeatmap, setInternalHeatmap] = useState<boolean>(false);
    const activeHeatmap = isHeatmap !== undefined ? isHeatmap : internalHeatmap;

    const handleToggleHeatmap = (checked: boolean) => {
        setInternalHeatmap(checked);
        if (onToggleHeatmap) {
            onToggleHeatmap(checked);
        }
    };

    // Initial time step index calculated from current wall clock minute
    const getInitialTimeIndex = () => {
        const m = new Date().getMinutes();
        return Math.floor(m / 6) % TIME_STEPS.length;
    };

    const [timeIndex, setTimeIndex] = useState<number>(getInitialTimeIndex);

    // 6-minute rotation interval synchronized to load scenario and time steps
    useEffect(() => {
        // If hall_time is set to 360 seconds (6 minutes) or above, sync with wall clock 6-minute marks
        if (GLOBAL_TIMERS.hall_time >= 360) {
            const updateStep = () => {
                const m = new Date().getMinutes();
                const idx = Math.floor(m / 6) % TIME_STEPS.length;
                setTimeIndex(idx);
            };
            updateStep();
            const timer = setInterval(updateStep, 1000);
            return () => clearInterval(timer);
        } else {
            // Fast rotation mode for debugging/custom timer configured in config.ts
            const intervalMs = getTimerMs(GLOBAL_TIMERS.hall_time);
            const timer = setInterval(() => {
                setTimeIndex((prev) => (prev + 1) % TIME_STEPS.length);
            }, intervalMs);
            return () => clearInterval(timer);
        }
    }, []);

    // Resolve load scenario key for level4Hall.json
    const scenarioKey = (currentScenario === 'Low Load' || currentScenario === 'Normal Load')
        ? 'Normal Load'
        : currentScenario === 'High Load'
        ? 'High Load'
        : 'Medium Load';

    const currentTimeStep = TIME_STEPS[timeIndex] ?? 0;
    const scenarioData = (level4HallData as any)[scenarioKey] || (level4HallData as any)['Normal Load'];
    const currentStepData = scenarioData[currentTimeStep.toString()] || scenarioData['0'];

    const computingMetrics = currentStepData?.computing;
    const powerMetrics = currentStepData?.power;
    const coolingMetrics = currentStepData?.cooling;

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    // Compute active breadcrumb items: Default is [ { id: '1', label: currentHall.title } ]
    const activeBreadcrumbItems: BreadcrumbItem[] = breadcrumbItems || [
        {
            id: '1',
            label: currentHall.title,
            navigation: null
        },
        ...(selectedRow
            ? [
                {
                    id: '2',
                    label: selectedRow.label,
                    navigation: null
                }
            ]
            : [])
    ];

    const handleRowSelect = (row: HallRowItem) => {
        setSelectedRow(row);
        if (onSelectRow) {
            onSelectRow(row);
        }
    };

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (index === 0) {
            setSelectedRow(null);
        }
        if (onBreadcrumbClick) {
            onBreadcrumbClick(item, index);
        }
    };

    return (
        <div className="level4-hall-overlay">
            {/* Top Header: Back to Building Cutaway & Top-Right Breadcrumb */}
            <Level4Header
                regionMetric={regionMetric}
                activeHallId={activeHallId}
                breadcrumbItems={activeBreadcrumbItems}
                onBreadcrumbClick={handleBreadcrumbClick}
                onBack={onBackToBuilding}
                onSelectHall={onSelectHall}
            />

            {/* 1. Component 1: Computing Summary Card (Top-Left, below header) */}
            <Level4ComputingCard data={computingMetrics} />

            {/* 4. Component 4: Floating Row Buttons (Row A - Row F above racks) */}
            <Level4FloatingRows
                screenPositions={screenPositions}
                rowPlacements={rowPlacements}
                onSelectRow={handleRowSelect}
            />

            {/* Bottom Row Container: Power Summary + Cooling Summary + (Load Scenario & ViewCube) */}
            <div className="level4-bottom-row-controls">
                {/* 2. Component 2: Power Summary Card (4 columns) */}
                <Level4PowerSummaryCard data={powerMetrics} />

                {/* 3. Component 3: Cooling Summary Card (Liquid vs Air toggle + metrics) */}
                <Level4CoolingSummaryCard data={coolingMetrics} />

                {/* Bottom-Right Stack: Heatmap Toggle + Load Scenario Dropdown above Dice Rotation */}
                <div className="level4-bottom-right-stack">
                    <HeatmapCheckbox
                        checked={activeHeatmap}
                        onChange={handleToggleHeatmap}
                    />
                    <LoadScenarioSelector
                        currentScenario={currentScenario}
                        onSelectScenario={onSelectScenario}
                    />
                    <div className="level4-viewcube-anchor">
                        <AdaptiveViewCube
                            focusLabel="DATA HALL"
                            currentView={cameraView}
                            onSelectView={onSelectCameraView || (() => { })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
