import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface PowerSummaryMetrics {
    activePower?: string;
    activeRack?: string | number;
    pue?: string | number;
    avgPduLoad?: number;
}

interface Level4PowerSummaryCardProps {
    data?: PowerSummaryMetrics;
}

export const Level4PowerSummaryCard: React.FC<Level4PowerSummaryCardProps> = ({
    data
}) => {
    const activePower = data?.activePower ?? '156.6 kW';
    const activeRack = data?.activeRack ?? '126';
    const pue = data?.pue ?? '1.25';
    const avgPduLoad = data?.avgPduLoad ?? 61.6;

    return (
        <div className="level4-summary-card" aria-label="Power Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Power Summary</span>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            <div className="level4-summary-content">
                {/* Left Column: Metric rows with pills */}
                <div className="level4-summary-metrics-col">
                    <div className="summary-metric-row">
                        <span className="summary-metric-label">Active Power</span>
                        <div className="summary-pill-gold">{activePower}</div>
                    </div>

                    <div className="summary-metric-row">
                        <span className="summary-metric-label">Active Rack</span>
                        <div className="summary-pill-navy">{activeRack}</div>
                    </div>

                    <div className="summary-metric-row">
                        <span className="summary-metric-label">PUE</span>
                        <div className="summary-pill-green">{pue}</div>
                    </div>
                </div>

                {/* Right Column: Donut Gauge */}
                <div className="level4-summary-gauge-col">
                    <span className="summary-gauge-label">Avg. PDU Load</span>
                    <RegionalAvailabilityGauge
                        percentage={avgPduLoad}
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
