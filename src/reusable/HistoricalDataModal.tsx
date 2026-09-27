import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CloseButton } from './Button';
import { getStatus } from '../thresholdUtils';
import level6RackData from '../data/level6Rack.json';
import level5Data from '../data/level5RackComparison.json';
import level7ComputeTrayData from '../data/level7ComputeTray.json';
import level8SuperchipData from '../data/level8Superchip.json';
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
    badgeColor?: 'green' | 'yellow' | 'orange' | 'red' | 'blue';
    unitLabel?: string;
    yAxisMax?: number;
    yAxisTicks?: number[];
    chartData?: number[];
    currentCallout?: { time: string; value: string | number };
}

// 24 Hour Time Intervals matching original mockup
const TIME_LABELS = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'
];

function getSlotIndexFromTime(date: Date = new Date()): number {
    const minutes = date.getMinutes();
    const slot = Math.floor(minutes / 6);
    return Math.min(Math.max(slot, 0), 9);
}

// =========================================================================
// LEVEL 6 (RACK LEVEL) PARAMETER GENERATOR
// =========================================================================
function buildRackParameters(timeSlot: number): HistoricalParameter[] {
    const comp = level6RackData.computing[timeSlot] || level6RackData.computing[0];
    const cool = level6RackData.cooling[timeSlot] || level6RackData.cooling[0];
    const pwr = level6RackData.power[timeSlot] || level6RackData.power[0];

    return [
        // --- COMPUTING ---
        {
            id: 'cpu_util',
            name: 'CPU Utilization',
            chartTitle: 'CPU Utilization (%)',
            category: 'computing',
            value: comp.cpuUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('cpuUtil', comp.cpuUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [48, 50, 60, 52, 70, 55, 62, 60, 50, 58, 48],
            currentCallout: { time: '10:42', value: comp.cpuUtil.toFixed(2) }
        },
        {
            id: 'gpu_util',
            name: 'GPU Utilization',
            chartTitle: 'GPU Utilization (%)',
            category: 'computing',
            value: comp.gpuUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('gpuUtil', comp.gpuUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [30, 32, 45, 40, 55, 45, 48, 42, 38, 45, 34],
            currentCallout: { time: '10:42', value: comp.gpuUtil.toFixed(2) }
        },
        {
            id: 'active_gpu_count',
            name: 'Active GPU Count',
            chartTitle: 'Active GPU Count',
            category: 'computing',
            value: `${comp.activeGpuCount} / 72`,
            unitLabel: '',
            badgeColor: 'green',
            yAxisMax: 72,
            yAxisTicks: [0, 36, 72],
            chartData: [36, 38, 45, 42, 48, 44, 46, 43, 40, 44, comp.activeGpuCount],
            currentCallout: { time: '10:42', value: String(comp.activeGpuCount) }
        },
        {
            id: 'gpu_memory',
            name: 'GPU Memory Utilization',
            chartTitle: 'GPU Memory Utilization (%)',
            category: 'computing',
            value: comp.gpuMemoryUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('gpuMemUtil', comp.gpuMemoryUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [35, 38, 50, 48, 62, 54, 56, 48, 44, 50, 39],
            currentCallout: { time: '10:42', value: comp.gpuMemoryUtil.toFixed(2) }
        },
        {
            id: 'memory_util',
            name: 'Memory Utilization',
            chartTitle: 'Memory Utilization (%)',
            category: 'computing',
            value: comp.memoryUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('memUtil', comp.memoryUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [40, 42, 52, 50, 65, 58, 60, 54, 50, 55, 46],
            currentCallout: { time: '10:42', value: comp.memoryUtil.toFixed(2) }
        },
        {
            id: 'disk_util',
            name: 'Disk Utilization',
            chartTitle: 'Disk Utilization (%)',
            category: 'computing',
            value: comp.diskUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('diskUtil', comp.diskUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [32, 34, 38, 36, 42, 40, 44, 42, 40, 41, 38],
            currentCallout: { time: '10:42', value: comp.diskUtil.toFixed(2) }
        },
        {
            id: 'read_throughput',
            name: 'Read Throughput',
            chartTitle: 'Read Throughput (GB/s)',
            category: 'computing',
            value: comp.readThroughput.toFixed(1),
            unitLabel: 'GB/s',
            badgeColor: 'green',
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [55, 58, 65, 62, 75, 68, 72, 66, 62, 68, Math.round(comp.readThroughput)],
            currentCallout: { time: '10:42', value: comp.readThroughput.toFixed(1) }
        },
        {
            id: 'write_throughput',
            name: 'Write Throughput',
            chartTitle: 'Write Throughput (GB/s)',
            category: 'computing',
            value: comp.writeThroughput.toFixed(1),
            unitLabel: 'GB/s',
            badgeColor: 'green',
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [45, 48, 55, 52, 65, 58, 62, 56, 52, 58, Math.round(comp.writeThroughput)],
            currentCallout: { time: '10:42', value: comp.writeThroughput.toFixed(1) }
        },
        {
            id: 'network_throughput',
            name: 'Network Throughput',
            chartTitle: 'Network Throughput (Gbps)',
            category: 'computing',
            value: comp.networkThroughput.toFixed(1),
            unitLabel: 'Gbps',
            badgeColor: 'green',
            yAxisMax: 8000,
            yAxisTicks: [0, 4000, 8000],
            chartData: [4500, 4800, 6000, 5500, 7200, 6200, 6800, 5800, 5400, 6200, Math.round(comp.networkThroughput)],
            currentCallout: { time: '10:42', value: comp.networkThroughput.toFixed(1) }
        },
        {
            id: 'running_jobs',
            name: 'Running Jobs',
            chartTitle: 'Running Jobs',
            category: 'computing',
            value: String(comp.runningJobs),
            unitLabel: '',
            badgeColor: 'green',
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [35, 40, 55, 50, 68, 58, 62, 54, 48, 56, comp.runningJobs],
            currentCallout: { time: '10:42', value: String(comp.runningJobs) }
        },
        {
            id: 'active_servers',
            name: 'Active Servers',
            chartTitle: 'Active Servers',
            category: 'computing',
            value: `${comp.activeServers} / 16`,
            unitLabel: '',
            badgeColor: 'green',
            yAxisMax: 16,
            yAxisTicks: [0, 8, 16],
            chartData: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, comp.activeServers],
            currentCallout: { time: '10:42', value: String(comp.activeServers) }
        },
        {
            id: 'cpu_throttling',
            name: 'CPU Thermal Throttling',
            chartTitle: 'CPU Thermal Throttling Events',
            category: 'computing',
            value: String(comp.cpuThermalThrottling || 0),
            unitLabel: '',
            badgeColor: (comp.cpuThermalThrottling || 0) > 0 ? 'red' : 'green',
            yAxisMax: 5,
            yAxisTicks: [0, 2.5, 5],
            chartData: [0, 0, 1, 2, 1, 0, 0, 1, 2, 0, comp.cpuThermalThrottling || 0],
            currentCallout: { time: '10:42', value: String(comp.cpuThermalThrottling || 0) }
        },
        {
            id: 'gpu_throttling',
            name: 'GPU Thermal Throttling',
            chartTitle: 'GPU Thermal Throttling Events',
            category: 'computing',
            value: String(comp.gpuThermalThrottling || 0),
            unitLabel: '',
            badgeColor: (comp.gpuThermalThrottling || 0) > 0 ? 'red' : 'green',
            yAxisMax: 5,
            yAxisTicks: [0, 2.5, 5],
            chartData: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, comp.gpuThermalThrottling || 0],
            currentCallout: { time: '10:42', value: String(comp.gpuThermalThrottling || 0) }
        },

        // --- COOLING ---
        {
            id: 'coolant_flow',
            name: 'Coolant Flow Rate',
            chartTitle: 'Coolant Flow (L/min)',
            category: 'cooling',
            value: cool.coolantFlowRate.toFixed(1),
            unitLabel: 'L/min',
            badgeColor: getStatus('hallCoolantFlow', cool.coolantFlowRate) as any,
            yAxisMax: 30,
            yAxisTicks: [0, 15, 30],
            chartData: [12, 16, 15, 21, 24, 19, 15, 18, 14, 16, 10.9],
            currentCallout: { time: '10:42', value: '10.9' }
        },
        {
            id: 'coolant_supply_temp',
            name: 'Coolant Supply Temp',
            chartTitle: 'Coolant Supply Temp (°C)',
            category: 'cooling',
            value: cool.coolantSupplyTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantInletTemp', cool.coolantSupplyTemp) as any,
            yAxisMax: 60,
            yAxisTicks: [0, 30, 60],
            chartData: [38, 40, 45, 42, 48, 44, 46, 43, 41, 45, Math.round(cool.coolantSupplyTemp)],
            currentCallout: { time: '10:42', value: cool.coolantSupplyTemp.toFixed(2) }
        },
        {
            id: 'coolant_return_temp',
            name: 'Coolant Return Temp',
            chartTitle: 'Coolant Return Temp (°C)',
            category: 'cooling',
            value: cool.coolantReturnTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantOutletTemp', cool.coolantReturnTemp) as any,
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [52, 54, 62, 58, 68, 62, 65, 60, 58, 62, Math.round(cool.coolantReturnTemp)],
            currentCallout: { time: '10:42', value: cool.coolantReturnTemp.toFixed(2) }
        },
        {
            id: 'coolant_pressure',
            name: 'Coolant Pressure',
            chartTitle: 'Coolant Pressure (bar)',
            category: 'cooling',
            value: cool.coolantPressure.toFixed(2),
            unitLabel: 'bar',
            badgeColor: 'green',
            yAxisMax: 4,
            yAxisTicks: [0, 2, 4],
            chartData: [2.1, 2.2, 2.6, 2.4, 2.8, 2.5, 2.7, 2.4, 2.3, 2.5, Number(cool.coolantPressure.toFixed(1))],
            currentCallout: { time: '10:42', value: cool.coolantPressure.toFixed(2) }
        },
        {
            id: 'heat_removed',
            name: 'Heat Removed',
            chartTitle: 'Heat Removed (kW)',
            category: 'cooling',
            value: String(cool.heatRemoved),
            unitLabel: 'kW',
            badgeColor: 'green',
            yAxisMax: 120,
            yAxisTicks: [0, 60, 120],
            chartData: [65, 70, 85, 80, 95, 85, 90, 82, 78, 86, cool.heatRemoved],
            currentCallout: { time: '10:42', value: String(cool.heatRemoved) }
        },
        {
            id: 'coolant_leak',
            name: 'Coolant Leak Status',
            chartTitle: 'Coolant Leak Status',
            category: 'cooling',
            value: cool.coolantLeakStatus,
            unitLabel: '',
            badgeColor: cool.coolantLeakStatus === 'No Leak' ? 'green' : 'red',
            yAxisMax: 1,
            yAxisTicks: [0, 1],
            chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            currentCallout: { time: '10:42', value: '0' }
        },
        {
            id: 'cpu_temp',
            name: 'CPU Temperature',
            chartTitle: 'CPU Temperature (°C)',
            category: 'cooling',
            value: cool.cpuTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: cool.cpuTemp <= 65 ? 'green' : 'yellow',
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [48, 50, 58, 54, 64, 58, 60, 56, 52, 58, Math.round(cool.cpuTemp)],
            currentCallout: { time: '10:42', value: cool.cpuTemp.toFixed(2) }
        },
        {
            id: 'gpu_temp',
            name: 'GPU Temperature',
            chartTitle: 'GPU Temperature (°C)',
            category: 'cooling',
            value: cool.gpu1Temp.toFixed(2),
            unitLabel: '°C',
            badgeColor: cool.gpu1Temp <= 70 ? 'green' : 'yellow',
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [54, 56, 65, 60, 72, 64, 68, 62, 58, 64, Math.round(cool.gpu1Temp)],
            currentCallout: { time: '10:42', value: cool.gpu1Temp.toFixed(2) }
        },
        {
            id: 'cold_aisle',
            name: 'Cold Aisle Temp',
            chartTitle: 'Cold Aisle Temp (°C)',
            category: 'cooling',
            value: cool.coldAisleTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('coldAisleTemp', cool.coldAisleTemp) as any,
            yAxisMax: 40,
            yAxisTicks: [0, 20, 40],
            chartData: [22, 23, 26, 25, 28, 26, 27, 25, 24, 26, Math.round(cool.coldAisleTemp)],
            currentCallout: { time: '10:42', value: cool.coldAisleTemp.toFixed(2) }
        },
        {
            id: 'hot_aisle',
            name: 'Hot Aisle Temp',
            chartTitle: 'Hot Aisle Temp (°C)',
            category: 'cooling',
            value: cool.hotAisleTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('hotAisleTemp', cool.hotAisleTemp) as any,
            yAxisMax: 50,
            yAxisTicks: [0, 25, 50],
            chartData: [30, 32, 38, 35, 42, 38, 40, 36, 34, 38, Math.round(cool.hotAisleTemp)],
            currentCallout: { time: '10:42', value: cool.hotAisleTemp.toFixed(2) }
        },
        {
            id: 'cdu_util',
            name: 'CDU Utilization',
            chartTitle: 'CDU Utilization (%)',
            category: 'cooling',
            value: cool.cduUtilization.toFixed(1),
            unitLabel: '%',
            badgeColor: getStatus('liquidCoolingCapacityUtilisation', cool.cduUtilization) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [32, 35, 45, 40, 52, 45, 48, 42, 38, 44, Math.round(cool.cduUtilization)],
            currentCallout: { time: '10:42', value: cool.cduUtilization.toFixed(1) }
        },
        {
            id: 'cdu_status',
            name: 'CDU Status',
            chartTitle: 'CDU Status',
            category: 'cooling',
            value: cool.cduStatus,
            unitLabel: '',
            badgeColor: cool.cduStatus === 'Operational' ? 'green' : 'yellow',
            yAxisMax: 1,
            yAxisTicks: [0, 1],
            chartData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            currentCallout: { time: '10:42', value: '1' }
        },

        // --- POWER ---
        {
            id: 'active_power',
            name: 'Active Power',
            chartTitle: 'Active Power(kW)',
            category: 'power',
            value: '11.5',
            unitLabel: 'kW',
            badgeColor: getStatus('avgPowerPerRack', pwr.activePower) as any,
            yAxisMax: 30,
            yAxisTicks: [0, 15, 30],
            chartData: [14, 17, 16, 23, 26, 21, 17, 19, 16, 17, 11.5],
            currentCallout: { time: '10:42', value: '11.5' }
        },
        {
            id: 'voltage',
            name: 'Voltage',
            chartTitle: 'Voltage (V)',
            category: 'power',
            value: pwr.voltage.toFixed(2),
            unitLabel: 'V',
            badgeColor: getStatus('powerPathVoltage', pwr.voltage) as any,
            yAxisMax: 600,
            yAxisTicks: [0, 300, 600],
            chartData: [475, 480, 485, 482, 490, 485, 488, 484, 480, 485, Math.round(pwr.voltage)],
            currentCallout: { time: '10:42', value: pwr.voltage.toFixed(2) }
        },
        {
            id: 'current',
            name: 'Current',
            chartTitle: 'Current (A)',
            category: 'power',
            value: pwr.current.toFixed(2),
            unitLabel: 'A',
            badgeColor: 'green',
            yAxisMax: 200,
            yAxisTicks: [0, 100, 200],
            chartData: [115, 120, 140, 130, 155, 140, 148, 135, 128, 140, Math.round(pwr.current)],
            currentCallout: { time: '10:42', value: pwr.current.toFixed(2) }
        },
        {
            id: 'rack_capacity',
            name: 'Rack Capacity',
            chartTitle: 'Rack Capacity (kW)',
            category: 'power',
            value: String(pwr.rackCapacity),
            unitLabel: 'kW',
            badgeColor: 'blue',
            yAxisMax: 200,
            yAxisTicks: [0, 100, 200],
            chartData: [184, 184, 184, 184, 184, 184, 184, 184, 184, 184, pwr.rackCapacity],
            currentCallout: { time: '10:42', value: String(pwr.rackCapacity) }
        },
        {
            id: 'power_util',
            name: 'Power Utilization',
            chartTitle: 'Power Utilization (%)',
            category: 'power',
            value: pwr.powerUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('facilityLoad', pwr.powerUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [45, 48, 60, 55, 68, 60, 64, 58, 52, 60, Math.round(pwr.powerUtil)],
            currentCallout: { time: '10:42', value: pwr.powerUtil.toFixed(2) }
        },
        {
            id: 'daily_consumption',
            name: 'Daily Consumption',
            chartTitle: 'Daily Energy Consumption (kWh)',
            category: 'power',
            value: pwr.dailyConsumption.toFixed(2),
            unitLabel: 'kWh',
            badgeColor: 'green',
            yAxisMax: 1500,
            yAxisTicks: [0, 750, 1500],
            chartData: [850, 900, 1100, 1020, 1250, 1120, 1180, 1080, 1000, 1100, Math.round(pwr.dailyConsumption)],
            currentCallout: { time: '10:42', value: pwr.dailyConsumption.toFixed(2) }
        },
        {
            id: 'ups_status',
            name: 'UPS Status',
            chartTitle: 'UPS Status',
            category: 'power',
            value: pwr.upsStatus,
            unitLabel: '',
            badgeColor: pwr.upsStatus === 'Normal' ? 'green' : 'red',
            yAxisMax: 1,
            yAxisTicks: [0, 1],
            chartData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            currentCallout: { time: '10:42', value: '1' }
        },
        {
            id: 'battery_health',
            name: 'Battery Health',
            chartTitle: 'Battery Health (%)',
            category: 'power',
            value: pwr.batteryHealth.toFixed(1),
            unitLabel: '%',
            badgeColor: pwr.batteryHealth >= 95 ? 'green' : 'yellow',
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [99, 99, 98, 98, 98, 99, 98, 98, 99, 99, Math.round(pwr.batteryHealth)],
            currentCallout: { time: '10:42', value: pwr.batteryHealth.toFixed(1) }
        },
        {
            id: 'pdu_load',
            name: 'PDU Load',
            chartTitle: 'PDU Load (%)',
            category: 'power',
            value: pwr.powerUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('facilityLoad', pwr.powerUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [45, 48, 60, 55, 68, 60, 64, 58, 52, 60, Math.round(pwr.powerUtil)],
            currentCallout: { time: '10:42', value: pwr.powerUtil.toFixed(2) }
        },
        {
            id: 'power_factor',
            name: 'Power Factor',
            chartTitle: 'Power Factor',
            category: 'power',
            value: pwr.powerFactor.toFixed(2),
            unitLabel: '',
            badgeColor: getStatus('powerPathPowerFactor', pwr.powerFactor) as any,
            yAxisMax: 1,
            yAxisTicks: [0, 0.5, 1],
            chartData: [0.94, 0.95, 0.96, 0.95, 0.97, 0.96, 0.96, 0.95, 0.94, 0.96, Number(pwr.powerFactor.toFixed(2))],
            currentCallout: { time: '10:42', value: pwr.powerFactor.toFixed(2) }
        }
    ];
}

// =========================================================================
// LEVEL 5 (ROW LEVEL) PARAMETER GENERATOR
// =========================================================================
function buildRowParameters(rackNum: number, scenario: string, timeSlot: number): HistoricalParameter[] {
    const rawData = (level5Data as any)[scenario] || (level5Data as any)['Medium Load'] || (level5Data as any)['Normal Load'];
    if (!rawData) return buildRackParameters(timeSlot);

    const timeKeys = ['0', '6', '12', '18', '24', '30', '36', '42', '48', '54'];
    const activeKey = timeKeys[timeSlot] || '0';
    const activeSlot = rawData[activeKey];
    if (!activeSlot) return buildRackParameters(timeSlot);

    const targetRackId = `rack_${rackNum}`;
    const compDet = activeSlot.computingDetails?.find((r: any) => r.rackId === targetRackId) || activeSlot.computingDetails?.[0];
    const compEff = activeSlot.computingEfficiency?.find((r: any) => r.rackId === targetRackId) || activeSlot.computingEfficiency?.[0];
    const pwr = activeSlot.power?.find((r: any) => r.rackId === targetRackId) || activeSlot.power?.[0];
    const liq = activeSlot.liquidCooling?.find((r: any) => r.rackId === targetRackId) || activeSlot.liquidCooling?.[0];
    const air = activeSlot.airCooling?.find((r: any) => r.rackId === targetRackId) || activeSlot.airCooling?.[0];

    const cpuVal = compDet ? Number(compDet.cpu) : 50;
    const gpuVal = compDet ? Number(compDet.gpu) : 60;
    const gpuMemVal = compDet ? Number(compDet.gpuMemory) : 50;
    const memVal = compDet ? Number(compDet.memory) : 50;
    const diskVal = compDet ? Number(compDet.disk) : 50;
    const netVal = compDet ? Number(compDet.network) : 50;
    const compEffVal = compEff ? Number(compEff.computingEff) : 90;
    const coolantFlowCompVal = compEff ? Number(compEff.coolantFlow) : 70;
    const inletTempVal = compEff ? Number(compEff.inletTemp) : 45;
    const outletTempVal = compEff ? Number(compEff.outletTemp) : 60;

    const coolantInletVal = liq ? Number(liq.coolantInlet) : 45;
    const coolantOutletVal = liq ? Number(liq.coolantOutlet) : 60;
    const liquidDeltaTVal = liq ? Number(liq.deltaT) : 14;
    const liquidHeatVal = liq ? Number(liq.heatRemoval) : 75;
    const liqEffVal = liq ? Number(liq.coolingEff) : 88;

    const hallSupplyVal = air ? Number(air.hallSupply) : 25;
    const hallReturnVal = air ? Number(air.hallReturn) : 33;
    const airDeltaTVal = air ? Number(air.deltaT) : 8;
    const airflowVal = air ? Number(air.airflow) : 1450;
    const airHeatVal = air ? Number(air.heatRemoval) : 5.5;
    const airEffVal = air ? Number(air.coolingEff) : 86;

    const activeServersVal = pwr ? Number(pwr.activeServer) : 16;
    const avgPowerVal = pwr ? Number(pwr.avgPower) : 95;
    const peakPowerVal = pwr ? Number(pwr.peakPower) : 105;
    const capacityVal = pwr ? Number(pwr.capacity) : 199;
    const utilVal = pwr ? Number(pwr.utilization) : 45;

    return [
        // --- COMPUTING ---
        {
            id: 'cpu_util',
            name: 'CPU Utilisation',
            chartTitle: 'CPU Utilization (%)',
            category: 'computing',
            value: cpuVal.toFixed(1),
            unitLabel: '%',
            badgeColor: getStatus('cpuUtil', cpuVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [48, 50, 60, 52, 70, 55, 62, 60, 50, 58, 48],
            currentCallout: { time: '10:42', value: cpuVal.toFixed(1) }
        },
        {
            id: 'gpu_util',
            name: 'GPU Utilisation',
            chartTitle: 'GPU Utilization (%)',
            category: 'computing',
            value: gpuVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('gpuUtil', gpuVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [30, 32, 45, 40, 55, 45, 48, 42, 38, 45, 34],
            currentCallout: { time: '10:42', value: gpuVal.toFixed(2) }
        },
        {
            id: 'gpu_memory',
            name: 'GPU Memory',
            chartTitle: 'GPU Memory Utilization (%)',
            category: 'computing',
            value: gpuMemVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('gpuMemUtil', gpuMemVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [35, 38, 50, 48, 62, 54, 56, 48, 44, 50, 39],
            currentCallout: { time: '10:42', value: gpuMemVal.toFixed(2) }
        },
        {
            id: 'memory_util',
            name: 'Memory Utilisation',
            chartTitle: 'Memory Utilization (%)',
            category: 'computing',
            value: memVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('memUtil', memVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [40, 42, 52, 50, 65, 58, 60, 54, 50, 55, 46],
            currentCallout: { time: '10:42', value: memVal.toFixed(2) }
        },
        {
            id: 'disk_util',
            name: 'Disk Utilisation',
            chartTitle: 'Disk Utilization (%)',
            category: 'computing',
            value: diskVal.toFixed(1),
            unitLabel: '%',
            badgeColor: getStatus('diskUtil', diskVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [32, 34, 38, 36, 42, 40, 44, 42, 40, 41, 38],
            currentCallout: { time: '10:42', value: diskVal.toFixed(1) }
        },
        {
            id: 'network',
            name: 'Network',
            chartTitle: 'Network Throughput (Gbps)',
            category: 'computing',
            value: netVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('network', netVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [12, 14, 20, 18, 25, 21, 23, 19, 17, 21, 15.2],
            currentCallout: { time: '10:42', value: netVal.toFixed(2) }
        },
        {
            id: 'computing_eff',
            name: 'Computing Efficiency',
            chartTitle: 'Computing Efficiency (%)',
            category: 'computing',
            value: compEffVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('computingEff', compEffVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [85, 87, 92, 90, 95, 92, 93, 91, 88, 92, Math.round(compEffVal)],
            currentCallout: { time: '10:42', value: compEffVal.toFixed(2) }
        },
        {
            id: 'coolant_flow_comp',
            name: 'Coolant Flow',
            chartTitle: 'Coolant Flow (L/min)',
            category: 'computing',
            value: coolantFlowCompVal.toFixed(2),
            unitLabel: 'L/min',
            badgeColor: getStatus('hallCoolantFlow', coolantFlowCompVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [60, 64, 75, 70, 82, 74, 78, 72, 68, 75, Math.round(coolantFlowCompVal)],
            currentCallout: { time: '10:42', value: coolantFlowCompVal.toFixed(2) }
        },
        {
            id: 'inlet_temp',
            name: 'Inlet Temperature',
            chartTitle: 'Inlet Temperature (°C)',
            category: 'computing',
            value: inletTempVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantInletTemp', inletTempVal) as any,
            yAxisMax: 60,
            yAxisTicks: [0, 30, 60],
            chartData: [40, 41, 46, 44, 48, 45, 47, 44, 42, 46, Math.round(inletTempVal)],
            currentCallout: { time: '10:42', value: inletTempVal.toFixed(2) }
        },
        {
            id: 'outlet_temp',
            name: 'Outlet Temperature',
            chartTitle: 'Outlet Temperature (°C)',
            category: 'computing',
            value: outletTempVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantOutletTemp', outletTempVal) as any,
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [52, 54, 62, 58, 68, 62, 65, 60, 58, 62, Math.round(outletTempVal)],
            currentCallout: { time: '10:42', value: outletTempVal.toFixed(2) }
        },

        // --- COOLING ---
        {
            id: 'coolant_flow',
            name: 'Liquid Coolant Flow',
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
            id: 'coolant_inlet',
            name: 'Liquid Coolant Inlet',
            chartTitle: 'Liquid Coolant Inlet Temp (°C)',
            category: 'cooling',
            value: coolantInletVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantInletTemp', coolantInletVal) as any,
            yAxisMax: 60,
            yAxisTicks: [0, 30, 60],
            chartData: [40, 41, 46, 44, 48, 45, 47, 44, 42, 46, Math.round(coolantInletVal)],
            currentCallout: { time: '10:42', value: coolantInletVal.toFixed(2) }
        },
        {
            id: 'coolant_outlet',
            name: 'Liquid Coolant Outlet',
            chartTitle: 'Liquid Coolant Outlet Temp (°C)',
            category: 'cooling',
            value: coolantOutletVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantOutletTemp', coolantOutletVal) as any,
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: [52, 54, 62, 58, 68, 62, 65, 60, 58, 62, Math.round(coolantOutletVal)],
            currentCallout: { time: '10:42', value: coolantOutletVal.toFixed(2) }
        },
        {
            id: 'liquid_deltat',
            name: 'Liquid Coolant ΔT',
            chartTitle: 'Liquid Coolant ΔT (°C)',
            category: 'cooling',
            value: liquidDeltaTVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgCoolantDeltaT', liquidDeltaTVal) as any,
            yAxisMax: 30,
            yAxisTicks: [0, 15, 30],
            chartData: [10, 12, 16, 14, 18, 15, 17, 14, 13, 16, Math.round(liquidDeltaTVal)],
            currentCallout: { time: '10:42', value: liquidDeltaTVal.toFixed(2) }
        },
        {
            id: 'liquid_heat',
            name: 'Liquid Heat Removal',
            chartTitle: 'Liquid Heat Removal (kW)',
            category: 'cooling',
            value: liquidHeatVal.toFixed(1),
            unitLabel: 'kW',
            badgeColor: 'green',
            yAxisMax: 120,
            yAxisTicks: [0, 60, 120],
            chartData: [60, 65, 80, 75, 90, 80, 85, 78, 72, 80, Math.round(liquidHeatVal)],
            currentCallout: { time: '10:42', value: liquidHeatVal.toFixed(1) }
        },
        {
            id: 'cooling_eff_liq',
            name: 'Liquid Cooling Efficiency',
            chartTitle: 'Liquid Cooling Efficiency (%)',
            category: 'cooling',
            value: liqEffVal.toFixed(1),
            unitLabel: '%',
            badgeColor: getStatus('coolingEff', liqEffVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [82, 84, 90, 88, 93, 89, 91, 88, 85, 89, Math.round(liqEffVal)],
            currentCallout: { time: '10:42', value: liqEffVal.toFixed(1) }
        },
        {
            id: 'hall_supply',
            name: 'CRAC Hall Supply',
            chartTitle: 'CRAC Hall Supply Temp (°C)',
            category: 'cooling',
            value: hallSupplyVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgHallSupplyTemp', hallSupplyVal) as any,
            yAxisMax: 40,
            yAxisTicks: [0, 20, 40],
            chartData: [22, 23, 26, 25, 28, 26, 27, 25, 24, 26, Math.round(hallSupplyVal)],
            currentCallout: { time: '10:42', value: hallSupplyVal.toFixed(2) }
        },
        {
            id: 'hall_return',
            name: 'CRAC Hall Return',
            chartTitle: 'CRAC Hall Return Temp (°C)',
            category: 'cooling',
            value: hallReturnVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('avgHallReturnTemp', hallReturnVal) as any,
            yAxisMax: 50,
            yAxisTicks: [0, 25, 50],
            chartData: [30, 31, 35, 33, 37, 34, 36, 33, 32, 34, Math.round(hallReturnVal)],
            currentCallout: { time: '10:42', value: hallReturnVal.toFixed(2) }
        },
        {
            id: 'air_deltat',
            name: 'CRAC Air ΔT',
            chartTitle: 'CRAC Air ΔT (°C)',
            category: 'cooling',
            value: airDeltaTVal.toFixed(2),
            unitLabel: '°C',
            badgeColor: 'green',
            yAxisMax: 20,
            yAxisTicks: [0, 10, 20],
            chartData: [6, 7, 9, 8, 11, 9, 10, 8, 7, 9, Math.round(airDeltaTVal)],
            currentCallout: { time: '10:42', value: airDeltaTVal.toFixed(2) }
        },
        {
            id: 'airflow',
            name: 'CRAC Airflow',
            chartTitle: 'CRAC Airflow (CFM)',
            category: 'cooling',
            value: airflowVal.toFixed(1),
            unitLabel: 'CFM',
            badgeColor: 'green',
            yAxisMax: 2000,
            yAxisTicks: [0, 1000, 2000],
            chartData: [1300, 1350, 1500, 1450, 1600, 1500, 1550, 1480, 1400, 1500, Math.round(airflowVal)],
            currentCallout: { time: '10:42', value: airflowVal.toFixed(1) }
        },
        {
            id: 'air_heat',
            name: 'CRAC Heat Removal',
            chartTitle: 'CRAC Heat Removal (kW)',
            category: 'cooling',
            value: airHeatVal.toFixed(2),
            unitLabel: 'kW',
            badgeColor: 'green',
            yAxisMax: 10,
            yAxisTicks: [0, 5, 10],
            chartData: [4, 5, 7, 6, 8, 6, 7, 6, 5, 6, Number(airHeatVal.toFixed(1))],
            currentCallout: { time: '10:42', value: airHeatVal.toFixed(2) }
        },
        {
            id: 'air_cooled_eff',
            name: 'Air Cooled Efficiency',
            chartTitle: 'Air Cooled Efficiency (%)',
            category: 'cooling',
            value: airEffVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('airCooledEff', airEffVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [80, 82, 88, 85, 90, 86, 88, 85, 83, 87, Math.round(airEffVal)],
            currentCallout: { time: '10:42', value: airEffVal.toFixed(2) }
        },

        // --- POWER ---
        {
            id: 'active_power',
            name: 'Active Power',
            chartTitle: 'Active Power(kW)',
            category: 'power',
            value: '11.5',
            unitLabel: 'kW',
            badgeColor: 'green',
            yAxisMax: 30,
            yAxisTicks: [0, 15, 30],
            chartData: [14, 17, 16, 23, 26, 21, 17, 19, 16, 17, 11.5],
            currentCallout: { time: '10:42', value: '11.5' }
        },
        {
            id: 'active_servers',
            name: 'Active Servers',
            chartTitle: 'Active Servers',
            category: 'power',
            value: `${activeServersVal} / 16`,
            unitLabel: '',
            badgeColor: 'green',
            yAxisMax: 20,
            yAxisTicks: [0, 10, 20],
            chartData: [14, 14, 15, 15, 16, 15, 16, 15, 14, 15, activeServersVal],
            currentCallout: { time: '10:42', value: String(activeServersVal) }
        },
        {
            id: 'avg_power',
            name: 'Average Power',
            chartTitle: 'Average Power (kW)',
            category: 'power',
            value: avgPowerVal.toFixed(2),
            unitLabel: 'kW',
            badgeColor: getStatus('avgPowerPerRack', avgPowerVal) as any,
            yAxisMax: 150,
            yAxisTicks: [0, 75, 150],
            chartData: [85, 88, 98, 94, 108, 98, 102, 96, 90, 98, Math.round(avgPowerVal)],
            currentCallout: { time: '10:42', value: avgPowerVal.toFixed(2) }
        },
        {
            id: 'peak_power',
            name: 'Peak Power',
            chartTitle: 'Peak Power (kW)',
            category: 'power',
            value: peakPowerVal.toFixed(2),
            unitLabel: 'kW',
            badgeColor: 'green',
            yAxisMax: 160,
            yAxisTicks: [0, 80, 160],
            chartData: [95, 98, 110, 105, 120, 110, 115, 108, 102, 110, Math.round(peakPowerVal)],
            currentCallout: { time: '10:42', value: peakPowerVal.toFixed(2) }
        },
        {
            id: 'capacity',
            name: 'Rack Capacity',
            chartTitle: 'Rack Capacity (kW)',
            category: 'power',
            value: String(capacityVal),
            unitLabel: 'kW',
            badgeColor: 'blue',
            yAxisMax: 250,
            yAxisTicks: [0, 125, 250],
            chartData: [199, 199, 199, 199, 199, 199, 199, 199, 199, 199, capacityVal],
            currentCallout: { time: '10:42', value: String(capacityVal) }
        },
        {
            id: 'power_util',
            name: 'Power Utilization',
            chartTitle: 'Power Utilization (%)',
            category: 'power',
            value: utilVal.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('facilityLoad', utilVal) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: [38, 40, 50, 46, 58, 48, 52, 47, 42, 48, Math.round(utilVal)],
            currentCallout: { time: '10:42', value: utilVal.toFixed(2) }
        }
    ];
}

// =========================================================================
// REUSABLE SVG LINE CHART (RESTORED EXACT ORIGINAL VISUALIZATION)
// =========================================================================
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

                    {/* Timeline Data Polyline (exact original style) */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Hover: Vertical cyan line + Circle + White Callout Tooltip (exact original style) */}
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

                    {/* X-Axis Ticks and Labels (exact original style) */}
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

// =========================================================================
// LEVEL 7 (COMPUTE TRAY LEVEL) PARAMETER GENERATOR
// =========================================================================
function buildTrayParameters(scenario: string = 'Low Load', timeSlot: number = 0, trayNum: number = 1): HistoricalParameter[] {
    const norm = (scenario.toLowerCase().includes('high'))
        ? 'High Load'
        : (scenario.toLowerCase().includes('med') ? 'Medium Load' : 'Low Load');
    const d = (level7ComputeTrayData as any)[norm] || (level7ComputeTrayData as any)['Low Load'];
    const safeSlot = Math.min(Math.max(timeSlot, 0), 9);

    const comp = d.computing[safeSlot] || d.computing[0];
    const cool = d.cooling[safeSlot] || d.cooling[0];
    const pwr = d.power[safeSlot] || d.power[0];

    // Arrays across 10 time intervals [0, 6, 12, 18, 24, 30, 36, 42, 48, 54]
    const cpuUtilHist = d.computing.map((c: any) => c.avgCpuUtil);
    const gpuUtilHist = d.computing.map((c: any) => c.avgGpuUtil);
    const hbmUtilHist = d.computing.map((c: any) => c.avgHbmUtil);
    const compCpuTempHist = d.computing.map((c: any) => c.avgCpuTemp);
    const compGpuTempHist = d.computing.map((c: any) => c.avgGpuTemp);

    const coolCpuTempHist = d.cooling.map((c: any) => c.avgCpuTemp);
    const coolGpuTempHist = d.cooling.map((c: any) => c.avgGpuTemp);
    const coolHbmTempHist = d.cooling.map((c: any) => c.avgHbmTemp);
    const inletTempHist = d.cooling.map((c: any) => c.avgCoolantInletTemp);
    const outletTempHist = d.cooling.map((c: any) => c.avgCoolantOutletTemp);
    const flowRateHist = d.cooling.map((c: any) => c.avgCoolantFlowRate);

    const cpuPwrHist = d.power.map((p: any) => p.cpuPower);
    const gpuPwrHist = d.power.map((p: any) => p.gpuPower);
    const totalPwrHist = d.power.map((p: any) => p.trayTotalPower);
    const pwrThrottleHist = d.power.map((p: any) => p.powerThrottling);

    return [
        // --- COMPUTING (Strictly 5 parameters from user spreadsheet) ---
        {
            id: 'tray_cpu_util',
            name: 'Avg. CPU Utilisation',
            chartTitle: 'Avg. CPU Utilisation (%)',
            category: 'computing',
            value: comp.avgCpuUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('trayCpuUtil', comp.avgCpuUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: cpuUtilHist,
            currentCallout: { time: '10:42', value: comp.avgCpuUtil.toFixed(2) }
        },
        {
            id: 'tray_gpu_util',
            name: 'Avg. GPU Utilisation',
            chartTitle: 'Avg. GPU Utilisation (%)',
            category: 'computing',
            value: comp.avgGpuUtil.toFixed(3),
            unitLabel: '%',
            badgeColor: getStatus('trayGpuUtil', comp.avgGpuUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: gpuUtilHist,
            currentCallout: { time: '10:42', value: comp.avgGpuUtil.toFixed(3) }
        },
        {
            id: 'tray_hbm_util',
            name: 'Avg. HBM Utilisation',
            chartTitle: 'Avg. HBM Utilisation (%)',
            category: 'computing',
            value: comp.avgHbmUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('trayHbmUtil', comp.avgHbmUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: hbmUtilHist,
            currentCallout: { time: '10:42', value: comp.avgHbmUtil.toFixed(2) }
        },
        {
            id: 'tray_comp_cpu_temp',
            name: 'Avg. CPU Temperature',
            chartTitle: 'Avg. CPU Temperature (°C)',
            category: 'computing',
            value: comp.avgCpuTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('trayCpuTemp', comp.avgCpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: compCpuTempHist,
            currentCallout: { time: '10:42', value: comp.avgCpuTemp.toFixed(1) }
        },
        {
            id: 'tray_comp_gpu_temp',
            name: 'Avg. GPU Temperature',
            chartTitle: 'Avg. GPU Temperature (°C)',
            category: 'computing',
            value: comp.avgGpuTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('trayGpuTemp', comp.avgGpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: compGpuTempHist,
            currentCallout: { time: '10:42', value: comp.avgGpuTemp.toFixed(2) }
        },

        // --- COOLING (Strictly 7 parameters from user spreadsheet) ---
        {
            id: 'tray_cool_cpu_temp',
            name: 'Avg. CPU Temperature',
            chartTitle: 'Avg. CPU Temperature (°C)',
            category: 'cooling',
            value: cool.avgCpuTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('trayCoolingCpuTemp', cool.avgCpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolCpuTempHist,
            currentCallout: { time: '10:42', value: cool.avgCpuTemp.toFixed(2) }
        },
        {
            id: 'tray_cool_gpu_temp',
            name: 'Avg. GPU Temperature',
            chartTitle: 'Avg. GPU Temperature (°C)',
            category: 'cooling',
            value: cool.avgGpuTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('trayGpuTemp', cool.avgGpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolGpuTempHist,
            currentCallout: { time: '10:42', value: cool.avgGpuTemp.toFixed(1) }
        },
        {
            id: 'tray_cool_hbm_temp',
            name: 'Avg. HBM Temperature',
            chartTitle: 'Avg. HBM Temperature (°C)',
            category: 'cooling',
            value: cool.avgHbmTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('trayHbmTemp', cool.avgHbmTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolHbmTempHist,
            currentCallout: { time: '10:42', value: cool.avgHbmTemp.toFixed(2) }
        },
        {
            id: 'tray_coolant_inlet_temp',
            name: 'Avg. Coolant Inlet Temperature',
            chartTitle: 'Avg. Coolant Inlet Temperature (°C)',
            category: 'cooling',
            value: cool.avgCoolantInletTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('trayCoolantInletTemp', cool.avgCoolantInletTemp) as any,
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: inletTempHist,
            currentCallout: { time: '10:42', value: cool.avgCoolantInletTemp.toFixed(2) }
        },
        {
            id: 'tray_coolant_outlet_temp',
            name: 'Avg. Coolant Outlet Temperature',
            chartTitle: 'Avg. Coolant Outlet Temperature (°C)',
            category: 'cooling',
            value: cool.avgCoolantOutletTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('trayCoolantOutletTemp', cool.avgCoolantOutletTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: outletTempHist,
            currentCallout: { time: '10:42', value: cool.avgCoolantOutletTemp.toFixed(2) }
        },
        {
            id: 'tray_coolant_flow',
            name: 'Avg. Coolant Flow Rate',
            chartTitle: 'Avg. Coolant Flow Rate (L/min)',
            category: 'cooling',
            value: cool.avgCoolantFlowRate.toFixed(2),
            unitLabel: 'L/min',
            badgeColor: getStatus('trayCoolantFlowRate', cool.avgCoolantFlowRate) as any,
            yAxisMax: 8,
            yAxisTicks: [0, 4, 8],
            chartData: flowRateHist,
            currentCallout: { time: '10:42', value: cool.avgCoolantFlowRate.toFixed(2) }
        },
        {
            id: 'tray_leak_detection',
            name: 'Leak Detection',
            chartTitle: 'Leak Detection',
            category: 'cooling',
            value: cool.leakDetection,
            unitLabel: '',
            badgeColor: getStatus('trayLeakDetection', cool.leakDetection) as any,
            yAxisMax: 1,
            yAxisTicks: [0, 1],
            chartData: d.cooling.map((c: any) => c.leakDetection === 'No Leak' ? 0 : 1),
            currentCallout: { time: '10:42', value: cool.leakDetection }
        },

        // --- POWER (Strictly 5 parameters from user spreadsheet) ---
        {
            id: 'tray_cpu_power',
            name: 'CPU Power',
            chartTitle: 'CPU Power (kW)',
            category: 'power',
            value: pwr.cpuPower.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('trayCpuPower', pwr.cpuPower) as any,
            yAxisMax: 2,
            yAxisTicks: [0, 1, 2],
            chartData: cpuPwrHist,
            currentCallout: { time: '10:42', value: pwr.cpuPower.toFixed(3) }
        },
        {
            id: 'tray_gpu_power',
            name: 'GPU Power',
            chartTitle: 'GPU Power (kW)',
            category: 'power',
            value: pwr.gpuPower.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('trayGpuPower', pwr.gpuPower) as any,
            yAxisMax: 5,
            yAxisTicks: [0, 2.5, 5],
            chartData: gpuPwrHist,
            currentCallout: { time: '10:42', value: pwr.gpuPower.toFixed(3) }
        },
        {
            id: 'tray_total_power',
            name: 'Tray Total Power',
            chartTitle: 'Tray Total Power (kW)',
            category: 'power',
            value: pwr.trayTotalPower.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('trayTotalPower', pwr.trayTotalPower) as any,
            yAxisMax: 10,
            yAxisTicks: [0, 5, 10],
            chartData: totalPwrHist,
            currentCallout: { time: '10:42', value: pwr.trayTotalPower.toFixed(3) }
        },
        {
            id: 'tray_power_capacity',
            name: 'Power Limit / Power Capacity',
            chartTitle: 'Power Capacity (kW)',
            category: 'power',
            value: pwr.powerLimit.toFixed(1),
            unitLabel: 'kW',
            badgeColor: 'default',
            yAxisMax: 15,
            yAxisTicks: [0, 7.5, 15],
            chartData: [12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3],
            currentCallout: { time: '10:42', value: '12.3' }
        },
        {
            id: 'tray_power_throttling',
            name: 'Avg. Power Throttling',
            chartTitle: 'Power Throttling (%)',
            category: 'power',
            value: pwr.powerThrottling.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('trayPowerThrottling', pwr.powerThrottling) as any,
            yAxisMax: 20,
            yAxisTicks: [0, 10, 20],
            chartData: pwrThrottleHist,
            currentCallout: { time: '10:42', value: pwr.powerThrottling.toFixed(2) }
        }
    ];
}

// =========================================================================
// LEVEL 8 (SUPERCHIP LEVEL) PARAMETER GENERATOR
// =========================================================================
function buildSuperchipParameters(scenario: string = 'Low Load', timeSlot: number = 0, chipNum: number = 1): HistoricalParameter[] {
    const norm = (scenario.toLowerCase().includes('high'))
        ? 'High Load'
        : (scenario.toLowerCase().includes('med') ? 'Medium Load' : 'Low Load');
    const d = (level8SuperchipData as any)[norm] || (level8SuperchipData as any)['Low Load'];
    const safeSlot = Math.min(Math.max(timeSlot, 0), 9);

    const comp = d.computing[safeSlot] || d.computing[0];
    const cool = d.cooling[safeSlot] || d.cooling[0];
    const pwr = d.power[safeSlot] || d.power[0];

    // Arrays across 10 time intervals [0, 6, 12, 18, 24, 30, 36, 42, 48, 54]
    const cpuUtilHist = d.computing.map((c: any) => c.cpuUtil);
    const gpu1UtilHist = d.computing.map((c: any) => c.gpu1Util);
    const gpu2UtilHist = d.computing.map((c: any) => c.gpu2Util);
    const hbmUtilHist = d.computing.map((c: any) => c.hbmUtil);
    const compCpuTempHist = d.computing.map((c: any) => c.cpuTemp);
    const compAvgGpuTempHist = d.computing.map((c: any) => c.avgGpuTemp);

    const coolCpuTempHist = d.cooling.map((c: any) => c.cpuTemp);
    const coolGpu1TempHist = d.cooling.map((c: any) => c.gpu1Temp);
    const coolGpu2TempHist = d.cooling.map((c: any) => c.gpu2Temp);
    const coolHbmTempHist = d.cooling.map((c: any) => c.hbmTemp);
    const coolInletTempHist = d.cooling.map((c: any) => c.coolantInletTemp);
    const coolOutletTempHist = d.cooling.map((c: any) => c.coolantOutletTemp);
    const coolFlowRateHist = d.cooling.map((c: any) => c.coolantFlowRate);

    const cpuPwrHist = d.power.map((p: any) => p.cpuPower);
    const gpu1PwrHist = d.power.map((p: any) => p.gpu1Power);
    const gpu2PwrHist = d.power.map((p: any) => p.gpu2Power);
    const totalPwrHist = d.power.map((p: any) => p.superchipTotalPower);
    const pwrThrottleHist = d.power.map((p: any) => p.powerThrottling);

    return [
        // --- COMPUTING (Strictly 6 parameters from user list) ---
        {
            id: 'sc_cpu_util',
            name: 'CPU Utilisation',
            chartTitle: 'CPU Utilisation (%)',
            category: 'computing',
            value: comp.cpuUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('scCpuUtil', comp.cpuUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: cpuUtilHist,
            currentCallout: { time: '10:42', value: comp.cpuUtil.toFixed(2) }
        },
        {
            id: 'sc_gpu1_util',
            name: 'GPU 1 Utilisation',
            chartTitle: 'GPU 1 Utilisation (%)',
            category: 'computing',
            value: comp.gpu1Util.toFixed(3),
            unitLabel: '%',
            badgeColor: getStatus('scGpu1Util', comp.gpu1Util) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: gpu1UtilHist,
            currentCallout: { time: '10:42', value: comp.gpu1Util.toFixed(3) }
        },
        {
            id: 'sc_gpu2_util',
            name: 'GPU 2 Utilisation',
            chartTitle: 'GPU 2 Utilisation (%)',
            category: 'computing',
            value: comp.gpu2Util.toFixed(3),
            unitLabel: '%',
            badgeColor: getStatus('scGpu2Util', comp.gpu2Util) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: gpu2UtilHist,
            currentCallout: { time: '10:42', value: comp.gpu2Util.toFixed(3) }
        },
        {
            id: 'sc_hbm_util',
            name: 'HBM Utilisation',
            chartTitle: 'HBM Utilisation (%)',
            category: 'computing',
            value: comp.hbmUtil.toFixed(2),
            unitLabel: '%',
            badgeColor: getStatus('scHbmUtil', comp.hbmUtil) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: hbmUtilHist,
            currentCallout: { time: '10:42', value: comp.hbmUtil.toFixed(2) }
        },
        {
            id: 'sc_comp_cpu_temp',
            name: 'CPU Temperature',
            chartTitle: 'CPU Temperature (°C)',
            category: 'computing',
            value: comp.cpuTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scCpuTemp', comp.cpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: compCpuTempHist,
            currentCallout: { time: '10:42', value: comp.cpuTemp.toFixed(1) }
        },
        {
            id: 'sc_avg_gpu_temp',
            name: 'Avg. GPU Temperature',
            chartTitle: 'Avg. GPU Temperature (°C)',
            category: 'computing',
            value: comp.avgGpuTemp.toFixed(2),
            unitLabel: '°C',
            badgeColor: getStatus('scAvgGpuTemp', comp.avgGpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: compAvgGpuTempHist,
            currentCallout: { time: '10:42', value: comp.avgGpuTemp.toFixed(2) }
        },

        // --- COOLING (Strictly 8 parameters from user list) ---
        {
            id: 'sc_cooling_cpu_temp',
            name: 'CPU Temperature',
            chartTitle: 'CPU Temperature (°C)',
            category: 'cooling',
            value: cool.cpuTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scCoolingCpuTemp', cool.cpuTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolCpuTempHist,
            currentCallout: { time: '10:42', value: cool.cpuTemp.toFixed(1) }
        },
        {
            id: 'sc_gpu1_temp',
            name: 'GPU 1 Temperature',
            chartTitle: 'GPU 1 Temperature (°C)',
            category: 'cooling',
            value: cool.gpu1Temp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scGpu1Temp', cool.gpu1Temp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolGpu1TempHist,
            currentCallout: { time: '10:42', value: cool.gpu1Temp.toFixed(1) }
        },
        {
            id: 'sc_gpu2_temp',
            name: 'GPU 2 Temperature',
            chartTitle: 'GPU 2 Temperature (°C)',
            category: 'cooling',
            value: cool.gpu2Temp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scGpu2Temp', cool.gpu2Temp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolGpu2TempHist,
            currentCallout: { time: '10:42', value: cool.gpu2Temp.toFixed(1) }
        },
        {
            id: 'sc_hbm_temp',
            name: 'HBM Temperature',
            chartTitle: 'HBM Temperature (°C)',
            category: 'cooling',
            value: cool.hbmTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scHbmTemp', cool.hbmTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolHbmTempHist,
            currentCallout: { time: '10:42', value: cool.hbmTemp.toFixed(1) }
        },
        {
            id: 'sc_coolant_inlet_temp',
            name: 'Coolant Inlet Temperature',
            chartTitle: 'Coolant Inlet Temperature (°C)',
            category: 'cooling',
            value: cool.coolantInletTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scCoolantInletTemp', cool.coolantInletTemp) as any,
            yAxisMax: 80,
            yAxisTicks: [0, 40, 80],
            chartData: coolInletTempHist,
            currentCallout: { time: '10:42', value: cool.coolantInletTemp.toFixed(1) }
        },
        {
            id: 'sc_coolant_outlet_temp',
            name: 'Coolant Outlet Temperature',
            chartTitle: 'Coolant Outlet Temperature (°C)',
            category: 'cooling',
            value: cool.coolantOutletTemp.toFixed(1),
            unitLabel: '°C',
            badgeColor: getStatus('scCoolantOutletTemp', cool.coolantOutletTemp) as any,
            yAxisMax: 100,
            yAxisTicks: [0, 50, 100],
            chartData: coolOutletTempHist,
            currentCallout: { time: '10:42', value: cool.coolantOutletTemp.toFixed(1) }
        },
        {
            id: 'sc_coolant_flow_rate',
            name: 'Avg. Coolant Flow Rate',
            chartTitle: 'Avg. Coolant Flow Rate (L/min)',
            category: 'cooling',
            value: cool.coolantFlowRate.toFixed(2),
            unitLabel: 'L/min',
            badgeColor: getStatus('scCoolantFlowRate', cool.coolantFlowRate) as any,
            yAxisMax: 8,
            yAxisTicks: [0, 4, 8],
            chartData: coolFlowRateHist,
            currentCallout: { time: '10:42', value: cool.coolantFlowRate.toFixed(2) }
        },
        {
            id: 'sc_leak_detection',
            name: 'Leak Detection',
            chartTitle: 'Leak Detection',
            category: 'cooling',
            value: cool.leakDetection,
            unitLabel: '',
            badgeColor: getStatus('scLeakDetection', cool.leakDetection) as any,
            yAxisMax: 1,
            yAxisTicks: [0, 1],
            chartData: d.cooling.map((c: any) => c.leakDetection === 'No Leak' ? 0 : 1),
            currentCallout: { time: '10:42', value: cool.leakDetection }
        },

        // --- POWER (Strictly 6 parameters from user list) ---
        {
            id: 'sc_cpu_power',
            name: 'CPU Power',
            chartTitle: 'CPU Power (kW)',
            category: 'power',
            value: pwr.cpuPower.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('scCpuPower', pwr.cpuPower) as any,
            yAxisMax: 1,
            yAxisTicks: [0, 0.5, 1],
            chartData: cpuPwrHist,
            currentCallout: { time: '10:42', value: pwr.cpuPower.toFixed(3) }
        },
        {
            id: 'sc_gpu1_power',
            name: 'GPU 1 Power',
            chartTitle: 'GPU 1 Power (kW)',
            category: 'power',
            value: pwr.gpu1Power.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('scGpu1Power', pwr.gpu1Power) as any,
            yAxisMax: 2,
            yAxisTicks: [0, 1, 2],
            chartData: gpu1PwrHist,
            currentCallout: { time: '10:42', value: pwr.gpu1Power.toFixed(3) }
        },
        {
            id: 'sc_gpu2_power',
            name: 'GPU 2 Power',
            chartTitle: 'GPU 2 Power (kW)',
            category: 'power',
            value: pwr.gpu2Power.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('scGpu2Power', pwr.gpu2Power) as any,
            yAxisMax: 2,
            yAxisTicks: [0, 1, 2],
            chartData: gpu2PwrHist,
            currentCallout: { time: '10:42', value: pwr.gpu2Power.toFixed(3) }
        },
        {
            id: 'sc_total_power',
            name: 'Superchip Total Power',
            chartTitle: 'Superchip Total Power (kW)',
            category: 'power',
            value: pwr.superchipTotalPower.toFixed(3),
            unitLabel: 'kW',
            badgeColor: getStatus('scTotalPower', pwr.superchipTotalPower) as any,
            yAxisMax: 5,
            yAxisTicks: [0, 2.5, 5],
            chartData: totalPwrHist,
            currentCallout: { time: '10:42', value: pwr.superchipTotalPower.toFixed(3) }
        },
        {
            id: 'sc_power_capacity',
            name: 'Power Limit / Power Capacity',
            chartTitle: 'Power Capacity (kW)',
            category: 'power',
            value: pwr.powerLimit.toFixed(1),
            unitLabel: 'kW',
            badgeColor: 'default',
            yAxisMax: 10,
            yAxisTicks: [0, 5, 10],
            chartData: [6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1],
            currentCallout: { time: '10:42', value: '6.1' }
        },
        {
            id: 'sc_power_throttling',
            name: 'Power Throttling',
            chartTitle: 'Power Throttling (%)',
            category: 'power',
            value: pwr.powerThrottling.toFixed(1),
            unitLabel: '%',
            badgeColor: getStatus('scPowerThrottling', pwr.powerThrottling) as any,
            yAxisMax: 20,
            yAxisTicks: [0, 10, 20],
            chartData: pwrThrottleHist,
            currentCallout: { time: '10:42', value: pwr.powerThrottling.toFixed(1) }
        }
    ];
}

// =========================================================================
// HISTORICAL DATA MODAL COMPONENT
// =========================================================================
export interface HistoricalDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    level?: 'rack' | 'row' | 'tray' | 'superchip';
    rackNum?: number;
    serverNum?: number;
    superchipNum?: number;
    rowLabel?: string;
    currentScenario?: string;
    parameters?: HistoricalParameter[];
    initialSelectedParamIds?: string[];
    rackOptions?: { id: string; label: string }[];
    selectedRack?: string;
    onSelectRack?: (rack: string) => void;
}

export const HistoricalDataModal: React.FC<HistoricalDataModalProps> = ({
    isOpen,
    onClose,
    title: initialTitle,
    level = 'rack',
    rackNum: initialRackNum = 1,
    serverNum: initialServerNum = 1,
    superchipNum: initialSuperchipNum = 1,
    rowLabel = 'Row A',
    currentScenario = 'Low Load',
    parameters: customParameters,
    initialSelectedParamIds,
    rackOptions: customRackOptions,
    selectedRack: controlledRack,
    onSelectRack
}) => {
    const [activeTab, setActiveTab] = useState<'all' | 'computing' | 'cooling' | 'power'>('all');
    const [rack, setRack] = useState(
        controlledRack || String(
            level === 'superchip' ? initialSuperchipNum : (level === 'tray' ? initialServerNum : initialRackNum)
        )
    );
    const [filterBy, setFilterBy] = useState('Daily');
    const [selectedDate, setSelectedDate] = useState('2025-02-01');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Keep selector synchronized if props change
    useEffect(() => {
        if (controlledRack) {
            setRack(controlledRack);
        } else if (level === 'superchip' && initialSuperchipNum) {
            setRack(String(initialSuperchipNum));
        } else if (level === 'tray' && initialServerNum) {
            setRack(String(initialServerNum));
        } else if (initialRackNum) {
            setRack(String(initialRackNum));
        }
    }, [controlledRack, initialRackNum, initialServerNum, initialSuperchipNum, level, isOpen]);

    // Track real-time clock to get active slot
    const [currentTime, setCurrentTime] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    const timeSlot = getSlotIndexFromTime(currentTime);
    const numericRack = parseInt(rack, 10) || 1;

    // Default rack, tray, or superchip options
    const rackOptions = customRackOptions || (
        level === 'superchip'
            ? [
                { id: '1', label: '1' },
                { id: '2', label: '2' }
            ]
            : (level === 'tray'
                ? Array.from({ length: 18 }, (_, i) => ({ id: String(i + 1), label: String(i + 1) }))
                : [
                    { id: '1', label: '1' },
                    { id: '2', label: '2' },
                    { id: '3', label: '3' },
                    { id: '4', label: '4' },
                    { id: '5', label: '5' },
                    { id: '6', label: '6' },
                    { id: '7', label: '7' },
                    { id: '8', label: '8' },
                    { id: '9', label: '9' }
                ])
    );

    // Compute parameters strictly matching the level
    const parameters: HistoricalParameter[] = useMemo(() => {
        if (customParameters && customParameters.length > 0) return customParameters;
        if (level === 'superchip') {
            return buildSuperchipParameters(currentScenario, timeSlot, numericRack);
        }
        if (level === 'tray') {
            return buildTrayParameters(currentScenario, timeSlot, numericRack);
        }
        if (level === 'row') {
            return buildRowParameters(numericRack, currentScenario, timeSlot);
        }
        return buildRackParameters(timeSlot);
    }, [customParameters, level, numericRack, currentScenario, timeSlot]);

    // Selected charts
    const [selectedParamIds, setSelectedParamIds] = useState<string[]>(() => {
        if (initialSelectedParamIds) return initialSelectedParamIds;
        if (level === 'superchip') {
            return ['sc_cpu_util', 'sc_coolant_flow_rate', 'sc_total_power'];
        }
        if (level === 'tray') {
            return ['tray_cpu_util', 'tray_coolant_flow', 'tray_total_power'];
        }
        return ['cpu_util', 'coolant_flow', 'active_power'];
    });

    // Update selectedParamIds if level changes
    useEffect(() => {
        if (level === 'superchip') {
            setSelectedParamIds(['sc_cpu_util', 'sc_coolant_flow_rate', 'sc_total_power']);
        } else if (level === 'tray') {
            setSelectedParamIds(['tray_cpu_util', 'tray_coolant_flow', 'tray_total_power']);
        } else {
            setSelectedParamIds(['cpu_util', 'coolant_flow', 'active_power']);
        }
    }, [level]);

    // Modal title dynamic formatting
    const modalTitle = useMemo(() => {
        if (initialTitle) return initialTitle;
        const formattedRack = `Rack ${String(initialRackNum || 1).padStart(2, '0')}`;
        const formattedTray = `Compute Tray ${String(initialServerNum || 1).padStart(2, '0')}`;
        if (level === 'superchip') {
            const formattedChip = `Superchip ${numericRack}`;
            return `NVL72 ${formattedRack} - ${formattedTray} ${formattedChip} Historical Data`;
        }
        if (level === 'tray') {
            const currentTray = `Compute Tray ${String(numericRack).padStart(2, '0')}`;
            return `NVL72 ${formattedRack} - ${currentTray} Historical Data`;
        }
        const rowFormattedRack = `Rack 0${numericRack}`;
        if (level === 'row') {
            return `NVL72 ${rowLabel} - ${rowFormattedRack} Historical Data`;
        }
        return `NVL72 ${rowFormattedRack} Historical Data`;
    }, [initialTitle, level, numericRack, rowLabel, initialRackNum, initialServerNum]);

    // Alert badge count in tab
    const computingAlertCount = useMemo(() => {
        const alerts = parameters.filter(p => p.category === 'computing' && (p.badgeColor === 'yellow' || p.badgeColor === 'orange' || p.badgeColor === 'red'));
        return alerts.length;
    }, [parameters]);


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
                        <h2 className="hd-title">{modalTitle}</h2>
                    </div>
                    <CloseButton
                        onClick={onClose}
                        title="Close historical view"
                        ariaLabel="Close"
                    />
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
                            {computingAlertCount > 0 && (
                                <span className="hd-badge alert">{computingAlertCount}</span>
                            )}
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
                            <label>{level === 'superchip' ? 'Superchip :' : (level === 'tray' ? 'Compute Tray :' : 'Rack :')}</label>
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

                    {/* Right Column: Clean Line Charts on Background (exact original visualization) */}
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
