import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';

export interface ComputingMetrics {
    cpuUtil?: number;
    cpuUtilization?: number;
    gpuUtil?: number;
    gpuUtilization?: number;
    memUtil?: number;
    memoryUtilization?: number;
    diskUtil?: number;
    diskUtilization?: number;
    activeAlarm?: number;
}

interface Level4ComputingCardProps {
    data?: ComputingMetrics;
}

export const Level4ComputingCard: React.FC<Level4ComputingCardProps> = ({
    data
}) => {
    const cpu = data?.cpuUtil ?? data?.cpuUtilization ?? 36.14;
    const gpu = data?.gpuUtil ?? data?.gpuUtilization ?? 43.76;
    const mem = data?.memUtil ?? data?.memoryUtilization ?? 46.33;
    const disk = data?.diskUtil ?? data?.diskUtilization ?? 38.57;
    const activeAlarm = data?.activeAlarm ?? 0;

    const alarmStatus = getStatus('activeAlarm', activeAlarm);
    const cpuColor = getStatusColor(getStatus('cpuUtil', cpu));
    const gpuColor = getStatusColor(getStatus('gpuUtil', gpu));
    const memColor = getStatusColor(getStatus('memUtil', mem));
    const diskColor = getStatusColor(getStatus('diskUtil', disk));

    return (
        <div className="level4-computing-card" aria-label="Computing Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Computing Summary</span>
                {/* <div className="level4-header-alarm">
                    <span className="alarm-title">Active Alarm</span>
                    <div className={`level4-alarm-badge ${alarmStatus}`}>
                        {activeAlarm}
                    </div>
                </div> */}
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            <div className="level4-computing-gauges-row">
                {/* 1. Average CPU Utilization */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Average<br />CPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={cpu}
                        size={74}
                        strokeWidth={8}
                        color={cpuColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>

                {/* 2. Average GPU Utilization */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Average<br />GPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={gpu}
                        size={74}
                        strokeWidth={8}
                        color={gpuColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>

                {/* 3. Average Memory Utilization */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Average Memory<br />Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={mem}
                        size={74}
                        strokeWidth={8}
                        color={memColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>

                {/* 4. Average Disk Utilization */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Average Disk<br />Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={disk}
                        size={74}
                        strokeWidth={8}
                        color={diskColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>
        </div>
    );
};
