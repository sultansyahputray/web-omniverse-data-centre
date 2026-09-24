import React from 'react';
import { ScreenPosition } from '../../types';
import { PureLabel } from '../../reusable/Label';
import './Level8Superchip.css';

interface Level8FloatingLabelsProps {
    activeServerNum: number;
    activeSuperchipNum: number;
    screenPositions?: Record<string, ScreenPosition>;
}

export const Level8FloatingLabels: React.FC<Level8FloatingLabelsProps> = ({
    activeServerNum,
    activeSuperchipNum,
    screenPositions
}) => {
    const formattedServer = String(activeServerNum).padStart(2, '0');
    const scNum = activeSuperchipNum;

    // Helper to resolve positions from projection service
    const resolvePos = (keys: string[], defaultX: number, defaultY: number) => {
        for (const k of keys) {
            if (screenPositions?.[k]) {
                const p = screenPositions[k];
                return { x: p.x, y: p.y, visible: p.visible !== false };
            }
        }
        return { x: defaultX, y: defaultY, visible: true };
    };

    // 1. Vera CPU anchor position (directly above & centered on Vera CPU mesh)
    const posVera = resolvePos(
        [
            `vera_${formattedServer}_${scNum}_1`,
            `vera_cpu_${scNum}`,
            `vera_${scNum}`,
            'vera',
            'vera_cpu_1'
        ],
        45,
        38
    );

    // 2. Rubin GPU 1 anchor position (directly above & centered on Rubin GPU 1 mesh)
    const posRubin1 = resolvePos(
        [
            `rubin_${formattedServer}_${scNum}_1`,
            `rubin_gpu_1`,
            `rubin_${scNum}_1`,
            'rubin_1'
        ],
        37,
        48
    );

    // 3. Rubin GPU 2 anchor position (directly above & centered on Rubin GPU 2 mesh)
    const posRubin2 = resolvePos(
        [
            `rubin_${formattedServer}_${scNum}_2`,
            `rubin_gpu_2`,
            `rubin_${scNum}_2`,
            'rubin_2'
        ],
        53,
        48
    );

    return (
        <div className="level8-floating-labels-layer">
            {/* Vera CPU Floating Label */}
            <div
                className="floating-chip-label-anchor"
                style={{
                    left: `${posVera.x}%`,
                    top: `${posVera.y}%`,
                    opacity: posVera.visible ? 1 : 0
                }}
            >
                <PureLabel label="Vera CPU" />
            </div>

            {/* Rubin GPU 1 Floating Label (Matches Image 2) */}
            <div
                className="floating-chip-label-anchor"
                style={{
                    left: `${posRubin1.x}%`,
                    top: `${posRubin1.y}%`,
                    opacity: posRubin1.visible ? 1 : 0
                }}
            >
                <PureLabel label="Rubin GPU 1" />
            </div>

            {/* Rubin GPU 2 Floating Label (Matches Image 2) */}
            <div
                className="floating-chip-label-anchor"
                style={{
                    left: `${posRubin2.x}%`,
                    top: `${posRubin2.y}%`,
                    opacity: posRubin2.visible ? 1 : 0
                }}
            >
                <PureLabel label="Rubin GPU 2" />
            </div>
        </div>
    );
};
