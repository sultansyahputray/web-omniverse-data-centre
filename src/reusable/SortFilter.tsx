import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';
import { Dropdown } from './Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface SortItem {
    id: string;
    label: string;
}

export interface SortProps {
    items: SortItem[];
    is_asc?: boolean;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onToggleSort?: () => void;
    className?: string;
}

export const Sort = ({
    items,
    is_asc = true,
    label = 'Sort By',
    value,
    onChange,
    onToggleSort,
    className
}: SortProps) => {
    const getSortIcon = (asc?: boolean) => {
        if (asc) {
            return <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" style={{ color: "#000000" }} />;
        }
        return <FontAwesomeIcon icon="fa-solid fa-arrow-up-short-wide" style={{ color: "#000000" }} />;
    };

    return (
        <div className={`sort-container ${className || ''}`.trim()}>
            {label && <span className="sort-label">{label} :</span>}
            <div className="sort-select-wrapper">
                <select
                    className="sort-select"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                >
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="sort-direction-btn"
                    onClick={onToggleSort}
                    title={is_asc ? "Sorted Ascending (Click to flip)" : "Sorted Descending (Click to flip)"}
                    aria-label="Toggle sort direction"
                >
                    {getSortIcon(is_asc)}
                </button>
            </div>
        </div>
    );
};

export interface SearchFilterProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const SearchFilter = ({ placeholder = 'Search parameter', value, onChange, className }: SearchFilterProps) => {
    return (
        <div className={`search-filter-container ${className || ''}`.trim()}>
            <input 
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <button type="button" aria-label="Search">
                <FontAwesomeIcon icon="fa-solid fa-search" style={{ color: "#00E5FF" }} />
            </button>
        </div>
    );
};