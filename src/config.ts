/**
 * =========================================================================
 * GLOBAL DASHBOARD CONFIGURATION
 * =========================================================================
 * Atur durasi interval rotasi data (Value 1 -> Value 2 -> Value 3)
 * untuk masing-masing level di bawah ini (dalam satuan DETIK).
 * 
 * Perubahan di file ini otomatis langsung aktif via Vite Hot Reload.
 */

export const GLOBAL_TIMERS = {
    /** Durasi rotasi parameter card di Level 1: Globe (detik) */
    globe_time: 30,

    /** Durasi rotasi parameter di Level Country: Southeast Asia (detik) */
    country_time: 30,

    /** Durasi rotasi telemetry di Level 2 Region & Level 3 Building (detik) */
    region_building_time: 30,

    /** Durasi rotasi Level 4: Data Hall (detik) */
    hall_time: 30,

    /** Durasi rotasi Level 5: Row (detik) */
    row_time: 30,

    /** Durasi rotasi Level 6: Rack (detik) */
    rack_time: 30,

    /** Durasi rotasi Level 7: Server (detik) */
    server_time: 30,

    /** Durasi rotasi Level 8: Superchip (detik) */
    superchip_time: 30,
};

/** Helper untuk mengonversi durasi detik ke milidetik secara aman */
export const getTimerMs = (seconds: number): number => Math.max(1, seconds) * 1000;

/**
 * =========================================================================
 * GLOBAL STATUS COLOR PALETTE CONFIGURATION
 * =========================================================================
 * Konfigurasi 1 pintu warna untuk Green, Yellow, Orange, dan Red (serta Cyan Default).
 * Digunakan secara seragam di seluruh level dashboard:
 * - Level 1: Globe
 * - Level Country: Southeast Asia
 * - Level 2: Region
 * - Level 3: Building
 * - Level 4: Data Hall
 * - Level 5: Row
 * - Level 6: Rack
 * - Level 7: Server
 * - Level 8: Superchip
 * 
 * Mengubah nilai di sini otomatis mengupdate baik TypeScript components
 * (gauges, chart, styles) maupun semua CSS variables di DOM.
 */
export interface StatusColorToken {
    /** Solid hex code (digunakan untuk stroke gauge, chart, icon) */
    hex: string;
    /** Background color RGBA/Hex (digunakan untuk isian/fill badge & pill) */
    bg: string;
    /** Border color (opsional, jika tidak ingin garis tepi bisa isi 'transparent' atau dikosongkan) */
    border?: string;
    /** Glow / shadow color (opsional, jika tidak ingin efek neon glow bisa isi 'transparent' atau dikosongkan) */
    glow?: string;
}

export const STATUS_PALETTE: Record<'green' | 'yellow' | 'orange' | 'red' | 'default', StatusColorToken> = {
    green: {
        hex: '#34c759',
        bg: 'rgba(52, 199, 89, 0.6)',
        border: 'rgba(52, 199, 89, 1)',
        glow: 'transparent',
    },
    yellow: {
        hex: '#ffcc00',
        bg: 'rgba(255, 204, 0, 0.4)',
        border: 'rgba(255, 204, 0, 1)',
        glow: 'transparent',
    },
    orange: {
        hex: '#ff9500',
        bg: 'rgba(255, 141, 40, 0.6)',
        border: 'rgba(255, 141, 40, 1)',
        glow: 'transparent',
    },
    red: {
        hex: '#ff383c',
        bg: 'rgba(255, 56, 60, 0.5)',
        border: 'rgba(255, 56, 60, 1)',
        glow: 'transparent',
    },
    default: {
        hex: '#00d4ff',
        bg: 'rgba(0, 212, 255, 0.22)',
        border: 'rgba(0, 212, 255, 1)',
        glow: 'transparent',
    },
};

/**
 * Sinkronisasi otomatis STATUS_PALETTE ke CSS Custom Properties (:root) di DOM.
 * Memastikan semua file CSS yang memakai var(--status-...) langsung tersinkron.
 */
export const applyStatusPaletteCssVariables = () => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    Object.entries(STATUS_PALETTE).forEach(([statusKey, token]) => {
        root.style.setProperty(`--status-${statusKey}`, token.hex);
        root.style.setProperty(`--status-${statusKey}-bg`, token.bg);
        root.style.setProperty(`--status-${statusKey}-border`, token.border || 'transparent');
        root.style.setProperty(`--status-${statusKey}-glow`, token.glow || 'transparent');
    });
};


// Jalankan otomatis saat module di-import di browser
if (typeof document !== 'undefined') {
    applyStatusPaletteCssVariables();
}

