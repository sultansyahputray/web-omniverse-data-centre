import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

export interface ComputingMetrics {
    cpuUtilization?: number;
    gpuUtilization?: number;
    memoryUtilization?: number;
    diskUtilization?: number;
    availability?: number;
}

interface Level4ComputingCardProps {
    data?: ComputingMetrics;
}

export const Level4ComputingCard: React.FC<Level4ComputingCardProps> = ({
    data
}) => {
    const cpu = data?.cpuUtilization ?? 54;
    const gpu = data?.gpuUtilization ?? 58;
    const mem = data?.memoryUtilization ?? 99.9;
    const disk = data?.diskUtilization ?? 99.9;
    const avail = data?.availability ?? 99.9;

    return (
        <div className="level4-computing-card" aria-label="Computing Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Computing Summary</span>
            </div>

            <div className="level4-computing-gauges-row">
                {/* 1. Average CPU Utilization */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Average<br />CPU Utilization</span>
                    <RegionalAvailabilityGauge
                        percentage={cpu}
                        size={74}
                        strokeWidth={8}
                        color="#FFCC00"
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
                        color="#FFCC00"
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
                        color="#34C759"
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
                        color="#34C759"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>

                {/* 5. Availability */}
                <div className="computing-gauge-item">
                    <span className="computing-gauge-label">Availability<br />&nbsp;</span>
                    <RegionalAvailabilityGauge
                        percentage={avail}
                        size={74}
                        strokeWidth={8}
                        color="#34C759"
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>
        </div>
    );
};
