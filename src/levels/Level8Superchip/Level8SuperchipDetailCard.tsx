import React, { useState, useMemo } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { MicrochipIcon } from '../../Icons';
import { getStatus } from '../../thresholdUtils';
import level8Data from '../../data/level8Superchip.json';
import './Level8Superchip.css';

interface Level8SuperchipDetailCardProps {
    superchipNum: number;
    serverNum: number;
    rackNum?: number;
    rowLabel?: string;
    scenario?: string;
    timeSlot?: number;
    offsetX?: number;
    offsetY?: number;
    onClose: () => void;
    onViewHistory: () => void;
}

export const Level8SuperchipDetailCard: React.FC<Level8SuperchipDetailCardProps> = ({
    superchipNum,
    serverNum,
    rackNum = 1,
    scenario = 'Low Load',
    timeSlot = 0,
    offsetX = 0,
    offsetY = 0,
    onClose,
    onViewHistory
}) => {
    // Default active tab to Computing (index 0)
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    const formattedServerNum = String(serverNum).padStart(2, '0');

    // Normalize scenario key
    const normalizedScenario = useMemo(() => {
        if (!scenario) return 'Low Load';
        const s = scenario.toLowerCase();
        if (s.includes('high')) return 'High Load';
        if (s.includes('med')) return 'Medium Load';
        return 'Low Load';
    }, [scenario]);

    // Active dataset from level8Superchip.json based on scenario and timeSlot
    const activeDataset = useMemo(() => {
        const d = (level8Data as any)[normalizedScenario] || (level8Data as any)['Low Load'];
        const safeSlot = Math.min(Math.max(timeSlot, 0), 9);
        return {
            summary: d.summary[safeSlot] || d.summary[0],
            computing: d.computing[safeSlot] || d.computing[0],
            power: d.power[safeSlot] || d.power[0],
            cooling: d.cooling[safeSlot] || d.cooling[0]
        };
    }, [normalizedScenario, timeSlot]);

    const { computing, cooling, power } = activeDataset;

    // Computing alert count from metrics exceeding normal threshold
    const computingAlerts = useMemo(() => {
        let count = 0;
        const cpuStat = getStatus('scCpuUtil', computing.cpuUtil);
        if (cpuStat === 'yellow' || cpuStat === 'orange' || cpuStat === 'red') count++;
        const gpu1Stat = getStatus('scGpu1Util', computing.gpu1Util);
        if (gpu1Stat === 'yellow' || gpu1Stat === 'orange' || gpu1Stat === 'red') count++;
        const gpu2Stat = getStatus('scGpu2Util', computing.gpu2Util);
        if (gpu2Stat === 'yellow' || gpu2Stat === 'orange' || gpu2Stat === 'red') count++;
        const hbmStat = getStatus('scHbmUtil', computing.hbmUtil);
        if (hbmStat === 'yellow' || hbmStat === 'orange' || hbmStat === 'red') count++;
        const cpuTempStat = getStatus('scCpuTemp', computing.cpuTemp);
        if (cpuTempStat === 'yellow' || cpuTempStat === 'orange' || cpuTempStat === 'red') count++;
        const avgGpuTempStat = getStatus('scAvgGpuTemp', computing.avgGpuTemp);
        if (avgGpuTempStat === 'yellow' || avgGpuTempStat === 'orange' || avgGpuTempStat === 'red') count++;
        return count;
    }, [computing]);

    // Cooling alert count
    const coolingAlerts = useMemo(() => {
        let count = 0;
        const leakStat = getStatus('scLeakDetection', cooling.leakDetection);
        if (leakStat === 'yellow' || leakStat === 'orange' || leakStat === 'red') count++;
        const flowStat = getStatus('scCoolantFlowRate', cooling.coolantFlowRate);
        if (flowStat === 'yellow' || flowStat === 'orange' || flowStat === 'red') count++;
        const inletStat = getStatus('scCoolantInletTemp', cooling.coolantInletTemp);
        if (inletStat === 'yellow' || inletStat === 'orange' || inletStat === 'red') count++;
        const outletStat = getStatus('scCoolantOutletTemp', cooling.coolantOutletTemp);
        if (outletStat === 'yellow' || outletStat === 'orange' || outletStat === 'red') count++;
        const hbmTempStat = getStatus('scHbmTemp', cooling.hbmTemp);
        if (hbmTempStat === 'yellow' || hbmTempStat === 'orange' || hbmTempStat === 'red') count++;
        return count;
    }, [cooling]);

    // Power alert count
    const powerAlerts = useMemo(() => {
        let count = 0;
        const cpuPwrStat = getStatus('scCpuPower', power.cpuPower);
        if (cpuPwrStat === 'yellow' || cpuPwrStat === 'orange' || cpuPwrStat === 'red') count++;
        const gpu1PwrStat = getStatus('scGpu1Power', power.gpu1Power);
        if (gpu1PwrStat === 'yellow' || gpu1PwrStat === 'orange' || gpu1PwrStat === 'red') count++;
        const gpu2PwrStat = getStatus('scGpu2Power', power.gpu2Power);
        if (gpu2PwrStat === 'yellow' || gpu2PwrStat === 'orange' || gpu2PwrStat === 'red') count++;
        const totalPwrStat = getStatus('scTotalPower', power.superchipTotalPower);
        if (totalPwrStat === 'yellow' || totalPwrStat === 'orange' || totalPwrStat === 'red') count++;
        const throttleStat = getStatus('scPowerThrottling', power.powerThrottling);
        if (throttleStat === 'yellow' || throttleStat === 'orange' || throttleStat === 'red') count++;
        return count;
    }, [power]);

    const superchipTabs: ButtonBarWithStatusItem[] = useMemo(() => [
        {
            label: 'Computing',
            status: computingAlerts > 0 ? [{ label: 'alert', color: '#ef4444', count: computingAlerts }] : undefined
        },
        {
            label: 'Cooling',
            status: coolingAlerts > 0 ? [{ label: 'alert', color: '#ef4444', count: coolingAlerts }] : undefined
        },
        {
            label: 'Power',
            status: powerAlerts > 0 ? [{ label: 'alert', color: '#ef4444', count: powerAlerts }] : undefined
        }
    ], [computingAlerts, coolingAlerts, powerAlerts]);

    const renderParamRow = (
        label: string,
        value: string | number,
        unit: string = '',
        badgeColor: 'green' | 'yellow' | 'orange' | 'red' | 'default' = 'default'
    ) => (
        <div className="server-detail-row">
            <span className="server-detail-label" title={label}>{label}</span>
            <div className="server-detail-val-group">
                <span className={`server-detail-badge badge-${badgeColor}`}>{value}</span>
                {unit ? (
                    <span className="server-detail-unit">{unit}</span>
                ) : (
                    <span className="server-detail-unit empty" />
                )}
            </div>
        </div>
    );

    const cardStyle: React.CSSProperties = {
        top: `${155 + offsetY}px`,
        right: `${44 - offsetX}px`,
    };

    return (
        <div className="level8-server-detail-card" style={cardStyle}>
            {/* Header: Microchip Icon + Title */}
            <div className="server-card-header">
                <div className="server-card-header-left">
                    <MicrochipIcon size={28} color="rgba(113, 246, 255, 1)" />
                    <div className="server-card-title-group">
                        <span className="server-card-title-line1">NVL72 Rack {rackNum} &bull; Tray {formattedServerNum}</span>
                        <span className="server-card-title-line2">Superchip {superchipNum}</span>
                    </div>
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

            {/* Capsule Tabs: Computing [alert] | Cooling | Power */}
            <div className="server-card-tabs-container">
                <ButtonBarWithStatus
                    items={superchipTabs}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* Tab Contents: ONLY the exact parameters from the user's list */}
            <div className="server-card-content">
                {activeTabIdx === 0 && (
                    // COMPUTING TAB (Exact 6 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'CPU Utilisation',
                            computing.cpuUtil.toFixed(2),
                            '%',
                            getStatus('scCpuUtil', computing.cpuUtil)
                        )}
                        {renderParamRow(
                            'GPU 1 Utilisation',
                            computing.gpu1Util.toFixed(3),
                            '%',
                            getStatus('scGpu1Util', computing.gpu1Util)
                        )}
                        {renderParamRow(
                            'GPU 2 Utilisation',
                            computing.gpu2Util.toFixed(3),
                            '%',
                            getStatus('scGpu2Util', computing.gpu2Util)
                        )}
                        {renderParamRow(
                            'HBM Utilisation',
                            computing.hbmUtil.toFixed(2),
                            '%',
                            getStatus('scHbmUtil', computing.hbmUtil)
                        )}
                        {renderParamRow(
                            'CPU Temperature',
                            computing.cpuTemp.toFixed(1),
                            '°C',
                            getStatus('scCpuTemp', computing.cpuTemp)
                        )}
                        {renderParamRow(
                            'Avg. GPU Temperature',
                            computing.avgGpuTemp.toFixed(2),
                            '°C',
                            getStatus('scAvgGpuTemp', computing.avgGpuTemp)
                        )}
                    </div>
                )}

                {activeTabIdx === 1 && (
                    // COOLING TAB (Exact 8 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'CPU Temperature',
                            cooling.cpuTemp.toFixed(1),
                            '°C',
                            getStatus('scCoolingCpuTemp', cooling.cpuTemp)
                        )}
                        {renderParamRow(
                            'GPU 1 Temperature',
                            cooling.gpu1Temp.toFixed(1),
                            '°C',
                            getStatus('scGpu1Temp', cooling.gpu1Temp)
                        )}
                        {renderParamRow(
                            'GPU 2 Temperature',
                            cooling.gpu2Temp.toFixed(1),
                            '°C',
                            getStatus('scGpu2Temp', cooling.gpu2Temp)
                        )}
                        {renderParamRow(
                            'HBM Temperature',
                            cooling.hbmTemp.toFixed(1),
                            '°C',
                            getStatus('scHbmTemp', cooling.hbmTemp)
                        )}
                        {renderParamRow(
                            'Coolant Inlet Temperature',
                            cooling.coolantInletTemp.toFixed(1),
                            '°C',
                            getStatus('scCoolantInletTemp', cooling.coolantInletTemp)
                        )}
                        {renderParamRow(
                            'Coolant Outlet Temperature',
                            cooling.coolantOutletTemp.toFixed(1),
                            '°C',
                            getStatus('scCoolantOutletTemp', cooling.coolantOutletTemp)
                        )}
                        {renderParamRow(
                            'Avg. Coolant Flow Rate',
                            cooling.coolantFlowRate.toFixed(2),
                            'L/min',
                            getStatus('scCoolantFlowRate', cooling.coolantFlowRate)
                        )}
                        {renderParamRow(
                            'Leak Detection',
                            cooling.leakDetection,
                            '',
                            getStatus('scLeakDetection', cooling.leakDetection)
                        )}
                    </div>
                )}

                {activeTabIdx === 2 && (
                    // POWER TAB (Exact 6 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'CPU Power',
                            power.cpuPower.toFixed(3),
                            'kW',
                            getStatus('scCpuPower', power.cpuPower)
                        )}
                        {renderParamRow(
                            'GPU 1 Power',
                            power.gpu1Power.toFixed(3),
                            'kW',
                            getStatus('scGpu1Power', power.gpu1Power)
                        )}
                        {renderParamRow(
                            'GPU 2 Power',
                            power.gpu2Power.toFixed(3),
                            'kW',
                            getStatus('scGpu2Power', power.gpu2Power)
                        )}
                        {renderParamRow(
                            'Superchip Total Power',
                            power.superchipTotalPower.toFixed(3),
                            'kW',
                            getStatus('scTotalPower', power.superchipTotalPower)
                        )}
                        {renderParamRow(
                            'Power Limit / Power Capacity',
                            power.powerLimit.toFixed(1),
                            'kW',
                            'default'
                        )}
                        {renderParamRow(
                            'Power Throttling',
                            power.powerThrottling.toFixed(1),
                            '%',
                            getStatus('scPowerThrottling', power.powerThrottling)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
