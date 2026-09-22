import React from 'react';
import { CameraView, RegionKey, SiteMetric } from '../../types';
import { HallRowItem } from '../Level4Hall/Level4FloatingRows';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';
import { ChevronLeftIcon } from '../../Icons';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import { HALL_OPTIONS } from '../Level4Hall/Level4Header';
import { Level5VerticalComputingCard } from './Level5VerticalComputingCard';
import { Level5PowerCard } from './Level5PowerCard';
import { Level5CoolingCard } from './Level5CoolingCard';
import './Level5Row.css';

interface Level5RowViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    activeRow: HallRowItem;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    onBackToHall: () => void;
    onSelectCameraView?: (view: CameraView) => void;
}

export const Level5RowView: React.FC<Level5RowViewProps> = ({
    activeHallId,
    activeRow,
    regionMetric,
    cameraView = 'iso',
    onBackToHall,
    onSelectCameraView
}) => {
    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const hubSubtitle = regionMetric?.subtitle || 'BATAM HUB';

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    // Top-Right Breadcrumb: [ { id: 'hall', label: 'Hall L1-A', navigation: 'hall' }, { id: 'row', label: 'Row A', navigation: null } ]
    // User can click 'hall' to jump straight back to Level 4 (Data Hall)
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

            {/* Top-Right Breadcrumb: Quick Return to Hall */}
            <div className="level5-top-right-breadcrumb">
                <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
            </div>

            {/* Component 1: Vertical Computing Utilization Card (Under Header on Left side - Image 2) */}
            <Level5VerticalComputingCard />

            {/* Bottom-Right Row: Power Card + Cooling Card + AdaptiveViewCube in 1 line (Image 3 + Dice) */}
            <div className="level5-bottom-row-controls">
                <Level5PowerCard />
                <Level5CoolingCard />
                <div className="level5-viewcube-anchor">
                    <AdaptiveViewCube
                        focusLabel={activeRow.label.toUpperCase()}
                        currentView={cameraView}
                        onSelectView={onSelectCameraView || (() => { })}
                    />
                </div>
            </div>
        </div>
    );
};
