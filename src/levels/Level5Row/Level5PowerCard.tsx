import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface Level5PowerMetrics {
    activePower?: string;
    activeRack?: string | number;
    pue1?: string | number;
    pue2?: string | number;
    avgPduLoad?: number;
}

interface Level5PowerCardProps {
    data?: Level5PowerMetrics;
}

export const Level5PowerCard: React.FC<Level5PowerCardProps> = ({
    data
}) => {
    const activePower = data?.activePower ?? '156.6 kW';
    const activeRack = data?.activeRack ?? '126';
    const pue1 = data?.pue1 ?? '1.25';
    const pue2 = data?.pue2 ?? '1.25';
    const avgPduLoad = data?.avgPduLoad ?? 61.6;

    return (
        <div className="level5-row-card level5-power-card" aria-label="Power & Rack Status">
            {/* Left Metrics Columns */}
            <div className="level5-metrics-dual-col">
                {/* Col 1 */}
                <div className="level5-metric-subcol">
                    <div className="level5-metric-cell">
                        <span className="level5-metric-label">Active Power</span>
                        <div className="summary-pill-gold">{activePower}</div>
                    </div>
                    <div className="level5-metric-cell">
                        <span className="level5-metric-label">PUE</span>
                        <div className="summary-pill-green">{pue1}</div>
                    </div>
                </div>

                {/* Col 2 */}
                <div className="level5-metric-subcol">
                    <div className="level5-metric-cell">
                        <span className="level5-metric-label">Active Rack</span>
                        <div className="summary-pill-navy">{activeRack}</div>
                    </div>
                    <div className="level5-metric-cell">
                        <span className="level5-metric-label">PUE</span>
                        <div className="summary-pill-green">{pue2}</div>
                    </div>
                </div>
            </div>

            {/* Right Donut Gauge */}
            <div className="level5-gauge-section">
                <span className="level5-gauge-label">Avg. PDU Load</span>
                <RegionalAvailabilityGauge
                    percentage={avgPduLoad}
                    size={78}
                    strokeWidth={8.5}
                    color="#FFCC00"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
