import React from 'react';
import { ScreenPosition } from '../../types';
import { NavigationButton } from '../../reusable/Button';
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

    // Clamp coordinates so floating buttons never hide behind the 380px right-side card
    const sanitizePos = (rawPos: { x: number; y: number; visible?: boolean }, defaultX: number, defaultY: number) => {
        let x = rawPos?.x ?? defaultX;
        let y = rawPos?.y ?? defaultY;
        const visible = rawPos?.visible !== false;

        // If projected position falls behind the right detail card (right: 44px, width: 380px => x >= 76% and y <= 62%)
        if (x >= 76 && y <= 62) {
            x = 73;
        }

        return { x, y, visible };
    };

    // 1. Resolve Super Chip 1 position
    const rawPos1 =
        screenPositions?.[`super_chip_${formattedServerNum}_1`] ||
        screenPositions?.[`SP_${formattedServerNum}_1`] ||
        screenPositions?.[`SP_${activeServerNum}_1`] ||
        screenPositions?.['super_chip_1'] ||
        { x: 48, y: 28, visible: true };
    const pos1 = sanitizePos(rawPos1, 48, 28);

    // 2. Resolve Super Chip 2 position (placed in the open 3D area, well clear of the right card)
    const rawPos2 =
        screenPositions?.[`super_chip_${formattedServerNum}_2`] ||
        screenPositions?.[`SP_${formattedServerNum}_2`] ||
        screenPositions?.[`SP_${activeServerNum}_2`] ||
        screenPositions?.['super_chip_2'] ||
        { x: 66, y: 44, visible: true };
    const pos2 = sanitizePos(rawPos2, 66, 44);

    return (
        <div className="level7-floating-chips-layer">
            {/* Super Chip 1 Floating Button */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos1.x}%`,
                    top: `${pos1.y}%`,
                    opacity: pos1.visible ? 1 : 0,
                    pointerEvents: pos1.visible ? 'auto' : 'none'
                }}
            >
                <NavigationButton
                    label="Super Chip 1"
                    navigation={`super_chip_${formattedServerNum}_1`}
                    onClick={() => {
                        if (onSelectSuperChip) {
                            onSelectSuperChip(1);
                        } else {
                            console.log(`[Level7] Super Chip 1 clicked (prim: super_chip_${formattedServerNum}_1)`);
                        }
                    }}
                />
            </div>

            {/* Super Chip 2 Floating Button */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos2.x}%`,
                    top: `${pos2.y}%`,
                    opacity: pos2.visible ? 1 : 0,
                    pointerEvents: pos2.visible ? 'auto' : 'none'
                }}
            >
                <NavigationButton
                    label="Super Chip 2"
                    navigation={`super_chip_${formattedServerNum}_2`}
                    onClick={() => {
                        if (onSelectSuperChip) {
                            onSelectSuperChip(2);
                        } else {
                            console.log(`[Level7] Super Chip 2 clicked (prim: super_chip_${formattedServerNum}_2)`);
                        }
                    }}
                />
            </div>
        </div>
    );
};
