import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../Icons';
import './Reusable.css';

export interface LoadScenarioSelectorProps {
    currentScenario?: string;
    onSelectScenario?: (scenario: string) => void;
}

interface ScenarioOption {
    key: string;       // backend value: "Normal Load" | "Medium Load" | "High Load"
    label: string;     // display label: "Low Load" | "Medium Load" | "High Load"
}

const SCENARIO_OPTIONS: ScenarioOption[] = [
    { key: 'Normal Load', label: 'Low Load' },
    { key: 'Medium Load', label: 'Medium Load' },
    { key: 'High Load', label: 'High Load' },
];

export const LoadScenarioSelector: React.FC<LoadScenarioSelectorProps> = ({
    currentScenario = 'Normal Load',
    onSelectScenario
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize matching (handles 'Normal Load' or 'Low Load')
    const activeOption = SCENARIO_OPTIONS.find((opt) =>
        opt.key.toLowerCase() === currentScenario.toLowerCase() ||
        opt.label.toLowerCase() === currentScenario.toLowerCase()
    ) || SCENARIO_OPTIONS[0];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: ScenarioOption) => {
        if (onSelectScenario) {
            onSelectScenario(option.key);
        }
        setIsOpen(false);
    };

    return (
        <div className="load-scenario-container" ref={dropdownRef}>
            {/* Dropdown Trigger Button */}
            <button
                className={`load-scenario-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="load-scenario-label">{activeOption.label}</span>
                <div className={`trigger-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDownIcon size={16} color="#00e5ff" />
                </div>
            </button>

            {/* Dropdown Options Menu (Pops up above trigger, matching TimeOfDaySelector style) */}
            {isOpen && (
                <div className="load-scenario-menu" role="listbox">
                    {SCENARIO_OPTIONS.map((option) => {
                        const isSelected = activeOption.key === option.key;
                        return (
                            <div
                                key={option.key}
                                className={`load-scenario-menu-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                                role="option"
                                aria-selected={isSelected}
                            >
                                <span className="load-scenario-item-label">{option.label}</span>
                                {isSelected && <div className="menu-item-active-dot" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LoadScenarioSelector;
