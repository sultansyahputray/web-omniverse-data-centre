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
    percentage = 99.9,
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
