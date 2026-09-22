import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface PowerPathTelemetryData {
    activePower?: string;
    activeRack?: string | number;
    voltage?: string | number;
    powerFactor?: string | number;
    abLoadImbalance?: string | number;
    powerHeadroom?: string | number;
    activeAlarm?: string | number;
    avgPduLoad?: number;
}

interface PowerPathTelemetryCardProps {
    data?: PowerPathTelemetryData;
}

export const PowerPathTelemetryCard: React.FC<PowerPathTelemetryCardProps> = ({
    data
}) => {
    const activePower = data?.activePower ?? '156.6 kW';
    const activeRack = data?.activeRack ?? '126';
    const voltage = data?.voltage ?? '1.25';
    const powerFactor = data?.powerFactor ?? '1.25';
    const abLoadImbalance = data?.abLoadImbalance ?? '1.25';
    const powerHeadroom = data?.powerHeadroom ?? '1.25';
    const activeAlarm = data?.activeAlarm ?? '1.25';
    const avgPduLoad = data?.avgPduLoad ?? 61.6;

    // SVG Donut Gauge Calculations (Radius = 36, C ≈ 226.195)
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const pctClamped = Math.min(Math.max(avgPduLoad, 0), 100);
    const strokeDashoffset = circumference - (pctClamped / 100) * circumference;

    return (
        <aside className="level3-telemetry-sidebar power-path-sidebar" aria-label="Electrical Power Path Telemetry">
            <div className="power-path-card">
                {/* 1. Active Power */}
                <div className="power-path-section">
                    <span className="power-metric-title">Active Power</span>
                    <div className="power-pill-gold">{activePower}</div>
                </div>

                {/* 2. Active Rack */}
                <div className="power-path-section">
                    <span className="power-metric-title">GPU Compute Utilization</span>
                    <div className="power-pill-navy">{activeRack}</div>
                </div>

                {/* 3. Voltage */}
                <div className="power-path-section">
                    <span className="power-metric-title">Voltage</span>
                    <div className="power-pill-green">{voltage}</div>
                </div>

                {/* 4. Power Factor */}
                <div className="power-path-section">
                    <span className="power-metric-title">Power Factor</span>
                    <div className="power-pill-green">{powerFactor}</div>
                </div>

                {/* 5. A/B Load Imbalance */}
                <div className="power-path-section">
                    <span className="power-metric-title">A/B Load Imbalance</span>
                    <div className="power-pill-green">{abLoadImbalance}</div>
                </div>

                {/* 6. Power Headroom */}
                <div className="power-path-section">
                    <span className="power-metric-title">N-1 Path Loading</span>
                    <div className="power-pill-green">{powerHeadroom}</div>
                </div>

                {/* 7. Active Alarm */}
                <div className="power-path-section">
                    <span className="power-metric-title">Active Alarm</span>
                    <div className="power-pill-green">{activeAlarm}</div>
                </div>

                {/* 8. Avg. PDU Load (Donut Gauge) */}
                <div className="power-path-section power-gauge-section">
                    <span className="power-metric-title">Facility Load</span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={avgPduLoad}
                            size={96}
                            strokeWidth={10}
                            color="#ffcc00"
                            bgColor="rgba(255, 255, 255, 0.1)"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};
