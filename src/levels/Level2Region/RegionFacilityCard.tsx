import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor, getBadgeBoxStyle } from '../../thresholdUtils';

interface RegionFacilityCardProps {
    facilityLoad?: number;
    coolingUtilization?: number;
    coolingCapacity?: number; // backwards compatibility alias
    gpuComputeUtilization?: number;
    availability?: number; // backwards compatibility alias
    activePower?: string;
    pue?: string | number;
    activeAlarm?: number;
}

export const RegionFacilityCard: React.FC<RegionFacilityCardProps> = ({
    facilityLoad = 92.6,
    coolingUtilization,
    coolingCapacity = 80.84,
    gpuComputeUtilization,
    availability = 80,
    activePower = '156.6 kW',
    pue = 1.120,
    activeAlarm
}) => {
    // 1. Facility Load (<= 95% Green, 95%-98% Yellow, >= 98% Red)
    const facLoadVal = facilityLoad;
    const facLoadStatus = getStatus('facilityLoad', facLoadVal);
    const facLoadColor = getStatusColor(facLoadStatus);

    // 2. Cooling Utilization (<= 85% Green, 85%-95% Yellow, >= 95% Red)
    const coolVal = coolingUtilization ?? coolingCapacity;
    const coolStatus = getStatus('coolingUtilisation', coolVal);
    const coolColor = getStatusColor(coolStatus);

    // 3. GPU Compute Utilization (< 80% Green, 80%-95% Yellow, > 95% Red)
    const gpuVal = gpuComputeUtilization ?? availability;
    const gpuStatus = getStatus('gpuComputeUtil', gpuVal);
    const gpuColor = getStatusColor(gpuStatus);

    // 4. PUE (<= 1.12 Green, 1.12 - <= 1.15 Yellow, > 1.15 Red)
    const pueVal = pue;
    const pueStatus = getStatus('pue', pueVal);
    const pueBoxStyle = getBadgeBoxStyle(pueStatus);
    const pueFormatted = typeof pueVal === 'number' ? pueVal.toFixed(3) : pueVal;

    // 5. Active Alarm (0 Green, > 0 Red)
    const alarmStatus = activeAlarm !== undefined ? getStatus('activeAlarm', activeAlarm) : 'green';
    const alarmBoxStyle = getBadgeBoxStyle(alarmStatus);

    return (
        <div className="region-facility-card">
            {/* 1. Facility Load Gauge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Facility Load</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={facLoadVal}
                        size={76}
                        strokeWidth={8}
                        color={facLoadColor}
                        bgColor="rgba(255, 255, 255, 0.1)"
                        customDisplay={`${facLoadVal.toFixed(2)}%`}
                    />
                </div>
            </div>

            {/* 2. Cooling Utilization Gauge (replaces Cooling Capacity) */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Cooling Utilization</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={coolVal}
                        size={76}
                        strokeWidth={8}
                        color={coolColor}
                        bgColor="rgba(255, 255, 255, 0.1)"
                        customDisplay={`${coolVal.toFixed(2)}%`}
                    />
                </div>
            </div>

            {/* 3. GPU Compute Utilization Gauge (replaces Availability) */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">GPU Compute Utilization</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={gpuVal}
                        size={76}
                        strokeWidth={8}
                        color={gpuColor}
                        bgColor="rgba(255, 255, 255, 0.1)"
                        customDisplay={`${gpuVal % 1 === 0 ? gpuVal : gpuVal.toFixed(1)}%`}
                    />
                </div>
            </div>

            {/* 4. PUE Colour-coded Badge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">PUE</span>
                <div className="facility-badge-box" style={pueBoxStyle}>
                    {pueFormatted}
                </div>
            </div>

            {/* 5. Active Alarm Colour-coded Badge (if provided) */}
            {activeAlarm !== undefined && (
                <div className="facility-metric-section">
                    <span className="facility-metric-label">Active Alarm</span>
                    <div className="facility-badge-box" style={alarmBoxStyle}>
                        {activeAlarm}
                    </div>
                </div>
            )}
        </div>
    );
};
