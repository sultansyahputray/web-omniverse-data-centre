import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    SiteMetric,
    PortfolioTotals,
    BackendStatus,
    ScreenPosition,
    AppLevel,
    TimeOfDay,
    RegionKey,
    CameraView
} from './types';
import { WebRTCViewerContainer } from './WebRTCViewerContainer';
import { Level1EarthView } from './levels/Level1Earth/Level1EarthView';
import { Level2RegionView } from './levels/Level2Region/Level2RegionView';
import './GlobalDashboard.css';

const INITIAL_METRICS: SiteMetric[] = [
    {
        key: 'SG',
        title: 'Southeast Asia',
        subtitle: 'Batam Hub',
        sites: 2,
        capacityMW: 360,
        availabilityPct: 54,
        position: {
            top: '58%',
            left: '20%'
        }
    },
    {
        key: 'AUS',
        title: 'Australia',
        subtitle: 'Sydney Hub',
        sites: 2,
        capacityMW: 250,
        availabilityPct: 54,
        position: {
            bottom: '12%',
            right: '10%'
        }
    },
    {
        key: 'JPN',
        title: 'Japan',
        subtitle: 'Tokyo Hub',
        sites: 1,
        capacityMW: 180,
        availabilityPct: 54,
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
    const [cameraView, setCameraView] = useState<CameraView>('iso');
    const [screenPositions, setScreenPositions] = useState<Record<string, ScreenPosition>>({});

    const activePortRef = useRef<number>(8089);
    const lastUserTimeRef = useRef<number>(0);
    const lastUserNavRef = useRef<number>(0);
    const lastUserCamRef = useRef<number>(0);

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
                : 54;

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

    // Resilient backend POST dispatcher with automatic port fallback (8089 -> 8088 -> 8090)
    const postBackend = async (endpoint: string, body: Record<string, unknown>) => {
        const ports = [activePortRef.current, 8089, 8088, 8090].filter(
            (p, idx, arr) => arr.indexOf(p) === idx
        );
        for (const port of ports) {
            try {
                const res = await fetch(`http://localhost:${port}/api/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    activePortRef.current = port;
                    console.log(`[Dashboard] POST /api/${endpoint} succeeded on port ${port}`, body);
                    return true;
                }
            } catch {
                // try next port
            }
        }
        console.warn(`[Dashboard] POST /api/${endpoint} failed on candidate ports:`, ports);
        return false;
    };

    // Transition from Level 1 -> Level 2 on region card or 3D point click
    const handleSelectRegion = async (key: RegionKey) => {
        lastUserNavRef.current = Date.now();
        setCurrentLevel('region');
        setActiveRegion(key);
        await postBackend('navigate', { level: 'region', region: key });
    };

    // Transition back from Level 2 -> Level 1 (Global Earth)
    const handleBackToGlobal = async () => {
        lastUserNavRef.current = Date.now();
        setCurrentLevel('earth');
        await postBackend('navigate', { level: 'earth' });
    };

    // Change Level 2 Time-of-Day (Pagi / Sore / Malam)
    const handleSelectTimeOfDay = async (time: TimeOfDay) => {
        lastUserTimeRef.current = Date.now();
        setTimeOfDay(time);
        await postBackend('set-time-of-day', { time });
    };

    // Change Level 2 3D ViewCube camera angle (front, back, right, left, top, iso)
    const handleSelectCameraView = async (view: CameraView) => {
        lastUserCamRef.current = Date.now();
        setCameraView(view);
        await postBackend('set-camera-view', { view });
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
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.current_level &&
                            data.current_level !== currentLevel
                        ) {
                            setCurrentLevel(data.current_level);
                        }

                        // 2. Sync active region
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.active_region &&
                            data.active_region !== activeRegion
                        ) {
                            setActiveRegion(data.active_region as RegionKey);
                        }

                        // 3. Sync time of day (protected with user-action timestamp to prevent reverts)
                        if (
                            Date.now() - lastUserTimeRef.current > 2500 &&
                            data.time_of_day &&
                            data.time_of_day !== timeOfDay
                        ) {
                            setTimeOfDay(data.time_of_day);
                        }

                        // 4. Sync camera view from backend
                        if (
                            Date.now() - lastUserCamRef.current > 2500 &&
                            data.camera_view &&
                            data.camera_view !== cameraView
                        ) {
                            setCameraView(data.camera_view);
                        }

                        // 5. Sync real-time 3D projected screen positions for floating elements (Level 1 & Level 2)
                        const incomingPositions = data.screen_positions;
                        if (incomingPositions) {
                            setScreenPositions((prev) => {
                                let hasChanged = false;
                                for (const key of Object.keys(incomingPositions)) {
                                    const prevPos = prev[key];
                                    const newPos = incomingPositions[key];
                                    if (
                                        !prevPos ||
                                        prevPos.visible !== newPos.visible ||
                                        Math.abs(prevPos.x - newPos.x) > 0.05 ||
                                        Math.abs(prevPos.y - newPos.y) > 0.05
                                    ) {
                                        hasChanged = true;
                                        break;
                                    }
                                }
                                return hasChanged ? incomingPositions : prev;
                            });
                        }

                        return;
                    }
                } catch {
                    // Try next candidate port
                }
            }
        };

        // Smooth tracking polling: 100ms for Level 1, 150ms for Level 2
        const pollInterval = currentLevel === 'earth' ? 100 : 150;
        const intervalId = setInterval(pollStatus, pollInterval);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [currentLevel, activeRegion, timeOfDay, cameraView]);

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
                        activePoint={null}
                        screenPositions={screenPositions}
                        onSelectRegion={handleSelectRegion}
                    />
                ) : (
                    <Level2RegionView
                        activeRegion={activeRegion}
                        regionMetric={currentRegionMetric}
                        timeOfDay={timeOfDay}
                        cameraView={cameraView}
                        screenPositions={screenPositions}
                        onBackToGlobal={handleBackToGlobal}
                        onSelectTimeOfDay={handleSelectTimeOfDay}
                        onSelectCameraView={handleSelectCameraView}
                        onSelectZone={(zone) => {
                            console.log(`[Level2] Zone clicked: ${zone.label} (${zone.primPath})`);
                            postBackend('select_prim', {
                                prim_path: zone.primPath
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};
