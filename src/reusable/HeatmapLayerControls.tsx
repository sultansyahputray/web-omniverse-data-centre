import React from 'react';
import './HeatmapLayerControls.css';

export interface HeatmapLayerControlsProps {
    airflowChecked?: boolean;
    floorChecked?: boolean;
    ambienceChecked?: boolean;
    onToggleAirflow?: (checked: boolean) => void;
    onToggleFloor?: (checked: boolean) => void;
    onToggleAmbience?: (checked: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

export const HeatmapLayerControls: React.FC<HeatmapLayerControlsProps> = ({
    airflowChecked = true,
    floorChecked = true,
    ambienceChecked = true,
    onToggleAirflow,
    onToggleFloor,
    onToggleAmbience,
    className = '',
    style,
    disabled = false
}) => {
    const handleAirflowClick = () => {
        if (!disabled && onToggleAirflow) {
            onToggleAirflow(!airflowChecked);
        }
    };

    const handleAirflowKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            if (onToggleAirflow) {
                onToggleAirflow(!airflowChecked);
            }
        }
    };

    const handleFloorClick = () => {
        if (!disabled && onToggleFloor) {
            onToggleFloor(!floorChecked);
        }
    };

    const handleFloorKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            if (onToggleFloor) {
                onToggleFloor(!floorChecked);
            }
        }
    };

    const handleAmbienceClick = () => {
        if (!disabled && onToggleAmbience) {
            onToggleAmbience(!ambienceChecked);
        }
    };

    const handleAmbienceKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            if (onToggleAmbience) {
                onToggleAmbience(!ambienceChecked);
            }
        }
    };

    return (
        <div
            className={`heatmap-layer-controls-card ${className}`.trim()}
            style={style}
            role="group"
            aria-label="Heatmap Sub-layer Controls"
        >
            {/* 1. Airflow Toggle */}
            <div
                className="heatmap-layer-item"
                onClick={handleAirflowClick}
                onKeyDown={handleAirflowKeyDown}
                role="checkbox"
                aria-checked={airflowChecked}
                tabIndex={disabled ? -1 : 0}
                title={airflowChecked ? 'Hide Airflow Streamlines' : 'Show Airflow Streamlines'}
            >
                <div className={`heatmap-layer-checkbox ${airflowChecked ? 'checked' : ''}`}>
                    {airflowChecked && (
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                stroke="#ffffff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                <span className="heatmap-layer-label">Airflow</span>
            </div>

            {/* 2. Floor Toggle */}
            <div
                className="heatmap-layer-item"
                onClick={handleFloorClick}
                onKeyDown={handleFloorKeyDown}
                role="checkbox"
                aria-checked={floorChecked}
                tabIndex={disabled ? -1 : 0}
                title={floorChecked ? 'Hide Floor Thermal Slice' : 'Show Floor Thermal Slice'}
            >
                <div className={`heatmap-layer-checkbox ${floorChecked ? 'checked' : ''}`}>
                    {floorChecked && (
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                stroke="#ffffff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                <span className="heatmap-layer-label">Floor</span>
            </div>

            {/* 3. Ambience Toggle */}
            <div
                className="heatmap-layer-item"
                onClick={handleAmbienceClick}
                onKeyDown={handleAmbienceKeyDown}
                role="checkbox"
                aria-checked={ambienceChecked}
                tabIndex={disabled ? -1 : 0}
                title={ambienceChecked ? 'Hide Ambience Air Chamber & Wall Gradients' : 'Show Ambience Air Chamber & Wall Gradients'}
            >
                <div className={`heatmap-layer-checkbox ${ambienceChecked ? 'checked' : ''}`}>
                    {ambienceChecked && (
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                stroke="#ffffff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                <span className="heatmap-layer-label">Ambience</span>
            </div>
        </div>
    );
};

export default HeatmapLayerControls;
