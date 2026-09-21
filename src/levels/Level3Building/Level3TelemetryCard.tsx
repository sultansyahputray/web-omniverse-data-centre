import React from 'react';

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    size = 46,
    strokeWidth = 4,
    color = '#00E5FF',
    bgColor = 'rgba(255, 255, 255, 0.08)'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="telemetry-gauge-wrapper" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    stroke={bgColor}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease' }}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <span className="telemetry-gauge-text">{percentage}%</span>
        </div>
    );
};

export const Level3TelemetryCard: React.FC = () => {
    return (
        <aside className="level3-telemetry-sidebar" aria-label="Building Telemetry">
            <div className="level3-telemetry-card">
                {/* 1. Hall Compute Utilization */}
                <div className="level3-telemetry-item">
                    <div className="telemetry-item-label">Compute Load</div>
                    <CircularProgress percentage={78} color="#00E5FF" />
                </div>

                <div className="telemetry-divider" />

                {/* 2. Liquid Cooling Flow */}
                <div className="level3-telemetry-item">
                    <div className="telemetry-item-label">Liquid Cooling</div>
                    <CircularProgress percentage={92} color="#00D2FF" />
                </div>

                <div className="telemetry-divider" />

                {/* 3. Power Distribution */}
                <div className="level3-telemetry-item">
                    <div className="telemetry-item-label">Power Delivery</div>
                    <CircularProgress percentage={65} color="#00FFA3" />
                </div>

                <div className="telemetry-divider" />

                {/* 4. Telemetry Stats */}
                <div className="level3-stats-block">
                    <div className="stat-label">Active Power</div>
                    <div className="stat-value highlight-cyan">4.2 MW</div>
                </div>

                <div className="telemetry-divider" />

                <div className="level3-stats-block">
                    <div className="stat-label">Building PUE</div>
                    <div className="stat-value highlight-green">1.18</div>
                </div>
            </div>
        </aside>
    );
};
