import React from 'react';

// Server rack icon (3 chassis units with indicator lights)
export const ServerRackIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#00d2ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="5" rx="1.5" stroke={color} strokeWidth="1.8" />
        <circle cx="6.5" cy="5.5" r="0.9" fill={color} />
        <line x1="10" y1="5.5" x2="18" y2="5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

        <rect x="3" y="9.5" width="18" height="5" rx="1.5" stroke={color} strokeWidth="1.8" />
        <circle cx="6.5" cy="12" r="0.9" fill={color} />
        <line x1="10" y1="12" x2="18" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

        <rect x="3" y="16" width="18" height="5" rx="1.5" stroke={color} strokeWidth="1.8" />
        <circle cx="6.5" cy="18.5" r="0.9" fill={color} />
        <line x1="10" y1="18.5" x2="18" y2="18.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// Database cylinder icon (3-tier database stack)
export const DatabaseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#00d2ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke={color} strokeWidth="1.8" />
        <path d="M4 5v5c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 15v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

// Circular gauge donut ring
export const DonutGaugeIcon: React.FC<{ percentage?: number; size?: number; color?: string }> = ({
    percentage = 54,
    size = 32,
    color = '#00e5ff'
}) => {
    const strokeWidth = 3.5;
    const radius = 13;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke="rgba(0, 180, 255, 0.2)"
                strokeWidth={strokeWidth}
            />
            <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                    filter: 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.6))'
                }}
            />
        </svg>
    );
};

// Bar chart / Histogram icon (for Portfolio Total header & Row 2 column 4)
export const BarChartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#00d2ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="14" width="4" height="7" rx="1" fill={color} />
        <rect x="10" y="8" width="4" height="13" rx="1" fill={color} />
        <rect x="17" y="3" width="4" height="18" rx="1" fill={color} />
    </svg>
);

// Leaf icon for "100% RENEWABLE READY"
export const LeafIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#00d2ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.5 4.5c-4.5-1-10.5 1-13 6-2 4-1 9 1 10.5 2 1.5 7 2 11-1 4-3 5.5-8.5 4.5-13.5l-3.5-2z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <path
            d="M6.5 19.5C9 17 14 13 18 8"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <path
            d="M12 15l2 2"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

// People / 24/7 Operations icon (3 people with crisp contours)
export const PeopleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#00e5ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Center head & body */}
        <circle cx="12" cy="7" r="3" stroke={color} strokeWidth="1.8" />
        <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        {/* Left head & body */}
        <circle cx="5" cy="9.5" r="2.2" stroke={color} strokeWidth="1.5" />
        <path d="M1 20c0-2.2 1.8-4 4-4 .9 0 1.7.3 2.3.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Right head & body */}
        <circle cx="19" cy="9.5" r="2.2" stroke={color} strokeWidth="1.5" />
        <path d="M23 20c0-2.2-1.8-4-4-4-.9 0-1.7.3-2.3.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// Shield Security icon (Shield with crosshair/emblem)
export const ShieldSecureIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#00e5ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2L4 5.5v5.5c0 5.2 3.4 10 8 11 4.6-1 8-5.8 8-11V5.5L12 2z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
        <line x1="12" y1="7" x2="12" y2="16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8.5" y1="11" x2="15.5" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="11" r="2" stroke={color} strokeWidth="1.4" />
    </svg>
);

// Trend bars icon for "BUILT FOR WHAT'S NEXT" (3 ascending outline pill bars)
export const TrendBarsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#00e5ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" y="13.5" width="4" height="7.5" rx="1.8" stroke={color} strokeWidth="1.8" />
        <rect x="10" y="8.5" width="4" height="12.5" rx="1.8" stroke={color} strokeWidth="1.8" />
        <rect x="16.5" y="3.5" width="4" height="17.5" rx="1.8" stroke={color} strokeWidth="1.8" />
    </svg>
);

// Chevron Right Arrow
export const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#5e829d' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Chevron Left Arrow
export const ChevronLeftIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#5e829d' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Chevron Down Arrow for Dropdowns
export const ChevronDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#5e829d' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Arrow Left for Back to Global
export const ArrowLeftIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = '#00d2ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Sun Icon for Pagi (Morning)
export const SunIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#ffbe3d' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="2" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Sunset Icon for Sore (Afternoon / Sunset)
export const SunsetIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#ff7b42' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 16a5 5 0 00-10 0" stroke={color} strokeWidth="2" />
        <path d="M12 4v4M4 16h16M2 20h20M5.64 8.64l1.41 1.41M18.36 8.64l-1.41 1.41" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Moon Icon for Malam (Night)
export const MoonIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#62d0ff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Regional card circular availability gauge — matches CircularGauge.tsx from reference exactly
export const RegionalAvailabilityGauge: React.FC<{
    percentage?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
}> = ({
    percentage = 54,
    size = 72,
    strokeWidth = 8,
    color = '#ffcc00',          // same yellow as Dashboard reference
    bgColor = 'rgba(255, 255, 255, 0.1)', // same bgColor as CircularGauge.tsx default
}) => {
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const clampedVal = Math.max(0, Math.min(100, percentage));
        const offset = circumference - (clampedVal / 100) * circumference;
        const displayText = percentage % 1 === 0
            ? `${percentage}%`
            : `${percentage.toFixed(1)}%`;

        return (
            // circle-gauge-container — same className as reference for CSS consistency
            <div className="circle-gauge-container" style={{ width: size, height: size }}>
                <svg width={size} height={size}>
                    {/* Background Ring — matches reference: no fill, rgba track */}
                    <circle
                        stroke={bgColor}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    {/* Progress Ring — yellow, rounded linecap */}
                    <circle
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        style={{ transition: 'stroke-dashoffset 0.3s ease-in-out, stroke 0.3s ease-in-out' }}
                    />
                </svg>
                {/* Value text — font size proportional to size * 0.22, same as reference */}
                <span className="circle-gauge-value" style={{ fontSize: size * 0.22 }}>
                    {displayText}
                </span>
            </div>
        );
    };

