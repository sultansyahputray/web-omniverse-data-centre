import React, { useMemo } from 'react';
import { ScreenPosition } from '../../types';
import { NavigationButton } from '../../reusable/Button';
import { VerticalValueLabel } from '../../reusable/Label';
import { getStatus } from '../../thresholdUtils';
import { STATUS_PALETTE } from '../../config';
import './Level7Server.css';

interface Level7FloatingChipsProps {
    activeServerNum: number;
    screenPositions?: Record<string, ScreenPosition>;
    isHeatmap?: boolean;
    currentScenario?: string;
    timeSlot?: number;
    onSelectSuperChip?: (chipNum: number, trayNum?: number) => void;
}

export const Level7FloatingChips: React.FC<Level7FloatingChipsProps> = ({
    activeServerNum,
    screenPositions,
    isHeatmap = false,
    currentScenario = 'Low Load',
    timeSlot = 0,
    onSelectSuperChip
}) => {
    const formattedServerNum = String(activeServerNum).padStart(2, '0');

    // Clamp coordinates so floating elements never hide behind the 380px right-side card
    const sanitizePos = (rawPos: { x: number; y: number; visible?: boolean }, defaultX: number, defaultY: number) => {
        let x = rawPos?.x ?? defaultX;
        let y = rawPos?.y ?? defaultY;
        const visible = rawPos?.visible !== false;

        // If projected position falls behind the right detail card (right: 44px, width: 380px)
        const maxX = isHeatmap ? 64 : 74;
        if (x >= maxX && y <= 66) {
            x = maxX;
        }

        return { x, y, visible };
    };

    // 1. Resolve Super Chip 1 position
    const rawPos1 =
        screenPositions?.['super_chip_01_1'] ||
        screenPositions?.[`super_chip_${formattedServerNum}_1`] ||
        screenPositions?.[`SP_${formattedServerNum}_1`] ||
        screenPositions?.[`SP_${activeServerNum}_1`] ||
        screenPositions?.['super_chip_1'] ||
        { x: 48, y: 28, visible: true };
    const pos1 = sanitizePos(rawPos1, 48, 28);

    // 2. Resolve Super Chip 2 position
    const rawPos2 =
        screenPositions?.['super_chip_01_2'] ||
        screenPositions?.[`super_chip_${formattedServerNum}_2`] ||
        screenPositions?.[`SP_${formattedServerNum}_2`] ||
        screenPositions?.[`SP_${activeServerNum}_2`] ||
        screenPositions?.['super_chip_2'] ||
        { x: 64, y: 44, visible: true };
    const pos2 = sanitizePos(rawPos2, 64, 44);

    // Scenario normalization
    const normScenario = useMemo<'Low Load' | 'Medium Load' | 'High Load'>(() => {
        if (!currentScenario) return 'Low Load';
        const s = currentScenario.toLowerCase();
        if (s.includes('high')) return 'High Load';
        if (s.includes('med')) return 'Medium Load';
        return 'Low Load';
    }, [currentScenario]);

    // Data for Super Chip 1 (Dynamic based on load scenario & timeSlot)
    const sp1Data = useMemo(() => {
        const isHigh = normScenario === 'High Load';
        const isMed = normScenario === 'Medium Load';
        const slot = timeSlot ?? 0;

        const inlet = isHigh
            ? Number((48.5 + ((slot % 3) * 0.4)).toFixed(1))
            : isMed
                ? Number((42.0 + ((slot % 3) * 0.3)).toFixed(1))
                : Number((34.7 + ((slot % 2) * 0.2)).toFixed(1));

        const plate = isHigh
            ? Number((76.5 + ((slot % 3) * 0.8)).toFixed(1))
            : isMed
                ? Number((64.2 + ((slot % 3) * 0.5)).toFixed(1))
                : Number((52.1 + ((slot % 2) * 0.3)).toFixed(1));

        const outlet = isHigh
            ? Number((68.0 + ((slot % 3) * 0.6)).toFixed(1))
            : isMed
                ? Number((54.5 + ((slot % 3) * 0.4)).toFixed(1))
                : Number((43.0 + ((slot % 2) * 0.3)).toFixed(1));

        const inletStat = getStatus('coldPlateInletTemp', inlet);
        const plateStat = getStatus('coldPlateTemp', plate);
        const outletStat = getStatus('coldPlateOutletTemp', outlet);

        return {
            inlet,
            plate,
            outlet,
            inletToken: STATUS_PALETTE[inletStat] ?? STATUS_PALETTE.default,
            plateToken: STATUS_PALETTE[plateStat] ?? STATUS_PALETTE.default,
            outletToken: STATUS_PALETTE[outletStat] ?? STATUS_PALETTE.default,
        };
    }, [normScenario, timeSlot]);

    // Data for Super Chip 2 (Independent values differing from SP 1)
    const sp2Data = useMemo(() => {
        const isHigh = normScenario === 'High Load';
        const isMed = normScenario === 'Medium Load';
        const slot = timeSlot ?? 0;

        const inlet = isHigh
            ? Number((50.1 + ((slot % 3) * 0.4)).toFixed(1))
            : isMed
                ? Number((43.4 + ((slot % 3) * 0.3)).toFixed(1))
                : Number((35.8 + ((slot % 2) * 0.2)).toFixed(1));

        const plate = isHigh
            ? Number((79.1 + ((slot % 3) * 0.8)).toFixed(1))
            : isMed
                ? Number((66.7 + ((slot % 3) * 0.5)).toFixed(1))
                : Number((54.3 + ((slot % 2) * 0.3)).toFixed(1));

        const outlet = isHigh
            ? Number((70.4 + ((slot % 3) * 0.6)).toFixed(1))
            : isMed
                ? Number((56.2 + ((slot % 3) * 0.4)).toFixed(1))
                : Number((44.6 + ((slot % 2) * 0.3)).toFixed(1));

        const inletStat = getStatus('coldPlateInletTemp', inlet);
        const plateStat = getStatus('coldPlateTemp', plate);
        const outletStat = getStatus('coldPlateOutletTemp', outlet);

        return {
            inlet,
            plate,
            outlet,
            inletToken: STATUS_PALETTE[inletStat] ?? STATUS_PALETTE.default,
            plateToken: STATUS_PALETTE[plateStat] ?? STATUS_PALETTE.default,
            outletToken: STATUS_PALETTE[outletStat] ?? STATUS_PALETTE.default,
        };
    }, [normScenario, timeSlot]);

    return (
        <div className="level7-floating-chips-layer">
            {/* Super Chip 1: Navigation Button (heatmap=false) or 3-value label card (heatmap=true) */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos1.x}%`,
                    top: `${pos1.y}%`,
                    opacity: pos1.visible ? 1 : 0,
                    pointerEvents: pos1.visible ? 'auto' : 'none'
                }}
            >
                {isHeatmap ? (
                    <div
                        className="superchip-heatmap-label-card"
                        onClick={() => {
                            if (onSelectSuperChip) {
                                onSelectSuperChip(1, activeServerNum);
                            } else {
                                console.log(`[Level7] Super Chip 1 clicked (prim: super_chip_${formattedServerNum}_1)`);
                            }
                        }}
                        title="Click to view Super Chip 1 details"
                    >
                        <VerticalValueLabel
                            label="Cold Plate Inlet Temperature - SP 1"
                            value={`${sp1Data.inlet.toFixed(1)}°C`}
                            color={sp1Data.inletToken.bg}
                            border={sp1Data.inletToken.border ? `1.5px solid ${sp1Data.inletToken.border}` : 'none'}
                        />
                        <VerticalValueLabel
                            label="Cold Plate Temperature - SP 1"
                            value={`${sp1Data.plate.toFixed(1)}°C`}
                            color={sp1Data.plateToken.bg}
                            border={sp1Data.plateToken.border ? `1.5px solid ${sp1Data.plateToken.border}` : 'none'}
                        />
                        <VerticalValueLabel
                            label="Cold Plate Outlet Temperature - SP 1"
                            value={`${sp1Data.outlet.toFixed(1)}°C`}
                            color={sp1Data.outletToken.bg}
                            border={sp1Data.outletToken.border ? `1.5px solid ${sp1Data.outletToken.border}` : 'none'}
                        />
                    </div>
                ) : (
                    <NavigationButton
                        label="Super Chip 1"
                        navigation={`super_chip_${formattedServerNum}_1`}
                        onClick={() => {
                            if (onSelectSuperChip) {
                                onSelectSuperChip(1, activeServerNum);
                            } else {
                                console.log(`[Level7] Super Chip 1 clicked (prim: super_chip_${formattedServerNum}_1)`);
                            }
                        }}
                    />
                )}
            </div>

            {/* Super Chip 2: Navigation Button (heatmap=false) or 3-value label card (heatmap=true) */}
            <div
                className="floating-superchip-container"
                style={{
                    left: `${pos2.x}%`,
                    top: `${pos2.y}%`,
                    opacity: pos2.visible ? 1 : 0,
                    pointerEvents: pos2.visible ? 'auto' : 'none'
                }}
            >
                {isHeatmap ? (
                    <div
                        className="superchip-heatmap-label-card"
                        onClick={() => {
                            if (onSelectSuperChip) {
                                onSelectSuperChip(2, activeServerNum);
                            } else {
                                console.log(`[Level7] Super Chip 2 clicked (prim: super_chip_${formattedServerNum}_2)`);
                            }
                        }}
                        title="Click to view Super Chip 2 details"
                    >
                        <VerticalValueLabel
                            label="Cold Plate Inlet Temperature - SP 2"
                            value={`${sp2Data.inlet.toFixed(1)}°C`}
                            color={sp2Data.inletToken.bg}
                            border={sp2Data.inletToken.border ? `1.5px solid ${sp2Data.inletToken.border}` : 'none'}
                        />
                        <VerticalValueLabel
                            label="Cold Plate Temperature - SP 2"
                            value={`${sp2Data.plate.toFixed(1)}°C`}
                            color={sp2Data.plateToken.bg}
                            border={sp2Data.plateToken.border ? `1.5px solid ${sp2Data.plateToken.border}` : 'none'}
                        />
                        <VerticalValueLabel
                            label="Cold Plate Outlet Temperature - SP 2"
                            value={`${sp2Data.outlet.toFixed(1)}°C`}
                            color={sp2Data.outletToken.bg}
                            border={sp2Data.outletToken.border ? `1.5px solid ${sp2Data.outletToken.border}` : 'none'}
                        />
                    </div>
                ) : (
                    <NavigationButton
                        label="Super Chip 2"
                        navigation={`super_chip_${formattedServerNum}_2`}
                        onClick={() => {
                            if (onSelectSuperChip) {
                                onSelectSuperChip(2, activeServerNum);
                            } else {
                                console.log(`[Level7] Super Chip 2 clicked (prim: super_chip_${formattedServerNum}_2)`);
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};
