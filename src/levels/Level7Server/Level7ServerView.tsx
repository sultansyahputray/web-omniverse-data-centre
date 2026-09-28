import React, { useState, useEffect, useMemo } from 'react';
import { CameraView, RegionKey, SiteMetric, ScreenPosition } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { LoadScenarioSelector } from '../../reusable/LoadScenarioSelector';
import { HeatmapCheckbox } from '../../reusable/HeatmapCheckbox';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { LEVEL7_SERVER_CARD_OFFSET, LEVEL7_COLD_PLATE_CARD_OFFSET } from '../../config';
import { Level7ServerDetailCard } from './Level7ServerDetailCard';
import { Level7ColdPlateHeatmapCard } from './Level7ColdPlateHeatmapCard';
import { Level7BottomGaugesCard } from './Level7BottomGaugesCard';
import { Level7ComputeTrayListCard } from './Level7ComputeTrayListCard';
import { Level7FloatingChips } from './Level7FloatingChips';
import { Level7SuperchipHeatmapLabels } from './Level7SuperchipHeatmapLabels';
import level7Data from '../../data/level7ComputeTray.json';
import './Level7Server.css';

export { LEVEL7_SERVER_CARD_OFFSET, LEVEL7_COLD_PLATE_CARD_OFFSET };

interface Level7ServerViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    activeRow: HallRowItem;
    activeRackId: string;
    activeRackNum: number;
    activeServerId: string;
    activeServerNum: number;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    currentScenario?: string;
    isHeatmap?: boolean;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToRack: () => void;
    onBackToRow: () => void;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectScenario?: (scenario: string) => void;
    onSelectServer?: (serverId: string, serverNum: number) => void;
    onSelectSuperChip?: (chipNum: number, trayNum?: number) => void;
    onSelectPrim?: (primPath: string) => void;
    onToggleHeatmap?: (active: boolean) => void;
}

