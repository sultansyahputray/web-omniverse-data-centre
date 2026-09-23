import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import '../GlobalDashboard.css';
import './Reusable.css';

export interface DropdownItem {
    id: string;
    label: string;
}

export interface DropdownProps {
    items: DropdownItem[];
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const Dropdown = ({ items, label, value, onChange, className }: DropdownProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`dropdown-container ${className || ''}`.trim()}>
            {label && <label htmlFor="options">{label} :</label>}
            <select 
                id="options" 
                value={value} 
                onChange={handleChange}
            >
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};