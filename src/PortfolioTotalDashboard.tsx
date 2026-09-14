import React from 'react';
import { PortfolioTotals } from './types';
import {
    BarChartIcon,
    ChevronRightIcon,
    DonutGaugeIcon,
    LeafIcon,
    PeopleIcon,
    ShieldSecureIcon,
    TrendBarsIcon
} from './Icons';

interface PortfolioTotalDashboardProps {
    totals: PortfolioTotals;
}

export const PortfolioTotalDashboard: React.FC<PortfolioTotalDashboardProps> = ({ totals }) => {
    const formattedCapacity = totals.totalCapacityMW.toLocaleString('en-US');

    return (
        <div className="portfolio-total-dashboard">
            {/* Header: Icon + PORTFOLIO TOTAL > */}
            <div className="portfolio-header">
                <div className="portfolio-header-left">
                    <BarChartIcon size={18} color="#00d2ff" />
                    <span className="portfolio-title-text">PORTFOLIO TOTAL</span>
                    <ChevronRightIcon size={14} color="#00d2ff" />
                </div>
            </div>

            {/* Row 1: 3 Big Metrics (SITES, CAPACITY, AVAILABILITY) */}
            <div className="portfolio-row-1">
                {/* Col 1: Total Sites */}
                <div className="summary-col">
                    <div className="summary-main-val">{totals.totalSites}</div>
                    <div className="summary-label">SITES</div>
                </div>

                <div className="summary-v-divider"></div>

                {/* Col 2: Total Capacity */}
                <div className="summary-col">
                    <div className="summary-main-val">
                        {formattedCapacity} <span className="summary-unit">MW</span>
                    </div>
                    <div className="summary-label">CAPACITY</div>
                </div>

                <div className="summary-v-divider"></div>

                {/* Col 3: Availability with Donut Gauge */}
                <div className="summary-col availability-summary-col">
                    <div className="summary-gauge-wrap">
                        <DonutGaugeIcon percentage={totals.avgAvailabilityPct} size={38} color="#00e5ff" />
                    </div>
                    <div className="summary-avail-text">
                        <div className="summary-main-val">{totals.avgAvailabilityPct.toFixed(1)}%</div>
                        <div className="summary-label">AVAILABILITY</div>
                    </div>
                </div>
            </div>

            {/* Horizontal Divider between Row 1 and Row 2 */}
            <div className="portfolio-h-divider"></div>

            {/* Row 2: 4 Feature Badges exactly as in design */}
            <div className="portfolio-row-2">
                {/* Col 1: 100% RENEWABLE READY */}
                <div className="feature-col">
                    <div className="feature-icon-wrap">
                        <LeafIcon size={26} color="#00e5ff" />
                    </div>
                    <div className="feature-top-val">100%</div>
                    <div className="feature-bot-label">RENEWABLE READY</div>
                </div>

                <div className="feature-v-divider"></div>

                {/* Col 2: 24/7 GLOBAL OPERATIONS */}
                <div className="feature-col">
                    <div className="feature-icon-wrap">
                        <PeopleIcon size={26} color="#00e5ff" />
                    </div>
                    <div className="feature-top-val">24/7</div>
                    <div className="feature-bot-label">GLOBAL OPERATIONS</div>
                </div>

                <div className="feature-v-divider"></div>

                {/* Col 3: SECURE BY DESIGN */}
                <div className="feature-col">
                    <div className="feature-icon-wrap">
                        <ShieldSecureIcon size={26} color="#00e5ff" />
                    </div>
                    <div className="feature-top-val">SECURE</div>
                    <div className="feature-bot-label">BY DESIGN</div>
                </div>

                <div className="feature-v-divider"></div>

                {/* Col 4: BUILT FOR WHAT'S NEXT */}
                <div className="feature-col">
                    <div className="feature-icon-wrap">
                        <TrendBarsIcon size={26} color="#00e5ff" />
                    </div>
                    <div className="feature-top-val cyan-highlight">BUILT FOR</div>
                    <div className="feature-bot-label">WHAT'S NEXT</div>
                </div>
            </div>
        </div>
    );
};
