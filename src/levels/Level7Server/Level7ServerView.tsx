import React, { useState } from 'react';
import { CameraView, RegionKey, SiteMetric, ScreenPosition } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { Level7ServerDetailCard } from './Level7ServerDetailCard';
import { Level7BottomGaugesCard } from './Level7BottomGaugesCard';
import { Level7ComputeTrayListCard } from './Level7ComputeTrayListCard';
import './Level7Server.css';

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
    screenPositions?: Record<string, ScreenPosition>;
    onBackToRack: () => void;
    onBackToRow: () => void;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
    onSelectServer?: (serverId: string, serverNum: number) => void;
}

export const Level7ServerView: React.FC<Level7ServerViewProps> = ({
    activeHallId,
    activeRow,
    activeRackNum,
    activeServerNum,
    regionMetric,
    cameraView = 'iso',
    onBackToRack,
    onBackToRow,
    onBackToHall,
    onSelectCameraView,
    onSelectServer
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
            />

            {/* Top-Right Actions: Breadcrumb */}
            <div className="level7-top-right-actions">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Selected Compute Tray Detail Floating Card */}
            <Level7ServerDetailCard
                serverNum={activeServerNum}
                rackNum={activeRackNum}
                rowLabel={rowLabel}
                onClose={onBackToRack}
                onViewHistory={() => setIsHistoryOpen(true)}
            />

            {/* Bottom-Right Controls: Gauges Card (Image 3) + ViewCube Dice Rotation */}
            <div className="level7-bottom-controls">
                <Level7BottomGaugesCard serverNum={activeServerNum} />
                <div className="level7-viewcube-anchor">
                    <AdaptiveViewCube
                        focusLabel={serverLabel.toUpperCase()}
                        currentView={cameraView}
                        onSelectView={onSelectCameraView || (() => { })}
                    />
                </div>
            </div>

            {/* Historical Data Popup Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rackLabel} - ${serverLabel} Historical Data`}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
