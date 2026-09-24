import React, { useState, useMemo } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { MicrochipIcon } from '../../Icons';
import './Level8Superchip.css';

interface Level8SuperchipDetailCardProps {
    superchipNum: number;
    serverNum: number;
    rackNum?: number;
    rowLabel?: string;
    onClose: () => void;
    onViewHistory: () => void;
}

const SUPERCHIP_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Computing', status: [{ label: 'alert', color: '#ef4444', count: 1 }] },
    { label: 'Cooling' },
    { label: 'Power' }
];

export const Level8SuperchipDetailCard: React.FC<Level8SuperchipDetailCardProps> = ({
    superchipNum,
    serverNum,
    onClose,
    onViewHistory
}) => {
    // Default active tab to Cooling (index 1) exactly as shown in screenshot
    const [activeTabIdx, setActiveTabIdx] = useState(1);

    // Dedicated metrics for Superchip level (customizable in the future for superchip-specific sensors)
    const metrics = useMemo(() => {
        // Matches exact values shown in user screenshot for Cooling:
        // Coolant Inlet: 21.2 °C, Coolant Outlet: 26.8 °C, Vera CPU 1: 56, Vera CPU 2: 58,
        // Vera CPU 3: 43, Vera CPU 4: 41, Rubin GPU 1: 52, Rubin GPU 2: 38
        if (superchipNum === 2 || serverNum === 4 || serverNum === 8) {
            return {
                coolantInlet: '21.2',
                coolantOutlet: '26.8',
                veraCpu1: '56',
                veraCpu2: '58',
                veraCpu3: '43',
                veraCpu4: '41',
                rubinGpu1: '52',
                rubinGpu2: '38',
                rubinGpu3: '50',
                rubinGpu4: '45',
                cpuUtil: '54',
                gpuUtil: '58',
                activeSuperChips: '1 / 1',
                activeCpus: '1 / 1',
                activeGpus: '2 / 2',
                gpuMemUtil: '29%',
                memUtil: '36%',
                diskUtil: '31%',
                readThroughput: '2.8',
                writeThroughput: '1.9',
                nvlink: '890',
                runningJobs: '4',
                dcVoltage: '48.2',
                trayCurrent: '16.6',
                activePower: '1.20',
                powerUtil: '38.3%',
                dailyConsumption: '28.8',
                vrmEff: '95.4%',
                powerFactor: '0.98'
            };
        }

        const delta = (superchipNum * 1.5);
        return {
            coolantInlet: (20.5 + delta * 0.3).toFixed(1),
            coolantOutlet: (25.5 + delta * 0.4).toFixed(1),
            veraCpu1: String(Math.round(52 + delta * 2)),
            veraCpu2: String(Math.round(54 + delta * 2)),
            veraCpu3: String(Math.round(40 + delta)),
            veraCpu4: String(Math.round(39 + delta)),
            rubinGpu1: String(Math.round(48 + delta * 2)),
            rubinGpu2: String(Math.round(36 + delta)),
            rubinGpu3: String(Math.round(46 + delta * 2)),
            rubinGpu4: String(Math.round(42 + delta)),
            cpuUtil: String(Math.round(50 + delta * 3)),
            gpuUtil: String(Math.round(52 + delta * 3)),
            activeSuperChips: '1 / 1',
            activeCpus: '1 / 1',
            activeGpus: '2 / 2',
            gpuMemUtil: `${Math.round(25 + delta * 2)}%`,
            memUtil: `${Math.round(32 + delta * 2)}%`,
            diskUtil: '31%',
            readThroughput: (2.5 + delta * 0.1).toFixed(1),
            writeThroughput: (1.8 + delta * 0.1).toFixed(1),
            nvlink: '890',
            runningJobs: '3',
            dcVoltage: '48.2',
            trayCurrent: (15.5 + delta * 0.5).toFixed(1),
            activePower: (1.1 + delta * 0.1).toFixed(2),
            powerUtil: `${(35 + delta * 2).toFixed(1)}%`,
            dailyConsumption: (26.0 + delta * 2).toFixed(1),
            vrmEff: '95.4%',
            powerFactor: '0.98'
        };
    }, [superchipNum, serverNum]);

    const renderParamRow = (label: string, value: string | number, unit: string = '°C') => (
        <div className="server-detail-row">
            <span className="server-detail-label">{label}</span>
            <div className="server-detail-val-group">
                <span className="server-detail-badge">{value}</span>
                {unit ? (
                    <span className="server-detail-unit">{unit}</span>
                ) : (
                    <span className="server-detail-unit empty" />
                )}
            </div>
        </div>
    );

    return (
        <div className="level7-server-detail-card">
            {/* Header: Microchip Icon + Title matching user image: "Superchip {superchipNum}" */}
            <div className="server-card-header">
                <div className="server-card-header-left">
                    <MicrochipIcon size={28} color="rgba(113, 246, 255, 1)" />
                    <span className="server-card-title-single">Superchip {superchipNum}</span>
                </div>

                <div className="server-card-header-right">
                    <NavigationButton
                        label="View history"
                        onClick={onViewHistory}
                        className="server-card-history-btn"
                    />
                    <CloseButton
                        onClick={onClose}
                        title="Return to Compute Tray"
                        ariaLabel="Close"
                    />
                </div>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* Capsule Tabs: Computing [1] | Cooling | Power */}
            <div className="server-card-tabs-container">
                <ButtonBarWithStatus
                    items={SUPERCHIP_TABS}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* Tab Contents: Single column list matching image */}
            <div className="server-card-content">
                {activeTabIdx === 1 && (
                    // COOLING TAB (Matching user screenshot)
                    <div className="server-card-list">
                        {renderParamRow('Coolant Inlet Temperature', metrics.coolantInlet, '°C')}
                        {renderParamRow('Coolant Outlet Temperature', metrics.coolantOutlet, '°C')}
                        {renderParamRow('Vera CPU 1 Temperature', metrics.veraCpu1, '°C')}
                        {renderParamRow('Vera CPU 2 Temperature', metrics.veraCpu2, '°C')}
                        {renderParamRow('Vera CPU 3 Temperature', metrics.veraCpu3, '°C')}
                        {renderParamRow('Vera CPU 4 Temperature', metrics.veraCpu4, '°C')}
                        {renderParamRow('Rubin GPU 1 Temperature', metrics.rubinGpu1, '°C')}
                        {renderParamRow('Rubin GPU 2 Temperature', metrics.rubinGpu2, '°C')}
                    </div>
                )}

                {activeTabIdx === 0 && (
                    // COMPUTING TAB
                    <div className="server-card-list">
                        {renderParamRow('CPU Utilization', `${metrics.cpuUtil}%`, '')}
                        {renderParamRow('GPU Utilization', `${metrics.gpuUtil}%`, '')}
                        {renderParamRow('Active Super Chips', metrics.activeSuperChips, '')}
                        {renderParamRow('Active Vera CPUs', metrics.activeCpus, '')}
                        {renderParamRow('Active Rubin GPUs', metrics.activeGpus, '')}
                        {renderParamRow('GPU Memory Utilization', metrics.gpuMemUtil, '')}
                        {renderParamRow('Memory Utilization', metrics.memUtil, '')}
                        {renderParamRow('Disk Utilization', metrics.diskUtil, '')}
                        {renderParamRow('Read Throughput', metrics.readThroughput, 'GB/s')}
                        {renderParamRow('Write Throughput', metrics.writeThroughput, 'GB/s')}
                        {renderParamRow('NVLink Throughput', metrics.nvlink, 'GB/s')}
                        {renderParamRow('Running Jobs', metrics.runningJobs, '')}
                    </div>
                )}

                {activeTabIdx === 2 && (
                    // POWER TAB
                    <div className="server-card-list">
                        {renderParamRow('DC Bus Voltage', metrics.dcVoltage, 'V')}
                        {renderParamRow('Tray Current', metrics.trayCurrent, 'A')}
                        {renderParamRow('Active Power', metrics.activePower, 'kW')}
                        {renderParamRow('Power Utilization', metrics.powerUtil, '')}
                        {renderParamRow('Daily Consumption', metrics.dailyConsumption, 'kWh')}
                        {renderParamRow('VRM Efficiency', metrics.vrmEff, '')}
                        {renderParamRow('Power Factor', metrics.powerFactor, '')}
                    </div>
                )}
            </div>
        </div>
    );
};
