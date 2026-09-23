import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Reusable.css';

// SVG Icon for Server Chassis in Header (3 rack chassis with LEDs and handles)
export const ServerHeaderIcon: React.FC<{ size?: number; color?: string }> = ({
    size = 26,
    color = '#00E5FF'
}) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="22" height="6" rx="2" stroke={color} strokeWidth="1.8" />
        <circle cx="7" cy="6" r="1.1" fill={color} />
        <circle cx="10.5" cy="6" r="1.1" fill={color} />
        <line x1="14" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

        <rect x="3" y="11" width="22" height="6" rx="2" stroke={color} strokeWidth="1.8" />
        <circle cx="7" cy="14" r="1.1" fill={color} />
        <circle cx="10.5" cy="14" r="1.1" fill={color} />
        <line x1="14" y1="14" x2="21" y2="14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

        <rect x="3" y="19" width="22" height="6" rx="2" stroke={color} strokeWidth="1.8" />
        <circle cx="7" cy="22" r="1.1" fill={color} />
        <circle cx="10.5" cy="22" r="1.1" fill={color} />
        <line x1="14" y1="22" x2="21" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export interface HistoricalParameter {
    id: string;
    name: string;
    chartTitle?: string;
    category: 'computing' | 'cooling' | 'power';
    value: string;
    badgeColor?: 'green' | 'yellow' | 'orange' | 'red';
    unitLabel?: string;
    yAxisMax?: number;
    yAxisTicks?: number[];
    chartData?: number[];
    currentCallout?: { time: string; value: string | number };
}

// 24 Hour Time Intervals matching mockup
const TIME_LABELS = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'
];

