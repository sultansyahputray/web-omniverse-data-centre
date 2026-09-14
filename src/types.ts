export type AppLevel = 'earth' | 'region';
export type TimeOfDay = 'pagi' | 'sore' | 'malam';
export type RegionKey = 'SG' | 'AUS' | 'JPN';

export interface ScreenPosition {
    x: number;
    y: number;
    visible: boolean;
}

export interface SiteMetric {
    key: RegionKey;
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
    current_level?: AppLevel;
    active_region?: RegionKey | null;
    time_of_day?: TimeOfDay;
    layer?: string;
    active_point?: string | null;
    selected_prim?: string | null;
    clickable_points?: string[];
    screen_positions?: Record<string, ScreenPosition>;
    status?: string;
}
