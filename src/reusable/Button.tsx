import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

interface NavigationButtonProps {
    label: string,
    navigation: string | null
}

interface StatusItem {
    label: string,
    color: string,
    count: number
}

interface StatusProps {
    items: StatusItem[]
}

export interface ButtonBarWithStatusItem {
    label: string;
    status: StatusItem[];
}

interface ButtonBarWithStatusProps {
    items: ButtonBarWithStatusItem[]
}

const Status = ({ items }: StatusProps) => {
    return (
        <div className="button-bar-status-container">
            {items.map((item, idx) => (
                <label className="button-bar-status-item" style={{backgroundColor: item.color}}>{item.count}</label>
            ))}
        </div>
    );
}

export const NavigationButton = ({ label, navigation }: NavigationButtonProps) => {
    const handleClick = (e) => {
        console.log(e);
    };

    return (
        <button 
            className="navigation-button-container"
            onClick={handleClick}
        >
            {label}
            <FontAwesomeIcon icon="fa-solid fa-angle-right" style={{color: "#eeeeee"}} />
        </button>
    );
}

export const ButtonBarWithStatus = ({ items }: ButtonBarWithStatusProps) => {
    const [selectedItemIdx, setSelectedItemIdx] = useState(0);

    const handleClick = (e) => {
        setSelectedItemIdx(e.target.value);
    };    

    return (
        <div className="button-bar-with-status-container">
            {items.map((item, idx) => (
                <Fragment key={item.label}>
                    <button 
                        key={item.label} 
                        className={idx == selectedItemIdx ? "button-bar-item active" : "button-bar-item"}
                        value={idx}
                        onClick={handleClick}
                    >
                        <label>{item.label}</label>
                        {item.status.length > 0 && <Status items={item.status}></Status>}
                    </button>
                </Fragment>
            ))}
        </div>
    );
};