import React from 'react';
import { getStatus, getPillClass } from '../../thresholdUtils';

export interface PowerSummaryMetrics {
    activePower?: number | string;
    activeServers?: number | string;
    activeServer?: number | string;
    activeRack?: number | string;
    pue?: number | string;
    avgPowerPerRack?: number | string;
    activeAlarm?: number;
}

interface Level4PowerSummaryCardProps {
    data?: PowerSummaryMetrics;
}

export const Level4PowerSummaryCard: React.FC<Level4PowerSummaryCardProps> = ({
    data
}) => {
    const rawPower = data?.activePower ?? 711.81;
    const rawServers = data?.activeServers ?? data?.activeServer ?? data?.activeRack ?? 143;
    const rawPue = data?.pue ?? 1.09;
    const rawPowerPerRack = data?.avgPowerPerRack ?? 79.09;
    const activeAlarm = data?.activeAlarm ?? 0;

    const alarmStatus = getStatus('activeAlarm', activeAlarm);
    const powerStatus = getStatus('hallActivePower', rawPower);
    const pueStatus = getStatus('pue', rawPue);
    const rackPowerStatus = getStatus('avgPowerPerRack', rawPowerPerRack);

    const formattedPower = typeof rawPower === 'number'
        ? `${rawPower.toFixed(2)} kW`
        : `${rawPower}`;

    const formattedPue = typeof rawPue === 'number'
        ? rawPue.toFixed(3)
        : `${rawPue}`;

    const formattedRackPower = typeof rawPowerPerRack === 'number'
        ? `${rawPowerPerRack.toFixed(2)} kW`
        : `${rawPowerPerRack}`;

    return (
        <div className="level4-summary-card level4-power-card" aria-label="Power Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Power Summary</span>
                {/* <div className="level4-header-alarm">
                    <span className="alarm-title">Active Alarm</span>
                    <div className={`level4-alarm-badge ${alarmStatus}`}>
                        {activeAlarm}
                    </div>
                </div> */}
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* 4 HORIZONTAL METRIC COLUMNS */}
            <div className="level4-power-metrics-grid">
                {/* 1. Active Power */}
                <div className="power-metric-col">
                    <span className="power-metric-col-label">Active Power</span>
                    <div className={`summary-pill-common ${getPillClass(powerStatus)}`}>
                        {formattedPower}
                    </div>
                </div>

                {/* 2. Active Server */}
                <div className="power-metric-col">
                    <span className="power-metric-col-label">Active Server</span>
                    <div className="summary-pill-common summary-pill-navy">
                        {rawServers}
                    </div>
                </div>

                {/* 3. PUE */}
                <div className="power-metric-col">
                    <span className="power-metric-col-label">PUE</span>
                    <div className={`summary-pill-common ${getPillClass(pueStatus)}`}>
                        {formattedPue}
                    </div>
                </div>

                {/* 4. Avg. Power/Rack */}
                <div className="power-metric-col">
                    <span className="power-metric-col-label">Avg. Power/Rack</span>
                    <div className={`summary-pill-common ${getPillClass(rackPowerStatus)}`}>
                        {formattedRackPower}
                    </div>
                </div>
            </div>
        </div>
    );
};
