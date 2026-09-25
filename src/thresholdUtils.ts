export type ThresholdStatus = 'green' | 'yellow' | 'orange' | 'red' | 'default';

export const getStatus = (param: string, value: number | string): ThresholdStatus => {
    if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(parsed)) value = parsed;
    }

    switch (param) {
        // FACILITY LOAD (Level Globe / Country / Building)
        // Green: <= 95%, Yellow: 95% - 98%, Red: >= 98%
        case 'facilityLoad':
        case 'facility_load':
        case 'facilityLoadPct':
            if (Number(value) <= 95) return 'green';
            if (Number(value) < 98) return 'yellow';
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

        case 'pue':
            if (Number(value) <= 1.2) return 'green';
            if (Number(value) <= 1.4) return 'yellow';
            if (Number(value) <= 1.6) return 'orange';
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
        case 'coolantDeltaT':
        case 'avgCoolantDeltaT':
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
        case 'coolantFlow':
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
    switch (status) {
        case 'green': return '#34c759';
        case 'yellow': return '#ffcc00';
        case 'orange': return '#ff9500';
        case 'red': return '#ff383c';
        case 'default': return '#00d4ff';
    }
};

export const getPillStyle = (status: ThresholdStatus) => {
    switch (status) {
        case 'green': return { bg: 'rgba(52, 199, 89, 0.6)', border: 'rgba(52, 199, 89, 1)' };
        case 'yellow': return { bg: 'rgba(255, 204, 0, 0.4)', border: 'rgba(255, 204, 0, 1)' };
        case 'orange': return { bg: 'rgba(255, 149, 0, 0.4)', border: 'rgba(255, 149, 0, 1)' };
        case 'red': return { bg: 'rgba(255, 56, 60, 0.5)', border: 'rgba(255, 56, 60, 1)' };
        case 'default': return { bg: 'rgba(0, 212, 255, 0.15)', border: 'rgba(0, 212, 255, 0.4)' };
    }
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
