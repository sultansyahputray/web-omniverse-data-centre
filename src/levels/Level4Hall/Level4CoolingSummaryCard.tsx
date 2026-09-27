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

export interface CoolingSummaryData {
    activeAlarm?: number;
    liquid?: LiquidCoolingMetrics;
    air?: AirCoolingMetrics;
}

interface Level4CoolingSummaryCardProps {
    data?: CoolingSummaryData;
    mode?: CoolingMode;
    onModeChange?: (mode: CoolingMode) => void;
}

export const Level4CoolingSummaryCard: React.FC<Level4CoolingSummaryCardProps> = ({
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

    const activeAlarm = data?.activeAlarm ?? 0;
    const alarmStatus = getStatus('activeAlarm', activeAlarm);

    // Liquid metrics defaults
    const liquid = data?.liquid;
    const inletTemp = liquid?.inletTemp ?? 45.05;
    const outletTemp = liquid?.outletTemp ?? 61.0;
    const coolantFlow = liquid?.coolantFlow ?? 66.978;
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
        <div className="level4-summary-card level4-cooling-card" aria-label="Cooling Summary">
            <div className="level4-card-header">
                <span className="level4-card-title">Cooling Summary</span>
                {/* <div className="level4-header-alarm">
                    <span className="alarm-title">Active Alarm</span>
                    <div className={`level4-alarm-badge ${alarmStatus}`}>
                        {activeAlarm}
                    </div>
                </div> */}
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* TOGGLE BAR (Liquid Cooling vs Air Cooling) */}
            <div className="level4-cooling-toggle-container">
                <CoolingModeToggleBar
                    mode={activeMode}
                    onChange={handleModeChange}
                />
            </div>

            <div className="level4-summary-content">
                {/* Left Column: Metric rows with pills */}
                <div className="level4-summary-metrics-col">
                    {activeMode === 'liquid' ? (
                        <>
                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Avg. Coolant Inlet Temperature</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantInletTemp', inletTemp))}`}>
                                    {inletTemp.toFixed(1)} &deg;C
                                </div>
                            </div>

                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Avg. Coolant Outlet Temperature</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantOutletTemp', outletTemp))}`}>
                                    {outletTemp.toFixed(1)} &deg;C
                                </div>
                            </div>

                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Coolant Flow</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('hallCoolantFlow', coolantFlow))}`}>
                                    {coolantFlow.toFixed(2)} L/min
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Avg. Hall Supply Temp.</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('avgHallSupplyTemp', supplyTemp))}`}>
                                    {supplyTemp.toFixed(2)} &deg;C
                                </div>
                            </div>

                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Avg. Hall Return Temp.</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('avgHallReturnTemp', returnTemp))}`}>
                                    {returnTemp.toFixed(2)} &deg;C
                                </div>
                            </div>

                            <div className="summary-metric-row">
                                <span className="summary-metric-label">Air Flow</span>
                                <div className={`summary-pill-common ${getPillClass(getStatus('airflowCfm', airFlow))}`}>
                                    {airFlow.toFixed(2)} CFM
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Column: Donut Gauge */}
                <div className="level4-summary-gauge-col">
                    <span className="summary-gauge-label">Cooling Eff.</span>
                    <RegionalAvailabilityGauge
                        percentage={currentEff}
                        size={84}
                        strokeWidth={9}
                        color={effColor}
                        bgColor="rgba(255, 255, 255, 0.12)"
                    />
                </div>
            </div>
        </div>
    );
};
