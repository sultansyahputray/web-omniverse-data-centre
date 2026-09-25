import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';
import level3PowerDetailsData from '../../data/level3PowerDetails.json';

export interface PowerPathTelemetryData {
    facilityLoad?: number;
    gpuComputeUtilisation?: number;
    gpuUtilisation?: number;
    electricalN1PathLoading?: number;
    n1PathLoading?: number;
    activePower?: number;
    voltage?: number;
    powerFactor?: number;
    abLoadImbalance?: number;
    activeAlarm?: number;
}

interface PowerPathTelemetryCardProps {
    data?: PowerPathTelemetryData;
}

export const PowerPathTelemetryCard: React.FC<PowerPathTelemetryCardProps> = ({
    data
}) => {
    const fallback = level3PowerDetailsData.values[0];

    // 1. Facility Load (Gauge) - Green <= 95%, Yellow 95-98%, Red >= 98%
    const facLoadVal = data?.facilityLoad ?? fallback.facilityLoad;
    const facLoadStatus = getStatus('facilityLoad', facLoadVal);
    const facLoadColor = getStatusColor(facLoadStatus);

    // 2. GPU Utilisation (Gauge) - Green <= 80%, Yellow 80-95%, Red > 95%
    const gpuVal = data?.gpuComputeUtilisation ?? data?.gpuUtilisation ?? fallback.gpuComputeUtilisation;
    const gpuStatus = getStatus('gpuComputingUtilisation', gpuVal);
    const gpuColor = getStatusColor(gpuStatus);

    // 3. Electrical N-1 Path Loading (Gauge) - Green <= 90%, Yellow 90-98%, Red > 98%
    const n1Val = data?.electricalN1PathLoading ?? data?.n1PathLoading ?? fallback.electricalN1PathLoading;
    const n1Status = getStatus('electricalN1PathLoading', n1Val);
    const n1Color = getStatusColor(n1Status);

    // 4. Active Power (Label) - Green <= 47.5 MW, Yellow 47.5-49 MW, Red >= 49 MW
    const activePowerVal = data?.activePower ?? fallback.activePower;
    const activePowerStatus = getStatus('powerPathActivePower', activePowerVal);

    // 5. Voltage (Label) - Green 456-504 V, Yellow 432-456 or 504-528 V, Red < 432 or > 528 V
    const voltageVal = data?.voltage ?? fallback.voltage;
    const voltageStatus = getStatus('powerPathVoltage', voltageVal);

    // 6. Power Factor (Label) - Green >= 0.95, Yellow 0.90-0.95, Red < 0.90
    const pfVal = data?.powerFactor ?? fallback.powerFactor;
    const pfStatus = getStatus('powerPathPowerFactor', pfVal);

    // 7. A/B Load Imbalance (Label) - Green <= 5%, Yellow 5-10%, Red > 10%
    const imbalanceVal = data?.abLoadImbalance ?? fallback.abLoadImbalance;
    const imbalanceStatus = getStatus('abLoadImbalance', imbalanceVal);

    // 8. Active Alarm (Label) - Green 0, Red > 0
    const alarmVal = data?.activeAlarm ?? fallback.activeAlarm;
    const alarmStatus = getStatus('activeAlarm', alarmVal);

    return (
        <aside className="level3-telemetry-sidebar power-path-sidebar" aria-label="Electrical Power Path Telemetry">
            <div className="power-path-card">
                {/* 1. Facility Load (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title">Facility Load</span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={facLoadVal}
                            size={72}
                            strokeWidth={7.5}
                            color={facLoadColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${facLoadVal % 1 === 0 ? facLoadVal : facLoadVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 2. GPU Utilisation (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title">GPU Utilisation</span>
                    <div className="power-gauge-wrapper">
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

                {/* 3. Electrical N-1 Path Loading (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title">
                        Electrical N-1<br />Path Loading
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={n1Val}
                            size={72}
                            strokeWidth={7.5}
                            color={n1Color}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${n1Val % 1 === 0 ? n1Val : n1Val.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 4. Active Power (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title">Active Power</span>
                    <div className={`power-pill-${activePowerStatus}`}>
                        {activePowerVal.toFixed(2)} MW
                    </div>
                </div>

                {/* 5. Voltage (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title">Voltage</span>
                    <div className={`power-pill-${voltageStatus}`}>
                        {voltageVal} V
                    </div>
                </div>

                {/* 6. Power Factor (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title">Power Factor</span>
                    <div className={`power-pill-${pfStatus}`}>
                        {pfVal.toFixed(2)}
                    </div>
                </div>

                {/* 7. A/B Load Imbalance (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title">A/B Load Imbalance</span>
                    <div className={`power-pill-${imbalanceStatus}`}>
                        {imbalanceVal}%
                    </div>
                </div>

                {/* 8. Active Alarm (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title">Active Alarm</span>
                    <div className={`power-pill-${alarmStatus}`}>
                        {alarmVal}
                    </div>
                </div>
            </div>
        </aside>
    );
};
