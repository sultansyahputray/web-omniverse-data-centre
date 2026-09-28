import React, { useMemo } from 'react';
import { ScreenPosition } from '../../types';
import { VerticalValueLabel } from '../../reusable/Label';
import { getStatus } from '../../thresholdUtils';
import { STATUS_PALETTE, LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET } from '../../config';
import './Level7Server.css';

export { LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET };

export interface FloatingCardOffset {
    offsetX?: number;
    offsetY?: number;
}

interface Level7SuperchipHeatmapLabelsProps {
    activeServerNum: number;
    screenPositions?: Record<string, ScreenPosition>;
    currentScenario?: string;
    timeSlot?: number;
    sp1Offset?: FloatingCardOffset;
    sp2Offset?: FloatingCardOffset;
}

export const Level7SuperchipHeatmapLabels: React.FC<Level7SuperchipHeatmapLabelsProps> = ({
    activeServerNum,
    screenPositions,
    currentScenario = 'Low Load',
    timeSlot = 0,
    sp1Offset,
    sp2Offset,
}) => {
    const formattedServerNum = String(activeServerNum).padStart(2, '0');

    // Offset posisi horizontal/vertikal (px) dari config atau props
    const sp1OffsetX = sp1Offset?.offsetX ?? LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET?.sp1?.offsetX ?? 0;
    const sp1OffsetY = sp1Offset?.offsetY ?? LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET?.sp1?.offsetY ?? 0;

    const sp2OffsetX = sp2Offset?.offsetX ?? LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET?.sp2?.offsetX ?? 0;
    const sp2OffsetY = sp2Offset?.offsetY ?? LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET?.sp2?.offsetY ?? 0;

    const sanitizePos = (rawPos: { x: number; y: number; visible?: boolean }, defaultX: number, defaultY: number) => {
        const x = rawPos?.x ?? defaultX;
        const y = rawPos?.y ?? defaultY;
        const visible = rawPos?.visible !== false;
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
        { x: 66, y: 44, visible: true };
    const pos2 = sanitizePos(rawPos2, 66, 44);

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
        <div className="superchip-heatmap-layer">
            {/* Super Chip 1 Unclickable Telemetry Label Container with configurable offset */}
            <div
                className="superchip-heatmap-telemetry-wrapper"
                style={{
                    left: `calc(${pos1.x}% + ${sp1OffsetX}px)`,
                    top: `calc(${pos1.y}% + ${sp1OffsetY}px)`,
                    opacity: pos1.visible ? 1 : 0,
                    pointerEvents: pos1.visible ? 'auto' : 'none',
                }}
            >
                <div className="superchip-heatmap-telemetry-card">
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
            </div>

            {/* Super Chip 2 Unclickable Telemetry Label Container with configurable offset */}
            <div
                className="superchip-heatmap-telemetry-wrapper"
                style={{
                    left: `calc(${pos2.x}% + ${sp2OffsetX}px)`,
                    top: `calc(${pos2.y}% + ${sp2OffsetY}px)`,
                    opacity: pos2.visible ? 1 : 0,
                    pointerEvents: pos2.visible ? 'auto' : 'none',
                }}
            >
                <div className="superchip-heatmap-telemetry-card">
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
            </div>
        </div>
    );
};
