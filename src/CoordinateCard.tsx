import React from 'react';
import { SiteMetric, ScreenPosition } from './types';
import { ServerRackIcon, DatabaseIcon, DonutGaugeIcon, ChevronRightIcon } from './Icons';

interface CoordinateCardProps {
    metric: SiteMetric;
    isActive: boolean;
    screenPosition?: ScreenPosition;
    onClick: (key: 'SG' | 'AUS' | 'JPN') => void;
}

export const CoordinateCard: React.FC<CoordinateCardProps> = ({
    metric,
    isActive,
    screenPosition,
    onClick
}) => {
    const isDynamic = screenPosition !== undefined;
    const isVisible = isDynamic ? screenPosition.visible : true;

    // Anchor orientation:
    let isLeftOfDot = isDynamic
        ? screenPosition.x < 55
        : (metric.position.left !== undefined);

    if (isDynamic) {
        if (screenPosition.x < 24) {
            // Too close to left screen edge -> place card to the right of the dot
            isLeftOfDot = false;
        } else if (screenPosition.x > 76) {
            // Too close to right screen edge -> place card to the left of the dot
            isLeftOfDot = true;
        } else if (screenPosition.x < 44 && screenPosition.y > 62) {
            // Avoid overlapping the bottom-left Portfolio Total card
            isLeftOfDot = false;
        }
    }

    // Clamp Y position so cards never clip out of viewport
    const targetY = isDynamic ? Math.max(10, Math.min(88, screenPosition.y)) : 50;

    const positionStyle: React.CSSProperties = isDynamic
        ? {
            position: 'absolute',
            left: isLeftOfDot
                ? `calc(${screenPosition.x}% - 28px)`
                : `calc(${screenPosition.x}% + 28px)`,
            top: `${targetY}%`,
            bottom: 'auto',
            right: 'auto',
            transform: isLeftOfDot ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            visibility: isVisible ? 'visible' : 'hidden'
        }
        : {
            top: metric.position.top,
            bottom: metric.position.bottom,
            left: metric.position.left,
            right: metric.position.right
        };

    return (
        <div
            className={`coordinate-card ${isActive ? 'active' : ''} ${isLeftOfDot ? 'anchor-right' : 'anchor-left'}`}
            style={positionStyle}
            onClick={() => onClick(metric.key)}
        >
            {/* 3D Target Connector Line pointing from card towards red dot */}
            {isDynamic && isVisible && (
                <div className={`card-connector-arm ${isLeftOfDot ? 'arm-right' : 'arm-left'}`}>
                    <div className="arm-pulse-dot"></div>
                </div>
            )}

            {/* Top row: Title and Chevron */}
            <div className="card-header-row">
                <div className="card-title-group">
                    <span className="card-cyan-accent"></span>
                    <span className="card-title-text">{metric.title}</span>
                </div>
                <div className="card-chevron">
                    <ChevronRightIcon size={16} color={isActive ? '#00e5ff' : '#658ca6'} />
                </div>
            </div>

            {/* Horizontal divider */}
            <div className="card-divider"></div>

            {/* 3 Metrics Row */}
            <div className="card-metrics-grid">
                {/* 1. Sites */}
                <div className="metric-col">
                    <div className="metric-icon-wrap">
                        <ServerRackIcon size={24} color="#00d2ff" />
                    </div>
                    <div className="metric-text-group">
                        <span className="metric-value-num">{metric.sites}</span>
                        <span className="metric-label">{metric.sites > 1 ? 'SITES' : 'SITE'}</span>
                    </div>
                </div>

                {/* 2. Capacity */}
                <div className="metric-col">
                    <div className="metric-icon-wrap">
                        <DatabaseIcon size={24} color="#00d2ff" />
                    </div>
                    <div className="metric-text-group">
                        <span className="metric-value-num">{metric.capacityMW} <span className="metric-unit">MW</span></span>
                        <span className="metric-label">CAPACITY</span>
                    </div>
                </div>

                {/* 3. Availability */}
                <div className="metric-col availability-col">
                    <div className="metric-gauge-wrap">
                        <DonutGaugeIcon percentage={metric.availabilityPct} size={28} color="#00e5ff" />
                    </div>
                    <div className="metric-text-group">
                        <span className="metric-value-num">{metric.availabilityPct.toFixed(1)}%</span>
                        <span className="metric-label">AVAILABILITY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
