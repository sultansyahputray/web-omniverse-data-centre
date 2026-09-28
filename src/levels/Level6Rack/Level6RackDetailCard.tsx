import React, { useState, useMemo, useEffect } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { RegionalAvailabilityGauge } from '../../Icons';
import { DualRackServerIcon } from '../Level5Row/Level5RackComparisonModal';
import { ScreenPosition } from '../../types';
import { getStatus, getStatusColor } from '../../thresholdUtils';
import level6RackData from '../../data/level6Rack.json';

interface Level6RackDetailCardProps {
    rackNum: number;
    rowLabel?: string;
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

export const Level6RackDetailCard: React.FC<Level6RackDetailCardProps> = ({
    rackNum,
    rowLabel = 'Row A',
    screenPosition,
    offsetX = 0,
    offsetY = 0,
    gapX = 80,
    side = 'auto',
    onClose,
    onViewHistory,
    onSelectServer
}) => {
    // Active capsule tab: 0: Computing, 1: Cooling, 2: Power
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    // Track real-time clock to update slot index per 6 minutes
    const [currentTime, setCurrentTime] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Time slot 0 to 9 matching [0, 6, 12, 18, 24, 30, 36, 42, 48, 54] minutes
    const timeSlot = getSlotIndexFromTime(currentTime);

    const summaryData = level6RackData.summary[timeSlot] || level6RackData.summary[0];
    const computingData = level6RackData.computing[timeSlot] || level6RackData.computing[0];
    const powerData = level6RackData.power[timeSlot] || level6RackData.power[0];
    const coolingData = level6RackData.cooling[timeSlot] || level6RackData.cooling[0];

    // Top Summary Gauges Calculations
    const cpuGaugeVal = summaryData.avgCpuUtil;
    const gpuGaugeVal = summaryData.avgGpuUtil;
    const rackPowerVal = summaryData.rackActivePower;
    // Rack power percentage against rack capacity (184 kW)
    const rackPowerGaugePct = Math.min(100, Math.round((summaryData.rackActivePower / powerData.rackCapacity) * 100));
    const coolingEffVal = summaryData.coolingEff;

    // Computing alert count from CPU and GPU throttling events
    const computingAlerts = (computingData.cpuThermalThrottling || 0) + (computingData.gpuThermalThrottling || 0);

    const rackTabs: ButtonBarWithStatusItem[] = useMemo(() => [
        {
            label: 'Computing',
            status: computingAlerts > 0 ? [{ label: 'alert', color: '#ef4444', count: computingAlerts }] : undefined
        },
        { label: 'Cooling' },
        { label: 'Power' }
    ], [computingAlerts]);

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

    // Determine if card sits on the left side of rack (forced via prop or automatic based on screen width > 68%)
    const isLeftOfRack = side === 'left' ? true : (side === 'right' ? false : (isDynamic && screenPosition.x > 68));

    let targetLeft = 0;
    let targetTop = 0;

    if (isDynamic) {
        if (isLeftOfRack) {
            targetLeft = rackPxX - CARD_WIDTH - gapX + offsetX;
        } else {
            targetLeft = rackPxX + gapX + offsetX;
        }
        // Center the card vertically relative to the rack object center + offsetY
        targetTop = rackPxY - (CARD_ESTIMATED_HEIGHT / 2) + offsetY;

        // Viewport boundaries safety clamping
        const minLeft = 16;
        const maxLeft = Math.max(minLeft, windowSize.w - CARD_WIDTH - 16);
        const minTop = 80; // Keep below top navigation header
        const maxTop = Math.max(minTop, windowSize.h - CARD_ESTIMATED_HEIGHT - 20); // Keep above bottom controls

        targetLeft = Math.max(minLeft, Math.min(maxLeft, targetLeft));
        targetTop = Math.max(minTop, Math.min(maxTop, targetTop));
    }

    // Relative coordinates of the rack center dot in the card's local space
    const localDotX = isDynamic ? rackPxX - targetLeft : -gapX;
    const localDotY = isDynamic ? rackPxY - targetTop : (CARD_ESTIMATED_HEIGHT / 2);

    // Dynamic connector line from rack center dot to the card edge
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
            top: `${155 + offsetY}px`,
            right: `${44 - offsetX}px`,
            left: 'auto'
        };

