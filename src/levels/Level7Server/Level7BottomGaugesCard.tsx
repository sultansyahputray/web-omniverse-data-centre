import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

interface Level7BottomGaugesCardProps {
    serverNum?: number;
    cpuUtil?: number;
    gpuUtil?: number;
    coolingEff?: number;
    powerKW?: string | number;
}

export const Level7BottomGaugesCard: React.FC<Level7BottomGaugesCardProps> = ({
    serverNum = 4,
    cpuUtil = 54,
    gpuUtil = 58,
    coolingEff = 58,
    powerKW = 'XXX'
}) => {
    return (
        <div className="level7-bottom-gauges-card">
            {/* 1. Average CPU Utilization */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title">
                    Average<br />CPU Utilization
                </div>
                <RegionalAvailabilityGauge
                    percentage={cpuUtil}
                    size={72}
                    strokeWidth={8}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 2. Average GPU Utilization */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title">
                    Average<br />GPU Utilization
                </div>
                <RegionalAvailabilityGauge
                    percentage={gpuUtil}
                    size={72}
                    strokeWidth={8}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 3. Tray Power */}
            <div className="bottom-gauge-item">
                <div className="bottom-gauge-title" style={{ marginTop: '7px', marginBottom: '7px' }}>
                    Tray Power
                </div>
                <RegionalAvailabilityGauge
                    percentage={68}
                    size={72}
                    strokeWidth={8}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                    customDisplay={
                        <div className="bottom-gauge-power-display">
                            <span className="power-val">{powerKW}</span>
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
                    percentage={coolingEff}
                    size={72}
                    strokeWidth={8}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
