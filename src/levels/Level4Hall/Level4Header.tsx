import React from 'react';
import { SiteMetric } from '../../types';
import { ChevronLeftIcon } from '../../Icons';
import { Breadcrumb, BreadcrumbItem } from '../../reusable/Breadcrumb';

export interface HallOption {
    id: string;
    title: string;
    subtitle: string;
}

export const HALL_OPTIONS: HallOption[] = [
    { id: 'hall_l1_a', title: 'Hall L1-A', subtitle: '' },
    { id: 'hall_l1_b', title: 'Hall L1-B', subtitle: '' },
    { id: 'hall_g_a', title: 'Hall G-A', subtitle: '' },
    { id: 'hall_g_b', title: 'Hall G-B', subtitle: '' }
];

interface Level4HeaderProps {
    regionMetric?: SiteMetric;
    activeHallId: string;
    breadcrumbItems?: BreadcrumbItem[];
    onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
    onBack: () => void;
    onSelectHall: (hallId: string) => void;
}

export const Level4Header: React.FC<Level4HeaderProps> = ({
    regionMetric,
    activeHallId,
    breadcrumbItems,
    onBreadcrumbClick,
    onBack,
    onSelectHall
}) => {
    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const hubSubtitle = regionMetric?.subtitle || 'BATAM HUB';

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    return (
        <>
            <div className="level4-header-container">
                <button
                    className="back-to-building-btn"
                    onClick={onBack}
                    title="Return to Level 3: Building Cutaway"
                    aria-label="Back to Building Cutaway"
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>BACK TO BUILDING CUTAWAY</span>
                </button>

                <div className="level4-title-row">
                    <span className="level4-accent-bar" />
                    <h1 className="level4-main-title">{title}</h1>
                    <span className="level4-badge">LEVEL 04</span>
                    <span className="level4-hall-badge">{currentHall.title.toUpperCase()}</span>
                </div>

                <div className="level4-subtitle">
                    {hubSubtitle} &bull; {currentHall.title.toUpperCase()}
                </div>
            </div>

            {/* Top-Right Breadcrumb */}
            {breadcrumbItems && breadcrumbItems.length > 0 && (
                <div className="level4-top-right-breadcrumb">
                    <Breadcrumb items={breadcrumbItems} onItemClick={onBreadcrumbClick} />
                </div>
            )}
        </>
    );
};
