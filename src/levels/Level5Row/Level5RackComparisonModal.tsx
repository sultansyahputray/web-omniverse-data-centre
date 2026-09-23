import React, { useState, useMemo, useEffect } from 'react';
import { NavigationButton, ButtonBarWithStatus, ButtonBarWithStatusItem, CloseButton } from '../../reusable/Button';
import { Sort, SortItem } from '../../reusable/SortFilter';
import { HistoricalDataModal } from '../../reusable/HistoricalDataModal';
import './Level5RackComparisonModal.css';

// Dual Server Rack Icon matching the user's header screenshot
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

export interface RackTelemetryItem {
    rackId: string;
    rackName: string;
    activeServer: number;
    activePower: number; // in kW
    avgPower: number;    // in kW
    peakPower: number;   // in kW
    capacity: number;   // in kW
    utilization: number;// in %
}

// 9 Rows matching the exact figures from the user's screenshot
const INITIAL_RACK_DATA: RackTelemetryItem[] = [
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

const TAB_ITEMS: ButtonBarWithStatusItem[] = [
    { label: 'Computing' },
    { label: 'Cooling' },
    { label: 'Power' }
];

const SORT_OPTIONS: SortItem[] = [
    { id: 'occurrences', label: 'Highest Occurrences' },
    { id: 'utilization', label: 'Utilization' },
    { id: 'activePower', label: 'Active Power' },
    { id: 'activeServer', label: 'Active Server' },
    { id: 'rackName', label: 'Rack' }
];

interface Level5RackComparisonModalProps {
    isOpen: boolean;
    rowLabel?: string;
    onClose: () => void;
    onViewHistory?: () => void;
}

export const Level5RackComparisonModal: React.FC<Level5RackComparisonModalProps> = ({
    isOpen,
    rowLabel = 'Row B',
    onClose,
    onViewHistory
}) => {
    const [selectedTab, setSelectedTab] = useState(0);
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

    // Sorting logic
    const sortedData = useMemo(() => {
        const data = [...INITIAL_RACK_DATA];

        if (sortKey === 'occurrences') {
            return isAsc ? [...data].reverse() : data;
        }

        return data.sort((a, b) => {
            let valA = a[sortKey as keyof RackTelemetryItem];
            let valB = b[sortKey as keyof RackTelemetryItem];

            if (typeof valA === 'string') {
                return isAsc
                    ? (valA as string).localeCompare(valB as string)
                    : (valB as string).localeCompare(valA as string);
            }

            return isAsc
                ? (valA as number) - (valB as number)
                : (valB as number) - (valA as number);
        });
    }, [sortKey, isAsc]);

    if (!isOpen) return null;

    const getUtilizationBadgeClass = (util: number) => {
        if (util < 60) return 'badge-green';
        if (util <= 80) return 'badge-yellow';
        return 'badge-orange';
    };

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

                {/* 2. Controls Row: Button Bar (Tabs) + Sort Filter */}
                <div className="rack-modal-controls">
                    <ButtonBarWithStatus
                        items={TAB_ITEMS}
                        selectedIndex={selectedTab}
                        onSelect={(idx) => setSelectedTab(idx)}
                    />

                    <Sort
                        items={SORT_OPTIONS}
                        label="Sort By"
                        value={sortKey}
                        onChange={(val) => setSortKey(val)}
                        is_asc={isAsc}
                        onToggleSort={() => setIsAsc(!isAsc)}
                    />
                </div>

                {/* 3. Telemetry Table */}
                <div className="rack-modal-table-container">
                    <table className="rack-modal-table">
                        <thead>
                            <tr>
                                <th>Rack</th>
                                <th>Active Server</th>
                                <th>Active Power</th>
                                <th>Avg Power</th>
                                <th>Peak Power</th>
                                <th>Capacity</th>
                                <th>Utilization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item) => (
                                <tr key={item.rackId} className="rack-table-row">
                                    <td className="rack-table-cell-name">{item.rackName}</td>
                                    <td className="rack-table-cell-center">{item.activeServer}</td>
                                    <td className="rack-table-cell-center">{item.activePower.toFixed(1)} kW</td>
                                    <td className="rack-table-cell-center">{item.avgPower.toFixed(1)} kW</td>
                                    <td className="rack-table-cell-center">{item.peakPower.toFixed(1)} kW</td>
                                    <td className="rack-table-cell-center">{item.capacity} kW</td>
                                    <td className="rack-table-cell-center">
                                        <span className={`utilization-badge ${getUtilizationBadgeClass(item.utilization)}`}>
                                            {item.utilization.toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reusable Historical Data Modal with Fullscreen Backdrop Blur */}
            <HistoricalDataModal
                isOpen={isHistoryOpen}
                title={`NVL72 ${rowLabel} - Historical Data`}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};
