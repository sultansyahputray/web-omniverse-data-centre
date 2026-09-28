import React, { useState, useEffect, useMemo } from 'react';
import { ScreenPosition } from '../../types';
import { VerticalValueLabel } from '../../reusable/Label';
import { getStatus } from '../../thresholdUtils';
import { STATUS_PALETTE, LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET } from '../../config';
import './Level7Server.css';

interface Level7SuperchipHeatmapLabelsProps {
    activeServerNum: number;
    screenPositions?: Record<string, ScreenPosition>;
    currentScenario?: string;
    timeSlot?: number;
}

export const Level7SuperchipHeatmapLabels: React.FC<Level7SuperchipHeatmapLabelsProps> = ({
    activeServerNum,
    screenPositions,
    currentScenario = 'Low Load',
    timeSlot = 0,
}) => {
    const formattedServerNum = String(activeServerNum).padStart(2, '0');

    // Drag / offset state for SP 1 card (initialized from config.ts)
    const [drag1, setDrag1] = useState({
        x: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetX,
        y: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetY,
    });
    const [isDragging1, setIsDragging1] = useState(false);

    // Drag / offset state for SP 2 card (initialized from config.ts)
    const [drag2, setDrag2] = useState({
        x: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetX,
        y: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetY,
    });
    const [isDragging2, setIsDragging2] = useState(false);

    // Sync when config.ts values change (Vite hot reload)
    useEffect(() => {
        setDrag1({
            x: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetX,
            y: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetY,
        });
    }, [LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetX, LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp1.offsetY]);

    useEffect(() => {
        setDrag2({
            x: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetX,
            y: LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetY,
        });
    }, [LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetX, LEVEL7_HEATMAP_FLOATING_CARDS_OFFSET.sp2.offsetY]);

    // Drag handler for SP 1
    const handleMouseDown1 = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        setIsDragging1(true);

        const startMouseX = e.clientX;
        const startMouseY = e.clientY;
        const startOffsetX = drag1.x;
        const startOffsetY = drag1.y;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startMouseX;
            const dy = moveEvent.clientY - startMouseY;
            setDrag1({
                x: Math.round(startOffsetX + dx),
                y: Math.round(startOffsetY + dy),
            });
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
            setIsDragging1(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            const finalX = Math.round(startOffsetX + (upEvent.clientX - startMouseX));
            const finalY = Math.round(startOffsetY + (upEvent.clientY - startMouseY));
            console.log(
                `%c📍 [SP 1 Card Offset] offsetX: ${finalX}, offsetY: ${finalY}`,
                'color: #00E5FF; font-weight: bold; background: #0c253e; padding: 2px 6px; border-radius: 4px;'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // Drag handler for SP 2
    const handleMouseDown2 = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        setIsDragging2(true);

        const startMouseX = e.clientX;
        const startMouseY = e.clientY;
        const startOffsetX = drag2.x;
        const startOffsetY = drag2.y;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startMouseX;
            const dy = moveEvent.clientY - startMouseY;
            setDrag2({
                x: Math.round(startOffsetX + dx),
                y: Math.round(startOffsetY + dy),
            });
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
            setIsDragging2(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            const finalX = Math.round(startOffsetX + (upEvent.clientX - startMouseX));
            const finalY = Math.round(startOffsetY + (upEvent.clientY - startMouseY));
            console.log(
                `%c📍 [SP 2 Card Offset] offsetX: ${finalX}, offsetY: ${finalY}`,
                'color: #00E5FF; font-weight: bold; background: #0c253e; padding: 2px 6px; border-radius: 4px;'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

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
        <div className="superchip-heatmap-layer">
            {/* Super Chip 1 Configurable & Draggable Telemetry Card */}
            <div
                className={`superchip-heatmap-telemetry-wrapper ${isDragging1 ? 'is-dragging' : ''}`}
                style={{
                    left: `calc(${pos1.x}% + ${drag1.x}px)`,
                    top: `calc(${pos1.y}% + ${drag1.y}px)`,
                    opacity: pos1.visible ? 1 : 0,
                    pointerEvents: pos1.visible ? 'auto' : 'none',
                    transition: isDragging1 ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.2s ease',
                }}
            >
                <div
                    className="superchip-heatmap-telemetry-card"
                    onMouseDown={handleMouseDown1}
                    title="Klik & geser untuk memindahkan card Super Chip 1"
                >
                    <div className="superchip-heatmap-drag-pill">
                        <span className="drag-handle-dots">⋮⋮</span>
                        <span className="drag-handle-text">DRAG TO MOVE</span>
                    </div>
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

            {/* Super Chip 2 Configurable & Draggable Telemetry Card */}
            <div
                className={`superchip-heatmap-telemetry-wrapper ${isDragging2 ? 'is-dragging' : ''}`}
                style={{
                    left: `calc(${pos2.x}% + ${drag2.x}px)`,
                    top: `calc(${pos2.y}% + ${drag2.y}px)`,
                    opacity: pos2.visible ? 1 : 0,
                    pointerEvents: pos2.visible ? 'auto' : 'none',
                    transition: isDragging2 ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.2s ease',
                }}
            >
                <div
                    className="superchip-heatmap-telemetry-card"
                    onMouseDown={handleMouseDown2}
                    title="Klik & geser untuk memindahkan card Super Chip 2"
                >
                    <div className="superchip-heatmap-drag-pill">
                        <span className="drag-handle-dots">⋮⋮</span>
                        <span className="drag-handle-text">DRAG TO MOVE</span>
                    </div>
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
