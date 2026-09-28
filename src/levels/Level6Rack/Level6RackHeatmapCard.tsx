import React, { useState, useMemo, useEffect } from 'react';
import { NavigationButton, CloseButton } from '../../reusable/Button';
import { MicrochipIcon } from '../../Icons';
import { ScreenPosition } from '../../types';
import level6RackData from '../../data/level6Rack.json';
import level7ComputeTrayData from '../../data/level7ComputeTray.json';

interface Level6RackHeatmapCardProps {
    rackNum: number;
    rowLabel?: string;
    hallId?: string;
    currentScenario?: string;
    totalTrays?: number;
    screenPosition?: ScreenPosition;
    offsetX?: number;
    offsetY?: number;
    gapX?: number;
    side?: 'auto' | 'left' | 'right';
    onClose: () => void;
    onViewHistory: () => void;
    onSelectServer?: (serverId: string, serverNum: number) => void;
}

function getSlotIndexFromTime(date: Date = new Date()): number {
    const minutes = date.getMinutes();
    const slot = Math.floor(minutes / 6);
    return Math.min(Math.max(slot, 0), 9);
}

export const Level6RackHeatmapCard: React.FC<Level6RackHeatmapCardProps> = ({
    rackNum,
    rowLabel = 'Row A',
    hallId = 'hall_g',
    currentScenario = 'Normal Load',
    totalTrays = 8,
    screenPosition,
    offsetX = 0,
    offsetY = 0,
    gapX = 80,
    side = 'auto',
    onClose,
    onViewHistory,
    onSelectServer
}) => {
    // Real-time clock to update slot index per 6 minutes
    const [currentTime, setCurrentTime] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Time slot 0 to 9 matching [0, 6, 12, 18, 24, 30, 36, 42, 48, 54] minutes
    const timeSlot = getSlotIndexFromTime(currentTime);

    const computingData = level6RackData.computing[timeSlot] || level6RackData.computing[0];
    const coolingData = level6RackData.cooling[timeSlot] || level6RackData.cooling[0];

    // Normalized scenario for compute tray cooling telemetry
    const normalizedScenario = useMemo(() => {
        const s = (currentScenario || '').toLowerCase();
        if (s.includes('high')) return 'High Load';
        if (s.includes('med')) return 'Medium Load';
        return 'Low Load';
    }, [currentScenario]);

    const trayScenarioData = (level7ComputeTrayData as any)[normalizedScenario] || (level7ComputeTrayData as any)['Low Load'];
    const trayCooling = trayScenarioData?.cooling?.[timeSlot] || trayScenarioData?.cooling?.[0];

    // Compute Title: e.g. "Rack G-A-03-4" matching screenshot
    const rackTitle = useMemo(() => {
        const hallLetter = hallId ? hallId.replace(/[^a-zA-Z0-9]/g, '').replace(/^hall/i, '').toUpperCase() : 'G';
        const rowLetter = rowLabel ? rowLabel.replace(/Row\s*/i, '').trim().toUpperCase() : 'A';
        return `Rack ${hallLetter || 'G'}-${rowLetter || 'A'}-03-${rackNum}`;
    }, [hallId, rowLabel, rackNum]);

    // Active alerts count (defaulting to 10 matching screenshot or throttling/leak alerts)
    const alertCount = useMemo(() => {
        const throttling = (computingData?.cpuThermalThrottling || 0) + (computingData?.gpuThermalThrottling || 0);
        const leak = coolingData?.coolantLeakStatus !== 'No Leak' ? 1 : 0;
        return Math.max(10, throttling + leak + 8);
    }, [computingData, coolingData]);

    // Upper Section: Telemetry metrics with exact layout
    const metricRows = useMemo(() => {
        const cpuTemp = coolingData?.cpuTemp ?? 55.1;
        const gpu1Temp = coolingData?.gpu1Temp ?? 61.6;
        const gpu2Temp = coolingData?.gpu2Temp ?? 64.2;
        const hbmTemp = trayCooling?.avgHbmTemp ?? 28.1;
        const inletTemp = coolingData?.coolantSupplyTemp ?? 34.7;
        const outletTemp = coolingData?.coolantReturnTemp ?? 61.2;
        const deltaT = Math.abs(outletTemp - inletTemp);
        const flowRate = coolingData?.coolantFlowRate ?? 75.7;
        const airflow = coolingData?.airflow ?? 1499.3;

        return [
            {
                label: 'Avg. CPU Temperature',
                value: cpuTemp.toFixed(1),
                unit: '°C',
                badgeClass: cpuTemp > 70 ? 'badge-red' : cpuTemp > 60 ? 'badge-yellow' : 'badge-green'
            },
            {
                label: 'Avg. GPU Temperature',
                value: `${Math.round(gpu1Temp)}-${Math.round(gpu2Temp)}`,
                unit: '°C',
                badgeClass: 'badge-green'
            },
            {
                label: 'Avg. HBM Temperature',
                value: hbmTemp.toFixed(1),
                unit: '°C',
                badgeClass: 'badge-green'
            },
            {
                label: 'Coolant Inlet Temperature',
                value: inletTemp.toFixed(1),
                unit: '°C',
                badgeClass: inletTemp > 45 ? 'badge-red' : 'badge-green'
            },
            {
                label: 'Coolant Outlet Temperature',
                value: outletTemp.toFixed(1),
                unit: '°C',
                badgeClass: 'badge-green'
            },
            {
                label: 'Coolant ΔT',
                value: `+${deltaT.toFixed(1)}`,
                unit: '°C',
                badgeClass: 'badge-green'
            },
            {
                label: 'Coolant Flow Rate',
                value: flowRate.toFixed(1),
                unit: 'L/min',
                badgeClass: 'badge-green'
            },
            {
                label: 'Airflow',
                value: Math.round(airflow).toLocaleString('en-US'),
                unit: 'CFM',
                badgeClass: 'badge-green'
            }
        ];
    }, [coolingData, trayCooling]);

    // Lower Section: Trays descending (8 down to 1) with realistic thermal sensor telemetry
    const trayRows = useMemo(() => {
        const list = [];
        const baseInlet = 42.1;
        const baseOutlet = 42.1;
        const baseHotspot = 42.1;

        for (let i = totalTrays; i >= 1; i--) {
            const isAnomaly = i === 8; // Tray 8 displays thermal alert hotspot matching mockup
            const inlet = baseInlet;
            const outlet = isAnomaly ? 56.8 : baseOutlet;
            const hotspot = isAnomaly ? 56.8 : baseHotspot;

            list.push({
                num: i,
                inlet,
                outlet,
                hotspot,
                inletBadge: 'badge-green',
                outletBadge: isAnomaly ? 'badge-red' : 'badge-green',
                hotspotBadge: isAnomaly ? 'badge-red' : 'badge-green'
            });
        }
        return list;
    }, [totalTrays]);

    // Viewport dimensions for responsive callout mapping
    const [windowSize, setWindowSize] = useState({
        w: typeof window !== 'undefined' ? window.innerWidth : 1920,
        h: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                w: window.innerWidth,
                h: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Dynamic 3D Rack Center Tracking Calculations
    const isDynamic = screenPosition !== undefined && screenPosition.x !== undefined && screenPosition.y !== undefined;
    const isVisible = isDynamic ? (screenPosition.visible ?? true) : true;

    const CARD_WIDTH = 450;
    const CARD_ESTIMATED_HEIGHT = 650;

    const rackPxX = isDynamic ? (screenPosition.x / 100) * windowSize.w : 0;
    const rackPxY = isDynamic ? (screenPosition.y / 100) * windowSize.h : 0;

    const isLeftOfRack = side === 'left' ? true : (side === 'right' ? false : (isDynamic && screenPosition.x > 68));

    let targetLeft = 0;
    let targetTop = 0;

    if (isDynamic) {
        if (isLeftOfRack) {
            targetLeft = rackPxX - CARD_WIDTH - gapX + offsetX;
        } else {
            targetLeft = rackPxX + gapX + offsetX;
        }
        targetTop = rackPxY - (CARD_ESTIMATED_HEIGHT / 2) + offsetY;

        // Viewport boundaries safety clamping
        const minLeft = 16;
        const maxLeft = Math.max(minLeft, windowSize.w - CARD_WIDTH - 16);
        const minTop = 80;
        const maxTop = Math.max(minTop, windowSize.h - CARD_ESTIMATED_HEIGHT - 20);

        targetLeft = Math.max(minLeft, Math.min(maxLeft, targetLeft));
        targetTop = Math.max(minTop, Math.min(maxTop, targetTop));
    }

    const localDotX = isDynamic ? rackPxX - targetLeft : -gapX;
    const localDotY = isDynamic ? rackPxY - targetTop : (CARD_ESTIMATED_HEIGHT / 2);

    let pathD = '';
    const shouldDrawLine = isDynamic && ((!isLeftOfRack && localDotX < 0) || (isLeftOfRack && localDotX > CARD_WIDTH));
    if (shouldDrawLine) {
        const cardEdgeX = !isLeftOfRack ? 0 : CARD_WIDTH;
        const cardEdgeY = Math.max(30, Math.min(CARD_ESTIMATED_HEIGHT - 30, localDotY));
        if (Math.abs(cardEdgeY - localDotY) < 3) {
            pathD = `M ${localDotX} ${localDotY} L ${cardEdgeX} ${localDotY}`;
        } else {
            const midX = (localDotX + cardEdgeX) / 2;
            pathD = `M ${localDotX} ${localDotY} L ${midX} ${localDotY} L ${midX} ${cardEdgeY} L ${cardEdgeX} ${cardEdgeY}`;
        }
    }

    const cardStyle: React.CSSProperties = isDynamic
        ? {
            position: 'absolute',
            left: `${targetLeft}px`,
            top: `${targetTop}px`,
            right: 'auto',
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'left 0.08s linear, top 0.08s linear, opacity 0.25s ease',
            willChange: 'left, top'
        }
        : {
            position: 'absolute',
            top: `${145 + offsetY}px`,
            right: `${44 - offsetX}px`,
            left: 'auto'
        };

    return (
        <div className="level6-rack-detail-card level6-rack-heatmap-card" style={cardStyle}>
            {/* Dynamic / Static Decorative Callout Line connecting to the 3D Rack */}
            {isDynamic ? (
                <div
                    className="rack-card-connector-wrap dynamic"
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                    <svg
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflow: 'visible',
                            pointerEvents: 'none'
                        }}
                    >
                        <path
                            d={pathD}
                            stroke="#00C3D0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle
                            cx={localDotX}
                            cy={localDotY}
                            r="5"
                            fill="#0A1E3C"
                            stroke="#00C3D0"
                            strokeWidth="2"
                        />
                        <circle
                            cx={localDotX}
                            cy={localDotY}
                            r="2.5"
                            fill="#00E5FF"
                        />
                    </svg>
                </div>
            ) : (
                <div className="rack-card-connector-wrap" aria-hidden="true">
                    <svg className="rack-card-connector-svg" width="90" height="24" viewBox="0 0 90 24" fill="none">
                        <path
                            d="M 6 12 L 90 12"
                            stroke="#00C3D0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <circle cx="6" cy="12" r="5" fill="#0A1E3C" stroke="#00C3D0" strokeWidth="2" />
                        <circle cx="6" cy="12" r="2.5" fill="#00E5FF" />
                    </svg>
                </div>
            )}

            {/* 1. Header with Microchip Icon, Rack Title, Red Alert Badge, View history, and Close Button */}
            <div className="rack-card-header">
                <div className="rack-card-header-left">
                    <MicrochipIcon size={24} color="#00E5FF" />
                    <span className="rack-card-title">{rackTitle}</span>
                </div>

                <div className="rack-card-header-right">
                    <NavigationButton
                        label="View history"
                        onClick={onViewHistory}
                        className="rack-card-history-btn"
                    />
                    <CloseButton
                        onClick={onClose}
                        title="Close detail card"
                        ariaLabel="Close"
                    />
                </div>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider" />

            {/* 2. Upper Metrics Section */}
            <div className="rack-metrics-list">
                {metricRows.map((m, idx) => (
                    <div key={idx} className="rack-metric-row">
                        <span className="rack-metric-label">{m.label}</span>
                        <div className="rack-metric-right">
                            <span className={`rack-metric-badge ${m.badgeClass}`}>
                                {m.value}
                            </span>
                            <span className="rack-metric-unit">{m.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Lower Section: Tray Temperature (Sensors) Table */}
            <div className="rack-trays-section">
                <div className="rack-trays-header-row">
                    <span className="rack-trays-title">Tray Temperature (Sensors)</span>
                </div>

                <div className="rack-trays-table">
                    <div className="rack-trays-table-header">
                        <span className="tray-col-tray">Tray</span>
                        <span className="tray-col-metric">Inlet (°C)</span>
                        <span className="tray-col-metric">Outlet (°C)</span>
                        <span className="tray-col-metric">Hotspot(°C)</span>
                    </div>

                    <div className="rack-trays-table-body">
                        {trayRows.map((t) => (
                            <div
                                key={t.num}
                                className="rack-tray-row"
                                onClick={() => onSelectServer?.(`compute_tray_${t.num}`, t.num)}
                                title={`Select Compute Tray ${t.num}`}
                            >
                                <span className="tray-col-tray tray-num">{t.num}</span>
                                <span className="tray-col-metric">
                                    <span className={`tray-badge ${t.inletBadge}`}>
                                        {t.inlet.toFixed(1)}
                                    </span>
                                </span>
                                <span className="tray-col-metric">
                                    <span className={`tray-badge ${t.outletBadge}`}>
                                        {t.outlet.toFixed(1)}
                                    </span>
                                </span>
                                <span className="tray-col-metric">
                                    <span className={`tray-badge ${t.hotspotBadge}`}>
                                        {t.hotspot.toFixed(1)}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
