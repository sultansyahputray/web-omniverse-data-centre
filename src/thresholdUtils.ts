import type React from 'react';
import { STATUS_PALETTE } from './config';

export type ThresholdStatus = 'green' | 'yellow' | 'orange' | 'red' | 'default';

export const getStatus = (param: string, value: number | string): ThresholdStatus => {
    if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(parsed)) value = parsed;
    }

    switch (param) {
        // --- LEVEL BUILDING / REGION SPECIFIC THRESHOLDS (IMAGE 3) ---
        // GPU Compute Utilisation: Green: < 80%, Yellow: 80% - 95%, Red: > 95%
        case 'gpuComputeUtil':
        case 'gpuComputeUtilisation':
        case 'gpuComputeUtilization':
        case 'gpu_compute_utilisation':
        case 'gpu_compute_utilization':
            if (Number(value) < 80) return 'green';
            if (Number(value) <= 95) return 'yellow';
            return 'red';

        // Facility Load: Green: <= 95%, Yellow: 95% - 98%, Red: >= 98%
        case 'facilityLoad':
        case 'facility_load':
        case 'facilityLoadPct':
            if (Number(value) <= 95) return 'green';
            if (Number(value) < 98) return 'yellow';
            return 'red';

        // PUE: Green: <= 1.12, Yellow: 1.12 - <= 1.15, Red: > 1.15
        case 'pue':
        case 'pueValue':
            if (Number(value) <= 1.12) return 'green';
            if (Number(value) <= 1.15) return 'yellow';
            return 'red';

        // LEVEL 3 CUTAWAY / BUILDING: GPU Computing Utilisation: Green: <= 80%, Yellow: 80% - 95%, Red: > 95%
        case 'gpuComputingUtilisation':
        case 'gpuComputingUtilization':
        case 'gpu_computing_utilisation':
        case 'gpu_computing_utilization':
            if (Number(value) <= 80) return 'green';
            if (Number(value) <= 95) return 'yellow';
            return 'red';

        // Facility Power (MW): Green: <= 47.53 MW, Yellow: 47.53 - 49 MW, Red: >= 49.0 MW
        case 'facilityPower':
        case 'facility_power':
            if (Number(value) <= 47.53) return 'green';
            if (Number(value) < 49.0) return 'yellow';
            return 'red';

        // LEVEL 3 POWER PATH: Active Power (MW): Green: <= 47.5 MW, Yellow: 47.5 - 49.0 MW, Red: >= 49.0 MW
        case 'powerPathActivePower':
        case 'buildingActivePower':
        case 'activePowerMW':
            if (Number(value) <= 47.5) return 'green';
            if (Number(value) < 49.0) return 'yellow';
            return 'red';

        // LEVEL 3 POWER PATH: Voltage (V): Green: 456 - 504, Yellow: 432 - 456 or 504 - 528, Red: < 432 or > 528
        case 'powerPathVoltage':
        case 'buildingVoltage':
            if (Number(value) >= 456 && Number(value) <= 504) return 'green';
            if ((Number(value) >= 432 && Number(value) < 456) || (Number(value) > 504 && Number(value) <= 528)) return 'yellow';
            return 'red';

        // LEVEL 3 POWER PATH: Power Factor: Green: >= 0.95, Yellow: 0.90 - 0.95, Red: < 0.90
        case 'powerPathPowerFactor':
            if (Number(value) >= 0.95) return 'green';
            if (Number(value) >= 0.90) return 'yellow';
            return 'red';

        // LEVEL 3 POWER PATH: A/B Load Imbalance (%): Green: <= 5%, Yellow: 5% - 10%, Red: > 10%
        case 'abLoadImbalance':
        case 'ab_load_imbalance':
        case 'loadImbalance':
            if (Number(value) <= 5) return 'green';
            if (Number(value) <= 10) return 'yellow';
            return 'red';

        // LEVEL 3 POWER PATH: Electrical N-1 Path Loading (%): Green: <= 90%, Yellow: 90% - 98%, Red: > 98%
        case 'electricalN1PathLoading':
        case 'electrical_n1_path_loading':
        case 'n1PathLoading':
        case 'powerHeadroom':
            if (Number(value) <= 90) return 'green';
            if (Number(value) <= 98) return 'yellow';
            return 'red';

        // LEVEL 3 CUTAWAY: IT Load (MW): Green: <= 41.33 MW, Yellow: 41.33 - 45.0 MW, Red: > 45.0 MW
        case 'itLoad':
        case 'it_load':
        case 'itLoadMW':
        case 'it_load_mw':
            if (Number(value) <= 41.33) return 'green';
            if (Number(value) <= 45.0) return 'yellow';
            return 'red';

        // Cooling Load (MW): Green: <= 43.35 MW, Yellow: 43.35 - 48.45 MW, Red: > 48.45 MW
        case 'coolingLoad':
        case 'cooling_load':
            if (Number(value) <= 43.35) return 'green';
            if (Number(value) <= 48.45) return 'yellow';
            return 'red';

        // Cooling Utilisation (%): Green: <= 85%, Yellow: 85% - 95%, Red: >= 95%
        case 'coolingUtilisation':
        case 'coolingUtilization':
        case 'cooling_utilisation':
        case 'cooling_utilization':
        case 'coolingCapacity':
            if (Number(value) <= 85) return 'green';
            if (Number(value) < 95) return 'yellow';
            return 'red';

        // --- LEVEL 3 COOLING DETAILS THRESHOLDS (IMAGE 3) ---
        // 1. Liquid Cooling Efficiency: Green: > 90%, Yellow: 80% - 90%, Red: < 80%
        case 'liquidCoolingEfficiency':
        case 'coolingEfficiency':
        case 'coolingDetailsEfficiency':
            if (Number(value) > 90) return 'green';
            if (Number(value) >= 80) return 'yellow';
            return 'red';

        // 2. Liquid Cooling Capacity Utilisation (%): Green: < 80%, Yellow: 80% - 90%, Red: > 90%
        case 'liquidCoolingCapacityUtilisation':
        case 'liquidCoolingCapacityUtilization':
        case 'coolingCapacityUtilisation':
        case 'coolingCapacityUtilization':
        case 'coolingDetailsCapacityUtilisation':
            if (Number(value) < 80) return 'green';
            if (Number(value) <= 90) return 'yellow';
            return 'red';

        // 3. Coolant Flow vs Required (%): Green: >= 90%, Yellow: 80% - <90%, Red: < 80%
        case 'coolantFlowVsRequired':
        case 'coolantFlow':
            if (Number(value) >= 90) return 'green';
            if (Number(value) >= 80) return 'yellow';
            return 'red';

        // 4. ΔP vs Design (%): Green: 90% - 110%, Yellow: 80% - <90% or > 110% - 120%, Red: < 80% or > 120%
        case 'deltaPVsDesign':
        case 'deltaP':
        case 'coolingDeltaP':
            if (Number(value) >= 90 && Number(value) <= 110) return 'green';
            if ((Number(value) >= 80 && Number(value) < 90) || (Number(value) > 110 && Number(value) <= 120)) return 'yellow';
            return 'red';

        // 5. Average Coolant Inlet Temp (°C): Green: <= 45°C, Yellow: > 45°C - 47°C, Red: > 47°C
        case 'avgCoolantInletTemp':
        case 'coolingInletTemp':
            if (Number(value) <= 45) return 'green';
            if (Number(value) <= 47) return 'yellow';
            return 'red';

        // 6. Average Coolant ΔT (°C): Green: 10°C - 15°C, Yellow: 5°C - <10°C or >15°C - 20°C, Red: <5°C or >20°C
        case 'avgCoolantDeltaT':
        case 'coolingDeltaT':
            if (Number(value) >= 10 && Number(value) <= 15) return 'green';
            if ((Number(value) >= 5 && Number(value) < 10) || (Number(value) > 15 && Number(value) <= 20)) return 'yellow';
            return 'red';

        // 7. Active Alarm (Cooling Details): Green: 0, Red: > 0 (Matches Image 1 & 3: 0 is green, 1 and 4 are red)
        case 'coolingActiveAlarm':
            if (Number(value) <= 0) return 'green';
            return 'red';

        // Active Alarm: Green: 0, Yellow: 1-3, Red: > 3 (Matches Image 1 & Image 3)
        case 'powerPathActiveAlarm':
        case 'activeAlarm':
        case 'activeAlarms':
        case 'active_alarm':
        case 'active_alarms':
            if (Number(value) <= 0) return 'green';
            if (Number(value) <= 3) return 'yellow';
            return 'red';

        case 'overallPerformance':
            if (Number(value) > 85) return 'green';
            if (Number(value) >= 70) return 'yellow';
            if (Number(value) >= 55) return 'orange';
            return 'red';
        case 'coolingEff':
        case 'coolantCoolingEff':
            if (Number(value) > 85) return 'green';
            if (Number(value) >= 80) return 'yellow';
            if (Number(value) >= 70) return 'orange';
            return 'red';

        // UTILIZATION (0 - 100%)
        case 'cpuUtil':
        case 'cpu_utilization':
        case 'cpu':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'gpuUtil':
        case 'gpu_utilization':
        case 'gpu':
            if (Number(value) >= 20 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 70 && Number(value) <= 85)) return 'yellow';
            if ((Number(value) >= 5 && Number(value) < 10) || (Number(value) > 85 && Number(value) <= 95)) return 'orange';
            return 'red';

        case 'gpuMemUtil':
        case 'gpu_memory_utilization':
        case 'gpuMemory':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'memUtil':
        case 'memory_utilization':
        case 'memory':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'diskUtil':
        case 'disk_utilization':
        case 'disk':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'network':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'fan_speed':
        case 'fanSpeed':
            if (Number(value) >= 40 && Number(value) <= 75) return 'green';
            if ((Number(value) >= 30 && Number(value) < 40) || (Number(value) > 75 && Number(value) <= 85)) return 'yellow';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 85 && Number(value) <= 95)) return 'orange';
            return 'red';

        // EFFICIENCY
        case 'computeEff':
        case 'computingEff':
            if (Number(value) > 90) return 'green';
            if (Number(value) >= 80) return 'yellow';
            if (Number(value) >= 70) return 'orange';
            return 'red';

        case 'airCooledEff':
        case 'airCoolingEff':
        case 'airCooledEfficiency':
            if (Number(value) > 85) return 'green';
            if (Number(value) >= 80) return 'yellow';
            if (Number(value) >= 70) return 'orange';
            return 'red';

        // TEMPERATURES
        case 'roomTemp':
            if (Number(value) >= 18 && Number(value) <= 24) return 'green';
            if (Number(value) > 24 && Number(value) <= 26.5) return 'yellow';
            if (Number(value) > 26.5 && Number(value) <= 29) return 'orange';
            return 'red';

        case 'inletTemp':
        case 'avgRackInletTemp':
        case 'airInlet':
        case 'rackInletTemp':
        case 'coldAisleTemp':
        case 'rackInlet':
            if (Number(value) >= 18 && Number(value) <= 24) return 'green';
            if (Number(value) > 24 && Number(value) <= 27) return 'yellow';
            if (Number(value) > 27 && Number(value) <= 29) return 'orange';
            return 'red';

        case 'outletTemp':
        case 'avgRackOutletTemp':
        case 'airOutlet':
        case 'rackOutletTemp':
        case 'hotAisleTemp':
        case 'rackOutlet':
            if (Number(value) < 36) return 'green';
            if (Number(value) >= 36 && Number(value) <= 40) return 'yellow';
            if (Number(value) > 40 && Number(value) <= 44) return 'orange';
            return 'red';

        case 'avgRackDeltaT':
            if (Number(value) >= 3 && Number(value) <= 7) return 'green';
            if ((Number(value) >= 1.5 && Number(value) < 3) || (Number(value) > 7 && Number(value) <= 9)) return 'yellow';
            if ((Number(value) >= 0.5 && Number(value) < 1.5) || (Number(value) > 9 && Number(value) <= 11)) return 'orange';
            return 'red';
        case 'rackCoolantDeltaT':
            if (Number(value) >= 5 && Number(value) <= 9) return 'green';
            if ((Number(value) >= 3 && Number(value) < 5) || (Number(value) > 9 && Number(value) <= 11)) return 'yellow';
            if ((Number(value) >= 1.5 && Number(value) < 3) || (Number(value) > 11 && Number(value) <= 14)) return 'orange';
            return 'red';
        case 'airDeltaT':
            if (Number(value) >= 5 && Number(value) <= 12) return 'green';
            if ((Number(value) >= 3 && Number(value) < 5) || (Number(value) > 12 && Number(value) <= 14)) return 'yellow';
            if ((Number(value) >= 1.5 && Number(value) < 3) || (Number(value) > 14 && Number(value) <= 16)) return 'orange';
            return 'red';

        case 'cpuTemp':
        case 'cpu_temp':
            if (Number(value) <= 60) return 'green';
            if (Number(value) > 60 && Number(value) <= 70) return 'yellow';
            if (Number(value) > 70 && Number(value) <= 80) return 'orange';
            return 'red';

        case 'gpuTemp':
        case 'gpu_temp':
            if (Number(value) <= 65) return 'green';
            if (Number(value) > 65 && Number(value) <= 75) return 'yellow';
            if (Number(value) > 75 && Number(value) <= 85) return 'orange';
            return 'red';

        case 'dimm_temp':
        case 'dimmTemp':
            if (Number(value) <= 45) return 'green';
            if (Number(value) > 45 && Number(value) <= 55) return 'yellow';
            if (Number(value) > 55 && Number(value) <= 70) return 'orange';
            return 'red';

        case 'motherboard_temp':
        case 'motherboardTemp':
            if (Number(value) <= 45) return 'green';
            if (Number(value) > 45 && Number(value) <= 55) return 'yellow';
            if (Number(value) > 55 && Number(value) <= 70) return 'orange';
            return 'red';

        case 'ssd_temp':
        case 'ssdTemp':
            if (Number(value) <= 55) return 'green';
            if (Number(value) > 55 && Number(value) <= 65) return 'yellow';
            if (Number(value) > 65 && Number(value) <= 75) return 'orange';
            return 'red';

        case 'nic_temp':
        case 'nicTemp':
            if (Number(value) <= 60) return 'green';
            if (Number(value) > 60 && Number(value) <= 65) return 'yellow';
            if (Number(value) > 65 && Number(value) <= 75) return 'orange';
            return 'red';

        case 'vrm_temp':
        case 'vrmTemp':
            if (Number(value) <= 75) return 'green';
            if (Number(value) > 75 && Number(value) <= 80) return 'yellow';
            if (Number(value) > 80 && Number(value) <= 85) return 'orange';
            return 'red';

        // COOLING & FLOW
        case 'coolantSupplyTemp':
        case 'coolant_inlet':
        case 'coolantInlet':
            if (Number(value) <= 24) return 'green';
            if (Number(value) > 24 && Number(value) <= 27) return 'yellow';
            if (Number(value) > 27 && Number(value) <= 29) return 'orange';
            return 'red';

        case 'coolantReturnTemp':
        case 'coolant_outlet':
        case 'coolantOutlet':
            if (Number(value) <= 30) return 'green';
            if (Number(value) >= 31 && Number(value) <= 36) return 'yellow';
            if (Number(value) > 36 && Number(value) <= 39) return 'orange';
            return 'red';

        case 'coolantFlowRate':
            if (Number(value) >= 40 && Number(value) <= 50) return 'green';
            if ((Number(value) >= 35 && Number(value) < 40) || (Number(value) > 50 && Number(value) <= 55)) return 'yellow';
            if ((Number(value) >= 25 && Number(value) < 35) || (Number(value) > 55 && Number(value) <= 65)) return 'orange';
            return 'red';

        case 'airflowCfm':
        case 'airflowRate':
            if (Number(value) >= 1000 && Number(value) <= 1300) return 'green';
            if (Number(value) > 1300 && Number(value) <= 1600) return 'yellow';
            if (Number(value) > 1600 && Number(value) <= 2000) return 'orange';
            return 'red';

        case 'coolantPressure':
            if (Number(value) >= 2.5 && Number(value) <= 4) return 'green';
            if ((Number(value) >= 2 && Number(value) < 2.5) || (Number(value) > 4 && Number(value) <= 5)) return 'yellow';
            if ((Number(value) >= 1.3 && Number(value) < 2) || (Number(value) > 5 && Number(value) <= 6.5)) return 'orange';
            return 'red';

        case 'coolantLeakStatus':
            if (value === 'No Leak') return 'green';
            if (value === 'Leak Minor') return 'yellow';
            if (value === 'Leak Major') return 'orange';
            return 'red';

        case 'cduStatus':
            if (value === 'Operational') return 'green';
            if (value === 'Backup Active') return 'yellow';
            if (value === 'Overload') return 'orange';
            return 'red';

        case 'cduUtilization':
            if (Number(value) >= 30 && Number(value) <= 65) return 'green';
            if ((Number(value) >= 20 && Number(value) <= 29) || (Number(value) >= 66 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) <= 19) || (Number(value) >= 81 && Number(value) <= 90)) return 'orange';
            return 'red';

        // POWER
        case 'voltage':
            if (Number(value) >= 227 && Number(value) <= 233) return 'green';
            if ((Number(value) >= 224 && Number(value) <= 226) || (Number(value) >= 234 && Number(value) <= 236)) return 'yellow';
            if ((Number(value) >= 218 && Number(value) <= 223) || (Number(value) >= 237 && Number(value) <= 242)) return 'orange';
            return 'red';

        case 'idle_power_pct':
            if (Number(value) <= 15) return 'green';
            if (Number(value) > 15 && Number(value) <= 22) return 'yellow';
            if (Number(value) > 22 && Number(value) <= 30) return 'orange';
            return 'red';

        case 'powerUtilization':
        case 'pduLoad':
        case 'utilization':
        case 'power_draw_pct':
        case 'peak_power_pct':
            if (Number(value) >= 40 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 25 && Number(value) < 40) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 25) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'upsStatus':
            if (value === 'Normal') return 'green';
            if (value === 'On Battery') return 'yellow';
            if (value === 'Overload') return 'orange';
            return 'red';

        case 'batteryHealth':
            if (Number(value) > 95) return 'green';
            if (Number(value) >= 85 && Number(value) <= 94) return 'yellow';
            if (Number(value) >= 70 && Number(value) <= 84) return 'orange';
            return 'red';

        case 'powerFactor':
            if (Number(value) >= 0.95) return 'green';
            if (Number(value) >= 0.90 && Number(value) <= 0.949) return 'yellow';
            if (Number(value) >= 0.85 && Number(value) <= 0.899) return 'orange';
            return 'red';

        // COMPUTING & THROTTLING
        case 'networkThroughputPct':
            if (Number(value) >= 30 && Number(value) <= 70) return 'green';
            if ((Number(value) >= 20 && Number(value) < 30) || (Number(value) > 70 && Number(value) <= 80)) return 'yellow';
            if ((Number(value) >= 10 && Number(value) < 20) || (Number(value) > 80 && Number(value) <= 90)) return 'orange';
            return 'red';

        case 'runningJobsPerServer':
            if (Number(value) >= 2 && Number(value) <= 5) return 'green';
            if ((Number(value) >= 1 && Number(value) < 2) || (Number(value) > 5 && Number(value) <= 10)) return 'yellow';
            if ((Number(value) >= 0.5 && Number(value) < 1) || (Number(value) > 10 && Number(value) <= 14)) return 'orange';
            return 'red';

        case 'cpuThermalThrottling':
        case 'gpuThermalThrottling':
        case 'cpu_throttling_events':
        case 'gpu_throttling_events':
            if (Number(value) === 0) return 'green';
            if (Number(value) === 1) return 'yellow';
            return 'red';

        case 'cpu_load_avg':
            if (Number(value) <= 2) return 'green';
            if (Number(value) <= 4) return 'yellow';
            if (Number(value) <= 8) return 'orange';
            return 'red';

        case 'cpuLoadAvg':
            if (Number(value) <= 0.7) return 'green';
            if (Number(value) > 0.7 && Number(value) <= 1) return 'yellow';
            if (Number(value) > 1 && Number(value) <= 2) return 'orange';
            return 'red';

        default:
            return 'default';
    }
};

