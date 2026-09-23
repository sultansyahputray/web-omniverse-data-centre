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
import { Level3BuildingView } from './levels/Level3Building/Level3BuildingView';
import { Level4HallView } from './levels/Level4Hall/Level4HallView';
import { Level5RowView } from './levels/Level5Row/Level5RowView';
import { Level6RackView } from './levels/Level6Rack/Level6RackView';
import { Level7ServerView } from './levels/Level7Server/Level7ServerView';
import { HALL_ROW_ITEMS, HallRowItem } from './levels/Level4Hall/Level4FloatingRows';
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
    const [currentLevel, setCurrentLevel] = useState<AppLevel>(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const lvl = params.get('level') as AppLevel;
            if (lvl && ['earth', 'region', 'building', 'hall', 'row', 'rack', 'server'].includes(lvl)) {
                return lvl;
            }
        }
        return 'earth';
    });
    const [activeRegion, setActiveRegion] = useState<RegionKey>('SG');
    const [activeHall, setActiveHall] = useState<string>('hall_l1_a');
    const [activeRow, setActiveRow] = useState<HallRowItem>(HALL_ROW_ITEMS[0]);
    const [activeRack, setActiveRack] = useState<string>(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('rack_id') || 'rack_01_01';
    });
    const [activeRackNum, setActiveRackNum] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        const rNum = params.get('rack_num');
        return rNum ? parseInt(rNum, 10) : 1;
    });
    const [activeServer, setActiveServer] = useState<string>(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('server_id') || 'VR_1';
    });
    const [activeServerNum, setActiveServerNum] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        const sNum = params.get('server_num');
        return sNum ? parseInt(sNum, 10) : 1;
    });
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
        setScreenPositions({});
        setCurrentLevel('region');
        setActiveRegion(key);
        await postBackend('navigate', { level: 'region', region: key });
    };

    // Transition back from Level 2 -> Level 1 (Global Earth)
    const handleBackToGlobal = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('earth');
        await postBackend('navigate', { level: 'earth' });
    };

    // Change Level 2 Time-of-Day (Pagi / Sore / Malam)
    const handleSelectTimeOfDay = async (time: TimeOfDay) => {
        lastUserTimeRef.current = Date.now();
        setTimeOfDay(time);
        await postBackend('set-time-of-day', { time });
    };

    // Change Level 2 / 3 3D ViewCube camera angle (front, back, right, left, top, iso)
    const handleSelectCameraView = async (view: CameraView) => {
        lastUserCamRef.current = Date.now();
        setCameraView(view);
        await postBackend('set-camera-view', { view });
    };

    // Transition from Level 2 -> Level 3 (Building Interior)
    const handleSelectBuilding = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('building');
        await postBackend('navigate', { level: 'building', region: activeRegion });
    };

    // Transition back from Level 3 -> Level 2 (Region Detail)
    const handleBackToRegion = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('region');
        await postBackend('navigate', { level: 'region', region: activeRegion });
    };

    // Transition from Level 3 -> Level 4 (Data Hall)
    const handleEnterHall = async (hallId: string) => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveHall(hallId);
        setCurrentLevel('hall');
        await postBackend('navigate', { level: 'hall', hall_id: hallId, region: activeRegion });
    };

    // Transition back from Level 4 -> Level 3 (Building Cutaway)
    const handleBackToBuilding = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('building');
        await postBackend('navigate', { level: 'building', region: activeRegion });
    };

    // Transition from Level 4 -> Level 5 (Row Level)
    const handleSelectRow = async (row: HallRowItem) => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveRow(row);
        setCurrentLevel('row');
        await postBackend('navigate', {
            level: 'row',
            row_id: row.id,
            row_num: row.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
    };

    // Transition back from Level 5 -> Level 4 (Data Hall)
    const handleBackToHall = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('hall');
        await postBackend('navigate', { level: 'hall', hall_id: activeHall, region: activeRegion });
        await postBackend('clear-selection', {});
    };

    // Transition from Level 5/4 -> Level 6 (Selected Rack)
    const handleSelectRack = async (rackId: string, rackNum: number, row?: HallRowItem) => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        const targetRow = row || activeRow;
        setActiveRack(rackId);
        setActiveRackNum(rackNum);
        if (targetRow) setActiveRow(targetRow);
        setCurrentLevel('rack');
        await postBackend('navigate', {
            level: 'rack',
            rack_id: rackId,
            rack_num: rackNum,
            row_id: targetRow.id,
            row_num: targetRow.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
    };

    // Transition back from Level 6 -> Level 5 (Row)
    const handleBackToRowFromRack = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveRack('');
        setActiveRackNum(1);
        setCurrentLevel('row');
        await postBackend('navigate', {
            level: 'row',
            row_id: activeRow.id,
            row_num: activeRow.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
        await postBackend('clear-selection', {});
    };

    // Transition back from Level 6 -> Level 4 (Data Hall)
    const handleBackToHallFromRack = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveRack('');
        setActiveRackNum(1);
        setCurrentLevel('hall');
        await postBackend('navigate', { level: 'hall', hall_id: activeHall, region: activeRegion });
        await postBackend('clear-selection', {});
    };

    // Transition from Level 6/5 -> Level 7 (Server / Compute Tray Level)
    const handleSelectServer = async (serverId: string, serverNum: number) => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveServer(serverId);
        setActiveServerNum(serverNum);
        setCurrentLevel('server');
        await postBackend('navigate', {
            level: 'server',
            server_id: serverId,
            server_num: serverNum,
            rack_id: activeRack,
            rack_num: activeRackNum,
            row_id: activeRow.id,
            row_num: activeRow.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
    };

    // Transition back from Level 7 -> Level 6 (Rack)
    const handleBackToRackFromServer = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setCurrentLevel('rack');
        await postBackend('navigate', {
            level: 'rack',
            rack_id: activeRack,
            rack_num: activeRackNum,
            row_id: activeRow.id,
            row_num: activeRow.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
        await postBackend('clear-selection', {});
    };

    // Transition back from Level 7 -> Level 5 (Row)
    const handleBackToRowFromServer = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveRack('');
        setActiveRackNum(1);
        setCurrentLevel('row');
        await postBackend('navigate', {
            level: 'row',
            row_id: activeRow.id,
            row_num: activeRow.rowNum,
            hall_id: activeHall,
            region: activeRegion
        });
        await postBackend('clear-selection', {});
    };

    // Transition back from Level 7 -> Level 4 (Hall)
    const handleBackToHallFromServer = async () => {
        lastUserNavRef.current = Date.now();
        setScreenPositions({});
        setActiveRack('');
        setActiveRackNum(1);
        setCurrentLevel('hall');
        await postBackend('navigate', { level: 'hall', hall_id: activeHall, region: activeRegion });
        await postBackend('clear-selection', {});
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
                    const aspect = (window.innerWidth / Math.max(window.innerHeight, 1)).toFixed(4);
                    const res = await fetch(`http://localhost:${port}/api/status?aspect=${aspect}`);
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

                        // 2b. Sync active hall
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.active_hall &&
                            data.active_hall !== activeHall
                        ) {
                            setActiveHall(data.active_hall);
                        }

                        // 2c. Sync active row
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.active_row
                        ) {
                            const matchedRow = HALL_ROW_ITEMS.find((r) => r.id === data.active_row);
                            if (matchedRow && matchedRow.id !== activeRow.id) {
                                setActiveRow(matchedRow);
                            }
                        }

                        // 2d. Sync active rack
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.active_rack
                        ) {
                            if (data.active_rack !== activeRack) {
                                setActiveRack(data.active_rack);
                            }
                            if (data.active_rack_num && data.active_rack_num !== activeRackNum) {
                                setActiveRackNum(data.active_rack_num);
                            }
                        }

                        // 2e. Sync active server
                        if (
                            Date.now() - lastUserNavRef.current > 2000 &&
                            data.active_server
                        ) {
                            if (data.active_server !== activeServer) {
                                setActiveServer(data.active_server);
                            }
                            if (data.active_server_num && data.active_server_num !== activeServerNum) {
                                setActiveServerNum(data.active_server_num);
                            }
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
                                const prevKeys = Object.keys(prev);
                                const incomingKeys = Object.keys(incomingPositions);
                                // If key sets have different lengths (e.g. Earth vs Region), update immediately
                                if (prevKeys.length !== incomingKeys.length) {
                                    return incomingPositions;
                                }
                                let hasChanged = false;
                                for (const key of incomingKeys) {
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
            <WebRTCViewerContainer
                server="127.0.0.1"
                signalingPort={49100}
                isInteractive={currentLevel !== 'earth'}
            />

            {/* 2. Vignette Depth Overlay */}
            <div className="vignette-overlay" />

            {/* 3. Level View Layer */}
            <div className="ui-overlay-container">
                {currentLevel === 'earth' && (
                    <Level1EarthView
                        metrics={metrics}
                        totals={totals}
                        activePoint={null}
                        screenPositions={screenPositions}
                        onSelectRegion={handleSelectRegion}
                        onRotateEarth={(dir, step) => postBackend('earth-rotate', { direction: dir, step_deg: step || 18.0 })}
                        onZoomEarth={(act) => postBackend('earth-zoom', { action: act, step_factor: 0.15 })}
                        onResetEarth={() => postBackend('navigate', { level: 'earth' })}
                    />
                )}
                {currentLevel === 'region' && (
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
                            if (zone.id === 'example_building') {
                                handleSelectBuilding();
                            } else {
                                postBackend('select-prim', {
                                    prim_path: zone.primPath
                                });
                            }
                        }}
                    />
                )}
                {currentLevel === 'building' && (
                    <Level3BuildingView
                        activeRegion={activeRegion}
                        regionMetric={currentRegionMetric}
                        timeOfDay={timeOfDay}
                        cameraView={cameraView}
                        screenPositions={screenPositions}
                        onBackToRegion={handleBackToRegion}
                        onSelectTimeOfDay={handleSelectTimeOfDay}
                        onSelectCameraView={handleSelectCameraView}
                        onSelectZone={(zone) => {
                            console.log(`[Level3] Zone clicked: ${zone.label} (${zone.primPath})`);
                            postBackend('select-prim', {
                                prim_path: zone.primPath
                            });
                        }}
                        onSelectHall={(hall) => {
                            console.log(`[Level3] Hall clicked: ${hall.title} (${hall.id})`);
                            if (hall.type === 'hall') {
                                handleEnterHall(hall.id);
                            } else {
                                const primPath = hall.primPath || `/World/region/example_building/${hall.id}`;
                                postBackend('select-prim', {
                                    prim_path: primPath
                                });
                            }
                        }}
                        onPowerDetails={() => {
                            console.log('[Level3] Electrical Power Path toggled');
                        }}
                        onCoolingDetails={() => {
                            console.log('[Level3] Cooling Details clicked');
                        }}
                    />
                )}
                {currentLevel === 'hall' && (
                    <Level4HallView
                        activeRegion={activeRegion}
                        activeHallId={activeHall}
                        regionMetric={currentRegionMetric}
                        cameraView={cameraView}
                        screenPositions={screenPositions}
                        onBackToBuilding={handleBackToBuilding}
                        onSelectHall={handleEnterHall}
                        onSelectRow={handleSelectRow}
                        onSelectCameraView={handleSelectCameraView}
                    />
                )}
                {currentLevel === 'row' && activeRow && (
                    <Level5RowView
                        activeRegion={activeRegion}
                        activeHallId={activeHall}
                        activeRow={activeRow}
                        regionMetric={currentRegionMetric}
                        cameraView={cameraView}
                        onBackToHall={handleBackToHall}
                        onSelectCameraView={handleSelectCameraView}
                    />
                )}
                {currentLevel === 'rack' && activeRow && (
                    <Level6RackView
                        activeRegion={activeRegion}
                        activeHallId={activeHall}
                        activeRow={activeRow}
                        activeRackId={activeRack}
                        activeRackNum={activeRackNum}
                        regionMetric={currentRegionMetric}
                        cameraView={cameraView}
                        screenPositions={screenPositions}
                        onBackToRow={handleBackToRowFromRack}
                        onBackToHall={handleBackToHallFromRack}
                        onSelectCameraView={handleSelectCameraView}
                        onSelectServer={handleSelectServer}
                    />
                )}
                {currentLevel === 'server' && activeRow && (
                    <Level7ServerView
                        activeRegion={activeRegion}
                        activeHallId={activeHall}
                        activeRow={activeRow}
                        activeRackId={activeRack}
                        activeRackNum={activeRackNum}
                        activeServerId={activeServer}
                        activeServerNum={activeServerNum}
                        regionMetric={currentRegionMetric}
                        cameraView={cameraView}
                        screenPositions={screenPositions}
                        onBackToRack={handleBackToRackFromServer}
                        onBackToRow={handleBackToRowFromServer}
                        onBackToHall={handleBackToHallFromServer}
                        onSelectCameraView={handleSelectCameraView}
                        onSelectServer={handleSelectServer}
                    />
                )}
            </div>
        </div>
    );
};
