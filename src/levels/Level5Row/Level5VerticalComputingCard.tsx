import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface Level5ComputingMetrics {
    cpuUtilization?: number;
    gpuUtilization?: number;
    memoryUtilization?: number;
    diskUtilization?: number;
}

interface Level5VerticalComputingCardProps {
    data?: Level5ComputingMetrics;
}

export const Level5VerticalComputingCard: React.FC<Level5VerticalComputingCardProps> = ({
    data
}) => {
    const cpu = data?.cpuUtilization ?? 54;
    const gpu = data?.gpuUtilization ?? 58;
    const mem = data?.memoryUtilization ?? 99.9;
    const disk = data?.diskUtilization ?? 99.9;

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
                    color="#FFCC00"
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
                    color="#FFCC00"
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
                    color="#34C759"
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
                    color="#34C759"
                    bgColor="rgba(255, 255, 255, 0.12)"
                />
            </div>
        </div>
    );
};
