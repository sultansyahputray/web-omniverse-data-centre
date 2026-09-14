import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    SiteMetric,
    PortfolioTotals,
    BackendStatus,
    ScreenPosition,
    AppLevel,
    TimeOfDay,
    RegionKey
} from './types';
import { WebRTCViewerContainer } from './WebRTCViewerContainer';
import { Level1EarthView } from './levels/Level1Earth/Level1EarthView';
import { Level2RegionView } from './levels/Level2Region/Level2RegionView';
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
    const [currentLevel, setCurrentLevel] = useState<AppLevel>('earth');
    const [activeRegion, setActiveRegion] = useState<RegionKey>('SG');
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('pagi');
    const [screenPositions, setScreenPositions] = useState<Record<string, ScreenPosition>>({});

    const activePortRef = useRef<number>(8089);

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

    // Active region metric object for Level 2
    const currentRegionMetric = useMemo(() => {
        return metrics.find((m) => m.key === activeRegion) || metrics[0];
    }, [metrics, activeRegion]);

    // Transition from Level 1 -> Level 2 on region card or 3D point click
    const handleSelectRegion = async (key: RegionKey) => {
        setCurrentLevel('region');
        setActiveRegion(key);

        try {
            await fetch(`http://localhost:${activePortRef.current}/api/navigate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level: 'region', region: key })
            });
        } catch (e) {
            console.log('[Dashboard] API navigate error (fallback to local state):', e);
        }
    };

    // Transition back from Level 2 -> Level 1 (Global Earth)
    const handleBackToGlobal = async () => {
        setCurrentLevel('earth');

        try {
            await fetch(`http://localhost:${activePortRef.current}/api/navigate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level: 'earth' })
            });
        } catch (e) {
            console.log('[Dashboard] API navigate back error (fallback to local state):', e);
        }
    };

    // Change Level 2 Time-of-Day (Pagi / Sore / Malam)
    const handleSelectTimeOfDay = async (time: TimeOfDay) => {
        setTimeOfDay(time);

        try {
            await fetch(`http://localhost:${activePortRef.current}/api/set-time-of-day`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ time })
            });
        } catch (e) {
            console.log('[Dashboard] API set-time-of-day error (fallback to local state):', e);
        }
    };

    // Poll backend status to dynamically track 3D coordinates & sync level/selection
    useEffect(() => {
        let isMounted = true;
        const candidatePorts = [8089, 8088, 8090];

        const pollStatus = async () => {
            const portsToTry = [
                activePortRef.current,
                ...candidatePorts.filter((p) => p !== activePortRef.current)
            ];

            for (const port of portsToTry) {
                try {
                    const res = await fetch(`http://localhost:${port}/api/status`);
                    if (res.ok && isMounted) {
                        activePortRef.current = port;
                        const data: BackendStatus = await res.json();

                        // 1. Sync level navigation if changed from 3D viewport clicks
                        if (data.current_level && data.current_level !== currentLevel) {
                            setCurrentLevel(data.current_level);
                        }

                        // 2. Sync active region
                        if (data.active_region && data.active_region !== activeRegion) {
                            setActiveRegion(data.active_region as RegionKey);
                        }

                        // 3. Sync time of day
                        if (data.time_of_day && data.time_of_day !== timeOfDay) {
                            setTimeOfDay(data.time_of_day);
                        }

                        // 4. Sync real-time 3D projected screen positions for floating cards in Level 1
                        if (data.screen_positions) {
                            setScreenPositions(data.screen_positions);
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
    }, [currentLevel, activeRegion, timeOfDay]);

    return (
        <div className="dashboard-viewport">
            {/* 1. Fullscreen Omniverse WebRTC Stream Background */}
            <WebRTCViewerContainer server="127.0.0.1" signalingPort={49100} />

            {/* 2. Vignette Depth Overlay */}
            <div className="vignette-overlay" />

            {/* 3. Level View Layer */}
            <div className="ui-overlay-container">
                {currentLevel === 'earth' ? (
                    <Level1EarthView
                        metrics={metrics}
                        totals={totals}
                        activePoint={currentLevel === 'region' ? activeRegion : null}
                        screenPositions={screenPositions}
                        onSelectRegion={handleSelectRegion}
                    />
                ) : (
                    <Level2RegionView
                        activeRegion={activeRegion}
                        regionMetric={currentRegionMetric}
                        timeOfDay={timeOfDay}
                        onBackToGlobal={handleBackToGlobal}
                        onSelectTimeOfDay={handleSelectTimeOfDay}
                    />
                )}
            </div>
        </div>
    );
};
