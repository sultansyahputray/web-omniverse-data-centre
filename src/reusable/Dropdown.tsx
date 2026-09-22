import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import '../GlobalDashboard.css';
import './Reusable.css';

export interface DropdownItem {
    id: string;
    label: string;
}

interface DropdownProps {
    items: DropdownItem[],
    label: string
}

export const Dropdown = ({ items, label } : DropdownProps) => {
    const handleClick = (e) => {
        console.log(e);
    };

    return (
        <div className="dropdown-container">
            <label for="options">{label} :</label>
            <select id="options">
                {items.map((item, idx) => (
                    <option value={item.id}>{item.label}</option>
                ))}
            </select>
        </div>
    );
};