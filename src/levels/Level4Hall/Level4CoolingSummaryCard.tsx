import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface CoolingSummaryMetrics {
    coolantInletTemp?: string;
    avgCoolantOutletTemp?: string;
    coolantFlow?: string;
    coolingEff?: number;
}

interface Level4CoolingSummaryCardProps {
    data?: CoolingSummaryMetrics;
}

export const Level4CoolingSummaryCard: React.FC<Level4CoolingSummaryCardProps> = ({
    data
}) => {
    const inletTemp = data?.coolantInletTemp ?? '21.7 \u00B0C';
    const outletTemp = data?.avgCoolantOutletTemp ?? '27.9 \u00B0C';
    const coolantFlow = data?.coolantFlow ?? '156.6 kW';
    const coolingEff = data?.coolingEff ?? 61.6;

    return (
        <div className="level4-summary-card" aria-label="Cooling Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Cooling Summary</span>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            <div className="level4-summary-content">
                {/* Left Column: Metric rows with pills */}
                <div className="level4-summary-metrics-col">
                    <div className="summary-metric-row">
                        <span className="summary-metric-label">Coolant Inlet Temperature</span>
                        <div className="summary-pill-green">{inletTemp}</div>
                    </div>

                    <div className="summary-metric-row">
                        <span className="summary-metric-label">Avg. Coolant Outlet Temperature</span>
                        <div className="summary-pill-green">{outletTemp}</div>
                    </div>

                    <div className="summary-metric-row">
                        <span className="summary-metric-label">Coolant Flow</span>
                        <div className="summary-pill-gold">{coolantFlow}</div>
                    </div>
                </div>

                {/* Right Column: Donut Gauge */}
                <div className="level4-summary-gauge-col">
                    <span className="summary-gauge-label">Cooling Eff.</span>
                    <RegionalAvailabilityGauge
                        percentage={coolingEff}
                        size={84}
                        strokeWidth={9}
                        color="#FFCC00"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>
        </div>
    );
};
