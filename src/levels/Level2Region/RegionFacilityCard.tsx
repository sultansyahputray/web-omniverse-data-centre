import React from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';

interface RegionFacilityCardProps {
    facilityLoad?: number;
    coolingCapacity?: number;
    availability?: number;
    activePower?: string;
    pue?: string;
}

export const RegionFacilityCard: React.FC<RegionFacilityCardProps> = ({
    facilityLoad = 54,
    coolingCapacity = 58,
    availability = 99.9,
    activePower = '156.6 kW',
    pue = '1.30'
}) => {
    return (
        <div className="region-facility-card">
            {/* 1. Facility Load Gauge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Facility Load</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={facilityLoad}
                        size={76}
                        strokeWidth={8}
                        color="#ffcc00"
                        bgColor="rgba(255, 255, 255, 0.1)"
                    />
                </div>
            </div>

            {/* 2. Cooling Capacity Gauge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Cooling Capacity</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={coolingCapacity}
                        size={76}
                        strokeWidth={8}
                        color="#ffcc00"
                        bgColor="rgba(255, 255, 255, 0.1)"
                    />
                </div>
            </div>

            {/* 3. Availability Gauge (Green) */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Availability</span>
                <div className="facility-gauge-wrapper">
                    <RegionalAvailabilityGauge
                        percentage={availability}
                        size={76}
                        strokeWidth={8}
                        color="#00e575"
                        bgColor="rgba(255, 255, 255, 0.1)"
                    />
                </div>
            </div>

            {/* 4. Active Power Badge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">Active Power</span>
                <div className="facility-badge-box">
                    {activePower}
                </div>
            </div>

            {/* 5. PUE Badge */}
            <div className="facility-metric-section">
                <span className="facility-metric-label">PUE</span>
                <div className="facility-badge-box">
                    {pue}
                </div>
            </div>
        </div>
    );
};
