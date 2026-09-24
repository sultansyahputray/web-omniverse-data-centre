import React from 'react';
import { SiteMetric, ScreenPosition, RegionKey } from './types';
import { ServerRackIcon, ChevronRightIcon, RegionalAvailabilityGauge } from './Icons';

interface CoordinateCardProps {
    metric: SiteMetric;
    isActive: boolean;
    screenPosition?: ScreenPosition;
    onClick: (key: RegionKey) => void;
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

    const handleHeaderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick(metric.key);
    };

    return (
        <div
            className={`coordinate-card ${isActive ? 'active' : ''} ${isLeftOfDot ? 'anchor-right' : 'anchor-left'}`}
            style={positionStyle}
        >
            {/* 3D Target Connector Line pointing from card towards red dot */}
            {isDynamic && isVisible && (
                <div className={`card-connector-arm ${isLeftOfDot ? 'arm-right' : 'arm-left'}`}>
                    <div className="arm-pulse-dot"></div>
                </div>
            )}

            {/* Clickable Header Tab (Country Name + Chevron >) */}
            <div
                className="region-card-tab"
                onClick={handleHeaderClick}
                title={`Open ${metric.title} Region`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick(metric.key);
                    }
                }}
            >
                <span className="region-tab-title">{metric.title}</span>
                <div className="region-tab-chevron">
                    <ChevronRightIcon size={14} color="#ffffff" />
                </div>
            </div>

            {/* Main Card Body */}
            <div className="region-card-body">
                {/* Left Column: Data Centre label & 2 Metric Inset Boxes */}
                <div className="region-body-left">
                    {/* Row 1: Server Rack Icon + Data Centre */}
                    <div className="dc-header-row">
                        <ServerRackIcon size={18} color="#71F6FF" />
                        <span className="dc-header-text">Data Centre</span>
                    </div>

                    {/* Row 2: Total Site & Capacity Inset Boxes */}
                    <div className="dc-metrics-row">
                        {/* Total Site */}
                        <div className="dc-metric-group">
                            <span className="dc-metric-label">Total Site</span>
                            <div className="dc-metric-box">
                                {metric.sites}
                            </div>
                        </div>

                        {/* Capacity */}
                        <div className="dc-metric-group">
                            <span className="dc-metric-label">Capacity</span>
                            <div className="dc-metric-box dc-capacity-box">
                                {metric.capacityMW} MW
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="region-v-divider"></div>

                {/* Right Column: Availability & Yellow Circular Donut Gauge */}
                <div className="region-body-right">
                    <span className="availability-title">Availability</span>
                    <div className="availability-gauge-container">
                        <RegionalAvailabilityGauge
                            percentage={metric.availabilityPct}
                            size={72}
                            strokeWidth={8}
                            color="#ffcc00"
                            bgColor="rgba(255, 255, 255, 0.1)"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

