import React from 'react';
import { SiteMetric } from '../../types';
import { ServerRackIcon, DatabaseIcon, DonutGaugeIcon } from '../../Icons';

interface RegionStatsOverlayProps {
    regionMetric?: SiteMetric;
}

export const RegionStatsOverlay: React.FC<RegionStatsOverlayProps> = ({ regionMetric }) => {
    if (!regionMetric) return null;

    return (
        <div className="region-stats-pill-container">
            {/* 1. Sites */}
            <div className="region-stat-col">
                <div className="stat-icon-wrap">
                    <ServerRackIcon size={22} color="#00d2ff" />
                </div>
                <div className="stat-info">
                    <span className="stat-value">{regionMetric.sites}</span>
                    <span className="stat-label">{regionMetric.sites > 1 ? 'SITES' : 'SITE'}</span>
                </div>
            </div>

            <div className="stat-separator" />

            {/* 2. Capacity */}
            <div className="region-stat-col">
                <div className="stat-icon-wrap">
                    <DatabaseIcon size={22} color="#00d2ff" />
                </div>
                <div className="stat-info">
                    <span className="stat-value">
                        {regionMetric.capacityMW} <span className="stat-unit">MW</span>
                    </span>
                    <span className="stat-label">CAPACITY</span>
                </div>
            </div>

            <div className="stat-separator" />

            {/* 3. Availability */}
            <div className="region-stat-col">
                <div className="stat-icon-wrap">
                    <DonutGaugeIcon percentage={regionMetric.availabilityPct} size={26} color="#00e5ff" />
                </div>
                <div className="stat-info">
                    <span className="stat-value">{regionMetric.availabilityPct.toFixed(1)}%</span>
                    <span className="stat-label">AVAILABILITY</span>
                </div>
            </div>
        </div>
    );
};
