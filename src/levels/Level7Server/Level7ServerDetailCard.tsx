import React, { useState, useMemo } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { MicrochipIcon } from '../../Icons';
import { getStatus } from '../../thresholdUtils';
import level7Data from '../../data/level7ComputeTray.json';

interface Level7ServerDetailCardProps {
    serverNum: number;
    rackNum: number;
    rowLabel?: string;
    scenario?: string;
    timeSlot?: number;
    offsetX?: number;
    offsetY?: number;
    onClose: () => void;
    onViewHistory: () => void;
}

export const Level7ServerDetailCard: React.FC<Level7ServerDetailCardProps> = ({
    serverNum,
    rackNum,
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

    const activeDataset = useMemo(() => {
        const d = (level7Data as any)[normalizedScenario] || (level7Data as any)['Low Load'];
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
        const cpuStat = getStatus('trayCpuUtil', computing.avgCpuUtil);
        if (cpuStat === 'yellow' || cpuStat === 'orange' || cpuStat === 'red') count++;
        const gpuStat = getStatus('trayGpuUtil', computing.avgGpuUtil);
        if (gpuStat === 'yellow' || gpuStat === 'orange' || gpuStat === 'red') count++;
        const hbmStat = getStatus('trayHbmUtil', computing.avgHbmUtil);
        if (hbmStat === 'yellow' || hbmStat === 'orange' || hbmStat === 'red') count++;
        const cpuTempStat = getStatus('trayCpuTemp', computing.avgCpuTemp);
        if (cpuTempStat === 'yellow' || cpuTempStat === 'orange' || cpuTempStat === 'red') count++;
        const gpuTempStat = getStatus('trayGpuTemp', computing.avgGpuTemp);
        if (gpuTempStat === 'yellow' || gpuTempStat === 'orange' || gpuTempStat === 'red') count++;
        return count;
    }, [computing]);

    // Cooling alert count
    const coolingAlerts = useMemo(() => {
        let count = 0;
        const cpuTempStat = getStatus('trayCoolingCpuTemp', cooling.avgCpuTemp);
        if (cpuTempStat === 'yellow' || cpuTempStat === 'orange' || cpuTempStat === 'red') count++;
        const gpuTempStat = getStatus('trayGpuTemp', cooling.avgGpuTemp);
        if (gpuTempStat === 'yellow' || gpuTempStat === 'orange' || gpuTempStat === 'red') count++;
        const hbmTempStat = getStatus('trayHbmTemp', cooling.avgHbmTemp);
        if (hbmTempStat === 'yellow' || hbmTempStat === 'orange' || hbmTempStat === 'red') count++;
        const inletStat = getStatus('trayCoolantInletTemp', cooling.avgCoolantInletTemp);
        if (inletStat === 'yellow' || inletStat === 'orange' || inletStat === 'red') count++;
        const outletStat = getStatus('trayCoolantOutletTemp', cooling.avgCoolantOutletTemp);
        if (outletStat === 'yellow' || outletStat === 'orange' || outletStat === 'red') count++;
        const flowStat = getStatus('trayCoolantFlowRate', cooling.avgCoolantFlowRate);
        if (flowStat === 'yellow' || flowStat === 'orange' || flowStat === 'red') count++;
        const leakStat = getStatus('trayLeakDetection', cooling.leakDetection);
        if (leakStat === 'yellow' || leakStat === 'orange' || leakStat === 'red') count++;
        return count;
    }, [cooling]);

    // Power alert count
    const powerAlerts = useMemo(() => {
        let count = 0;
        const cpuPwrStat = getStatus('trayCpuPower', power.cpuPower);
        if (cpuPwrStat === 'yellow' || cpuPwrStat === 'orange' || cpuPwrStat === 'red') count++;
        const gpuPwrStat = getStatus('trayGpuPower', power.gpuPower);
        if (gpuPwrStat === 'yellow' || gpuPwrStat === 'orange' || gpuPwrStat === 'red') count++;
        const totalPwrStat = getStatus('trayTotalPower', power.trayTotalPower);
        if (totalPwrStat === 'yellow' || totalPwrStat === 'orange' || totalPwrStat === 'red') count++;
        const throttleStat = getStatus('trayPowerThrottling', power.powerThrottling);
        if (throttleStat === 'yellow' || throttleStat === 'orange' || throttleStat === 'red') count++;
        return count;
    }, [power]);

    const serverTabs: ButtonBarWithStatusItem[] = useMemo(() => [
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
        zIndex: 25,
    };

    return (
        <div className="level7-server-detail-card" style={cardStyle}>
            {/* Header: Microchip Icon + 2-line Title */}
            <div className="server-card-header">
                <div className="server-card-header-left">
                    <MicrochipIcon size={28} color="rgba(113, 246, 255, 1)" />
                    <div className="server-card-title-group">
                        <span className="server-card-title-line1">NVL72 Rack {rackNum}</span>
                        <span className="server-card-title-line2">Compute Tray {formattedServerNum}</span>
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
                        title="Return to Rack Level"
                        ariaLabel="Close"
                    />
                </div>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* Capsule Tabs: Computing [alert] | Cooling [alert] | Power [alert] */}
            <div className="server-card-tabs-container">
                <ButtonBarWithStatus
                    items={serverTabs}
                    selectedIndex={activeTabIdx}
                    onSelect={(idx) => setActiveTabIdx(idx)}
                />
            </div>

            {/* Tab Contents: Strictly ONLY the parameters in the user's spreadsheet */}
            <div className="server-card-content">
                {activeTabIdx === 0 && (
                    // COMPUTING TAB (Strictly 5 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'Avg. CPU Utilisation',
                            computing.avgCpuUtil.toFixed(2),
                            '%',
                            getStatus('trayCpuUtil', computing.avgCpuUtil)
                        )}
                        {renderParamRow(
                            'Avg. GPU Utilisation',
                            computing.avgGpuUtil.toFixed(3),
                            '%',
                            getStatus('trayGpuUtil', computing.avgGpuUtil)
                        )}
                        {renderParamRow(
                            'Avg. HBM Utilisation',
                            computing.avgHbmUtil.toFixed(2),
                            '%',
                            getStatus('trayHbmUtil', computing.avgHbmUtil)
                        )}
                        {renderParamRow(
                            'Avg. CPU Temperature',
                            computing.avgCpuTemp.toFixed(1),
                            '°C',
                            getStatus('trayCpuTemp', computing.avgCpuTemp)
                        )}
                        {renderParamRow(
                            'Avg. GPU Temperature',
                            computing.avgGpuTemp.toFixed(2),
                            '°C',
                            getStatus('trayGpuTemp', computing.avgGpuTemp)
                        )}
                    </div>
                )}

                {activeTabIdx === 1 && (
                    // COOLING TAB (Strictly 7 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'Avg. CPU Temperature',
                            cooling.avgCpuTemp.toFixed(2),
                            '°C',
                            getStatus('trayCoolingCpuTemp', cooling.avgCpuTemp)
                        )}
                        {renderParamRow(
                            'Avg. GPU Temperature',
                            cooling.avgGpuTemp.toFixed(1),
                            '°C',
                            getStatus('trayGpuTemp', cooling.avgGpuTemp)
                        )}
                        {renderParamRow(
                            'Avg. HBM Temperature',
                            cooling.avgHbmTemp.toFixed(2),
                            '°C',
                            getStatus('trayHbmTemp', cooling.avgHbmTemp)
                        )}
                        {renderParamRow(
                            'Avg. Coolant Inlet Temperature',
                            cooling.avgCoolantInletTemp.toFixed(2),
                            '°C',
                            getStatus('trayCoolantInletTemp', cooling.avgCoolantInletTemp)
                        )}
                        {renderParamRow(
                            'Avg. Coolant Outlet Temperature',
                            cooling.avgCoolantOutletTemp.toFixed(2),
                            '°C',
                            getStatus('trayCoolantOutletTemp', cooling.avgCoolantOutletTemp)
                        )}
                        {renderParamRow(
                            'Avg. Coolant Flow Rate',
                            cooling.avgCoolantFlowRate.toFixed(2),
                            'L/min',
                            getStatus('trayCoolantFlowRate', cooling.avgCoolantFlowRate)
                        )}
                        {renderParamRow(
                            'Leak Detection',
                            cooling.leakDetection,
                            '',
                            getStatus('trayLeakDetection', cooling.leakDetection)
                        )}
                    </div>
                )}

                {activeTabIdx === 2 && (
                    // POWER TAB (Strictly 5 parameters)
                    <div className="server-card-list">
                        {renderParamRow(
                            'CPU Power',
                            power.cpuPower.toFixed(3),
                            'kW',
                            getStatus('trayCpuPower', power.cpuPower)
                        )}
                        {renderParamRow(
                            'GPU Power',
                            power.gpuPower.toFixed(3),
                            'kW',
                            getStatus('trayGpuPower', power.gpuPower)
                        )}
                        {renderParamRow(
                            'Tray Total Power',
                            power.trayTotalPower.toFixed(3),
                            'kW',
                            getStatus('trayTotalPower', power.trayTotalPower)
                        )}
                        {renderParamRow(
                            'Power Limit / Power Capacity',
                            power.powerLimit.toFixed(1),
                            'kW',
                            'default'
                        )}
                        {renderParamRow(
                            'Avg. Power Throttling',
                            power.powerThrottling.toFixed(2),
                            '%',
                            getStatus('trayPowerThrottling', power.powerThrottling)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
