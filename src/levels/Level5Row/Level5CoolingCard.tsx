import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface Level5CoolingMetrics {
    coolantInletTemp?: string;
    avgCoolantOutletTemp?: string;
    coolantFlow?: string;
    coolingEff?: number;
}

interface Level5CoolingCardProps {
    data?: Level5CoolingMetrics;
}

export const Level5CoolingCard: React.FC<Level5CoolingCardProps> = ({
    data
}) => {
    const inletTemp = data?.coolantInletTemp ?? '21.7 \u00B0C';
    const outletTemp = data?.avgCoolantOutletTemp ?? '27.9 \u00B0C';
    const coolantFlow = data?.coolantFlow ?? '156.6 kW';
    const coolingEff = data?.coolingEff ?? 61.6;

    return (
        <div className="level5-row-card level5-cooling-card" aria-label="Cooling Status">
            {/* 3 Metric Columns */}
            <div className="level5-metrics-triple-col">
                <div className="level5-metric-cell">
                    <span className="level5-metric-label">Coolant Inlet<br />Temperature</span>
                    <div className="summary-pill-green">{inletTemp}</div>
                </div>

                <div className="level5-metric-cell">
                    <span className="level5-metric-label">Avg. Coolant<br />Outlet Temperat..</span>
                    <div className="summary-pill-green">{outletTemp}</div>
                </div>

                <div className="level5-metric-cell">
                    <span className="level5-metric-label">Coolant Flow<br />&nbsp;</span>
                    <div className="summary-pill-gold">{coolantFlow}</div>
                </div>
            </div>

            {/* Right Donut Gauge */}
            <div className="level5-gauge-section">
                <span className="level5-gauge-label">Cooling Eff.</span>
                <RegionalAvailabilityGauge
                    percentage={coolingEff}
                    size={78}
                    strokeWidth={8.5}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
