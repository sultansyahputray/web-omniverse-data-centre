import React from 'react';
import { SiteMetric } from './types';
import { ServerRackIcon, DatabaseIcon, DonutGaugeIcon, ChevronRightIcon } from './Icons';

interface CoordinateCardProps {
    metric: SiteMetric;
    isActive: boolean;
    onClick: (key: 'SG' | 'AUS' | 'JPN') => void;
}

export const CoordinateCard: React.FC<CoordinateCardProps> = ({ metric, isActive, onClick }) => {
    return (
        <div
            className={`coordinate-card ${isActive ? 'active' : ''}`}
            style={{
                top: metric.position.top,
                bottom: metric.position.bottom,
                left: metric.position.left,
                right: metric.position.right,
            }}
            onClick={() => onClick(metric.key)}
        >
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
