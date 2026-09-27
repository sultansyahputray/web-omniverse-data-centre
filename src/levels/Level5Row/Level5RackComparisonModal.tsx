import React, { useState, useMemo, useEffect } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { Sort, SortItem } from '../../reusable/SortFilter';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import { getStatus } from '../../thresholdUtils';
import level5RackComparisonData from '../../data/level5RackComparison.json';
import './Level5RackComparisonModal.css';

// Dual Server Rack Icon matching the header design
export const DualRackServerIcon: React.FC<{ size?: number; color?: string }> = ({
    size = 28,
    color = '#00E5FF'
}) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Rack Frame */}
        <rect x="2" y="2" width="10.5" height="24" rx="2" stroke={color} strokeWidth="1.6" />
        <line x1="2" y1="7" x2="12.5" y2="7" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="2" y1="12" x2="12.5" y2="12" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="2" y1="17" x2="12.5" y2="17" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="2" y1="22" x2="12.5" y2="22" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="5" cy="4.5" r="0.9" fill={color} />
        <circle cx="7.5" cy="4.5" r="0.9" fill={color} />
        <circle cx="5" cy="9.5" r="0.9" fill={color} />
        <circle cx="7.5" cy="9.5" r="0.9" fill={color} />
        <circle cx="5" cy="14.5" r="0.9" fill={color} />
        <circle cx="7.5" cy="14.5" r="0.9" fill={color} />

        {/* Right Rack Frame */}
        <rect x="15.5" y="2" width="10.5" height="24" rx="2" stroke={color} strokeWidth="1.6" />
        <line x1="15.5" y1="7" x2="26" y2="7" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="15.5" y1="12" x2="26" y2="12" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="15.5" y1="17" x2="26" y2="17" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="15.5" y1="22" x2="26" y2="22" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="18.5" cy="4.5" r="0.9" fill={color} />
        <circle cx="21" cy="4.5" r="0.9" fill={color} />
        <circle cx="18.5" cy="9.5" r="0.9" fill={color} />
        <circle cx="21" cy="9.5" r="0.9" fill={color} />
        <circle cx="18.5" cy="14.5" r="0.9" fill={color} />
        <circle cx="21" cy="14.5" r="0.9" fill={color} />
    </svg>
);

export interface ComputingDetailsItem {
    rackId: string;
    rackName: string;
    cpu: number;
    gpu: number;
    gpuMemory: number;
    memory: number;
    disk: number;
    network: number;
}

export interface ComputingEfficiencyItem {
    rackId: string;
    rackName: string;
    cpu: number;
    power: number;
    inletTemp: number;
    outletTemp: number;
    coolantFlow: number;
    computingEff: number;
}

export interface LiquidCoolingItem {
    rackId: string;
    rackName: string;
    coolantInlet: number;
    coolantOutlet: number;
    deltaT: number;
    coolantFlow: number;
    heatRemoval: number;
    coolingEff: number;
}

export interface AirCoolingItem {
    rackId: string;
    rackName: string;
    hallSupply: number;
    hallReturn: number;
    deltaT: number;
    airflow: number;
    heatRemoval: number;
    coolingEff: number;
}

export interface PowerTelemetryItem {
    rackId: string;
    rackName: string;
    activeServer: number;
    activePower: number;
    avgPower: number;
    peakPower: number;
    capacity: number;
    utilization: number;
}

export interface FallbackRackItem {
    rackId: string;
    rackName: string;
    activeServer: number;
    activePower: number;
    avgPower: number;
    peakPower: number;
    capacity: number;
    utilization: number;
}

