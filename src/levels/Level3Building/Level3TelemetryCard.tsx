import React from 'react';

interface Level3TelemetryCardProps {
    gpuUtilisation?: string | number;
    facilityLoad?: string;
    itLoad?: string;
    pue?: string;
    coolingLoad?: string;
    activeAlarm?: string | number;
}

export const Level3TelemetryCard: React.FC<Level3TelemetryCardProps> = ({
    gpuUtilisation = '80%',
    facilityLoad = '46.29 MW',
    itLoad = '41.33 MW',
    pue = '1.120',
    coolingLoad = '41.230 MW',
    activeAlarm = '10'
}) => {
    return (
        <aside className="level3-telemetry-sidebar" aria-label="Building Telemetry">
            <div className="level3-telemetry-card">
                {/* 1. GPU Computing Utilisation */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">
                        GPU Computing<br />Utilisation
                    </span>
                    <div className="telemetry-pill-green">{gpuUtilisation}</div>
                </div>

                {/* 2. Facility Load */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Facility Load</span>
                    <div className="telemetry-pill-green">{facilityLoad}</div>
                </div>

                {/* 3. IT Load */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">IT Load</span>
                    <div className="telemetry-pill-green">{itLoad}</div>
                </div>

                {/* 4. PUE */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">PUE</span>
                    <div className="telemetry-pill-green">{pue}</div>
                </div>

                {/* 5. Cooling Load */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Cooling Load</span>
                    <div className="telemetry-pill-green">{coolingLoad}</div>
                </div>

                {/* 6. Active Alarm */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Active Alarm</span>
                    <div className="telemetry-pill-red">{activeAlarm}</div>
                </div>
            </div>
        </aside>
    );
};
