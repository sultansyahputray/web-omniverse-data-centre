import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';

interface Level3TelemetryCardProps {
    gpuComputingUtilisation?: string | number;
    facilityPower?: string | number;
    itLoad?: string | number;
    pue?: string | number;
    coolingLoad?: string | number;
    activeAlarm?: string | number;
    // Backward compatibility aliases
    gpuUtilisation?: string | number;
    facilityLoad?: string | number;
}

export const Level3TelemetryCard: React.FC<Level3TelemetryCardProps> = ({
    gpuComputingUtilisation,
    facilityPower,
    itLoad,
    pue,
    coolingLoad,
    activeAlarm,
    gpuUtilisation,
    facilityLoad
}) => {
    // 1. GPU Computing Utilisation (<= 80% Green, 80-95% Yellow, > 95% Red)
    const gpuRaw = gpuComputingUtilisation ?? gpuUtilisation ?? 80;
    const gpuVal = typeof gpuRaw === 'number' ? gpuRaw : parseFloat(String(gpuRaw).replace(/[^0-9.-]+/g, '')) || 80;
    const gpuStatus = getStatus('gpuComputingUtilisation', gpuVal);
    const gpuColor = getStatusColor(gpuStatus);

    // 2. Facility Power (<= 47.53 Green, 47.53-49.0 Yellow, >= 49.0 Red)
    const facPowerRaw = facilityPower ?? facilityLoad ?? 46.29;
    const facPowerVal = typeof facPowerRaw === 'number' ? facPowerRaw : parseFloat(String(facPowerRaw).replace(/[^0-9.-]+/g, '')) || 46.29;
    const facPowerStatus = getStatus('facilityPower', facPowerVal);

    // 3. IT Load (<= 41.33 Green, 41.33-45.0 Yellow, > 45.0 Red)
    const itLoadRaw = itLoad ?? 41.33;
    const itLoadVal = typeof itLoadRaw === 'number' ? itLoadRaw : parseFloat(String(itLoadRaw).replace(/[^0-9.-]+/g, '')) || 41.33;
    const itLoadStatus = getStatus('itLoad', itLoadVal);

    // 4. PUE (<= 1.12 Green, 1.12-1.15 Yellow, > 1.15 Red)
    const pueRaw = pue ?? 1.120;
    const pueVal = typeof pueRaw === 'number' ? pueRaw : parseFloat(String(pueRaw).replace(/[^0-9.-]+/g, '')) || 1.120;
    const pueStatus = getStatus('pue', pueVal);

    // 5. Cooling Load (<= 43.35 Green, 43.35-48.45 Yellow, > 48.45 Red)
    const coolingRaw = coolingLoad ?? 41.230;
    const coolingVal = typeof coolingRaw === 'number' ? coolingRaw : parseFloat(String(coolingRaw).replace(/[^0-9.-]+/g, '')) || 41.230;
    const coolingStatus = getStatus('coolingLoad', coolingVal);

    // 6. Active Alarm (0 Green, > 0 Red)
    const alarmRaw = activeAlarm ?? 0;
    const alarmVal = typeof alarmRaw === 'number' ? alarmRaw : parseFloat(String(alarmRaw).replace(/[^0-9.-]+/g, '')) || 0;
    const alarmStatus = getStatus('activeAlarm', alarmVal);

    return (
        <aside className="level3-telemetry-sidebar" aria-label="Building Telemetry">
            <div className="level3-telemetry-card">
                {/* 1. GPU Computing Utilisation (Circular Gauge Chart) */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">
                        GPU Computing<br />Utilisation
                    </span>
                    <div className="telemetry-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={gpuVal}
                            size={72}
                            strokeWidth={7.5}
                            color={gpuColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${gpuVal % 1 === 0 ? gpuVal : gpuVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 2. Facility Power */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Facility Power</span>
                    <div className={`telemetry-pill-${facPowerStatus}`}>
                        {facPowerVal.toFixed(2)} MW
                    </div>
                </div>

                {/* 3. IT Load */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">IT Load</span>
                    <div className={`telemetry-pill-${itLoadStatus}`}>
                        {itLoadVal.toFixed(2)} MW
                    </div>
                </div>

                {/* 4. PUE */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">PUE</span>
                    <div className={`telemetry-pill-${pueStatus}`}>
                        {pueVal.toFixed(3)}
                    </div>
                </div>

                {/* 5. Cooling Load */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Cooling Load</span>
                    <div className={`telemetry-pill-${coolingStatus}`}>
                        {coolingVal.toFixed(3)} MW
                    </div>
                </div>

                {/* 6. Active Alarm */}
                <div className="level3-telemetry-section">
                    <span className="telemetry-metric-title">Active Alarm</span>
                    <div className={`telemetry-pill-${alarmStatus}`}>
                        {alarmVal}
                    </div>
                </div>
            </div>
        </aside>
    );
};
