export type AppLevel = 'earth' | 'region' | 'building' | 'hall' | 'row';
export type BuildingSubView = 'cutaway' | 'power_details' | 'cooling_details';
export type TimeOfDay = 'pagi' | 'sore' | 'malam';
export type RegionKey = 'SG' | 'AUS' | 'JPN';
export type CameraView = 'iso' | 'front' | 'back' | 'right' | 'left' | 'top';

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
    active_hall?: string | null;
    active_row?: string | null;
    active_row_num?: number | null;
    time_of_day?: TimeOfDay;
    camera_view?: CameraView;
    layer?: string;
    active_point?: string | null;
    selected_prim?: string | null;
    clickable_points?: string[];
    screen_positions?: Record<string, ScreenPosition>;
    status?: string;
}

export interface RegionZoneItem {
    id: string;
    label: string;
    primPath: string;
    defaultPos: { x: number; y: number };
    isMain?: boolean;
}
