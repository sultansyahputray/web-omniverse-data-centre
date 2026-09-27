import React, { useState } from 'react';
import { RegionalAvailabilityGauge } from '../../Icons';
import { CoolingModeToggleBar, CoolingMode } from '../Level3Building/CoolingModeToggleBar';
import { getStatus, getStatusColor, getPillClass } from '../../thresholdUtils';

export interface LiquidCoolingMetrics {
    inletTemp?: number;
    outletTemp?: number;
    coolantFlow?: number;
    coolingEff?: number;
}

export interface AirCoolingMetrics {
    supplyTemp?: number;
    returnTemp?: number;
    airFlow?: number;
    coolingEff?: number;
}

export interface Level5CoolingMetrics {
    activeAlarm?: number;
    liquid?: LiquidCoolingMetrics;
    air?: AirCoolingMetrics;
    coolantInletTemp?: string;
    avgCoolantOutletTemp?: string;
    coolantFlow?: string;
    coolingEff?: number;
}

interface Level5CoolingCardProps {
    data?: Level5CoolingMetrics;
    mode?: CoolingMode;
    onModeChange?: (mode: CoolingMode) => void;
}

export const Level5CoolingCard: React.FC<Level5CoolingCardProps> = ({
    data,
    mode: controlledMode,
    onModeChange
}) => {
    const [internalMode, setInternalMode] = useState<CoolingMode>('liquid');
    const activeMode = controlledMode ?? internalMode;

    const handleModeChange = (newMode: CoolingMode) => {
        setInternalMode(newMode);
        if (onModeChange) {
            onModeChange(newMode);
        }
    };

    // Liquid metrics defaults
    const liquid = data?.liquid;
    const inletTemp = liquid?.inletTemp ?? 46.05;
    const outletTemp = liquid?.outletTemp ?? 60.89;
    const coolantFlow = liquid?.coolantFlow ?? 66.98;
    const liquidEff = liquid?.coolingEff ?? 88.67;

    // Air metrics defaults
    const air = data?.air;
    const supplyTemp = air?.supplyTemp ?? 25.21;
    const returnTemp = air?.returnTemp ?? 32.23;
    const airFlow = air?.airFlow ?? 1230.78;
    const airEff = air?.coolingEff ?? 88.07;

    // Current displayed efficiency and gauge color
    const currentEff = activeMode === 'liquid' ? liquidEff : airEff;
    const effColor = getStatusColor(getStatus('coolingEff', currentEff));

    return (
        <div className="level5-row-card level5-cooling-card" aria-label="Cooling Status">
            {/* Top Toggle Bar */}
            <div className="level5-cooling-toggle-container">
                <CoolingModeToggleBar
                    mode={activeMode}
                    onChange={handleModeChange}
                />
            </div>

            <div className="level5-cooling-body">
                {/* 3 Metric Columns */}
                <div className="level5-metrics-triple-col">
                    {activeMode === 'liquid' ? (
                        <>
                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Coolant Inlet<br />Temperature</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantInletTemp', inletTemp))}`}>
                                    {inletTemp.toFixed(1)} &deg;C
                                </div>
                            </div>

                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Avg. Coolant<br />Outlet Temperat..</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantOutletTemp', outletTemp))}`}>
                                    {outletTemp.toFixed(1)} &deg;C
                                </div>
                            </div>

                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Coolant Flow<br />&nbsp;</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantFlow', coolantFlow))}`}>
                                    {coolantFlow.toFixed(2)} L/min
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Supply Temp.<br />&nbsp;</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('avgHallSupplyTemp', supplyTemp))}`}>
                                    {supplyTemp.toFixed(2)} &deg;C
                                </div>
                            </div>

                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Return Temp.<br />&nbsp;</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('avgHallReturnTemp', returnTemp))}`}>
                                    {returnTemp.toFixed(2)} &deg;C
                                </div>
                            </div>

                            <div className="level5-metric-cell">
                                <span className="level5-metric-label">Air Flow<br />&nbsp;</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('airflowCfm', airFlow))}`}>
                                    {airFlow.toFixed(2)} CFM
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Donut Gauge */}
                <div className="level5-gauge-section">
                    <span className="level5-gauge-label">Cooling Eff.</span>
                    <RegionalAvailabilityGauge
                        percentage={currentEff}
                        size={78}
                        strokeWidth={8.5}
                        color={effColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>
        </div>
    );
};
