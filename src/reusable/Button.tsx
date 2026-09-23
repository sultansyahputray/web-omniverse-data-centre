import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface NavigationButtonProps {
    label: string;
    navigation?: string | null;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface StatusItem {
    label: string;
    color: string;
    count: number;
}

export interface StatusProps {
    items: StatusItem[];
}

export interface ButtonBarWithStatusItem {
    label: string;
    status?: StatusItem[];
}

export interface ButtonBarWithStatusProps {
    items: ButtonBarWithStatusItem[];
    selectedIndex?: number;
    onSelect?: (index: number, label: string) => void;
    className?: string;
}

const Status = ({ items }: StatusProps) => {
    return (
        <div className="button-bar-status-container">
            {items.map((item, idx) => (
                <label key={idx} className="button-bar-status-item" style={{ backgroundColor: item.color }}>
                    {item.count}
                </label>
            ))}
        </div>
    );
};

export const NavigationButton = ({ label, navigation, onClick, className, style }: NavigationButtonProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e);
        } else {
            console.log('Navigation clicked:', label, navigation);
        }
    };

    return (
        <button 
            className={`navigation-button-container ${className || ''}`.trim()}
            onClick={handleClick}
            style={style}
            type="button"
        >
            <span>{label}</span>
            <FontAwesomeIcon icon="fa-solid fa-angle-right" style={{ color: "#eeeeee" }} />
        </button>
    );
};

export const ButtonBarWithStatus = ({ items, selectedIndex, onSelect, className }: ButtonBarWithStatusProps) => {
    const [internalIdx, setInternalIdx] = useState(0);
    const activeIdx = selectedIndex !== undefined ? selectedIndex : internalIdx;

    const handleClick = (idx: number, label: string) => {
        setInternalIdx(idx);
        if (onSelect) {
            onSelect(idx, label);
        }
    };    

    return (
        <div className={`button-bar-with-status-container ${className || ''}`.trim()}>
            {items.map((item, idx) => (
                <button 
                    key={item.label} 
                    type="button"
                    className={idx === activeIdx ? "button-bar-item active" : "button-bar-item"}
                    onClick={() => handleClick(idx, item.label)}
                >
                    <span>{item.label}</span>
                    {item.status && item.status.length > 0 && <Status items={item.status} />}
                </button>
            ))}
        </div>
    );
};