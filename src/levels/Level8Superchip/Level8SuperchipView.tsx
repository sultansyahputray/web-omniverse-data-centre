import React, { useState } from 'react';
import { CameraView, RegionKey, SiteMetric, ScreenPosition } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { Level8SuperchipDetailCard } from './Level8SuperchipDetailCard';
import { Level7BottomGaugesCard } from '../Level7Server/Level7BottomGaugesCard';
import { Level7ComputeTrayListCard } from '../Level7Server/Level7ComputeTrayListCard';
import { Level8FloatingLabels } from './Level8FloatingLabels';
import './Level8Superchip.css';

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
    screenPositions?: Record<string, ScreenPosition>;
    onBackToServer: () => void;
    onBackToRack: () => void;
    onBackToRow: () => void;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectServer?: (serverId: string, serverNum: number) => void;
    onSelectSuperChip?: (chipNum: number, trayNum?: number) => void;
    onSelectPrim?: (primPath: string) => void;
}

export const Level8SuperchipView: React.FC<Level8SuperchipViewProps> = ({
    activeHallId,
    activeRow,
    activeRackNum,
    activeServerNum,
    activeSuperchipNum,
    regionMetric,
    cameraView = 'iso',
    screenPositions,
    onBackToServer,
    onBackToRack,
    onBackToRow,
    onBackToHall,
    onSelectCameraView,
    onSelectServer,
    onSelectSuperChip,
    onSelectPrim
}) => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

    // Top-Right Breadcrumb matching Image 3:
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

            {/* Floating Pure Labels for exposed Vera CPU, Rubin GPU 1, and Rubin GPU 2 (Matches Image 2) */}
            <Level8FloatingLabels
                activeServerNum={activeServerNum}
                activeSuperchipNum={activeSuperchipNum}
                screenPositions={screenPositions}
            />

            {/* Top-Right Actions: Breadcrumb [ Hall > Row > Rack > Compute Tray > Superchip ] */}
            <div className="level7-top-right-actions">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Right-Side Superchip Detail Card (Matches screenshot with "Superchip {num}") */}
            <Level8SuperchipDetailCard
                superchipNum={activeSuperchipNum}
                serverNum={activeServerNum}
                rackNum={activeRackNum}
                rowLabel={rowLabel}
                onClose={onBackToServer}
                onViewHistory={() => setIsHistoryOpen(true)}
            />

            {/* Bottom-Right Controls: Bottom Gauges Card (Maintained from Level 7) + ViewCube */}
            <div className="level7-bottom-controls">
                <Level7BottomGaugesCard serverNum={activeServerNum} />
                <div className="level7-viewcube-anchor">
                    <AdaptiveViewCube
                        focusLabel={superchipLabel.toUpperCase()}
                        currentView={cameraView}
                        onSelectView={onSelectCameraView || (() => { })}
                    />
                </div>
            </div>

            {/* Historical Data Popup Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rackLabel} - ${serverLabel} ${superchipLabel} Historical Data`}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
