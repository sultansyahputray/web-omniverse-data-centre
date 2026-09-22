import React from 'react';
import { CameraView, RegionKey, ScreenPosition, SiteMetric } from '../../types';
import { Level4Header } from './Level4Header';
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
    screenPositions?: Record<string, ScreenPosition>;
    onBackToBuilding: () => void;
    onSelectHall: (hallId: string) => void;
    onSelectRow?: (row: HallRowItem) => void;
    onSelectCameraView?: (view: CameraView) => void;
}

export const Level4HallView: React.FC<Level4HallViewProps> = ({
    activeHallId,
    regionMetric,
    cameraView = 'iso',
    screenPositions,
    onBackToBuilding,
    onSelectHall,
    onSelectRow,
    onSelectCameraView
}) => {
    return (
        <div className="level4-hall-overlay">
            {/* Top Header: Back to Building Cutaway & Quick Hall Selector */}
            <Level4Header
                regionMetric={regionMetric}
                activeHallId={activeHallId}
                onBack={onBackToBuilding}
                onSelectHall={onSelectHall}
            />

            {/* 1. Component 1: Computing Summary Card (Top-Left, below header) */}
            <Level4ComputingCard />

            {/* 4. Component 4: Floating Row Buttons (Row A - Row E above racks) */}
            <Level4FloatingRows
                screenPositions={screenPositions}
                onSelectRow={onSelectRow || ((row) => console.log(`[Level4] Selected ${row.label} (${row.id})`))}
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
