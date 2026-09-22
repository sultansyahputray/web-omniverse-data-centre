import React, { useState } from 'react';
import { CameraView, RegionKey, ScreenPosition, SiteMetric } from '../../types';
import { HALL_OPTIONS, Level4Header } from './Level4Header';
import { BreadcrumbItem } from '../../reusable/Breadcrumb';
import { Level4ComputingCard } from './Level4ComputingCard';
import { Level4PowerSummaryCard } from './Level4PowerSummaryCard';
import { Level4CoolingSummaryCard } from './Level4CoolingSummaryCard';
import { HallRowItem, Level4FloatingRows } from './Level4FloatingRows';
import { AdaptiveViewCube } from '../Level2Region/AdaptiveViewCube';
import './Level4Hall.css';

interface Level4HallViewProps {
    activeRegion: RegionKey;
    activeHallId: string;
    regionMetric?: SiteMetric;
    cameraView?: CameraView;
    breadcrumbItems?: BreadcrumbItem[];
    screenPositions?: Record<string, ScreenPosition>;
    onBackToBuilding: () => void;
    onSelectHall: (hallId: string) => void;
    onSelectRow?: (row: HallRowItem) => void;
    onSelectCameraView?: (view: CameraView) => void;
    onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
}

export const Level4HallView: React.FC<Level4HallViewProps> = ({
    activeHallId,
    regionMetric,
    cameraView = 'iso',
    breadcrumbItems,
    screenPositions,
    onBackToBuilding,
    onSelectHall,
    onSelectRow,
    onSelectCameraView,
    onBreadcrumbClick
}) => {
    const [selectedRow, setSelectedRow] = useState<HallRowItem | null>(null);

    const currentHall = HALL_OPTIONS.find((h) => h.id === activeHallId) || HALL_OPTIONS[0];

    // Compute active breadcrumb items: Default is [ { id: '1', label: currentHall.title } ]
    // When a row is clicked: dynamically extends to [ { id: '1', label: currentHall.title }, { id: '2', label: selectedRow.label } ]
    // If custom breadcrumbItems is passed via prop, it uses that directly.
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
            <Level4ComputingCard />

            {/* 4. Component 4: Floating Row Buttons (Row A - Row E above racks) */}
            <Level4FloatingRows
                screenPositions={screenPositions}
                onSelectRow={handleRowSelect}
            />

            {/* Bottom Row Container: Power Summary + Cooling Summary + AdaptiveViewCube in 1 line */}
            <div className="level4-bottom-row-controls">
                {/* 2. Component 2: Power Summary Card */}
                <Level4PowerSummaryCard />

                {/* 3. Component 3: Cooling Summary Card */}
                <Level4CoolingSummaryCard />

                {/* AdaptiveViewCube (Dice Rotation) */}
                <div className="level4-viewcube-anchor">
                    <AdaptiveViewCube
                        focusLabel="DATA HALL"
                        currentView={cameraView}
                        onSelectView={onSelectCameraView || (() => { })}
                    />
                </div>
            </div>
        </div>
    );
};