// Rich default parameters matching user's reference mockup
const DEFAULT_PARAMETERS: HistoricalParameter[] = [
    {
        id: 'cpu_util',
        name: 'CPU Utilization',
        chartTitle: 'CPU Utilization (%)',
        category: 'computing',
        value: '27%',
        badgeColor: 'green',
        yAxisMax: 100,
        yAxisTicks: [0, 50, 100],
        chartData: [48, 50, 60, 52, 70, 55, 62, 60, 50, 58, 48],
        currentCallout: { time: '10:42', value: '27' }
    },
    {
        id: 'gpu_util',
        name: 'GPU Utilization',
        chartTitle: 'GPU Utilization (%)',
        category: 'computing',
        value: '24%',
        badgeColor: 'green',
        yAxisMax: 100,
        yAxisTicks: [0, 50, 100],
        chartData: [30, 32, 45, 40, 55, 45, 48, 42, 38, 45, 34],
        currentCallout: { time: '10:42', value: '24' }
    },
    {
        id: 'active_gpu_count',
        name: 'Active GPU Count',
        chartTitle: 'Active GPU Count',
        category: 'computing',
        value: '4 / 8',
        badgeColor: 'yellow',
        yAxisMax: 8,
        yAxisTicks: [0, 4, 8],
        chartData: [4, 4, 6, 6, 8, 6, 6, 5, 4, 5, 4],
        currentCallout: { time: '10:42', value: '4' }
    },
    {
        id: 'gpu_memory',
        name: 'GPU Memory Utilization',
        chartTitle: 'GPU Memory Utilization (%)',
        category: 'computing',
        value: '29%',
        badgeColor: 'green',
        yAxisMax: 100,
        yAxisTicks: [0, 50, 100],
        chartData: [35, 38, 50, 48, 62, 54, 56, 48, 44, 50, 39],
        currentCallout: { time: '10:42', value: '29' }
    },
    {
        id: 'memory_util',
        name: 'Memory Utilization',
        chartTitle: 'Memory Utilization (%)',
        category: 'computing',
        value: '36%',
        badgeColor: 'green',
        yAxisMax: 100,
        yAxisTicks: [0, 50, 100],
        chartData: [40, 42, 52, 50, 65, 58, 60, 54, 50, 55, 46],
        currentCallout: { time: '10:42', value: '36' }
    },
    {
        id: 'disk_util',
        name: 'Disk Utilization',
        chartTitle: 'Disk Utilization (%)',
        category: 'computing',
        value: '31%',
        badgeColor: 'green',
        yAxisMax: 100,
        yAxisTicks: [0, 50, 100],
        chartData: [32, 34, 38, 36, 42, 40, 44, 42, 40, 41, 38],
        currentCallout: { time: '10:42', value: '31' }
    },
    {
        id: 'rw_throughput',
        name: 'Read/Write Throughput',
        chartTitle: 'Read/Write Throughput (GB/s)',
        category: 'computing',
        value: '2.8/1.9',
        unitLabel: 'GB/s',
        badgeColor: 'yellow',
        yAxisMax: 5,
        yAxisTicks: [0, 2.5, 5],
        chartData: [2.1, 2.4, 3.2, 3.0, 4.2, 3.5, 3.8, 3.2, 2.9, 3.4, 2.8],
        currentCallout: { time: '10:42', value: '2.8' }
    },
    {
        id: 'network_throughput',
        name: 'Network Throughput',
        chartTitle: 'Network Throughput (Gbps)',
        category: 'computing',
        value: '15.2',
        unitLabel: 'Gbps',
        badgeColor: 'green',
        yAxisMax: 30,
        yAxisTicks: [0, 15, 30],
        chartData: [12, 14, 20, 18, 25, 21, 23, 19, 17, 21, 15.2],
        currentCallout: { time: '10:42', value: '15.2' }
    },
    {
        id: 'running_jobs',
        name: 'Running Jobs',
        chartTitle: 'Running Jobs',
        category: 'computing',
        value: '4',
        badgeColor: 'green',
        yAxisMax: 10,
        yAxisTicks: [0, 5, 10],
        chartData: [3, 4, 6, 5, 8, 6, 7, 5, 4, 6, 4],
        currentCallout: { time: '10:42', value: '4' }
    },
    {
        id: 'active_servers',
        name: 'Active Servers',
        chartTitle: 'Active Servers',
        category: 'computing',
        value: '13/13',
        badgeColor: 'green',
        yAxisMax: 16,
        yAxisTicks: [0, 8, 16],
        chartData: [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
        currentCallout: { time: '10:42', value: '13' }
    },
    {
        id: 'coolant_flow',
        name: 'Coolant Flow (L/min)',
        chartTitle: 'Coolant Flow (L/min)',
        category: 'cooling',
        value: '10.9',
        unitLabel: 'L/min',
        badgeColor: 'green',
        yAxisMax: 30,
        yAxisTicks: [0, 15, 30],
        chartData: [12, 16, 15, 21, 24, 19, 15, 18, 14, 16, 10.9],
        currentCallout: { time: '10:42', value: '10.9' }
    },
    {
        id: 'active_power',
        name: 'Active Power(kW)',
        chartTitle: 'Active Power(kW)',
        category: 'power',
        value: '11.5',
        unitLabel: 'kW',
        badgeColor: 'green',
        yAxisMax: 30,
        yAxisTicks: [0, 15, 30],
        chartData: [14, 17, 16, 23, 26, 21, 17, 19, 16, 17, 11.5],
        currentCallout: { time: '10:42', value: '11.5' }
    }
];

// Reusable SVG Line Chart with hover tooltip
const SVGHistoricalLineChart: React.FC<{
    param: HistoricalParameter;
    onRemove: () => void;
}> = ({ param, onRemove }) => {
    const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; time: string; value: string } | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const dataPoints = param.chartData || [30, 40, 50, 45, 60, 55, 58, 52, 48, 55, 40];
    const maxVal = param.yAxisMax || 100;
    const ticks = param.yAxisTicks || [0, maxVal / 2, maxVal];

    const chartWidth = 620;
    const chartHeight = 115;
    const paddingLeft = 38;
    const paddingRight = 24;
    const paddingTop = 12;
    const paddingBottom = 26;

    const plotWidth = chartWidth - paddingLeft - paddingRight;
    const plotHeight = chartHeight - paddingTop - paddingBottom;

    // Time cursor at 10:42 (10.7 out of 24h) — data line ends here
    const cursorX = paddingLeft + (10.7 / 24) * plotWidth;

    // Calculate polyline points terminating at cursorX
    const pointCoords = dataPoints.map((val, index) => {
        const x = paddingLeft + (index / (dataPoints.length - 1)) * (cursorX - paddingLeft);
        const y = paddingTop + plotHeight - (val / maxVal) * plotHeight;
        return { x, y, val };
    });
    const points = pointCoords.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

    const titleText = param.chartTitle || param.name;

    // Handle mouse move over chart area
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const scaleX = chartWidth / rect.width;
        const mouseX = (e.clientX - rect.left) * scaleX;

        // Only show tooltip within the data range
        if (mouseX < paddingLeft || mouseX > cursorX) {
            setHoverInfo(null);
            return;
        }

        // Find closest data point
        let closestIdx = 0;
        let closestDist = Infinity;
        pointCoords.forEach((p, idx) => {
            const dist = Math.abs(p.x - mouseX);
            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = idx;
            }
        });

        const p = pointCoords[closestIdx];
        // Calculate time from x position
        const timeRatio = (p.x - paddingLeft) / plotWidth;
        const totalMinutes = timeRatio * 24 * 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        setHoverInfo({
            x: p.x,
            y: p.y,
            time: timeStr,
            value: String(p.val)
        });
    };

    const handleMouseLeave = () => {
        setHoverInfo(null);
    };

    return (
        <div className="hd-chart-card">
            <div className="hd-chart-header">
                <button
                    type="button"
                    className="hd-remove-btn"
                    onClick={onRemove}
                    title={`Remove ${titleText}`}
                    aria-label={`Remove ${titleText}`}
                >
                    −
                </button>
                <span className="hd-chart-title">{titleText}</span>
            </div>

            <div className="hd-chart-wrapper">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="hd-chart-svg"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Horizontal Gridlines & Y-Axis Labels */}
                    {ticks.map((tickVal) => {
                        const y = paddingTop + plotHeight - (tickVal / maxVal) * plotHeight;
                        return (
                            <g key={tickVal}>
                                <text
                                    x={paddingLeft - 8}
                                    y={y + 3}
                                    textAnchor="end"
                                    fill="#94a3b8"
                                    fontSize="9px"
                                    fontFamily="Inter, system-ui, sans-serif"
                                    fontWeight="500"
                                >
                                    {tickVal}
                                </text>
                                <line
                                    x1={paddingLeft}
                                    y1={y}
                                    x2={chartWidth - paddingRight}
                                    y2={y}
                                    stroke="rgba(255, 255, 255, 0.08)"
                                    strokeDasharray="2 3"
                                    strokeWidth="1"
                                />
                            </g>
                        );
                    })}

                    {/* Timeline Data Polyline */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Hover: Vertical line + Callout Tooltip */}
                    {hoverInfo && (
                        <>
                            <line
                                x1={hoverInfo.x}
                                y1={paddingTop - 4}
                                x2={hoverInfo.x}
                                y2={chartHeight - paddingBottom}
                                stroke="#00E5FF"
                                strokeWidth="1.8"
                            />
                            <circle
                                cx={hoverInfo.x}
                                cy={hoverInfo.y}
                                r="3.5"
                                fill="#00E5FF"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                            />
                            <g transform={`translate(${hoverInfo.x + 6}, ${paddingTop - 6})`}>
                                <rect
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="35"
                                    rx="6"
                                    fill="#FFFFFF"
                                    filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
                                />
                                <text
                                    x="26"
                                    y="14"
                                    textAnchor="middle"
                                    fill="#64748b"
                                    fontSize="9px"
                                    fontFamily="Inter, system-ui, sans-serif"
                                    fontWeight="600"
                                >
                                    {hoverInfo.time}
                                </text>
                                <text
                                    x="26"
                                    y="29"
                                    textAnchor="middle"
                                    fill="#0f172a"
                                    fontSize="13px"
                                    fontFamily="Inter, system-ui, sans-serif"
                                    fontWeight="800"
                                >
                                    {hoverInfo.value}
                                </text>
                            </g>
                        </>
                    )}

                    {/* X-Axis Horizontal Baseline */}
                    <line
                        x1={paddingLeft}
                        y1={chartHeight - paddingBottom}
                        x2={chartWidth - paddingRight}
                        y2={chartHeight - paddingBottom}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1"
                    />

                    {/* X-Axis Ticks and Labels */}
                    {TIME_LABELS.map((label, idx) => {
                        const x = paddingLeft + (idx / (TIME_LABELS.length - 1)) * plotWidth;
                        return (
                            <g key={label}>
                                <line
                                    x1={x}
                                    y1={chartHeight - paddingBottom}
                                    x2={x}
                                    y2={chartHeight - paddingBottom + 4}
                                    stroke="rgba(255, 255, 255, 0.3)"
                                    strokeWidth="1"
                                />
                                <text
                                    x={x}
                                    y={chartHeight - paddingBottom + 15}
                                    textAnchor="middle"
                                    fill="#94a3b8"
                                    fontSize="8.5px"
                                    fontFamily="Inter, system-ui, sans-serif"
                                    fontWeight="500"
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Transparent interactive overlay for reliable hover detection */}
                    <rect
                        x={paddingLeft}
                        y={paddingTop}
                        width={plotWidth}
                        height={plotHeight}
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                    />
                </svg>
            </div>
        </div>
    );
};

export interface HistoricalDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    parameters?: HistoricalParameter[];
    initialSelectedParamIds?: string[];
    rackOptions?: { id: string; label: string }[];
    selectedRack?: string;
    onSelectRack?: (rack: string) => void;
}

