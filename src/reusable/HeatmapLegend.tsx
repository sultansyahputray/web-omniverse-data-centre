import React, { useMemo } from 'react';
import './HeatmapLegend.css';

export interface HeatmapLegendProps {
    minTemp?: number;
    maxTemp?: number;
    step?: number;
    unit?: string;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const HeatmapLegend: React.FC<HeatmapLegendProps> = ({
    minTemp = 22,
    maxTemp = 36,
    step = 2,
    unit = '°C',
    title = 'Temperature',
    className = '',
    style
}) => {
    // Generate tick values from maxTemp down to minTemp
    const ticks = useMemo(() => {
        const list: number[] = [];
        const stepVal = step && step > 0 ? step : 2;
        for (let t = maxTemp; t >= minTemp; t -= stepVal) {
            list.push(t);
        }
        // Ensure minTemp is always included as the last tick
        if (list[list.length - 1] !== minTemp) {
            list.push(minTemp);
        }
        return list;
    }, [minTemp, maxTemp, step]);

    return (
        <div
            className={`heatmap-legend-card ${className}`.trim()}
            style={style}
            aria-label={`${title} (${unit}) Heatmap Legend`}
        >
            <div className="heatmap-legend-title">
                {title} ({unit})
            </div>
            <div className="heatmap-legend-body">
                <div className="heatmap-legend-gradient-bar" />
                <div className="heatmap-legend-ticks">
                    {ticks.map((val) => (
                        <span key={val} className="heatmap-legend-tick-label">
                            {val}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeatmapLegend;
