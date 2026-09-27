import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

export interface HallItem {
    id: string;
    title: string;
    subtitle?: string;
    defaultPos: { x: number; y: number };
    type?: 'hall' | 'room' | 'noc' | 'utility';
    primPath?: string;
    floor?: 'G' | 'L1';
    side?: 'A' | 'B';
}

export const LEVEL3_HALLS: HallItem[] = [
    // --- Level Ground (G): 2 Primary Navigation Halls Only ---
    {
        id: 'hall_g_a',
        title: 'Hall G-A',
        subtitle: '',
        defaultPos: { x: 38, y: 55 },
        type: 'hall',
        floor: 'G',
        side: 'A',
        primPath: '/World/region/example_building/hall_g_a'
    },
    {
        id: 'hall_g_b',
        title: 'Hall G-B',
        subtitle: '',
        defaultPos: { x: 62, y: 55 },
        type: 'hall',
        floor: 'G',
        side: 'B',
        primPath: '/World/region/example_building/hall_g_b'
    },

    // --- Level 1 (L1): 2 Navigation Halls ---
    {
        id: 'hall_l1_a',
        title: 'Hall L1-A',
        subtitle: '',
        defaultPos: { x: 38, y: 38 },
        type: 'hall',
        floor: 'L1',
        side: 'A',
        primPath: '/World/region/example_building/hall_l1_a'
    },
    {
        id: 'hall_l1_b',
        title: 'Hall L1-B',
        subtitle: '',
        defaultPos: { x: 62, y: 38 },
        type: 'hall',
        floor: 'L1',
        side: 'B',
        primPath: '/World/region/example_building/hall_l1_b'
    },

    // --- Level 1 (L1): 6 Ancillary Room Placeholders (Side A & Side B) ---
    {
        id: 'noc_a',
        title: 'NOC A',
        subtitle: 'Control Room',
        defaultPos: { x: 28, y: 44 },
        type: 'room',
        floor: 'L1',
        side: 'A',
        primPath: '/World/region/example_building/noc_a'
    },
    {
        id: 'power_block_a',
        title: 'Power Block A',
        subtitle: 'Power Distribution',
        defaultPos: { x: 23, y: 34 },
        type: 'room',
        floor: 'L1',
        side: 'A',
        primPath: '/World/region/example_building/power_block_a'
    },
    {
        id: 'battery_room_a',
        title: 'Battery Room A',
        subtitle: 'UPS Storage',
        defaultPos: { x: 25, y: 40 },
        type: 'room',
        floor: 'L1',
        side: 'A',
        primPath: '/World/region/example_building/battery_room_a'
    },
    {
        id: 'noc_b',
        title: 'NOC B',
        subtitle: 'Control Room',
        defaultPos: { x: 72, y: 44 },
        type: 'room',
        floor: 'L1',
        side: 'B',
        primPath: '/World/region/example_building/noc_b'
    },
    {
        id: 'power_block_b',
        title: 'Power Block B',
        subtitle: 'Power Distribution',
        defaultPos: { x: 77, y: 34 },
        type: 'room',
        floor: 'L1',
        side: 'B',
        primPath: '/World/region/example_building/power_block_b'
    },
    {
        id: 'battery_room_b',
        title: 'Battery Room B',
        subtitle: 'UPS Storage',
        defaultPos: { x: 75, y: 40 },
        type: 'room',
        floor: 'L1',
        side: 'B',
        primPath: '/World/region/example_building/battery_room_b'
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
        ? LEVEL3_HALLS.filter((h) => h.type === 'hall')
        : LEVEL3_HALLS;

    return (
        <div className="level3-halls-overlay">
            {/* 3D Floating Hall & Room Tags */}
            {hallsToRender.map((hall) => {
                const screenPos = screenPositions ? screenPositions[hall.id] : undefined;
                const posX = screenPos ? screenPos.x : hall.defaultPos.x;
                const posY = screenPos ? screenPos.y : hall.defaultPos.y;
                const isVisible = screenPos !== undefined ? screenPos.visible : true;
                const isHall = hall.type === 'hall';

                return (
                    <div
                        key={hall.id}
                        className={`floating-hall-container hall-type-${hall.type || 'hall'} floor-${hall.floor || 'L1'} side-${hall.side || 'A'}`}
                        style={{
                            left: `${posX}%`,
                            top: `${posY}%`,
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}
                    >
                        <button
                            className={`floating-hall-button ${isHall ? 'is-nav-hall' : 'is-room-tag'}`}
                            onClick={() => (onSelectHall ? onSelectHall(hall) : undefined)}
                            title={isHall ? `Navigate to ${hall.title}` : `Zoom into ${hall.title}`}
                        >
                            <div className="floating-hall-content">
                                <div className="floating-hall-title-row">
                                    {!isHall && <span className="room-indicator-dot" />}
                                    <span className="floating-hall-title">{hall.title}</span>
                                    {isHall && (
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
