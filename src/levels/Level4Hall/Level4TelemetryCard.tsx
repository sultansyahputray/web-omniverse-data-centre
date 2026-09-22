import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface HallTelemetryData {
    activeRacks?: string;
    itPowerDemand?: string;
    coldAisleTemp?: string;
    hotAisleTemp?: string;
    airFlow?: string;
    utilizationPct?: number;
}

interface Level4TelemetryCardProps {
    data?: HallTelemetryData;
}

export const Level4TelemetryCard: React.FC<Level4TelemetryCardProps> = ({
    data
}) => {
    const activeRacks = data?.activeRacks ?? '32 / 32';
    const itPowerDemand = data?.itPowerDemand ?? '10.8 MW';
    const coldAisleTemp = data?.coldAisleTemp ?? '21.2°C';
    const hotAisleTemp = data?.hotAisleTemp ?? '34.8°C';
    const airFlow = data?.airFlow ?? '45.2k CFM';
    const utilizationPct = data?.utilizationPct ?? 88.5;

    return (
        <aside className="level4-telemetry-sidebar" aria-label="Hall Telemetry">
            <div className="level4-telemetry-card">
                {/* 1. Active Racks */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">Active Racks</span>
                    <div className="level4-pill-green">{activeRacks}</div>
                </div>

                {/* 2. IT Power Demand */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">IT Power Demand</span>
                    <div className="level4-pill-gold">{itPowerDemand}</div>
                </div>

                {/* 3. Cold Aisle Temp */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">Cold Aisle Temp</span>
                    <div className="level4-pill-cyan">{coldAisleTemp}</div>
                </div>

                {/* 4. Hot Aisle Temp */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">Hot Aisle Temp</span>
                    <div className="level4-pill-orange">{hotAisleTemp}</div>
                </div>

                {/* 5. Air Flow */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">Air Flow (CFM)</span>
                    <div className="level4-pill-navy">{airFlow}</div>
                </div>

                {/* 6. Rack Capacity Utilization (Gauge) */}
                <div className="level4-telemetry-section">
                    <span className="level4-metric-title">Rack Utilization</span>
                    <div className="level4-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={utilizationPct}
                            size={96}
                            strokeWidth={10}
                            color="#00e5ff"
                            bgColor="rgba(255, 255, 255, 0.1)"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};
