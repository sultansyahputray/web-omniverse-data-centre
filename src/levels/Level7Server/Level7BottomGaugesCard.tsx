import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';

interface Level7BottomGaugesCardProps {
    serverNum?: number;
    cpuUtil?: number;
    gpuUtil?: number;
    coolingEff?: number;
    powerKW?: string | number;
    powerLimit?: number;
}

export const Level7BottomGaugesCard: React.FC<Level7BottomGaugesCardProps> = ({
    cpuUtil = 35.10,
    gpuUtil = 36.71,
    coolingEff = 83.65,
    powerKW = '2.00',
    powerLimit = 12.3
}) => {
    const numPowerKW = typeof powerKW === 'number' ? powerKW : (parseFloat(powerKW) || 2.00);
    const powerPct = Math.min(100, Math.max(0, Math.round((numPowerKW / powerLimit) * 100)));

    const cpuColor = getStatusColor(getStatus('trayCpuUtil', cpuUtil));
    const gpuColor = getStatusColor(getStatus('trayGpuUtil', gpuUtil));
    const powerColor = getStatusColor(getStatus('trayTotalPower', numPowerKW));
    const coolingColor = getStatusColor(coolingEff >= 80 ? 'green' : 'yellow');

    return (
        <div className="level7-bottom-gauges-card">
            {/* 1. Average CPU Utilization */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title">
                    Average<br />CPU Utilization
                </div>
                <RegionalAvailabilityGauge
                    percentage={Math.round(cpuUtil)}
                    size={72}
                    strokeWidth={8}
                    color={cpuColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 2. Average GPU Utilization */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title">
                    Average<br />GPU Utilization
                </div>
                <RegionalAvailabilityGauge
                    percentage={Math.round(gpuUtil)}
                    size={72}
                    strokeWidth={8}
                    color={gpuColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 3. Tray Power */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title" style={{ marginTop: '7px', marginBottom: '7px' }}>
                    Tray Power
                </div>
                <RegionalAvailabilityGauge
                    percentage={powerPct}
                    size={72}
                    strokeWidth={8}
                    color={powerColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                    customDisplay={
                        <div className="bottom-gauge-power-display">
                            <span className="power-val">{typeof powerKW === 'number' ? powerKW.toFixed(2) : powerKW}</span>
                            <span className="power-sub">kW</span>
                        </div>
                    }
                />
            </div>

            {/* 4. Cooling Efficiency */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title">
                    Cooling<br />Efficiency
                </div>
                <RegionalAvailabilityGauge
                    percentage={Math.round(coolingEff)}
                    size={72}
                    strokeWidth={8}
                    color={coolingColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
