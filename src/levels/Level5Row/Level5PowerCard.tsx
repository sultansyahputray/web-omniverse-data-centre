import React from 'react';
import { getStatus, getPillClass } from '../../thresholdUtils';

export interface Level5PowerMetrics {
    activePower?: number | string;
    activeServers?: number | string;
    activeServer?: number | string;
    activeRack?: number | string;
    pue?: number | string;
    pue1?: number | string;
    avgPowerPerRack?: number | string;
    activeAlarm?: number;
}

interface Level5PowerCardProps {
    data?: Level5PowerMetrics;
}

export const Level5PowerCard: React.FC<Level5PowerCardProps> = ({
    data
}) => {
    const rawPower = data?.activePower ?? 711.81;
    const rawServers = data?.activeServers ?? data?.activeServer ?? data?.activeRack ?? 143;
    const rawPue = data?.pue ?? data?.pue1 ?? 1.09;
    const rawPowerPerRack = data?.avgPowerPerRack ?? 79.09;

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
        <div className="level5-row-card level5-power-pure-card" aria-label="Power Status">
            {/* 2x2 Grid of Metrics */}
            <div className="level5-power-grid">
                {/* Row 1, Col 1: Active Power */}
                <div className="level5-power-cell">
                    <span className="level5-metric-label">Active Power</span>
                    <div className={`summary-pill-common ${getPillClass(powerStatus)}`}>
                        {formattedPower}
                    </div>
                </div>

                {/* Row 1, Col 2: Active Server */}
                <div className="level5-power-cell">
                    <span className="level5-metric-label">Active Server</span>
                    <div className="summary-pill-common summary-pill-navy">
                        {rawServers}
                    </div>
                </div>

                {/* Row 2, Col 1: PUE */}
                <div className="level5-power-cell">
                    <span className="level5-metric-label">PUE</span>
                    <div className={`summary-pill-common ${getPillClass(pueStatus)}`}>
                        {formattedPue}
                    </div>
                </div>

                {/* Row 2, Col 2: Avg. Power/Rack */}
                <div className="level5-power-cell">
                    <span className="level5-metric-label">Avg. Power/Rack</span>
                    <div className={`summary-pill-common ${getPillClass(rackPowerStatus)}`}>
                        {formattedRackPower}
                    </div>
                </div>
            </div>
        </div>
    );
};