const FALLBACK_RACK_DATA: FallbackRackItem[] = [
    { rackId: 'rack_1', rackName: 'Rack 1', activeServer: 14, activePower: 12.8, avgPower: 11.9, peakPower: 15.1, capacity: 30, utilization: 42.7 },
    { rackId: 'rack_2', rackName: 'Rack 2', activeServer: 16, activePower: 21.6, avgPower: 20.4, peakPower: 25.8, capacity: 30, utilization: 72.0 },
    { rackId: 'rack_3', rackName: 'Rack 3', activeServer: 18, activePower: 29.8, avgPower: 28.1, peakPower: 34.2, capacity: 35, utilization: 85.1 },
    { rackId: 'rack_4', rackName: 'Rack 4', activeServer: 13, activePower: 11.5, avgPower: 10.8, peakPower: 13.7, capacity: 30, utilization: 38.3 },
    { rackId: 'rack_5', rackName: 'Rack 5', activeServer: 15, activePower: 14.1, avgPower: 13.2, peakPower: 16.8, capacity: 30, utilization: 47.0 },
    { rackId: 'rack_6', rackName: 'Rack 6', activeServer: 17, activePower: 23.4, avgPower: 22.1, peakPower: 27.6, capacity: 30, utilization: 78.0 },
    { rackId: 'rack_7', rackName: 'Rack 7', activeServer: 14, activePower: 12.2, avgPower: 11.4, peakPower: 14.6, capacity: 30, utilization: 40.7 },
    { rackId: 'rack_8', rackName: 'Rack 8', activeServer: 18, activePower: 31.2, avgPower: 29.4, peakPower: 34.8, capacity: 35, utilization: 89.1 },
    { rackId: 'rack_9', rackName: 'Rack 9', activeServer: 18, activePower: 31.2, avgPower: 29.4, peakPower: 34.8, capacity: 35, utilization: 89.1 },
];

const MAIN_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Computing' },
    { label: 'Cooling' },
    { label: 'Power' }
];

const COMPUTING_SUB_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Computing Details' },
    { label: 'Computing Efficiency' }
];

const COOLING_SUB_TABS: ButtonBarWithStatusItem[] = [
    { label: 'Liquid Cooling' },
    { label: 'Air Cooling' }
];

const COMPUTING_DETAILS_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'rackName', label: 'Rack' },
    { id: 'cpu', label: 'CPU Utilisation' },
    { id: 'gpu', label: 'GPU Utilisation' },
    { id: 'gpuMemory', label: 'GPU Memory' },
    { id: 'memory', label: 'Memory Utilisation' },
    { id: 'disk', label: 'Disk Utilisation' },
    { id: 'network', label: 'Network' }
];

const COMPUTING_EFFICIENCY_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'rackName', label: 'Rack' },
    { id: 'cpu', label: 'CPU' },
    { id: 'power', label: 'Power' },
    { id: 'inletTemp', label: 'Inlet Temp' },
    { id: 'outletTemp', label: 'Outlet Temp' },
    { id: 'coolantFlow', label: 'Coolant Flow' },
    { id: 'computingEff', label: 'Computing Efficiency' }
];

const LIQUID_COOLING_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'rackName', label: 'Rack' },
    { id: 'coolantInlet', label: 'Coolant Inlet' },
    { id: 'coolantOutlet', label: 'Coolant Outlet' },
    { id: 'deltaT', label: 'ΔT' },
    { id: 'coolantFlow', label: 'Coolant Flow' },
    { id: 'heatRemoval', label: 'Heat Removal' },
    { id: 'coolingEff', label: 'Cooling Efficiency' }
];

const AIR_COOLING_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'rackName', label: 'Rack' },
    { id: 'hallSupply', label: 'Hall Supply' },
    { id: 'hallReturn', label: 'Hall Return' },
    { id: 'deltaT', label: 'ΔT' },
    { id: 'airflow', label: 'Airflow' },
    { id: 'heatRemoval', label: 'Heat Removal' },
    { id: 'coolingEff', label: 'Cooling Efficiency' }
];

const POWER_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'rackName', label: 'Rack' },
    { id: 'activeServer', label: 'Active Servers' },
    { id: 'activePower', label: 'Active Power' },
    { id: 'avgPower', label: 'Avg Power' },
    { id: 'peakPower', label: 'Peak Power' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'utilization', label: 'Utilization' }
];

const FALLBACK_SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'utilization', label: 'Utilization' },
    { id: 'activePower', label: 'Active Power' },
    { id: 'activeServer', label: 'Active Server' },
    { id: 'rackName', label: 'Rack' }
];

interface Level5RackComparisonModalProps {
    isOpen: boolean;
    rowLabel?: string;
    currentScenario?: string;
    timeStep?: number;
    onClose: () => void;
    onViewHistory?: () => void;
}

