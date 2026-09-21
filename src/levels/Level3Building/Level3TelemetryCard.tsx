import React from 'react';

interface Level3TelemetryCardProps {
    facilityDemand?: string;
    itCapacity?: string;
    pue?: string;
    computeRacks?: string | number;
    activeGpu?: string | number;
}

export const Level3TelemetryCard: React.FC<Level3TelemetryCardProps> = ({
    facilityDemand = '42.287 MW',
    itCapacity = '41.328 MW',
    pue = '1.12',
    computeRacks = '64',
    activeGpu = '9,216'
}) => {
    return (
        <aside className="level3-telemetry-sidebar" aria-label="Building Telemetry">
            <div className="level3-telemetry-card">
                {/* 1. Facility Demand */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Facility Demand</span>
                    <div className="telemetry-pill-green">{facilityDemand}</div>
                </div>

                {/* 2. IT Capacity */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">IT Capacity</span>
                    <div className="telemetry-pill-green">{itCapacity}</div>
                </div>

                {/* 3. PUE */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">PUE</span>
                    <div className="telemetry-pill-green">{pue}</div>
                </div>

                {/* 4. Compute Racks */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Compute Racks</span>
                    <div className="telemetry-pill-blue">{computeRacks}</div>
                </div>

                {/* 5. Active GPU */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Active GPU</span>
                    <div className="telemetry-pill-blue">{activeGpu}</div>
                </div>
            </div>
        </aside>
    );
};
