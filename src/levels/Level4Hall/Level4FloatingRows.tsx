import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

export interface HallRowItem {
    id: string;
    label: string;
    rowNum: number;
    rack1Key: string;
    rack10Key: string;
    defaultPos1: { x: number; y: number };
    defaultPos10: { x: number; y: number };
}

export const HALL_ROW_ITEMS: HallRowItem[] = [
    {
        id: 'row_01',
        label: 'Row A',
        rowNum: 1,
        rack1Key: 'rack_01_01',
        rack10Key: 'rack_01_10',
        defaultPos1: { x: 16.5, y: 88.5 },
        defaultPos10: { x: 74.0, y: 88.5 }
    },
    {
        id: 'row_02',
        label: 'Row B',
        rowNum: 2,
        rack1Key: 'rack_02_01',
        rack10Key: 'rack_02_10',
        defaultPos1: { x: 18.5, y: 76.5 },
        defaultPos10: { x: 71.0, y: 76.5 }
    },
    {
        id: 'row_03',
        label: 'Row C',
        rowNum: 3,
        rack1Key: 'rack_03_01',
        rack10Key: 'rack_03_10',
        defaultPos1: { x: 21.0, y: 62.5 },
        defaultPos10: { x: 67.5, y: 62.5 }
    },
    {
        id: 'row_04',
        label: 'Row D',
        rowNum: 4,
        rack1Key: 'rack_04_01',
        rack10Key: 'rack_04_10',
        defaultPos1: { x: 23.5, y: 50.5 },
        defaultPos10: { x: 64.0, y: 50.5 }
    },
    {
        id: 'row_05',
        label: 'Row E',
        rowNum: 5,
        rack1Key: 'rack_05_01',
        rack10Key: 'rack_05_10',
        defaultPos1: { x: 26.0, y: 38.5 },
        defaultPos10: { x: 61.0, y: 38.5 }
    },
    {
        id: 'row_06',
        label: 'Row F',
        rowNum: 6,
        rack1Key: 'rack_06_01',
        rack10Key: 'rack_06_10',
        defaultPos1: { x: 28.5, y: 28.0 },
        defaultPos10: { x: 58.5, y: 19.5 }
    }
];

interface Level4FloatingRowsProps {
    screenPositions?: Record<string, ScreenPosition>;
    onSelectRow?: (row: HallRowItem) => void;
}

export const Level4FloatingRows: React.FC<Level4FloatingRowsProps> = ({
    screenPositions,
    onSelectRow
}) => {
    // Computing Summary card bounding box boundary on 100% viewport scale:
    // Left edge ~2.3% to ~38%, Top edge ~3.5% to ~32%
    const isUnderComputingCard = (x: number, y: number) => {
        return x <= 38.0 && y <= 32.0;
    };

    return (
        <div className="level4-floating-rows-layer">
            {HALL_ROW_ITEMS.map((row) => {
                const pos1 = screenPositions ? screenPositions[row.rack1Key] : undefined;
                const pos10 = screenPositions ? screenPositions[row.rack10Key] : undefined;

                // Determine whether rack 1 is occluded by static Computing Summary dashboard card
                const candidate1X = pos1 ? pos1.x : row.defaultPos1.x;
                const candidate1Y = pos1 ? pos1.y : row.defaultPos1.y;
                const occludedByCard = isUnderComputingCard(candidate1X, candidate1Y);

                // If rack 1 is blocked by card, anchor above rack 10!
                const chosenX = occludedByCard
                    ? (pos10 ? pos10.x : row.defaultPos10.x)
                    : candidate1X;
                const chosenY = occludedByCard
                    ? (pos10 ? pos10.y : row.defaultPos10.y)
                    : candidate1Y;

                const isVisible = occludedByCard
                    ? (pos10 !== undefined ? pos10.visible : true)
                    : (pos1 !== undefined ? pos1.visible : true);

                return (
                    <div
                        key={row.id}
                        className="floating-row-btn-container"
                        style={{
                            left: `${chosenX}%`,
                            top: `${chosenY}%`,
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}
                    >
                        <button
                            className="floating-row-pill-btn"
                            onClick={() => (onSelectRow ? onSelectRow(row) : undefined)}
                            title={`Select ${row.label} (${row.id})`}
                        >
                            <span className="floating-row-text">{row.label}</span>
                            <span className="floating-row-arrow">
                                <ChevronRightIcon size={14} color="#ffffff" />
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
