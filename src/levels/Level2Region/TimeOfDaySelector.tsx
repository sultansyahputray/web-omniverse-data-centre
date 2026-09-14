import React, { useState, useRef, useEffect } from 'react';
import { TimeOfDay } from '../../types';
import { SunIcon, SunsetIcon, MoonIcon, ChevronDownIcon } from '../../Icons';

interface TimeOfDaySelectorProps {
    currentTime: TimeOfDay;
    onSelectTime: (time: TimeOfDay) => void;
}

interface TimeOption {
    key: TimeOfDay;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
}

const TIME_OPTIONS: TimeOption[] = [
    {
        key: 'pagi',
        label: 'Pagi',
        sublabel: 'Daylight / Clear Sky',
        icon: <SunIcon size={18} color="#ffc83b" />
    },
    {
        key: 'sore',
        label: 'Sore',
        sublabel: 'Sunset / Golden Hour',
        icon: <SunsetIcon size={18} color="#ff7b42" />
    },
    {
        key: 'malam',
        label: 'Malam',
        sublabel: 'Night / Starry Sky',
        icon: <MoonIcon size={18} color="#62d0ff" />
    }
];

export const TimeOfDaySelector: React.FC<TimeOfDaySelectorProps> = ({ currentTime, onSelectTime }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeOption = TIME_OPTIONS.find((opt) => opt.key === currentTime) || TIME_OPTIONS[0];

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

    const handleSelect = (timeKey: TimeOfDay) => {
        onSelectTime(timeKey);
        setIsOpen(false);
    };

    return (
        <div className="time-of-day-container" ref={dropdownRef}>
            <div className="time-selector-label">ENVIRONMENT LIGHTING</div>

            {/* Dropdown Trigger Button */}
            <button
                className={`time-selector-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
            >
                <div className="trigger-left">
                    <span className="trigger-icon">{activeOption.icon}</span>
                    <div className="trigger-text-group">
                        <span className="trigger-label">{activeOption.label}</span>
                        <span className="trigger-sublabel">{activeOption.sublabel}</span>
                    </div>
                </div>
                <div className={`trigger-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDownIcon size={16} color="#00e5ff" />
                </div>
            </button>

            {/* Dropdown Options Menu */}
            {isOpen && (
                <div className="time-selector-menu">
                    {TIME_OPTIONS.map((option) => {
                        const isSelected = option.key === currentTime;
                        return (
                            <div
                                key={option.key}
                                className={`time-menu-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.key)}
                            >
                                <span className="menu-item-icon">{option.icon}</span>
                                <div className="menu-item-text">
                                    <span className="menu-item-label">{option.label}</span>
                                    <span className="menu-item-sublabel">{option.sublabel}</span>
                                </div>
                                {isSelected && <div className="menu-item-active-dot" />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
