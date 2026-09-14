export interface SiteMetric {
    key: 'SG' | 'AUS' | 'JPN';
    title: string;
    subtitle?: string;
    sites: number;
    capacityMW: number;
    availabilityPct: number;
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
}

export interface PortfolioTotals {
    totalSites: number;
    totalCapacityMW: number;
    avgAvailabilityPct: number;
}

export interface BackendStatus {
    layer?: string;
    active_point?: string | null;
    selected_prim?: string | null;
    clickable_points?: string[];
    status?: string;
}