export const Level5RackComparisonModal: React.FC<Level5RackComparisonModalProps> = ({
    isOpen,
    rowLabel = 'Row B',
    currentScenario = 'Normal Load',
    timeStep = 0,
    onClose,
    onViewHistory
}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [computingSubTab, setComputingSubTab] = useState(0); // 0 = Computing Details, 1 = Computing Efficiency
    const [coolingSubTab, setCoolingSubTab] = useState(0);     // 0 = Liquid Cooling, 1 = Air Cooling
    const [sortKey, setSortKey] = useState('occurrences');
    const [isAsc, setIsAsc] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // Close on Escape key press
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Retrieve active time slice from dataset
    const activeStepData = useMemo(() => {
        const scenarioKey = currentScenario === 'Normal Load' ? 'Normal Load' : currentScenario;
        const sData = (level5RackComparisonData as any)[scenarioKey] || (level5RackComparisonData as any)['Low Load'];
        if (!sData) return null;
        const key = String(timeStep);
        return sData[key] || sData['0'];
    }, [currentScenario, timeStep]);

    // Active sort options based on selected tab and sub-tab
    const activeSortOptions = useMemo(() => {
        if (selectedTab === 0) {
            return computingSubTab === 0 ? COMPUTING_DETAILS_SORT_OPTIONS : COMPUTING_EFFICIENCY_SORT_OPTIONS;
        }
        if (selectedTab === 1) {
            return coolingSubTab === 0 ? LIQUID_COOLING_SORT_OPTIONS : AIR_COOLING_SORT_OPTIONS;
        }
        if (selectedTab === 2) {
            return POWER_SORT_OPTIONS;
        }
        return FALLBACK_SORT_OPTIONS;
    }, [selectedTab, computingSubTab, coolingSubTab]);

    // Reset sort when changing tabs
    const handleSelectMainTab = (idx: number) => {
        setSelectedTab(idx);
        setSortKey('occurrences');
    };

    const handleSelectSubTab = (idx: number) => {
        setComputingSubTab(idx);
        setSortKey('occurrences');
    };

    const handleSelectCoolingSubTab = (idx: number) => {
        setCoolingSubTab(idx);
        setSortKey('occurrences');
    };

    // Helper: badge color determination for percentage parameters
    const getBadgeClass = (param: string, val: number) => {
        const status = getStatus(param, val);
        if (status === 'default' || !status) return 'badge-green';
        return `badge-${status}`;
    };

    // Helper: format percentage with intelligent decimals
    const formatPercent = (val: number | undefined | null) => {
        if (val === undefined || val === null) return '-';
        return Number.isInteger(val) ? `${val}%` : `${val.toFixed(2)}%`;
    };

    // Sorted Computing Details Data
    const sortedComputingDetails = useMemo(() => {
        const rawList: ComputingDetailsItem[] = activeStepData?.computingDetails || [];
        if (!rawList.length) return [];
        const data = [...rawList];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [activeStepData, sortKey, isAsc]);

    // Sorted Computing Efficiency Data
    const sortedComputingEfficiency = useMemo(() => {
        const rawList: ComputingEfficiencyItem[] = activeStepData?.computingEfficiency || [];
        if (!rawList.length) return [];
        const data = [...rawList];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [activeStepData, sortKey, isAsc]);

    // Sorted Liquid Cooling Data
    const sortedLiquidCooling = useMemo(() => {
        const rawList: LiquidCoolingItem[] = activeStepData?.liquidCooling || [];
        if (!rawList.length) return [];
        const data = [...rawList];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [activeStepData, sortKey, isAsc]);

    // Sorted Air Cooling Data
    const sortedAirCooling = useMemo(() => {
        const rawList: AirCoolingItem[] = activeStepData?.airCooling || [];
        if (!rawList.length) return [];
        const data = [...rawList];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [activeStepData, sortKey, isAsc]);

    // Sorted Power Data
    const sortedPowerData = useMemo(() => {
        const rawList: PowerTelemetryItem[] = activeStepData?.power || [];
        if (!rawList.length) return [];
        const data = [...rawList];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [activeStepData, sortKey, isAsc]);

    // Sorted Fallback Data (Cooling / Power)
    const sortedFallbackData = useMemo(() => {
        const data = [...FALLBACK_RACK_DATA];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            const valA = (a as any)[sortKey];
            const valB = (b as any)[sortKey];

            if (typeof valA === 'string') {
                return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return isAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        });
    }, [sortKey, isAsc]);

    if (!isOpen) return null;

    return (
        <div
            className="rack-comparison-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="rack-comparison-card" role="dialog" aria-modal="true">
                {/* 1. Modal Header */}
                <div className="rack-modal-header">
                    <div className="rack-modal-header-left">
                        <div className="rack-modal-icon-wrapper">
                            <DualRackServerIcon size={26} color="#00E5FF" />
                        </div>
                        <h2 className="rack-modal-title">NVL72 {rowLabel}</h2>
                    </div>

                    <div className="rack-modal-header-right">
                        <NavigationButton
                            label="View history"
                            onClick={() => {
                                setIsHistoryOpen(true);
                                if (onViewHistory) onViewHistory();
                            }}
                        />

                        <CloseButton
                            onClick={onClose}
                            title="Close"
                            ariaLabel="Close modal"
                        />
                    </div>
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div className="title-h-divider"></div>

                {/* 2. Primary Controls Row: Main Tabs + Sort Filter */}
                <div className="rack-modal-controls">
                    <ButtonBarWithStatus
                        items={MAIN_TABS}
                        selectedIndex={selectedTab}
                        onSelect={handleSelectMainTab}
                    />

                    <Sort
                        items={activeSortOptions}
                        label="Sort By"
                        value={sortKey}
                        onChange={(val) => setSortKey(val)}
                        is_asc={isAsc}
                        onToggleSort={() => setIsAsc(!isAsc)}
                    />
                </div>

                {/* 3. Secondary Sub-Controls Row for Computing or Cooling */}
                {selectedTab === 0 && (
                    <div className="rack-modal-subcontrols">
                        <ButtonBarWithStatus
                            items={COMPUTING_SUB_TABS}
                            selectedIndex={computingSubTab}
                            onSelect={handleSelectSubTab}
                        />
                    </div>
                )}

                {selectedTab === 1 && (
                    <div className="rack-modal-subcontrols">
                        <ButtonBarWithStatus
                            items={COOLING_SUB_TABS}
                            selectedIndex={coolingSubTab}
                            onSelect={handleSelectCoolingSubTab}
                        />
                    </div>
                )}

                {/* 4. Telemetry Tables */}
                <div className="rack-modal-table-container">
                    {/* TAB 0, SUB-TAB 0: COMPUTING DETAILS */}
                    {selectedTab === 0 && computingSubTab === 0 && (
                        <table className="rack-modal-table">
                            <thead>
                                <tr>
                                    <th>Rack</th>
                                    <th>CPU Utilisation</th>
                                    <th>GPU Utilisation</th>
                                    <th>GPU Memory</th>
                                    <th>Memory Utilisation</th>
                                    <th>Disk Utilisation</th>
                                    <th>Network</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedComputingDetails.map((item) => (
                                    <tr key={item.rackId} className="rack-table-row">
                                        <td className="rack-table-cell-name">{item.rackName}</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('cpu', item.cpu)}`}>
                                                {formatPercent(item.cpu)}
                                            </span>
                                        </td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('gpu', item.gpu)}`}>
                                                {formatPercent(item.gpu)}
                                            </span>
                                        </td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('gpuMemory', item.gpuMemory)}`}>
                                                {formatPercent(item.gpuMemory)}
                                            </span>
                                        </td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('memory', item.memory)}`}>
                                                {formatPercent(item.memory)}
                                            </span>
                                        </td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('disk', item.disk)}`}>
                                                {formatPercent(item.disk)}
                                            </span>
                                        </td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('network', item.network)}`}>
                                                {formatPercent(item.network)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* TAB 0, SUB-TAB 1: COMPUTING EFFICIENCY */}
                    {selectedTab === 0 && computingSubTab === 1 && (
                        <table className="rack-modal-table">
                            <thead>
                                <tr>
                                    <th>Rack</th>
                                    <th>CPU</th>
                                    <th>Power</th>
                                    <th>Inlet Temp</th>
                                    <th>Outlet Temp</th>
                                    <th>Coolant Flow</th>
                                    <th>Computing Eff.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedComputingEfficiency.map((item) => (
                                    <tr key={item.rackId} className="rack-table-row">
                                        <td className="rack-table-cell-name">{item.rackName}</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('cpu', item.cpu)}`}>
                                                {formatPercent(item.cpu)}
                                            </span>
                                        </td>
                                        {/* Plain text for non-percentage values */}
                                        <td className="rack-table-cell-center">{item.power.toFixed(2)} kW</td>
                                        <td className="rack-table-cell-center">{item.inletTemp.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.outletTemp.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.coolantFlow.toFixed(2)} L/min</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('computingEff', item.computingEff)}`}>
                                                {formatPercent(item.computingEff)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* TAB 1, SUB-TAB 0: LIQUID COOLING */}
                    {selectedTab === 1 && coolingSubTab === 0 && (
                        <table className="rack-modal-table">
                            <thead>
                                <tr>
                                    <th>Rack</th>
                                    <th>Coolant Inlet</th>
                                    <th>Coolant Outlet</th>
                                    <th>ΔT</th>
                                    <th>Coolant Flow</th>
                                    <th>Heat Removal</th>
                                    <th>Cooling Eff.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedLiquidCooling.map((item) => (
                                    <tr key={item.rackId} className="rack-table-row">
                                        <td className="rack-table-cell-name">{item.rackName}</td>
                                        <td className="rack-table-cell-center">{item.coolantInlet.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.coolantOutlet.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.deltaT.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.coolantFlow.toFixed(2)} L/min</td>
                                        <td className="rack-table-cell-center">{item.heatRemoval} kW</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('coolingEff', item.coolingEff)}`}>
                                                {formatPercent(item.coolingEff)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* TAB 1, SUB-TAB 1: AIR COOLING */}
                    {selectedTab === 1 && coolingSubTab === 1 && (
                        <table className="rack-modal-table">
                            <thead>
                                <tr>
                                    <th>Rack</th>
                                    <th>Hall Supply</th>
                                    <th>Hall Return</th>
                                    <th>ΔT</th>
                                    <th>Airflow</th>
                                    <th>Heat Removal</th>
                                    <th>Cooling Eff.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedAirCooling.map((item) => (
                                    <tr key={item.rackId} className="rack-table-row">
                                        <td className="rack-table-cell-name">{item.rackName}</td>
                                        <td className="rack-table-cell-center">{item.hallSupply.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.hallReturn.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.deltaT.toFixed(2)} °C</td>
                                        <td className="rack-table-cell-center">{item.airflow.toFixed(2)} CFM</td>
                                        <td className="rack-table-cell-center">{item.heatRemoval.toFixed(2)} kW</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('coolingEff', item.coolingEff)}`}>
                                                {formatPercent(item.coolingEff)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* TAB 2: POWER TELEMETRY */}
                    {selectedTab === 2 && (
                        <table className="rack-modal-table">
                            <thead>
                                <tr>
                                    <th>Rack</th>
                                    <th>Active Servers</th>
                                    <th>Active Power</th>
                                    <th>Avg Power</th>
                                    <th>Peak Power</th>
                                    <th>Capacity</th>
                                    <th>Utilization</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPowerData.map((item) => (
                                    <tr key={item.rackId} className="rack-table-row">
                                        <td className="rack-table-cell-name">{item.rackName}</td>
                                        <td className="rack-table-cell-center">{item.activeServer}</td>
                                        <td className="rack-table-cell-center">{item.activePower.toFixed(2)} kW</td>
                                        <td className="rack-table-cell-center">{item.avgPower.toFixed(2)} kW</td>
                                        <td className="rack-table-cell-center">{item.peakPower.toFixed(2)} kW</td>
                                        <td className="rack-table-cell-center">{item.capacity} kW</td>
                                        <td className="rack-table-cell-center">
                                            <span className={`utilization-badge ${getBadgeClass('utilization', item.utilization)}`}>
                                                {formatPercent(item.utilization)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Reusable Historical Data Modal */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rowLabel} - Historical Data`}
                level="row"
                rowLabel={rowLabel}
                currentScenario={currentScenario}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