export const getStatusColor = (status: ThresholdStatus): string => {
    return STATUS_PALETTE[status]?.hex ?? STATUS_PALETTE.default.hex;
};

export const getPillStyle = (status: ThresholdStatus) => {
    const token = STATUS_PALETTE[status] ?? STATUS_PALETTE.default;
    return { bg: token.bg, border: token.border || 'transparent' };
};

export const getPillClass = (status: ThresholdStatus) => {
    switch (status) {
        case 'green': return 'rc-pill-green';
        case 'yellow': return 'rc-pill-yellow';
        case 'orange': return 'rc-pill-orange';
        case 'red': return 'rc-pill-red';
        case 'default': return 'rc-pill-default';
    }
};

export const getTextClass = (status: ThresholdStatus) => {
    switch (status) {
        case 'green': return 'crc-green-text';
        case 'yellow': return 'crc-warn-text';
        case 'orange': return 'crc-orange-text';
        case 'red': return 'crc-danger-text';
        case 'default': return 'crc-default-text';
    }
};

export const getBadgeBoxStyle = (status: ThresholdStatus): React.CSSProperties => {
    const token = STATUS_PALETTE[status] ?? STATUS_PALETTE.default;
    return {
        background: token.bg,
        border: token.border ? `1.5px solid ${token.border}` : 'none',
        boxShadow: token.glow ? `0 0 10px ${token.glow}` : 'none',
        color: '#ffffff'
    };
};


