import React, { useMemo } from 'react';
import { CloseButton } from '../../reusable/Button';
import { MicrochipIcon, ChevronRightIcon } from '../../Icons';
import { getStatus, ThresholdStatus } from '../../thresholdUtils';
import level7ComputeTrayData from '../../data/level7ComputeTray.json';
import level8SuperchipData from '../../data/level8Superchip.json';
import './Level7Server.css';

interface Level7ColdPlateHeatmapCardProps {
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

export const Level7ColdPlateHeatmapCard: React.FC<Level7ColdPlateHeatmapCardProps> = ({
    serverNum,
    rackNum,
    scenario = 'Low Load',
    timeSlot = 0,
    offsetX = 0,
    offsetY = 0,
    onClose,
    onViewHistory
}) => {
    // Normalize scenario key
    const normalizedScenario = useMemo<'Low Load' | 'Medium Load' | 'High Load'>(() => {
        if (!scenario) return 'Low Load';
        const s = scenario.toLowerCase();
        if (s.includes('high')) return 'High Load';
        if (s.includes('med')) return 'Medium Load';
        return 'Low Load';
    }, [scenario]);

    // Retrieve active dataset from data files
    const activeDataset = useMemo(() => {
        const safeSlot = Math.min(Math.max(timeSlot, 0), 9);

        const d7 = (level7ComputeTrayData as any)[normalizedScenario] || (level7ComputeTrayData as any)['Low Load'];
        const d8 = (level8SuperchipData as any)[normalizedScenario] || (level8SuperchipData as any)['Low Load'];

        return {
            summary7: d7.summary?.[safeSlot] || d7.summary?.[0],
            computing7: d7.computing?.[safeSlot] || d7.computing?.[0],
            power7: d7.power?.[safeSlot] || d7.power?.[0],
            cooling7: d7.cooling?.[safeSlot] || d7.cooling?.[0],
            computing8: d8.computing?.[safeSlot] || d8.computing?.[0],
            power8: d8.power?.[safeSlot] || d8.power?.[0],
            cooling8: d8.cooling?.[safeSlot] || d8.cooling?.[0],
        };
    }, [normalizedScenario, timeSlot]);

    const { cooling7, power7, power8, cooling8 } = activeDataset;

    // Build the 16 parameters dynamically matching Image 2
    const parameters = useMemo(() => {
        const isHigh = normalizedScenario === 'High Load';
        const isMed = normalizedScenario === 'Medium Load';

        // 1. CPU Temperature (°C)
        const cpuTemp = isHigh
            ? Number((68.4 + ((timeSlot % 4) * 0.2)).toFixed(1))
            : isMed
                ? Number((cooling7?.avgCpuTemp ?? 62.5).toFixed(1))
                : Number((cooling7?.avgCpuTemp ?? 60.8).toFixed(1));
        const cpuTempStat = isHigh ? 'red' : getStatus('trayCpuTemp', cpuTemp);

        // 2. GPU 1 Temperature (°C)
        const gpu1Temp = isHigh
            ? Number((68.4 + ((timeSlot % 3) * 0.3)).toFixed(1))
            : isMed
                ? Number((cooling8?.gpu1Temp ?? 66.8).toFixed(1))
                : Number((cooling8?.gpu1Temp ?? 65.2).toFixed(1));
        const gpu1TempStat = isHigh ? 'red' : getStatus('scGpu1Temp', gpu1Temp);

        // 3. GPU 2 Temperature (°C)
        const gpu2Temp = isHigh
            ? Number((68.4 + ((timeSlot % 3) * 0.3)).toFixed(1))
            : isMed
                ? Number((cooling8?.gpu2Temp ?? 67.4).toFixed(1))
                : Number((cooling8?.gpu2Temp ?? 66.2).toFixed(1));
        const gpu2TempStat = isHigh ? 'red' : getStatus('scGpu2Temp', gpu2Temp);

        // 4. HBM Temperature (°C)
        const hbmTemp = isHigh
            ? Number((68.4 + ((timeSlot % 4) * 0.1)).toFixed(1))
            : isMed
                ? Number((cooling7?.avgHbmTemp ?? 68.2).toFixed(1))
                : Number((cooling7?.avgHbmTemp ?? 66.18).toFixed(1));
        const hbmTempStat = isHigh ? 'red' : getStatus('trayHbmTemp', hbmTemp);

        // 5. CPU Power (kW)
        const cpuPwr = isHigh
            ? Number((0.68 + ((timeSlot % 3) * 0.02)).toFixed(2))
            : isMed
                ? Number((power7?.cpuPower ?? 0.45).toFixed(2))
                : Number((power7?.cpuPower ?? 0.30).toFixed(2));
        const cpuPwrStat = isHigh ? 'red' : getStatus('trayCpuPower', cpuPwr);

        // 6. GPU 1 Power (kW)
        const gpu1Pwr = isHigh
            ? Number((1.25 + ((timeSlot % 3) * 0.04)).toFixed(2))
            : isMed
                ? Number((power8?.gpu1Power ?? 0.82).toFixed(2))
                : Number((power8?.gpu1Power ?? 0.42).toFixed(2));
        const gpu1PwrStat = isHigh ? 'red' : getStatus('scGpu1Power', gpu1Pwr);

        // 7. GPU 2 Power (kW)
        const gpu2Pwr = isHigh
            ? Number((1.28 + ((timeSlot % 3) * 0.04)).toFixed(2))
            : isMed
                ? Number((power8?.gpu2Power ?? 0.85).toFixed(2))
                : Number((power8?.gpu2Power ?? 0.43).toFixed(2));
        const gpu2PwrStat = isHigh ? 'red' : getStatus('scGpu2Power', gpu2Pwr);

        // 8. Total Heat Output (kW)
        const totalHeat = isHigh
            ? Number((34.8 + ((timeSlot % 5) * 0.4)).toFixed(1))
            : isMed
                ? Number((26.8 + ((timeSlot % 4) * 0.3)).toFixed(1))
                : Number((19.5 + ((timeSlot % 3) * 0.3)).toFixed(1));
        const totalHeatStat = getStatus('totalHeatOutput', totalHeat);

        // 9. Cold Plate Temperature (°C)
        const cpTemp = isHigh
            ? Math.round(76 + ((timeSlot % 3) * 1.5))
            : isMed
                ? Math.round(66 + ((timeSlot % 3) * 1.0))
                : Math.round(56 + ((timeSlot % 2) * 0.5));
        const cpTempStat = getStatus('coldPlateTemp', cpTemp);

        // 10. Cold Plate Inlet Temperature (°C)
        const cpInlet = isHigh
            ? Number((48.5 + ((timeSlot % 3) * 0.4)).toFixed(1))
            : isMed
                ? Number((42.0 + ((timeSlot % 3) * 0.3)).toFixed(1))
                : Number((34.7 + ((timeSlot % 2) * 0.2)).toFixed(1));
        const cpInletStat = getStatus('coldPlateInletTemp', cpInlet);

        // 11. Cold Plate Outlet Temperature (°C)
        const cpOutlet = isHigh
            ? Math.round(68 + ((timeSlot % 3) * 1.2))
            : isMed
                ? Math.round(54 + ((timeSlot % 3) * 0.8))
                : Math.round(43 + ((timeSlot % 2) * 0.5));
        const cpOutletStat = getStatus('coldPlateOutletTemp', cpOutlet);

        // 12. Coolant ΔT (°C)
        const deltaT = isHigh
            ? Math.round(42 + ((timeSlot % 3) * 1.0))
            : isMed
                ? Math.round(34 + ((timeSlot % 3) * 0.8))
                : Math.round(38 + ((timeSlot % 2) * 0.5));
        const deltaTStat = getStatus('coolantDeltaT', deltaT);

        // 13. Flow Rate (L/min)
        const flowRate = isHigh
            ? Math.round(52 + ((timeSlot % 4) * 0.8))
            : isMed
                ? Math.round(46 + ((timeSlot % 3) * 0.6))
                : Math.round(41 + ((timeSlot % 2) * 0.5));
        const flowRateStat = getStatus('coldPlateFlowRate', flowRate);

        // 14. Delta Pressure (bar)
        const deltaPressure = isHigh
            ? Math.round(62 + ((timeSlot % 3) * 1.2))
            : isMed
                ? Math.round(56 + ((timeSlot % 3) * 0.8))
                : Math.round(52 + ((timeSlot % 2) * 0.5));
        const deltaPressureStat = getStatus('deltaPressure', deltaPressure);

        // 15. Valve % (%)
        const valvePct = isHigh
            ? Math.round(85 + ((timeSlot % 3) * 1.5))
            : isMed
                ? Math.round(58 + ((timeSlot % 3) * 1.2))
                : Math.round(38 + ((timeSlot % 2) * 1.0));
        const valvePctStat = getStatus('valvePct', valvePct);

        // 16. Leak Status
        const leakStatus = cooling7?.leakDetection || 'No Leak';
        const leakStat = getStatus('scLeakDetection', leakStatus);

        return [
            { label: 'CPU Temperature', value: cpuTemp, unit: '°C', status: cpuTempStat },
            { label: 'GPU 1 Temperature', value: gpu1Temp, unit: '°C', status: gpu1TempStat },
            { label: 'GPU 2 Temperature', value: gpu2Temp, unit: '°C', status: gpu2TempStat },
            { label: 'HBM Temperature', value: hbmTemp, unit: '°C', status: hbmTempStat },
            { label: 'CPU Power', value: cpuPwr, unit: 'kW', status: cpuPwrStat },
            { label: 'GPU 1 Power', value: gpu1Pwr, unit: 'kW', status: gpu1PwrStat },
            { label: 'GPU 2 Power', value: gpu2Pwr, unit: 'kW', status: gpu2PwrStat },
            { label: 'Total Heat Output', value: totalHeat, unit: 'kW', status: totalHeatStat },
            { label: 'Cold Plate Temperature', value: cpTemp, unit: '°C', status: cpTempStat },
            { label: 'Cold Plate Inlet Temperature', value: cpInlet, unit: '°C', status: cpInletStat },
            { label: 'Cold Plate Outlet Temperature', value: cpOutlet, unit: '°C', status: cpOutletStat },
            { label: 'Coolant ΔT', value: deltaT, unit: '°C', status: deltaTStat },
            { label: 'Flow Rate', value: flowRate, unit: '°L/min', status: flowRateStat },
            { label: 'Delta Pressure', value: deltaPressure, unit: 'bar', status: deltaPressureStat },
            { label: 'Valve %', value: valvePct, unit: '%', status: valvePctStat },
            { label: 'Leak Status', value: leakStatus, unit: '', status: leakStat },
        ];
    }, [normalizedScenario, timeSlot, cooling7, power7, power8, cooling8]);

    // Dynamic alert count
    const alertCount = useMemo(() => {
        let count = 0;
        for (const p of parameters) {
            if (p.status === 'red' || p.status === 'orange' || p.status === 'yellow') {
                count++;
            }
        }
        return count;
    }, [parameters]);

    const cardStyle: React.CSSProperties = {
        top: `${155 + offsetY}px`,
        right: `${44 - offsetX}px`,
    };

    return (
        <div className="level7-server-detail-card level7-cold-plate-card" style={cardStyle}>
            {/* Header: Microchip Icon + Title "Cold Plate" + Alert Badge + View History + Close */}
            <div className="server-card-header">
                <div className="server-card-header-left">
                    <MicrochipIcon size={26} color="rgba(113, 246, 255, 1)" />
                    <h2 className="cold-plate-card-title">Cold Plate</h2>
                    <span className="cold-plate-badge-counter">{alertCount}</span>
                </div>

                <div className="server-card-header-right">
                    <button
                        className="level7-history-btn server-card-history-btn"
                        onClick={onViewHistory}
                        title="View Historical Cold Plate Data"
                    >
                        <span>View history</span>
                        <ChevronRightIcon size={12} color="#00C3D0" />
                    </button>
                    <CloseButton size={14} color="#94a3b8" onClick={onClose} />
                </div>
            </div>

            {/* List of 16 Parameters */}
            <div className="server-card-content cold-plate-card-scroll">
                <div className="server-card-list">
                    {parameters.map((param, idx) => (
                        <div key={idx} className="server-detail-row">
                            <span className="server-detail-label" title={param.label}>
                                {param.label}
                            </span>
                            <div className="server-detail-val-group">
                                <span className={`server-detail-badge badge-${param.status}`}>
                                    {param.value}
                                </span>
                                {param.unit ? (
                                    <span className="server-detail-unit">{param.unit}</span>
                                ) : (
                                    <span className="server-detail-unit empty" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
