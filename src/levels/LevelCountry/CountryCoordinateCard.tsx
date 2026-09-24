import React from 'react';
import { SiteMetric, ScreenPosition, RegionKey } from '../../types';
import { ServerRackIcon, ChevronRightIcon, RegionalAvailabilityGauge } from '../../Icons';

interface CountryCoordinateCardProps {
    metric: SiteMetric;
    isActive: boolean;
    screenPosition?: ScreenPosition;
    placement?: 'left' | 'right';
    offsetY?: number;
    offsetX?: number;
    onClick: (key: RegionKey) => void;
}

export const CountryCoordinateCard: React.FC<CountryCoordinateCardProps> = ({
    metric,
    isActive,
    screenPosition,
    placement,
    offsetY = 0,
    offsetX = 0,
    onClick
}) => {
    const isDynamic = screenPosition !== undefined;
    const isVisible = isDynamic ? screenPosition.visible : true;

    // Anchor orientation relative to the 3D globe dot
    let isLeftOfDot = placement !== undefined
        ? placement === 'left'
        : isDynamic
            ? screenPosition.x < 55
            : (metric.position.left !== undefined);

    if (placement === undefined && isDynamic) {
        if (screenPosition.x < 24) {
            isLeftOfDot = false;
        } else if (screenPosition.x > 76) {
            isLeftOfDot = true;
        }
    }

    // Clamp Y position so cards never clip out of viewport
    const rawY = isDynamic ? screenPosition.y + offsetY : 50;
    const targetY = isDynamic ? Math.max(10, Math.min(88, rawY)) : 50;
    const rawX = isDynamic ? screenPosition.x + offsetX : 50;

    const positionStyle: React.CSSProperties = isDynamic
        ? {
            position: 'absolute',
            left: isLeftOfDot
                ? `calc(${rawX}% - 28px)`
                : `calc(${rawX}% + 28px)`,
            top: `${targetY}%`,
            bottom: 'auto',
            right: 'auto',
            transform: isLeftOfDot ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'top 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
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

    const gpuCompute = metric.gpuComputeUtilisation ?? 54;
    const facilityLoad = metric.facilityLoad ?? 54;
    const coolingLoad = metric.coolingLoad ?? 54;
    const capacityMW = metric.capacityMW ?? 50;

    return (
        <div
            className={`coordinate-card country-coordinate-card ${isLeftOfDot ? 'anchor-right' : 'anchor-left'}`}
            style={positionStyle}
        >
            {/* 3D Target Connector Line pointing from card towards country dot */}
            {isDynamic && isVisible && (
                <div
                    className={`card-connector-arm ${isLeftOfDot ? 'arm-right' : 'arm-left'}`}
                    style={offsetY !== 0 ? { top: offsetY > 0 ? '20px' : 'calc(100% - 20px)' } : undefined}
                >
                    <div className="arm-pulse-dot"></div>
                </div>
            )}

            {/* Clickable Header Tab (Country Name + Chevron >) */}
            <div
                className="region-card-tab country-card-tab"
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

            {/* Main Country Card Body */}
            <div className="country-card-body">
                {/* Header Row: Data Centre (left) & Capacity (right) */}
                <div className="country-card-header">
                    <div className="country-dc-title-group">
                        <ServerRackIcon size={22} color="#00d2ff" />
                        <span className="country-dc-title">Data Centre</span>
                    </div>

                    <div className="country-capacity-group">
                        <span className="country-capacity-label">Capacity</span>
                        <div className="country-capacity-badge">
                            <span className="country-capacity-val">{capacityMW}</span>
                            <span className="country-capacity-unit">MW</span>
                        </div>
                    </div>
                </div>

                {/* Gauges Row: 3 Columns (GPU Compute Utilisation, Facility Load, Cooling Load) */}
                <div className="country-gauges-row">
                    {/* Column 1: GPU Compute Utilisation */}
                    <div className="country-gauge-col">
                        <div className="country-gauge-label">
                            <span>GPU Compute</span>
                            <span>Utilisation</span>
                        </div>
                        <div className="country-gauge-chart">
                            <RegionalAvailabilityGauge
                                percentage={gpuCompute}
                                size={66}
                                strokeWidth={7.5}
                                color="#ffcc00"
                                bgColor="rgba(75, 115, 155, 0.45)"
                            />
                        </div>
                    </div>

                    {/* Column 2: Facility Load */}
                    <div className="country-gauge-col">
                        <div className="country-gauge-label single-line">
                            <span>Facility Load</span>
                        </div>
                        <div className="country-gauge-chart">
                            <RegionalAvailabilityGauge
                                percentage={facilityLoad}
                                size={66}
                                strokeWidth={7.5}
                                color="#ffcc00"
                                bgColor="rgba(75, 115, 155, 0.45)"
                            />
                        </div>
                    </div>

                    {/* Column 3: Cooling Load */}
                    <div className="country-gauge-col">
                        <div className="country-gauge-label single-line">
                            <span>Cooling Load</span>
                        </div>
                        <div className="country-gauge-chart">
                            <RegionalAvailabilityGauge
                                percentage={coolingLoad}
                                size={66}
                                strokeWidth={7.5}
                                color="#ffcc00"
                                bgColor="rgba(75, 115, 155, 0.45)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
