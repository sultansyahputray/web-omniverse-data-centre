import React, { useState, useEffect, useMemo } from 'react';
import { SiteMetric, PortfolioTotals, BackendStatus, ScreenPosition } from './types';
import { CoordinateCard } from './CoordinateCard';
import { PortfolioTotalDashboard } from './PortfolioTotalDashboard';
import { WebRTCViewerContainer } from './WebRTCViewerContainer';
import './GlobalDashboard.css';

const INITIAL_METRICS: SiteMetric[] = [
    {
        key: 'SG',
        title: 'SINGAPORE',
        subtitle: 'Singapore Hub',
        sites: 2, // 1-2 sites as requested
        capacityMW: 360,
        availabilityPct: 99.8,
        position: {
            top: '58%',
            left: '20%'
        }
    },
    {
        key: 'AUS',
        title: 'AUSTRALIA',
        subtitle: 'Sydney Hub',
        sites: 2, // 1-2 sites as requested
        capacityMW: 250,
        availabilityPct: 99.9,
        position: {
            bottom: '12%',
            right: '10%'
        }
    },
    {
        key: 'JPN',
        title: 'JAPAN',
        subtitle: 'Tokyo Hub',
        sites: 1, // 1-2 sites as requested
        capacityMW: 180,
        availabilityPct: 99.9,
        position: {
            top: '36%',
            right: '10%'
        }
    }
];

export const App: React.FC = () => {
    const [metrics] = useState<SiteMetric[]>(INITIAL_METRICS);
    const [activePoint, setActivePoint] = useState<'SG' | 'AUS' | 'JPN' | null>(null);
    const [screenPositions, setScreenPositions] = useState<Record<string, ScreenPosition>>({});

    // Calculate totals dynamically as requested:
    // "jumlah site itu adalah total dari seluruh data centre yang ada,
    //  lalu capacity juga total capacity yang ada,
    //  availability itu avg dari total availability seluruh site"
    const totals: PortfolioTotals = useMemo(() => {
        const totalSites = metrics.reduce((acc, m) => acc + m.sites, 0);
        const totalCapacityMW = metrics.reduce((acc, m) => acc + m.capacityMW, 0);
        const avgAvailabilityPct =
            metrics.length > 0
                ? metrics.reduce((acc, m) => acc + m.availabilityPct, 0) / metrics.length
                : 99.9;

        return {
            totalSites,
            totalCapacityMW,
            avgAvailabilityPct
        };
    }, [metrics]);

    // Handle point card click (User: "ketika di click yaudah sementara di click aja nggak ada event lain dan hal lain yang terjadi")
    const handleCardClick = async (key: 'SG' | 'AUS' | 'JPN') => {
        const nextActive = activePoint === key ? null : key;
        setActivePoint(nextActive);

        try {
            if (nextActive) {
                // Inform Omniverse Kit backend to select the point without framing/zooming camera
                await fetch('http://localhost:8089/api/select-point', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ point: nextActive, frame_camera: false })
                });
            } else {
                await fetch('http://localhost:8089/api/clear-selection', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (e) {
            // Kit API may not be active yet, graceful fallback
            console.log('[Dashboard] Note on API select-point:', e);
        }
    };

    // Poll backend status to dynamically track 3D coordinates & sync click selection
    useEffect(() => {
        let isMounted = true;
        let activePort = 8089;
        const candidatePorts = [8089, 8088, 8090];

        const pollStatus = async () => {
            for (const port of [activePort, ...candidatePorts.filter(p => p !== activePort)]) {
                try {
                    const res = await fetch(`http://localhost:${port}/api/status`);
                    if (res.ok && isMounted) {
                        activePort = port;
                        const data: BackendStatus = await res.json();

                        // 1. Sync real-time 3D projected screen positions for floating cards
                        if (data.screen_positions) {
                            setScreenPositions(data.screen_positions);
                        }

                        // 2. Sync active selection state
                        if (data.active_point && ['SG', 'AUS', 'JPN'].includes(data.active_point)) {
                            setActivePoint(data.active_point as 'SG' | 'AUS' | 'JPN');
                        } else if (!data.active_point) {
                            setActivePoint(null);
                        }
                        return;
                    }
                } catch {
                    // Try next candidate port
                }
            }
        };

        // 50ms polling (~20 FPS) combined with CSS transition ensures 60 FPS smooth motion
        const intervalId = setInterval(pollStatus, 50);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="dashboard-viewport">
            {/* 1. Fullscreen Omniverse WebRTC Stream Background */}
            <WebRTCViewerContainer server="127.0.0.1" signalingPort={49100} />

            {/* 2. Vignette Depth Overlay */}
            <div className="vignette-overlay" />

            {/* 3. Interactive UI Overlay Layer */}
            <div className="ui-overlay-container">
                {/* Top-Left Header matching Image 2 */}
                <header className="global-header">
                    <h1 className="header-main-title">
                        <span className="header-title-white">GLOBAL</span>
                        <span className="header-title-cyan">DATA CENTRE PORTFOLIO</span>
                    </h1>
                    <div className="header-subtitle">
                        PEOPLE &nbsp;|&nbsp; INFRASTRUCTURE &nbsp;|&nbsp; A MORE CONNECTED TOMORROW
                    </div>
                </header>

                {/* Coordinate Cards dynamically floating & tracking 3D coordinates (SG, AUS, JPN) */}
                {metrics.map((metric) => (
                    <CoordinateCard
                        key={metric.key}
                        metric={metric}
                        isActive={activePoint === metric.key}
                        screenPosition={screenPositions[metric.key]}
                        onClick={handleCardClick}
                    />
                ))}

                {/* Bottom-Left Portfolio Total Dashboard (matching Image 4) */}
                <PortfolioTotalDashboard totals={totals} />

                {/* Bottom-Right Branding Footer (matching Image 2) */}
                <footer className="bottom-right-branding">
                    <div className="branding-line" />
                    <div className="branding-text">A MORE RESILIENT DIGITAL WORLD</div>
                </footer>
            </div>
        </div>
    );
};
