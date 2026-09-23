import React, { useState, useMemo } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { RegionalAvailabilityGauge } from '../../Icons';
import { DualRackServerIcon } from '../Level5Row/Level5RackComparisonModal';

interface Level7ServerDetailCardProps {
    serverNum: number;
    rackNum: number;
    rowLabel?: string;
    onClose: () => void;
    onViewHistory: () => void;
}

const SERVER_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Computing' },
    { label: 'Cooling' },
    { label: 'Power' }
];

export const Level7ServerDetailCard: React.FC<Level7ServerDetailCardProps> = ({
    serverNum,
    rackNum,
    rowLabel = 'Row 01',
    onClose,
    onViewHistory
}) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    const formattedServerNum = String(serverNum).padStart(2, '0');
    const formattedRackNum = String(rackNum).padStart(2, '0');

    // Dynamic metrics based on server number
    const serverMetrics = useMemo(() => {
        const baseCpu = 45 + ((serverNum * 7) % 40);
        const baseGpu = 55 + ((serverNum * 9) % 38);
        const basePower = (1.8 + ((serverNum * 0.35) % 2.2)).toFixed(2);
        const coldPlateTemp = (42 + ((serverNum * 3) % 18)).toFixed(1);

        return {
            cpuUtil: baseCpu,
            gpuUtil: baseGpu,
            powerKW: basePower,
            coldPlateTemp,
            trayVoltage: '48.2',
            trayCurrent: (parseFloat(basePower) * 20.8).toFixed(1),
            vrmEfficiency: '95.4%',
            inletTemp: '19.4',
            outletTemp: (19.4 + parseFloat(coldPlateTemp) * 0.25).toFixed(1),
            flowRate: '4.2',
            memoryUtil: `${(50 + (serverNum * 5) % 45)}%`,
            pcieBandwidth: '890',
            activeGpuCount: '2 / 2 Blackwell B200',
            nodeStatus: 'Healthy'
        };
    }, [serverNum]);

    const renderParamRow = (
        label: string,
        value: string | number,
        unit: string = '',
        badgeType: 'green' | 'blue' | 'amber' = 'green'
    ) => (
        <div className="server-card-param-row">
            <span className="server-card-param-label">{label}</span>
            <div className="server-card-param-val-group">
                <span className={`server-card-badge badge-${badgeType}`}>
                    {value}
                </span>
                {unit ? (
                    <span className="server-card-param-unit">{unit}</span>
                ) : (
                    <span className="server-card-param-unit empty" />
                )}
            </div>
        </div>
    );

    return (
        <div className="level7-server-detail-card">
            {/* 1. Header */}
            <div className="server-card-header">
                <div className="server-card-header-left">
                    <DualRackServerIcon size={24} color="#00C3D0" />
                    <span className="server-card-title">Compute Tray {formattedServerNum}</span>
                </div>

                <div className="server-card-header-right">
                    <NavigationButton
                        label="View history"
                        onClick={onViewHistory}
                        className="rack-card-history-btn"
                    />
                    <CloseButton
                        onClick={onClose}
                        title="Return to Rack Level"
                        ariaLabel="Close"
                    />
                </div>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* 2. Top Row: 4 Circular Gauges */}
            <div className="server-card-gauges-row">
                <div className="server-gauge-item">
                    <span className="server-gauge-title">Grace CPU Util</span>
                    <RegionalAvailabilityGauge
                        percentage={serverMetrics.cpuUtil}
                        size={68}
                        strokeWidth={7}
                        color="#00E5FF"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="server-gauge-item">
                    <span className="server-gauge-title">B200 GPU Util</span>
                    <RegionalAvailabilityGauge
                        percentage={serverMetrics.gpuUtil}
                        size={68}
                        strokeWidth={7}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
                <div className="server-gauge-item">
                    <span className="server-gauge-title">Tray Power</span>
                    <RegionalAvailabilityGauge
                        percentage={Math.min(95, Math.round((parseFloat(serverMetrics.powerKW) / 4.0) * 100))}
                        size={68}
                        strokeWidth={7}
                        color="#00E5FF"
                        bgColor="rgba(255, 255, 255, 0.12)"
                        customDisplay={
                            <div className="rack-gauge-power-display">
                                <span className="power-num">{serverMetrics.powerKW}</span>
                                <span className="power-unit">kW</span>
                            </div>
                        }
                    />
                </div>
                <div className="server-gauge-item">
                    <span className="server-gauge-title">Cold Plate</span>
                    <RegionalAvailabilityGauge
                        percentage={Math.min(100, Math.round((parseFloat(serverMetrics.coldPlateTemp) / 80) * 100))}
                        size={68}
                        strokeWidth={7}
                        color="#10B981"
                        bgColor="rgba(255, 255, 255, 0.12)"
                        customDisplay={
                            <div className="rack-gauge-power-display">
                                <span className="power-num">{serverMetrics.coldPlateTemp}</span>
                                <span className="power-unit">°C</span>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* 3. Capsule Tabs: Computing | Cooling | Power */}
            <div className="server-card-tabs-container">
                <ButtonBarWithStatus
                    items={SERVER_TABS}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* 4. Tab Content: 2-Column Parameter Grid */}
            <div className="server-card-content">
                {activeTabIdx === 0 && (
                    // COMPUTING TAB
                    <div className="server-card-grid">
                        <div className="server-card-col">
                            {renderParamRow('CPU Utilization', `${serverMetrics.cpuUtil}%`)}
                            {renderParamRow('GPU Utilization', `${serverMetrics.gpuUtil}%`)}
                            {renderParamRow('Active GPUs', serverMetrics.activeGpuCount, '', 'blue')}
                            {renderParamRow('HBM3e Memory', serverMetrics.memoryUtil)}
                        </div>
                        <div className="server-card-col">
                            {renderParamRow('NVLink 5.0 Throughput', serverMetrics.pcieBandwidth, 'GB/s')}
                            {renderParamRow('Chassis Model', 'NVL72 1U Tray', '', 'blue')}
                            {renderParamRow('Parent Rack', `Rack ${formattedRackNum}`)}
                            {renderParamRow('Node Health', serverMetrics.nodeStatus, '', 'green')}
                        </div>
                    </div>
                )}

                {activeTabIdx === 1 && (
                    // COOLING TAB
                    <div className="server-card-grid">
                        <div className="server-card-col">
                            {renderParamRow('Cold Plate Temp', serverMetrics.coldPlateTemp, '°C')}
                            {renderParamRow('Coolant Supply Temp', serverMetrics.inletTemp, '°C')}
                            {renderParamRow('Coolant Return Temp', serverMetrics.outletTemp, '°C')}
                            {renderParamRow('Coolant Flow Rate', serverMetrics.flowRate, 'L/min')}
                        </div>
                        <div className="server-card-col">
                            {renderParamRow('Quick Disconnect', 'Sealed / Normal')}
                            {renderParamRow('Leak Sensor', 'Clear (0.0V)', '', 'green')}
                            {renderParamRow('Manifold Delta-P', '0.45', 'bar')}
                            {renderParamRow('Cooling Loop', 'Closed Direct-to-Chip', '', 'blue')}
                        </div>
                    </div>
                )}

                {activeTabIdx === 2 && (
                    // POWER TAB
                    <div className="server-card-grid">
                        <div className="server-card-col">
                            {renderParamRow('DC Bus Voltage', serverMetrics.trayVoltage, 'V')}
                            {renderParamRow('Tray Current', serverMetrics.trayCurrent, 'A')}
                            {renderParamRow('Active Power', serverMetrics.powerKW, 'kW')}
                            {renderParamRow('VRM Efficiency', serverMetrics.vrmEfficiency, '', 'blue')}
                        </div>
                        <div className="server-card-col">
                            {renderParamRow('Input Source', 'Rack Busbar 48V DC')}
                            {renderParamRow('Power Cap', '4.2', 'kW')}
                            {renderParamRow('Phase Imbalance', '0.4%')}
                            {renderParamRow('Power State', 'P0 (Max Perf)', '', 'green')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
