import React, { useState, useMemo, useEffect } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { RegionalAvailabilityGauge } from '../../Icons';
import { DualRackServerIcon } from '../Level5Row/Level5RackComparisonModal';
import { ScreenPosition } from '../../types';

interface Level6RackDetailCardProps {
    rackNum: number;
    rowLabel?: string;
    screenPosition?: ScreenPosition;
    onClose: () => void;
    onViewHistory: () => void;
    onSelectServer?: (serverId: string, serverNum: number) => void;
}

const RACK_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Computing', status: [{ label: 'alert', color: '#ef4444', count: 1 }] },
    { label: 'Cooling' },
    { label: 'Power' }
];

export const Level6RackDetailCard: React.FC<Level6RackDetailCardProps> = ({
    rackNum,
    rowLabel = 'Row A',
    screenPosition,
    onClose,
    onViewHistory,
    onSelectServer
}) => {
    // Default active tab to Power (index 2) as shown in the user's reference image
    const [activeTabIdx, setActiveTabIdx] = useState(2);

    // Track window viewport dimensions for screen coordinate mapping
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

    // -------------------------------------------------------------------------
    // Dynamic 3D Rack Center Tracking Calculations
    // -------------------------------------------------------------------------
    const isDynamic = screenPosition !== undefined && screenPosition.x !== undefined && screenPosition.y !== undefined;
    const isVisible = isDynamic ? (screenPosition.visible ?? true) : true;

    const CARD_WIDTH = 570;
    const CARD_ESTIMATED_HEIGHT = 640;

    const rackPxX = isDynamic ? (screenPosition.x / 100) * windowSize.w : 0;
    const rackPxY = isDynamic ? (screenPosition.y / 100) * windowSize.h : 0;

    // If rack is near the right edge of the viewport (> 68%), flip card to the left side
    const isLeftOfRack = isDynamic && screenPosition.x > 68;

    let targetLeft = 0;
    let targetTop = 0;

    if (isDynamic) {
        if (isLeftOfRack) {
            targetLeft = rackPxX - CARD_WIDTH - 80;
        } else {
            targetLeft = rackPxX + 80;
        }
        // Center the card vertically relative to the rack object center
        targetTop = rackPxY - (CARD_ESTIMATED_HEIGHT / 2);

        // Viewport boundaries safety clamping
        const minLeft = 24;
        const maxLeft = Math.max(minLeft, windowSize.w - CARD_WIDTH - 24);
        const minTop = 110; // Keep below top navigation header
        const maxTop = Math.max(minTop, windowSize.h - CARD_ESTIMATED_HEIGHT - 30); // Keep above bottom controls

        targetLeft = Math.max(minLeft, Math.min(maxLeft, targetLeft));
        targetTop = Math.max(minTop, Math.min(maxTop, targetTop));
    }

    // Relative coordinates of the rack center dot in the card's local space
    const localDotX = isDynamic ? rackPxX - targetLeft : -80;
    const localDotY = isDynamic ? rackPxY - targetTop : (CARD_ESTIMATED_HEIGHT / 2);

    // Single straight horizontal line connecting the rack center directly to the card (no bends)
    let pathD = '';
    if (isDynamic) {
        if (!isLeftOfRack) {
            // Card is on right -> line runs straight horizontally from dot to card's left edge (x = 0)
            pathD = `M ${localDotX} ${localDotY} L 0 ${localDotY}`;
        } else {
            // Card is on left -> line runs straight horizontally from dot to card's right edge (x = CARD_WIDTH)
            pathD = `M ${localDotX} ${localDotY} L ${CARD_WIDTH} ${localDotY}`;
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
            top: '155px',
            right: '44px',
            left: 'auto'
        };

    // Dynamic metrics based on rackNum, matching user screenshot for Rack 4
    const rackMetrics = useMemo(() => {
        if (rackNum === 4) {
            return {
                voltage: '400',
                current: '16.6',
                activePower: '11.5',
                rackCapacity: '30',
                powerUtil: '38.3%',
                dailyConsumption: '174.7',
                upsStatus: 'Online',
                batteryHealth: '96%',
                pduLoad: '38.3%',
                powerFactor: '0.96',
                cpuUtil: 54,
                gpuUtil: 58,
                rackPowerGauge: 68,
                coolingEff: 58,
                activeServers: '13 / 13'
            };
        }

        // Generic plausible values for other rack numbers
        const basePower = (10 + (rackNum * 2.1) % 15).toFixed(1);
        const util = (30 + (rackNum * 5.7) % 55).toFixed(1);
        return {
            voltage: '400',
            current: (parseFloat(basePower) * 1.44).toFixed(1),
            activePower: basePower,
            rackCapacity: '30',
            powerUtil: `${util}%`,
            dailyConsumption: (parseFloat(basePower) * 15.2).toFixed(1),
            upsStatus: 'Online',
            batteryHealth: '98%',
            pduLoad: `${util}%`,
            powerFactor: '0.97',
            cpuUtil: 50 + (rackNum * 3) % 40,
            gpuUtil: 52 + (rackNum * 4) % 40,
            rackPowerGauge: Math.min(95, Math.round((parseFloat(basePower) / 30) * 100)),
            coolingEff: 58,
            activeServers: `${12 + (rackNum % 5)} / 16`
        };
    }, [rackNum]);

    const renderParamRow = (
        label: string,
        value: string | number,
        unit: string = '',
        badgeType: 'green' | 'yellow' | 'orange' | 'red' | 'blue' = 'green'
    ) => (
        <div className="rack-card-param-row">
            <span className="rack-card-param-label">{label}</span>
            <div className="rack-card-param-val-group">
                <span className={`rack-card-badge badge-${badgeType}`}>
                    {value}
                </span>
                {unit ? (
                    <span className="rack-card-param-unit">{unit}</span>
                ) : (
                    <span className="rack-card-param-unit empty" />
                )}
            </div>
        </div>
    );

    return (
        <div className="level6-rack-detail-card" style={cardStyle}>
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

            {/* 1. Header */}
            <div className="rack-card-header">
                <div className="rack-card-header-left">
                    <DualRackServerIcon size={26} color="#00C3D0" />
                    <span className="rack-card-title">NVL72 Rack {rackNum}</span>
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
            <div className="title-h-divider"></div>

            {/* 2. Top Row: 4 Circular Gauges using RegionalAvailabilityGauge from Icons.tsx */}
            <div className="rack-card-gauges-row">
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Average CPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={rackMetrics.cpuUtil}
                        size={72}
                        strokeWidth={8}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Average GPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={rackMetrics.gpuUtil}
                        size={72}
                        strokeWidth={8}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Rack Power</span>
                    <RegionalAvailabilityGauge
                        percentage={rackMetrics.rackPowerGauge}
                        size={72}
                        strokeWidth={8}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                        customDisplay={
                            <div className="rack-gauge-power-display">
                                <span className="power-num">XXX</span>
                                <span className="power-unit">kW</span>
                            </div>
                        }
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Cooling Efficiency</span>
                    <RegionalAvailabilityGauge
                        percentage={rackMetrics.coolingEff}
                        size={72}
                        strokeWidth={8}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>

            {/* 3. Capsule Tabs: Computing [1] | Cooling | Power */}
            <div className="rack-card-tabs-container">
                <ButtonBarWithStatus
                    items={RACK_TABS}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* 4. Tab Content: 2-Column Parameter Grid */}
            <div className="rack-card-content">
                {activeTabIdx === 2 && (
                    // POWER TAB (matches reference screenshot exactly)
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('Voltage', rackMetrics.voltage, 'V')}
                            {renderParamRow('Current', rackMetrics.current, 'A')}
                            {renderParamRow('Active Power', rackMetrics.activePower, 'kW')}
                            {renderParamRow('Rack Capacity', rackMetrics.rackCapacity, 'kW', 'blue')}
                            {renderParamRow('Power Utilization', rackMetrics.powerUtil)}
                            {renderParamRow('Daily Consumption', rackMetrics.dailyConsumption, 'kWh')}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('UPS Status', rackMetrics.upsStatus)}
                            {renderParamRow('Battery Health', rackMetrics.batteryHealth)}
                            {renderParamRow('PDU Load', rackMetrics.pduLoad)}
                            {renderParamRow('Power Factor', rackMetrics.powerFactor)}
                        </div>
                    </div>
                )}

                {activeTabIdx === 0 && (
                    // COMPUTING TAB
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('CPU Utilization', `${rackMetrics.cpuUtil}%`)}
                            {renderParamRow('GPU Utilization', `${rackMetrics.gpuUtil}%`)}
                            {renderParamRow('Active GPU Count', '4 / 8')}
                            {renderParamRow('GPU Memory Utilization', '29%')}
                            {renderParamRow('Memory Utilization', '36%')}
                            {renderParamRow('Disk Utilization', '31%')}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('Read Throughput', '2.8', 'GB/s')}
                            {renderParamRow('Write Throughput', '1.9', 'GB/s')}
                            {renderParamRow('Network Throughput', '15.2', 'Gbps')}
                            {renderParamRow('Running Jobs', '4')}
                            {renderParamRow('Active Servers', rackMetrics.activeServers)}
                        </div>
                        {onSelectServer && (
                            <div style={{ gridColumn: 'span 2', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(0, 195, 208, 0.2)' }}>
                                <div style={{ fontSize: '11px', color: '#88A2B8', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.8px' }}>
                                    INSPECT COMPUTE TRAY (LEVEL 07):
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((sNum) => (
                                        <button
                                            key={sNum}
                                            style={{
                                                background: 'rgba(0, 229, 255, 0.1)',
                                                border: '1px solid rgba(0, 229, 255, 0.35)',
                                                borderRadius: '4px',
                                                padding: '3px 7px',
                                                fontSize: '11px',
                                                color: '#71F6FF',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                transition: 'all 0.15s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.3)';
                                                e.currentTarget.style.borderColor = '#00E5FF';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
                                                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.35)';
                                            }}
                                            onClick={() => onSelectServer(`VR_${sNum}`, sNum)}
                                            title={`Inspect Compute Tray VR_${sNum}`}
                                        >
                                            VR_{sNum}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTabIdx === 1 && (
                    // COOLING TAB
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('Coolant Supply Temp', '18.2', '°C')}
                            {renderParamRow('Coolant Return Temp', '24.6', '°C')}
                            {renderParamRow('Coolant Flow Rate', '10.9', 'L/min')}
                            {renderParamRow('Coolant Pressure', '1.85', 'bar')}
                            {renderParamRow('Heat Removed', '9.8', 'kW')}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('CPU Temperature', '48.5', '°C')}
                            {renderParamRow('GPU Temperature', '54.2', '°C')}
                            {renderParamRow('Rack Inlet Temp', '22.4', '°C')}
                            {renderParamRow('Rack Outlet Temp', '34.7', '°C')}
                            {renderParamRow('CDU Status', 'Normal')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