export const HistoricalDataModal: React.FC<HistoricalDataModalProps> = ({
    isOpen,
    onClose,
    title = 'Superchip 2 Historical Data',
    parameters = DEFAULT_PARAMETERS,
    initialSelectedParamIds = ['cpu_util', 'coolant_flow', 'active_power'],
    rackOptions = [
        { id: '1', label: '1' },
        { id: '2', label: '2' },
        { id: '3', label: '3' },
        { id: '4', label: '4' },
        { id: '5', label: '5' },
        { id: '6', label: '6' },
        { id: '7', label: '7' },
        { id: '8', label: '8' }
    ],
    selectedRack: controlledRack,
    onSelectRack
}) => {
    const [activeTab, setActiveTab] = useState<'all' | 'computing' | 'cooling' | 'power'>('all');
    const [rack, setRack] = useState(controlledRack || '4');
    const [filterBy, setFilterBy] = useState('Daily');
    const [selectedDate, setSelectedDate] = useState('2025-02-01');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialSelectedParamIds);
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Escape key listener
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Filter parameters by selected category and search input
    const filteredParams = useMemo(() => {
        return parameters.filter((p) => {
            if (activeTab !== 'all' && p.category !== activeTab) return false;
            if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [parameters, activeTab, searchQuery]);

    // Pagination for parameter list (10 per page to match mockup)
    const itemsPerPage = 10;
    const maxPage = Math.max(1, Math.ceil(filteredParams.length / itemsPerPage));
    const paginatedParams = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredParams.slice(start, start + itemsPerPage);
    }, [filteredParams, currentPage, itemsPerPage]);

    // Reset pagination when search or tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    const toggleParam = (id: string) => {
        setSelectedParamIds((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleRackChange = (val: string) => {
        setRack(val);
        if (onSelectRack) onSelectRack(val);
    };

    const formatDateDisplay = (isoDate: string) => {
        try {
            const [y, m, d] = isoDate.split('-');
            if (y && m && d) {
                return `${d}/${m}/${y}`;
            }
            return isoDate;
        } catch {
            return isoDate;
        }
    };

    if (!isOpen) return null;

    // Parameters to display in chart column
    const activeCharts = parameters.filter((p) => selectedParamIds.includes(p.id));

    return (
        <div
            className="hd-modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="hd-modal-content">
                {/* 1. Modal Header */}
                <div className="hd-header">
                    <div className="hd-header-left">
                        <ServerHeaderIcon size={26} color="#00E5FF" />
                        <h2 className="hd-title">{title}</h2>
                    </div>
                    <button
                        type="button"
                        className="hd-close-btn"
                        onClick={onClose}
                        title="Close historical view"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div className="title-h-divider"></div>

                {/* 2. Toolbar: Strictly single non-wrapping horizontal row */}
                <div className="hd-toolbar">
                    {/* Left: Capsule Tabs */}
                    <div className="hd-tabs">
                        <button
                            type="button"
                            className={`hd-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            className={`hd-tab-btn ${activeTab === 'computing' ? 'active' : ''}`}
                            onClick={() => setActiveTab('computing')}
                        >
                            Computing
                            <span className="hd-badge warning">2</span>
                            <span className="hd-badge alert">1</span>
                        </button>
                        <button
                            type="button"
                            className={`hd-tab-btn ${activeTab === 'cooling' ? 'active' : ''}`}
                            onClick={() => setActiveTab('cooling')}
                        >
                            Cooling
                        </button>
                        <button
                            type="button"
                            className={`hd-tab-btn ${activeTab === 'power' ? 'active' : ''}`}
                            onClick={() => setActiveTab('power')}
                        >
                            Power
                        </button>
                    </div>

                    {/* Right: Inline Filter Controls */}
                    <div className="hd-filters">
                        <div className="hd-filter-group">
                            <label>Rack :</label>
                            <select
                                className="hd-select"
                                value={rack}
                                onChange={(e) => handleRackChange(e.target.value)}
                            >
                                {rackOptions.map((opt) => (
                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="hd-filter-group">
                            <label>Filter by:</label>
                            <select
                                className="hd-select"
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                            >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>

                        <div className="hd-date-group">
                            <div
                                className="hd-date-display"
                                onClick={() => dateInputRef.current?.showPicker?.()}
                            >
                                <span>{formatDateDisplay(selectedDate)}</span>
                                <FontAwesomeIcon icon={"fa-regular fa-calendar" as any} style={{ color: '#d97706', fontSize: '13px' }} />
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <button
                                type="button"
                                className="hd-btn-today"
                                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                            >
                                Today
                            </button>

                            <button
                                type="button"
                                className="hd-btn-filter-icon"
                                title="Filter options"
                                aria-label="Filter options"
                            >
                                <FontAwesomeIcon icon={"fa-solid fa-filter" as any} style={{ fontSize: '12px' }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Main Body: Split Two Columns */}
                <div className="hd-body">
                    {/* Left Column: Search & Metric Selection */}
                    <div className="hd-sidebar">
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                            <div className="hd-search">
                                <input
                                    type="text"
                                    placeholder="Search parameter"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="hd-search-icon">
                                    <FontAwesomeIcon icon={"fa-solid fa-search" as any} />
                                </span>
                            </div>

                            <div className="hd-param-list">
                                {paginatedParams.map((param) => {
                                    const isSelected = selectedParamIds.includes(param.id);
                                    return (
                                        <div
                                            key={param.id}
                                            className="hd-param-item"
                                            onClick={() => toggleParam(param.id)}
                                        >
                                            <div className={`hd-param-check ${isSelected ? 'checked' : 'unchecked'}`}>
                                                {isSelected
                                                    ? <FontAwesomeIcon icon={"fa-solid fa-check" as any} />
                                                    : <FontAwesomeIcon icon={"fa-solid fa-plus" as any} />
                                                }
                                            </div>

                                            <span className="hd-param-name" title={param.name}>
                                                {param.name}
                                            </span>

                                            <div className={`hd-param-val badge-${param.badgeColor || 'green'}`}>
                                                {param.value}
                                            </div>

                                            {param.unitLabel ? (
                                                <span className="hd-param-unit-outer">{param.unitLabel}</span>
                                            ) : (
                                                <span className="hd-param-unit-outer"></span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pagination at bottom of left column */}
                        <div className="hd-pagination">
                            <button
                                type="button"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage <= 1}
                                title="First page"
                            >
                                <FontAwesomeIcon icon={"fa-solid fa-backward-step" as any} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage <= 1}
                                title="Previous page"
                            >
                                <FontAwesomeIcon icon={"fa-solid fa-chevron-left" as any} />
                            </button>
                            <span className="hd-page-info">
                                <span className="hd-page-current">{String(currentPage).padStart(2, '0')}</span>
                                <span className="hd-page-sep"> / </span>
                                <span>{String(maxPage).padStart(2, '0')}</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.min(maxPage, p + 1))}
                                disabled={currentPage >= maxPage}
                                title="Next page"
                            >
                                <FontAwesomeIcon icon={"fa-solid fa-chevron-right" as any} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentPage(maxPage)}
                                disabled={currentPage >= maxPage}
                                title="Last page"
                            >
                                <FontAwesomeIcon icon={"fa-solid fa-forward-step" as any} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Clean Line Charts on Background */}
                    <div className="hd-charts">
                        {activeCharts.length === 0 ? (
                            <div className="hd-empty-state">
                                <span>No metrics selected. Click (+) on any parameter in the left list to plot.</span>
                            </div>
                        ) : (
                            activeCharts.map((param) => (
                                <SVGHistoricalLineChart
                                    key={param.id}
                                    param={param}
                                    onRemove={() => toggleParam(param.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalDataModal;
