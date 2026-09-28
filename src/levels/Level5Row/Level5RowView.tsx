import React, { useState, useEffect } from 'react';
import { CameraView, RegionKey, SiteMetric } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { NavigationButton } from '../../reusable/Button';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { LoadScenarioSelector } from '../../reusable/LoadScenarioSelector';
import { HeatmapCheckbox } from '../../reusable/HeatmapCheckbox';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { Level5VerticalComputingCard } from './Level5VerticalComputingCard';
import { Level5PowerCard } from './Level5PowerCard';
import { Level5CoolingCard } from './Level5CoolingCard';
import { Level5RackComparisonModal } from './Level5RackComparisonModal';
import { GLOBAL_TIMERS, getTimerMs } from '../../config';
import level5RowData from '../../data/level5Row.json';
import './Level5Row.css';

interface Level5RowViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    activeRow: HallRowItem;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    currentScenario?: string;
    isHeatmap?: boolean;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectScenario?: (scenario: string) => void;
    onToggleHeatmap?: (active: boolean) => void;
}

const TIME_STEPS = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];

export const Level5RowView: React.FC<Level5RowViewProps> = ({
    activeHallId,
    activeRow,
    regionMetric,
    cameraView = 'iso',
    currentScenario = 'Normal Load',
    isHeatmap,
    onBackToHall,
    onSelectCameraView,
    onSelectScenario,
    onToggleHeatmap
}) => {
    const [internalHeatmap, setInternalHeatmap] = useState<boolean>(false);
    const activeHeatmap = isHeatmap !== undefined ? isHeatmap : internalHeatmap;

    const handleToggleHeatmap = (checked: boolean) => {
        setInternalHeatmap(checked);
        if (onToggleHeatmap) {
            onToggleHeatmap(checked);
        }
    };
    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const hubSubtitle = regionMetric?.subtitle || 'BATAM HUB';

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    // Top-Right Breadcrumb: [ { id: 'hall', label: 'Hall L1-A', navigation: 'hall' }, { id: 'row', label: 'Row A', navigation: null } ]
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            id: 'hall',
            label: currentHall.title,
            navigation: 'hall'
        },
        {
            id: 'row',
            label: activeRow.label,
            navigation: null
        }
    ];

    const [isRackComparisonOpen, setIsRackComparisonOpen] = useState(false);

    // Initial time step index calculated from current wall clock minute
    const getInitialTimeIndex = () => {
        const m = new Date().getMinutes();
        return Math.floor(m / 6) % TIME_STEPS.length;
    };

    const [timeIndex, setTimeIndex] = useState<number>(getInitialTimeIndex);

    // 6-minute rotation interval synchronized to load scenario and time steps
    useEffect(() => {
        if (GLOBAL_TIMERS.row_time >= 360) {
            const updateStep = () => {
                const m = new Date().getMinutes();
                const idx = Math.floor(m / 6) % TIME_STEPS.length;
                setTimeIndex(idx);
            };
            updateStep();
            const timer = setInterval(updateStep, 1000);
            return () => clearInterval(timer);
        } else {
            const intervalMs = getTimerMs(GLOBAL_TIMERS.row_time);
            const timer = setInterval(() => {
                setTimeIndex((prev) => (prev + 1) % TIME_STEPS.length);
            }, intervalMs);
            return () => clearInterval(timer);
        }
    }, []);

    // Resolve load scenario key
    const scenarioKey = (currentScenario === 'Low Load' || currentScenario === 'Normal Load')
        ? 'Normal Load'
        : currentScenario === 'High Load'
            ? 'High Load'
            : 'Medium Load';

    const currentTimeStep = TIME_STEPS[timeIndex] ?? 0;
    const scenarioData = (level5RowData as any)[scenarioKey] || (level5RowData as any)['Normal Load'];
    const currentStepData = scenarioData[currentTimeStep.toString()] || scenarioData['0'];

    const computingMetrics = currentStepData?.computing;
    const powerMetrics = currentStepData?.power;
    const coolingMetrics = currentStepData?.cooling;

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (item.id === 'hall' || item.navigation === 'hall' || index === 0) {
            onBackToHall();
        }
    };

    return (
        <div className="level5-row-overlay">
            {/* Top-Left Header: Back to Data Hall + Badges */}
            <div className="level5-header-container">
                <button
                    className="back-to-hall-btn"
                    onClick={onBackToHall}
                    title="Return to Level 4: Data Hall"
                    aria-label="Back to Data Hall"
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>BACK TO DATA HALL</span>
                </button>

                <div className="level5-title-row">
                    <span className="level5-accent-bar" />
                    <h1 className="level5-main-title">{title}</h1>
                    <span className="level5-badge">LEVEL 05</span>
                    <span className="level5-row-badge">{activeRow.label.toUpperCase()}</span>
                </div>

                <div className="level5-subtitle">
                    {hubSubtitle} &bull; {currentHall.title.toUpperCase()} &bull; {activeRow.label.toUpperCase()}
                </div>
            </div>

            {/* Top-Right Actions: Rack Comparison Navigation Button + Breadcrumb */}
            <div className="level5-top-right-actions">
                <NavigationButton
                    label="Rack Comparison"
                    onClick={() => setIsRackComparisonOpen((prev) => !prev)}
                />
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Component 1: Vertical Computing Utilization Card (Under Header on Left side) */}
            <Level5VerticalComputingCard data={computingMetrics} />

            {/* Bottom-Right Row: Power Card + Cooling Card + (Load Scenario & ViewCube) */}
            <div className="level5-bottom-row-controls">
                <Level5PowerCard data={powerMetrics} />
                <Level5CoolingCard data={coolingMetrics} />
                <div className="level5-bottom-right-stack">
                    {/* <HeatmapCheckbox
                        checked={activeHeatmap}
                        onChange={handleToggleHeatmap}
                    /> */}
                    <LoadScenarioSelector
                        currentScenario={currentScenario}
                        onSelectScenario={onSelectScenario}
                    />
                    <div className="level5-viewcube-anchor">
                        <AdaptiveViewCube
                            focusLabel={activeRow.label.toUpperCase()}
                            currentView={cameraView}
                            onSelectView={onSelectCameraView || (() => { })}
                        />
                    </div>
                </div>
            </div>

            {/* Rack Comparison Popup Modal */}
            <Level5RackComparisonModal
                isOpen={isRackComparisonOpen}
                rowLabel={activeRow.label}
                currentScenario={currentScenario}
                timeStep={TIME_STEPS[timeIndex]}
                onClose={() => setIsRackComparisonOpen(false)}
            />
        </div>
    );
};
