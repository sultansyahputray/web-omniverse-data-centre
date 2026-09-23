import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';
import './Level7Server.css';

interface Level7FloatingChipsProps {
    activeServerNum: number;
    screenPositions?: Record<string, ScreenPosition>;
    onSelectSuperChip?: (chipNum: number) => void;
}

export const Level7FloatingChips: React.FC<Level7FloatingChipsProps> = ({
    activeServerNum,
    screenPositions,
    onSelectSuperChip
}) => {
    const formattedServerNum = String(activeServerNum).padStart(2, '0');

    // 1. Resolve Super Chip 1 position
    const pos1 =
        screenPositions?.[`SP_${activeServerNum}_1`] ||
        screenPositions?.[`SP_${formattedServerNum}_1`] ||
        screenPositions?.['super_chip_1'] ||
        { x: 55, y: 22, visible: true };

    // 2. Resolve Super Chip 2 position
    const pos2 =
        screenPositions?.[`SP_${activeServerNum}_2`] ||
        screenPositions?.[`SP_${formattedServerNum}_2`] ||
        screenPositions?.['super_chip_2'] ||
        { x: 86, y: 45, visible: true };

    return (
        <div className="level7-floating-chips-layer">
            {/* Super Chip 1 Floating Button */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos1.x}%`,
                    top: `${pos1.y}%`,
                    opacity: pos1.visible !== false ? 1 : 0,
                    pointerEvents: pos1.visible !== false ? 'auto' : 'none'
                }}
            >
                <button
                    className="floating-superchip-pill-btn"
                    onClick={() => {
                        if (onSelectSuperChip) {
                            onSelectSuperChip(1);
                        } else {
                            console.log(`[Level7] Super Chip 1 clicked (prim: SP_${activeServerNum}_1)`);
                        }
                    }}
                    title={`Inspect Super Chip 1 (SP_${activeServerNum}_1)`}
                >
                    <span className="floating-superchip-text">Super Chip 1</span>
                    <span className="floating-superchip-arrow">
                        <ChevronRightIcon size={14} color="#ffffff" />
                    </span>
                </button>
            </div>

            {/* Super Chip 2 Floating Button */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos2.x}%`,
                    top: `${pos2.y}%`,
                    opacity: pos2.visible !== false ? 1 : 0,
                    pointerEvents: pos2.visible !== false ? 'auto' : 'none'
                }}
            >
                <button
                    className="floating-superchip-pill-btn"
                    onClick={() => {
                        if (onSelectSuperChip) {
                            onSelectSuperChip(2);
                        } else {
                            console.log(`[Level7] Super Chip 2 clicked (prim: SP_${activeServerNum}_2)`);
                        }
                    }}
                    title={`Inspect Super Chip 2 (SP_${activeServerNum}_2)`}
                >
                    <span className="floating-superchip-text">Super Chip 2</span>
                    <span className="floating-superchip-arrow">
                        <ChevronRightIcon size={14} color="#ffffff" />
                    </span>
                </button>
            </div>
        </div>
    );
};
