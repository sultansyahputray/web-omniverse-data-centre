import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

interface HallItem {
    id: string;
    title: string;
    subtitle?: string;
    defaultPos: { x: number; y: number };
    type?: 'hall' | 'noc' | 'utility';
}

const LEVEL3_HALLS: HallItem[] = [
    {
        id: 'hall_l1_a',
        title: 'Hall L1-A',
        subtitle: '54 COMPUTE + 6 SUPPORT',
        defaultPos: { x: 38, y: 38 },
        type: 'hall'
    },
    {
        id: 'hall_l1_b',
        title: 'Hall L1-B',
        subtitle: '54 COMPUTE + 6 SUPPORT',
        defaultPos: { x: 62, y: 38 },
        type: 'hall'
    },
    {
        id: 'hall_g_a',
        title: 'Hall G-A',
        subtitle: '54 COMPUTE + 6 SUPPORT',
        defaultPos: { x: 38, y: 55 },
        type: 'hall'
    },
    {
        id: 'hall_g_b',
        title: 'Hall G-B',
        subtitle: '54 COMPUTE + 6 SUPPORT',
        defaultPos: { x: 62, y: 55 },
        type: 'hall'
    },
    {
        id: 'noc',
        title: 'NOC',
        subtitle: 'COMMAND CENTER',
        defaultPos: { x: 82, y: 55 },
        type: 'noc'
    },
    {
        id: 'power_blocks',
        title: '4 Power Blocks',
        defaultPos: { x: 34, y: 78 },
        type: 'utility'
    },
    {
        id: 'liquid_cooling',
        title: '4 Liquid Cooling Blocks',
        defaultPos: { x: 62, y: 78 },
        type: 'utility'
    },
    {
        id: 'heat_rejection',
        title: 'Heat Rejection',
        defaultPos: { x: 84, y: 78 },
        type: 'utility'
    }
];

interface Level3HallsOverlayProps {
    screenPositions?: Record<string, ScreenPosition>;
    onSelectHall?: (hall: HallItem) => void;
}

export const Level3HallsOverlay: React.FC<Level3HallsOverlayProps> = ({
    screenPositions,
    onSelectHall
}) => {
    return (
        <div className="level3-halls-overlay">
            {/* Left Edge Floor Badges (Level 1, Ground Level) matching reference */}
            <div className="level3-floor-indicators">
                <div className="floor-badge level-upper">
                    <span className="floor-badge-title">LEVEL 1</span>
                    <span className="floor-badge-sub">HIGH DENSITY</span>
                </div>
                <div className="floor-badge ground-level">
                    <span className="floor-badge-title">GROUND LEVEL</span>
                    <span className="floor-badge-sub">CORE INFRA</span>
                </div>
            </div>

            {/* 3D Floating Hall Tags */}
            {LEVEL3_HALLS.map((hall) => {
                const screenPos = screenPositions ? screenPositions[hall.id] : undefined;
                const posX = screenPos ? screenPos.x : hall.defaultPos.x;
                const posY = screenPos ? screenPos.y : hall.defaultPos.y;
                const isVisible = screenPos !== undefined ? screenPos.visible : true;

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
                                    <span className="floating-hall-arrow">
                                        <ChevronRightIcon size={13} color="#ffffff" />
                                    </span>
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
