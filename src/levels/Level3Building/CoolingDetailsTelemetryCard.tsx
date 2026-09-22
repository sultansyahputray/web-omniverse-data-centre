import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { CoolingMode } from './CoolingModeToggleBar';

export { CoolingModeToggleBar } from './CoolingModeToggleBar';
export type { CoolingMode } from './CoolingModeToggleBar';

export interface CoolingTelemetryData {
    avgInletTemp?: string;
    avgOutletTemp?: string;
    avgDeltaT?: string;
    avgHeatRemoval?: string;
    activeAlarm?: string;
    coolingEfficiency?: number; // e.g. 92
}

interface CoolingDetailsTelemetryCardProps {
    data?: CoolingTelemetryData;
    coolingMode?: CoolingMode;
}

export const CoolingDetailsTelemetryCard: React.FC<CoolingDetailsTelemetryCardProps> = ({
    data,
    coolingMode = 'liquid'
}) => {
    const avgInletTemp = data?.avgInletTemp ?? '21.7°C';
    const avgOutletTemp = data?.avgOutletTemp ?? '27.9°C';
    const avgDeltaT = data?.avgDeltaT ?? '6.2°C';
    const avgHeatRemoval = data?.avgHeatRemoval ?? '23.9kW';
    const activeAlarm = data?.activeAlarm ?? '23.9kW';
    const coolingEfficiency = data?.coolingEfficiency ?? 92;

    // SVG Donut Gauge Calculations (Radius = 36, C ≈ 226.195)
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const pctClamped = Math.min(Math.max(coolingEfficiency, 0), 100);
    const strokeDashoffset = circumference - (pctClamped / 100) * circumference;

    return (
        <aside className="level3-telemetry-sidebar cooling-path-sidebar" aria-label="Cooling Telemetry">
            <div className="power-path-card cooling-card">
                {/* 1. Avg Coolant Inlet Temperature */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Avg. Coolant Inlet<br />Temperature
                    </span>
                    <div className="power-pill-green">{avgInletTemp}</div>
                </div>

                {/* 2. Avg Coolant Outlet Temperature */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Avg. Coolant &Delta;T
                    </span>
                    <div className="power-pill-green">{avgOutletTemp}</div>
                </div>

                {/* 3. Avg Coolant ΔT (Inlet-Outlet) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Coolant Flow<br />vs Required
                    </span>
                    <div className="power-pill-green">{avgDeltaT}</div>
                </div>

                {/* 4. Avg. Heat Removal/Rack */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        &Delta;P vs Design
                    </span>
                    <div className="power-pill-green">{avgHeatRemoval}</div>
                </div>

                {/* 5. Active Alarm */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">Active Alarm</span>
                    <div className="power-pill-green">{activeAlarm}</div>
                </div>

                {/* 6. Coolant Cooling Efficiency (Donut Gauge) */}
                <div className="power-path-section power-gauge-section">
                    <span className="power-metric-title cooling-metric-title">
                        {coolingMode === 'air' ? 'Air Cooling' : 'Liquid Cooling'}<br />Capacity Utilization
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={coolingEfficiency}
                            size={96}
                            strokeWidth={10}
                            color="#34C759"
                            bgColor="rgba(255, 255, 255, 0.1)"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};
