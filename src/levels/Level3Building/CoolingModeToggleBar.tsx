import React from 'react';

export type CoolingMode = 'liquid' | 'air';

interface CoolingModeToggleBarProps {
    mode?: CoolingMode;
    onChange?: (mode: CoolingMode) => void;
}

export const CoolingModeToggleBar: React.FC<CoolingModeToggleBarProps> = ({
    mode = 'liquid',
    onChange
}) => {
    return (
        <div className="cooling-mode-toggle-bar" role="tablist" aria-label="Cooling Mode">
            <button
                type="button"
                role="tab"
                aria-selected={mode === 'liquid'}
                className={`cooling-toggle-btn ${mode === 'liquid' ? 'active' : ''}`}
                onClick={() => onChange && onChange('liquid')}
            >
                Liquid Cooling
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={mode === 'air'}
                className={`cooling-toggle-btn ${mode === 'air' ? 'active' : ''}`}
                onClick={() => onChange && onChange('air')}
            >
                Air Cooling
            </button>
        </div>
    );
};