export const Level7ServerView: React.FC<Level7ServerViewProps> = ({
    activeHallId,
    activeRow,
    activeRackNum,
    activeServerNum,
    regionMetric,
    cameraView = 'iso',
    currentScenario = 'Low Load',
    isHeatmap,
    screenPositions,
    onBackToRack,
    onBackToRow,
    onBackToHall,
    onSelectCameraView,
    onSelectScenario,
    onSelectServer,
    onSelectSuperChip,
    onSelectPrim,
    onToggleHeatmap
}) => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [internalHeatmap, setInternalHeatmap] = useState<boolean>(false);
    const activeHeatmap = isHeatmap !== undefined ? isHeatmap : internalHeatmap;

    const handleToggleHeatmap = (checked: boolean) => {
        setInternalHeatmap(checked);
        if (onToggleHeatmap) {
            onToggleHeatmap(checked);
        }
    };
    const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    const timeSlot = Math.min(Math.max(Math.floor(currentTime.getMinutes() / 6) % 10, 0), 9);

    const normalizedScenario = useMemo(() => {
        if (!currentScenario) return 'Low Load';
        const s = currentScenario.toLowerCase();
        if (s.includes('high')) return 'High Load';
        if (s.includes('med')) return 'Medium Load';
        return 'Low Load';
    }, [currentScenario]);

    const activeTrayData = useMemo(() => {
        const d = (level7Data as any)[normalizedScenario] || (level7Data as any)['Low Load'];
        return {
            summary: d.summary[timeSlot] || d.summary[0],
            power: d.power[timeSlot] || d.power[0]
        };
    }, [normalizedScenario, timeSlot]);

    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const hubSubtitle = regionMetric?.subtitle || 'BATAM HUB';

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    const rackFormattedNum = String(activeRackNum).padStart(2, '0');
    const serverFormattedNum = String(activeServerNum).padStart(2, '0');
    const rowFormattedNum = String(activeRow?.rowNum || 1).padStart(2, '0');

    const rackLabel = `Rack ${rackFormattedNum}`;
    const serverLabel = `Compute Tray ${serverFormattedNum}`;
    const rowLabel = `Row ${rowFormattedNum}`;

    // Top-Right Breadcrumb: [ Hall G-A > Row 03 > Rack 04 > Compute Tray 04 ]
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            id: 'hall',
            label: currentHall.title,
            navigation: 'hall'
        },
        {
            id: 'row',
            label: rowLabel,
            navigation: 'row'
        },
        {
            id: 'rack',
            label: rackLabel,
            navigation: 'rack'
        },
        {
            id: 'server',
            label: serverLabel,
            navigation: null
        }
    ];

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (item.id === 'hall' || item.navigation === 'hall' || index === 0) {
            onBackToHall();
        } else if (item.id === 'row' || item.navigation === 'row' || index === 1) {
            onBackToRow();
        } else if (item.id === 'rack' || item.navigation === 'rack' || index === 2) {
            onBackToRack();
        }
    };

    return (
        <div className="level7-server-overlay">
            {/* Top-Left Header: Back to Rack Button + Badges */}
            <div className="level7-header-container">
                <button
                    className="back-to-rack-btn"
                    onClick={onBackToRack}
                    title={`Return to Level 6: ${rackLabel}`}
                    aria-label="Back to Rack"
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>BACK TO {rackLabel.toUpperCase()}</span>
                </button>

                <div className="level7-title-row">
                    <span className="level7-accent-bar" />
                    <h1 className="level7-main-title">{title}</h1>
                    <span className="level7-badge">LEVEL 07</span>
                    <span className="level7-server-badge">{serverLabel.toUpperCase()}</span>
                </div>

                <div className="level7-subtitle">
                    {hubSubtitle} &bull; {currentHall.title.toUpperCase()} &bull; {rowLabel.toUpperCase()} &bull; {rackLabel.toUpperCase()} &bull; {serverLabel.toUpperCase()}
                </div>
            </div>

            {/* Top-Left Compute Tray Hierarchy Tree Card (Directly Below Header) */}
            <Level7ComputeTrayListCard
                activeServerNum={activeServerNum}
                onSelectServer={onSelectServer}
                onSelectSuperChip={onSelectSuperChip}
                onSelectPrim={onSelectPrim}
            />

            {/* Floating Super Chip Displays:
                - Heatmap = false: Clickable Navigation Buttons (Super Chip 1, Super Chip 2)
                - Heatmap = true: Unclickable Telemetry Labels tracking 3D coordinates
            */}
            {activeHeatmap ? (
                <Level7SuperchipHeatmapLabels
                    activeServerNum={activeServerNum}
                    screenPositions={screenPositions}
                    currentScenario={normalizedScenario}
                    timeSlot={timeSlot}
                />
            ) : (
                <Level7FloatingChips
                    activeServerNum={activeServerNum}
                    screenPositions={screenPositions}
                    onSelectSuperChip={onSelectSuperChip}
                />
            )}

            {/* Top-Right Actions: Breadcrumb */}
            <div className="level7-top-right-actions">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Selected Compute Tray Detail Floating Card:
                - Heatmap = false: Standard Compute Tray Detail Card (Computing, Cooling, Power tabs)
                - Heatmap = true: Cold Plate Heatmap Card (16 Telemetry Parameters matching Image 2)
            */}
            {activeHeatmap ? (
                <Level7ColdPlateHeatmapCard
                    serverNum={activeServerNum}
                    rackNum={activeRackNum}
                    rowLabel={rowLabel}
                    scenario={normalizedScenario}
                    timeSlot={timeSlot}
                    offsetX={LEVEL7_COLD_PLATE_CARD_OFFSET.offsetX}
                    offsetY={LEVEL7_COLD_PLATE_CARD_OFFSET.offsetY}
                    onClose={() => handleToggleHeatmap(false)}
                    onViewHistory={() => setIsHistoryOpen(true)}
                />
            ) : (
                <Level7ServerDetailCard
                    serverNum={activeServerNum}
                    rackNum={activeRackNum}
                    rowLabel={rowLabel}
                    scenario={normalizedScenario}
                    timeSlot={timeSlot}
                    offsetX={LEVEL7_SERVER_CARD_OFFSET.offsetX}
                    offsetY={LEVEL7_SERVER_CARD_OFFSET.offsetY}
                    onClose={onBackToRack}
                    onViewHistory={() => setIsHistoryOpen(true)}
                />
            )}

            {/* Bottom-Right Controls: Gauges Card (Hidden when Heatmap is active) + (Load Scenario & ViewCube) */}
            <div className="level7-bottom-controls">
                {!activeHeatmap && (
                    <Level7BottomGaugesCard
                        serverNum={activeServerNum}
                        cpuUtil={activeTrayData.summary.avgCpuUtil}
                        gpuUtil={activeTrayData.summary.avgGpuUtil}
                        powerKW={activeTrayData.summary.trayTotalPower}
                        powerLimit={activeTrayData.power.powerLimit}
                        coolingEff={activeTrayData.summary.coolingEff}
                    />
                )}
                <div className="level7-bottom-right-stack">
                    <HeatmapCheckbox
                        checked={activeHeatmap}
                        onChange={handleToggleHeatmap}
                    />
                    <LoadScenarioSelector
                        currentScenario={currentScenario}
                        onSelectScenario={onSelectScenario}
                    />
                    <div className="level7-viewcube-anchor">
                        <AdaptiveViewCube
                            focusLabel={serverLabel.toUpperCase()}
                            currentView={cameraView}
                            onSelectView={onSelectCameraView || (() => { })}
                        />
                    </div>
                </div>
            </div>

            {/* Historical Data Popup Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rackLabel} - ${serverLabel} Historical Data`}
                level="tray"
                rackNum={activeRackNum}
                serverNum={activeServerNum}
                currentScenario={normalizedScenario}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
