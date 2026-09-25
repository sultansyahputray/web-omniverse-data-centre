import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';
import { CoolingMode } from './CoolingModeToggleBar';
import level3CoolingDetailsData from '../../data/level3CoolingDetails.json';

export { CoolingModeToggleBar } from './CoolingModeToggleBar';
export type { CoolingMode } from './CoolingModeToggleBar';

export interface CoolingTelemetryData {
    coolingEfficiency?: number;
    capacityUtilisation?: number;
    coolantFlow?: number;
    deltaP?: number;
    avgInletTemp?: number;
    avgDeltaT?: number;
    activeAlarm?: number;
}

interface CoolingDetailsTelemetryCardProps {
    data?: CoolingTelemetryData;
    coolingMode?: CoolingMode;
}

export const CoolingDetailsTelemetryCard: React.FC<CoolingDetailsTelemetryCardProps> = ({
    data,
    coolingMode = 'liquid'
}) => {
    const isAir = coolingMode === 'air';
    const fallback = isAir
        ? level3CoolingDetailsData.air.values[0]
        : level3CoolingDetailsData.liquid.values[0];

    // 1. Liquid / Air Cooling Efficiency (Gauge) - Green > 90%, Yellow 80-90%, Red < 80%
    const effVal = data?.coolingEfficiency ?? fallback.coolingEfficiency;
    const effStatus = getStatus('liquidCoolingEfficiency', effVal);
    const effColor = getStatusColor(effStatus);

    // 2. Liquid / Air Cooling Capacity Utilisation (Gauge) - Green < 80%, Yellow 80-90%, Red > 90%
    const capVal = data?.capacityUtilisation ?? fallback.capacityUtilisation;
    const capStatus = getStatus('liquidCoolingCapacityUtilisation', capVal);
    const capColor = getStatusColor(capStatus);

    // 3. Coolant Flow vs Required (Gauge) - Green >= 90%, Yellow 80-<90%, Red < 80%
    const flowVal = data?.coolantFlow ?? fallback.coolantFlow;
    const flowStatus = getStatus('coolantFlowVsRequired', flowVal);
    const flowColor = getStatusColor(flowStatus);

    // 4. ΔP vs Design (Gauge) - Green 90-110%, Yellow 80-<90% or >110-120%, Red < 80% or > 120%
    const deltaPVal = data?.deltaP ?? fallback.deltaP;
    const deltaPStatus = getStatus('deltaPVsDesign', deltaPVal);
    const deltaPColor = getStatusColor(deltaPStatus);

    // 5. Average Coolant Inlet Temp (°C) (Label) - Green <= 45°C, Yellow > 45-47°C, Red > 47°C
    const inletVal = data?.avgInletTemp ?? fallback.avgInletTemp;
    const inletStatus = getStatus('avgCoolantInletTemp', inletVal);

    // 6. Average Coolant ΔT (°C) (Label) - Green 10-15°C, Yellow 5-<10°C or >15-20°C, Red < 5°C or > 20°C
    const deltaTVal = data?.avgDeltaT ?? fallback.avgDeltaT;
    const deltaTStatus = getStatus('avgCoolantDeltaT', deltaTVal);

    // 7. Active Alarm (Label) - Green 0, Red > 0
    const alarmVal = data?.activeAlarm ?? fallback.activeAlarm;
    const alarmStatus = getStatus('coolingActiveAlarm', alarmVal);

    return (
        <aside className="level3-telemetry-sidebar cooling-path-sidebar" aria-label="Cooling Telemetry">
            <div className="power-path-card cooling-card">
                {/* 1. Liquid / Air Cooling Efficiency (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        {isAir ? 'Air Cooling' : 'Liquid Cooling'}<br />Efficiency
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={effVal}
                            size={72}
                            strokeWidth={7.5}
                            color={effColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${effVal % 1 === 0 ? effVal : effVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 2. Liquid / Air Cooling Capacity Utilisation (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        {isAir ? 'Air Cooling Capacity' : 'Liquid Cooling Capacity'}<br />Utilisation
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={capVal}
                            size={72}
                            strokeWidth={7.5}
                            color={capColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${capVal % 1 === 0 ? capVal : capVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 3. Coolant Flow vs Required (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Coolant Flow<br />vs Required
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={flowVal}
                            size={72}
                            strokeWidth={7.5}
                            color={flowColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${flowVal % 1 === 0 ? flowVal : flowVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 4. ΔP vs Design (Gauge) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        &Delta;P vs Design
                    </span>
                    <div className="power-gauge-wrapper">
                        <RegionalAvailabilityGauge
                            percentage={deltaPVal}
                            size={72}
                            strokeWidth={7.5}
                            color={deltaPColor}
                            bgColor="rgba(255, 255, 255, 0.1)"
                            customDisplay={`${deltaPVal % 1 === 0 ? deltaPVal : deltaPVal.toFixed(1)}%`}
                        />
                    </div>
                </div>

                {/* 5. Average Coolant Inlet Temp (°C) (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Average Coolant<br />Inlet Temp
                    </span>
                    <div className={`power-pill-${inletStatus}`}>
                        {inletVal}°C
                    </div>
                </div>

                {/* 6. Average Coolant ΔT (°C) (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Average Coolant &Delta;T
                    </span>
                    <div className={`power-pill-${deltaTStatus}`}>
                        {deltaTVal}°C
                    </div>
                </div>

                {/* 7. Active Alarm (Label) */}
                <div className="power-path-section">
                    <span className="power-metric-title cooling-metric-title">
                        Active Alarm
                    </span>
                    <div className={`power-pill-${alarmStatus}`}>
                        {alarmVal}
                    </div>
                </div>
            </div>
        </aside>
    );
};
