import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { getStatus, getStatusColor } from '../../thresholdUtils';

export interface Level5ComputingMetrics {
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

interface Level5VerticalComputingCardProps {
    data?: Level5ComputingMetrics;
}

export const Level5VerticalComputingCard: React.FC<Level5VerticalComputingCardProps> = ({
    data
}) => {
    const cpu = data?.cpuUtil ?? data?.cpuUtilization ?? 36.14;
    const gpu = data?.gpuUtil ?? data?.gpuUtilization ?? 43.76;
    const mem = data?.memUtil ?? data?.memoryUtilization ?? 46.33;
    const disk = data?.diskUtil ?? data?.diskUtilization ?? 38.57;

    const cpuColor = getStatusColor(getStatus('cpuUtil', cpu));
    const gpuColor = getStatusColor(getStatus('gpuUtil', gpu));
    const memColor = getStatusColor(getStatus('memUtil', mem));
    const diskColor = getStatusColor(getStatus('diskUtil', disk));

    return (
        <div className="level5-vertical-computing-card" aria-label="Computing Utilization">
            {/* 1. Average CPU Utilization */}
            <div className="vertical-computing-item">
                <span className="vertical-computing-label">
                    Average<br />CPU Utilization
                </span>
                <RegionalAvailabilityGauge
                    percentage={cpu}
                    size={72}
                    strokeWidth={8}
                    color={cpuColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 2. Average GPU Utilization */}
            <div className="vertical-computing-item">
                <span className="vertical-computing-label">
                    Average<br />GPU Utilization
                </span>
                <RegionalAvailabilityGauge
                    percentage={gpu}
                    size={72}
                    strokeWidth={8}
                    color={gpuColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 3. Average Memory Utilization */}
            <div className="vertical-computing-item">
                <span className="vertical-computing-label">
                    Average Memory<br />Utilization
                </span>
                <RegionalAvailabilityGauge
                    percentage={mem}
                    size={72}
                    strokeWidth={8}
                    color={memColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>

            {/* 4. Average Disk Utilization */}
            <div className="vertical-computing-item">
                <span className="vertical-computing-label">
                    Average Disk<br />Utilization
                </span>
                <RegionalAvailabilityGauge
                    percentage={disk}
                    size={72}
                    strokeWidth={8}
                    color={diskColor}
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