    const renderParamRow = (
        label: string,
        value: string | number,
        unit: string = '',
        badgeType: 'green' | 'yellow' | 'orange' | 'red' | 'blue' = 'green'
    ) => (
        <div className="rack-card-param-row">
            <span className="rack-card-param-label" title={label}>{label}</span>
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
                        percentage={cpuGaugeVal}
                        size={72}
                        strokeWidth={8}
                        color={getStatusColor(getStatus('cpuUtil', cpuGaugeVal))}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Average GPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={gpuGaugeVal}
                        size={72}
                        strokeWidth={8}
                        color={getStatusColor(getStatus('gpuUtil', gpuGaugeVal))}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Rack Power</span>
                    <RegionalAvailabilityGauge
                        percentage={rackPowerGaugePct}
                        size={72}
                        strokeWidth={8}
                        color={getStatusColor(getStatus('avgPowerPerRack', rackPowerVal))}
                        bgColor="rgba(255, 255, 255, 0.12)"
                        customDisplay={
                            <div className="rack-gauge-power-display">
                                <span className="power-num">{rackPowerVal}</span>
                                <span className="power-unit">kW</span>
                            </div>
                        }
                    />
                </div>
                <div className="rack-gauge-item">
                    <span className="rack-gauge-title">Cooling Efficiency</span>
                    <RegionalAvailabilityGauge
                        percentage={coolingEffVal}
                        size={72}
                        strokeWidth={8}
                        color={getStatusColor(getStatus('coolingEff', coolingEffVal))}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>

            {/* 3. Capsule Tabs: Computing [alert badge] | Cooling | Power */}
            <div className="rack-card-tabs-container">
                <ButtonBarWithStatus
                    items={rackTabs}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* 4. Tab Content: 2-Column Parameter Grid */}
            <div className="rack-card-content">
                {activeTabIdx === 0 && (
                    // COMPUTING TAB
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('CPU Utilization', computingData.cpuUtil.toFixed(2), '%', getStatus('cpuUtil', computingData.cpuUtil) as any)}
                            {renderParamRow('GPU Utilization', computingData.gpuUtil.toFixed(2), '%', getStatus('gpuUtil', computingData.gpuUtil) as any)}
                            {renderParamRow('Active GPU Count', `${computingData.activeGpuCount} / 72`, '', 'green')}
                            {renderParamRow('GPU Memory Utilization', computingData.gpuMemoryUtil.toFixed(2), '%', getStatus('gpuMemUtil', computingData.gpuMemoryUtil) as any)}
                            {renderParamRow('Memory Utilization', computingData.memoryUtil.toFixed(2), '%', getStatus('memUtil', computingData.memoryUtil) as any)}
                            {renderParamRow('Disk Utilization', computingData.diskUtil.toFixed(2), '%', getStatus('diskUtil', computingData.diskUtil) as any)}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('Read Throughput', computingData.readThroughput.toFixed(1), 'GB/s', 'green')}
                            {renderParamRow('Write Throughput', computingData.writeThroughput.toFixed(1), 'GB/s', 'green')}
                            {renderParamRow('Network Throughput', computingData.networkThroughput.toFixed(1), 'Gbps', 'green')}
                            {renderParamRow('Running Jobs', computingData.runningJobs, '', 'green')}
                            {renderParamRow('Active Servers', `${computingData.activeServers} / 16`, '', 'green')}
                        </div>
                    </div>
                )}

                {activeTabIdx === 1 && (
                    // COOLING TAB (Unified Single Grid)
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('Coolant Supply Temp', coolingData.coolantSupplyTemp.toFixed(2), '°C', getStatus('avgCoolantInletTemp', coolingData.coolantSupplyTemp) as any)}
                            {renderParamRow('Coolant Return Temp', coolingData.coolantReturnTemp.toFixed(2), '°C', getStatus('avgCoolantOutletTemp', coolingData.coolantReturnTemp) as any)}
                            {renderParamRow('Coolant Flow Rate', coolingData.coolantFlowRate.toFixed(1), 'L/min', getStatus('hallCoolantFlow', coolingData.coolantFlowRate) as any)}
                            {renderParamRow('Coolant Pressure', coolingData.coolantPressure.toFixed(2), 'bar', 'green')}
                            {renderParamRow('Heat Removed', coolingData.heatRemoved, 'kW', 'green')}
                            {renderParamRow('Coolant Leak Status', coolingData.coolantLeakStatus, '', coolingData.coolantLeakStatus === 'No Leak' ? 'green' : 'red')}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('CPU Temperature', coolingData.cpuTemp.toFixed(2), '°C', coolingData.cpuTemp <= 65 ? 'green' : coolingData.cpuTemp <= 75 ? 'yellow' : 'red')}
                            {renderParamRow('GPU Temperature', coolingData.gpu1Temp.toFixed(2), '°C', coolingData.gpu1Temp <= 70 ? 'green' : coolingData.gpu1Temp <= 80 ? 'yellow' : 'red')}
                            {renderParamRow('Cold Aisle Temp', coolingData.coldAisleTemp.toFixed(2), '°C', getStatus('coldAisleTemp', coolingData.coldAisleTemp) as any)}
                            {renderParamRow('Hot Aisle Temp', coolingData.hotAisleTemp.toFixed(2), '°C', getStatus('hotAisleTemp', coolingData.hotAisleTemp) as any)}
                            {renderParamRow('CDU Utilization', coolingData.cduUtilization.toFixed(1), '%', getStatus('liquidCoolingCapacityUtilisation', coolingData.cduUtilization) as any)}
                            {renderParamRow('CDU Status', coolingData.cduStatus, '', coolingData.cduStatus === 'Operational' ? 'green' : 'yellow')}
                        </div>
                    </div>
                )}

                {activeTabIdx === 2 && (
                    // POWER TAB
                    <div className="rack-card-grid">
                        <div className="rack-card-col">
                            {renderParamRow('Voltage', powerData.voltage.toFixed(2), 'V', getStatus('powerPathVoltage', powerData.voltage) as any)}
                            {renderParamRow('Current', powerData.current.toFixed(2), 'A', 'green')}
                            {renderParamRow('Active Power', powerData.activePower, 'kW', getStatus('avgPowerPerRack', powerData.activePower) as any)}
                            {renderParamRow('Rack Capacity', powerData.rackCapacity, 'kW', 'blue')}
                            {renderParamRow('Power Utilization', powerData.powerUtil.toFixed(2), '%', getStatus('facilityLoad', powerData.powerUtil) as any)}
                            {renderParamRow('Daily Consumption', powerData.dailyConsumption.toFixed(2), 'kWh', 'green')}
                        </div>
                        <div className="rack-card-col">
                            {renderParamRow('UPS Status', powerData.upsStatus, '', powerData.upsStatus === 'Normal' ? 'green' : 'red')}
                            {renderParamRow('Battery Health', powerData.batteryHealth.toFixed(1), '%', powerData.batteryHealth >= 95 ? 'green' : 'yellow')}
                            {renderParamRow('PDU Load', powerData.powerUtil.toFixed(2), '%', getStatus('facilityLoad', powerData.powerUtil) as any)}
                            {renderParamRow('Power Factor', powerData.powerFactor.toFixed(2), '', getStatus('powerPathPowerFactor', powerData.powerFactor) as any)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
