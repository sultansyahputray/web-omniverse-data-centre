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
import { LEVEL8_SUPERCHIP_CARD_OFFSET } from '../../config';
import { Level8SuperchipDetailCard } from './Level8SuperchipDetailCard';
import { Level7BottomGaugesCard } from '../Level7Server/Level7BottomGaugesCard';
import { Level7ComputeTrayListCard } from '../Level7Server/Level7ComputeTrayListCard';
import { Level8FloatingLabels } from './Level8FloatingLabels';
import level8Data from '../../data/level8Superchip.json';
import './Level8Superchip.css';

export { LEVEL8_SUPERCHIP_CARD_OFFSET };

interface Level8SuperchipViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    activeRow: HallRowItem;
    activeRackId: string;
    activeRackNum: number;
    activeServerId: string;
    activeServerNum: number;
    activeSuperchipNum: number;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    currentScenario?: string;
    isHeatmap?: boolean;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToServer: () => void;
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

export const Level8SuperchipView: React.FC<Level8SuperchipViewProps> = ({
    activeHallId,
    activeRow,
    activeRackNum,
    activeServerNum,
    activeSuperchipNum,
    regionMetric,
    cameraView = 'iso',
    currentScenario = 'Low Load',
    isHeatmap,
    screenPositions,
    onBackToServer,
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

    const activeSuperchipData = useMemo(() => {
        const d = (level8Data as any)[normalizedScenario] || (level8Data as any)['Low Load'];
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
    const superchipLabel = `Superchip ${activeSuperchipNum}`;
    const rowLabel = `Row ${rowFormattedNum}`;

    // Top-Right Breadcrumb matching hierarchy:
    // [ Hall G-A > Row 03 > Rack 04 > Compute Tray 04 > Superchip 2 ]
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
            navigation: 'server'
        },
        {
            id: 'superchip',
            label: superchipLabel,
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
        } else if (item.id === 'server' || item.navigation === 'server' || index === 3) {
            onBackToServer();
        }
    };

    return (
        <div className="level7-server-overlay">
            {/* Top-Left Header: Back to Compute Tray Button + Badges */}
            <div className="level7-header-container">
                <button
                    className="back-to-rack-btn"
                    onClick={onBackToServer}
                    title={`Return to Level 7: ${serverLabel}`}
                    aria-label="Back to Compute Tray"
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>BACK TO {serverLabel.toUpperCase()}</span>
                </button>

                <div className="level7-title-row">
                    <span className="level7-accent-bar" />
                    <h1 className="level7-main-title">{title}</h1>
                    <span className="level7-badge">LEVEL 08</span>
                    <span className="level7-server-badge">{superchipLabel.toUpperCase()}</span>
                </div>

                <div className="level7-subtitle">
                    {hubSubtitle} &bull; {currentHall.title.toUpperCase()} &bull; {rowLabel.toUpperCase()} &bull; {rackLabel.toUpperCase()} &bull; {serverLabel.toUpperCase()} &bull; {superchipLabel.toUpperCase()}
                </div>
            </div>

            {/* Top-Left Compute Tray Hierarchy Tree Card (Maintained from Level 7, active selection at Superchip) */}
            <Level7ComputeTrayListCard
                activeServerNum={activeServerNum}
                activeSuperchipNum={activeSuperchipNum}
                onSelectServer={onSelectServer}
                onSelectSuperChip={onSelectSuperChip}
                onSelectPrim={onSelectPrim}
            />

            {/* Floating Pure Labels for exposed Vera CPU, Rubin GPU 1, and Rubin GPU 2 */}
            <Level8FloatingLabels
                activeServerNum={activeServerNum}
                activeSuperchipNum={activeSuperchipNum}
                screenPositions={screenPositions}
            />

            {/* Top-Right Actions: Breadcrumb [ Hall > Row > Rack > Compute Tray > Superchip ] */}
            <div className="level7-top-right-actions">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Right-Side Superchip Detail Card */}
            <Level8SuperchipDetailCard
                superchipNum={activeSuperchipNum}
                serverNum={activeServerNum}
                rackNum={activeRackNum}
                rowLabel={rowLabel}
                scenario={normalizedScenario}
                timeSlot={timeSlot}
                offsetX={LEVEL8_SUPERCHIP_CARD_OFFSET.offsetX}
                offsetY={LEVEL8_SUPERCHIP_CARD_OFFSET.offsetY}
                onClose={onBackToServer}
                onViewHistory={() => setIsHistoryOpen(true)}
            />

            {/* Bottom-Right Controls: Bottom Gauges Card + (Load Scenario & ViewCube) */}
            <div className="level7-bottom-controls">
                <Level7BottomGaugesCard
                    serverNum={activeServerNum}
                    cpuUtil={activeSuperchipData.summary.avgCpuUtil}
                    gpuUtil={activeSuperchipData.summary.avgGpuUtil}
                    powerKW={activeSuperchipData.summary.superchipTotalPower}
                    powerLimit={activeSuperchipData.power.powerLimit || 6.1}
                    coolingEff={activeSuperchipData.summary.coolingEff}
                />
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
                            focusLabel={superchipLabel.toUpperCase()}
                            currentView={cameraView}
                            onSelectView={onSelectCameraView || (() => { })}
                        />
                    </div>
                </div>
            </div>

            {/* Historical Data Popup Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rackLabel} - ${serverLabel} ${superchipLabel} Historical Data`}
                level="superchip"
                rackNum={activeRackNum}
                serverNum={activeServerNum}
                superchipNum={activeSuperchipNum}
                rowLabel={rowLabel}
                currentScenario={normalizedScenario}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
