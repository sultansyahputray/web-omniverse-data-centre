import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

export interface HallItem {
    id: string;
    title: string;
    subtitle?: string;
    defaultPos: { x: number; y: number };
    type?: 'hall' | 'noc' | 'utility';
    primPath?: string;
}

export const LEVEL3_HALLS: HallItem[] = [
    {
        id: 'hall_l1_a',
        title: 'Hall L1-A',
        subtitle: '',
        defaultPos: { x: 38, y: 38 },
        type: 'hall',
        primPath: '/World/region/example_building/hall_l1_a'
    },
    {
        id: 'hall_l1_b',
        title: 'Hall L1-B',
        subtitle: '',
        defaultPos: { x: 62, y: 38 },
        type: 'hall',
        primPath: '/World/region/example_building/hall_l1_b'
    },
    {
        id: 'hall_g_a',
        title: 'Hall G-A',
        subtitle: '',
        defaultPos: { x: 38, y: 55 },
        type: 'hall',
        primPath: '/World/region/example_building/hall_g_a'
    },
    {
        id: 'hall_g_b',
        title: 'Hall G-B',
        subtitle: '',
        defaultPos: { x: 62, y: 55 },
        type: 'hall',
        primPath: '/World/region/example_building/hall_g_b'
    },
    {
        id: 'noc',
        title: 'NOC',
        subtitle: '',
        defaultPos: { x: 82, y: 55 },
        type: 'noc',
        primPath: '/World/region/example_building/noc'
    }
];

interface Level3HallsOverlayProps {
    screenPositions?: Record<string, ScreenPosition>;
    onSelectHall?: (hall: HallItem) => void;
    hideNoc?: boolean;
}

export const Level3HallsOverlay: React.FC<Level3HallsOverlayProps> = ({
    screenPositions,
    onSelectHall,
    hideNoc = false
}) => {
    const hallsToRender = hideNoc
        ? LEVEL3_HALLS.filter((h) => h.type !== 'noc')
        : LEVEL3_HALLS;

    return (
        <div className="level3-halls-overlay">

            {/* 3D Floating Hall Tags */}
            {hallsToRender.map((hall) => {
                const screenPos = screenPositions ? screenPositions[hall.id] : undefined;
                const posX = screenPos ? screenPos.x : hall.defaultPos.x;
                const posY = screenPos ? screenPos.y : hall.defaultPos.y;
                const isVisible = screenPos !== undefined ? screenPos.visible : true;
                const isNoc = hall.type === 'noc';

                return (
                    <div
                        key={hall.id}
                        className={`floating-hall-container hall-type-${hall.type || 'hall'}`}
                        style={{
                            left: `${posX}%`,
                            top: `${posY}%`,
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}
                    >
                        <button
                            className="floating-hall-button"
                            onClick={() => (onSelectHall ? onSelectHall(hall) : undefined)}
                            title={`Select ${hall.title}`}
                        >
                            <div className="floating-hall-content">
                                <div className="floating-hall-title-row">
                                    <span className="floating-hall-title">{hall.title}</span>
                                    {!isNoc && (
                                        <span className="floating-hall-arrow">
                                            <ChevronRightIcon size={13} color="#ffffff" />
                                        </span>
                                    )}
                                </div>
                                {hall.subtitle && (
                                    <span className="floating-hall-subtitle">{hall.subtitle}</span>
                                )}
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
