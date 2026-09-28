import React from 'react';
import './Reusable.css';

export interface HeatmapCheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

export const HeatmapCheckbox: React.FC<HeatmapCheckboxProps> = ({
    checked = false,
    onChange,
    label = 'Heat Map',
    className = '',
    style,
    disabled = false
}) => {
    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            if (onChange) {
                onChange(!checked);
            }
        }
    };

    return (
        <div
            className={`heatmap-checkbox-container ${checked ? 'checked' : ''} ${className}`.trim()}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            style={style}
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            title={checked ? `Disable ${label}` : `Enable ${label}`}
        >
            <div className={`heatmap-custom-box ${checked ? 'checked' : ''}`}>
                {checked && (
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
            <span className="heatmap-checkbox-label">{label}</span>
        </div>
    );
};

export default HeatmapCheckbox;
