import React, { useState } from 'react';
import { CameraView, RegionKey, SiteMetric, ScreenPosition } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { Level6RackDetailCard } from './Level6RackDetailCard';
import './Level6Rack.css';

interface Level6RackViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    activeRow: HallRowItem;
    activeRackId: string;
    activeRackNum: number;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    screenPositions?: Record<string, ScreenPosition>;
    onBackToRow: () => void;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
}

export const Level6RackView: React.FC<Level6RackViewProps> = ({
    activeHallId,
    activeRow,
    activeRackId,
    activeRackNum,
    regionMetric,
    cameraView = 'iso',
    screenPositions,
    onBackToRow,
    onBackToHall,
    onSelectCameraView
}) => {
    // Historical Data Modal state
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const hubSubtitle = regionMetric?.subtitle || 'BATAM HUB';

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    // Format display rack label, e.g. "Rack 04"
    const rackFormattedNum = String(activeRackNum).padStart(2, '0');
    const rackLabel = `Rack ${rackFormattedNum}`;

    // Top-Right Breadcrumb: [ Hall L1-A > Row A > Rack 04 ]
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            id: 'hall',
            label: currentHall.title,
            navigation: 'hall'
        },
        {
            id: 'row',
            label: activeRow.label,
            navigation: 'row'
        },
        {
            id: 'rack',
            label: rackLabel,
            navigation: null
        }
    ];

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (item.id === 'hall' || item.navigation === 'hall' || index === 0) {
            onBackToHall();
        } else if (item.id === 'row' || item.navigation === 'row' || index === 1) {
            onBackToRow();
        }
    };

    return (
        <div className="level6-rack-overlay">
            {/* Top-Left Header: Back to Row Button + Badges */}
            <div className="level6-header-container">
                <button
                    className="back-to-row-btn"
                    onClick={onBackToRow}
                    title={`Return to Level 5: ${activeRow.label}`}
                    aria-label="Back to Row"
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>BACK TO {activeRow.label.toUpperCase()}</span>
                </button>

                <div className="level6-title-row">
                    <span className="level6-accent-bar" />
                    <h1 className="level6-main-title">{title}</h1>
                    <span className="level6-badge">LEVEL 06</span>
                    <span className="level6-rack-badge">{rackLabel.toUpperCase()}</span>
                </div>

                <div className="level6-subtitle">
                    {hubSubtitle} &bull; {currentHall.title.toUpperCase()} &bull; {activeRow.label.toUpperCase()} &bull; {rackLabel.toUpperCase()}
                </div>
            </div>

            {/* Top-Right Actions: Breadcrumb */}
            <div className="level6-top-right-actions">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Selected Rack Detail Floating Card (Closing navigates back to Hall and resets selection) */}
            {(() => {
                const activeRackPos = (screenPositions && (screenPositions['active_rack'] || (activeRackId ? screenPositions[activeRackId] : undefined)))
                    || {
                    // Simulated default rack center in viewport when backend is not streaming 3D positions
                    x: 40 + ((activeRackNum - 1) * 1.2),
                    y: 52,
                    visible: true
                };

                return (
                    <Level6RackDetailCard
                        rackNum={activeRackNum}
                        rowLabel={activeRow.label}
                        screenPosition={activeRackPos}
                        onClose={onBackToHall}
                        onViewHistory={() => setIsHistoryOpen(true)}
                    />
                );
            })()}

            {/* Bottom-Right ViewCube (Dice Rotation) */}
            <div className="level6-bottom-controls">
                <div className="level6-viewcube-anchor">
                    <AdaptiveViewCube
                        focusLabel={rackLabel.toUpperCase()}
                        currentView={cameraView}
                        onSelectView={onSelectCameraView || (() => { })}
                    />
                </div>
            </div>

            {/* Historical Data Popup Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rackLabel} Historical Data`}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
