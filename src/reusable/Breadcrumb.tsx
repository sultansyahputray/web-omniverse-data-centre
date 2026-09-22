import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface BreadcrumbItem {
    id: string;
    label: string;
    navigation: string | null;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export const Breadcrumb = ({ items, onItemClick } : BreadcrumbProps) => {
    const handleClick = (item: BreadcrumbItem, index: number) => {
        if (onItemClick) {
            onItemClick(item, index);
        }
    };

    return (
        <div className='breadcrumb-container'>
            {items.map((item, idx) => (
                <Fragment key={item.id}>
                    <button 
                        key={item.id}
                        className={idx == items.length - 1 ? "breadcrumb-current-level" : "breadcrumb-previous-level"} 
                        onClick={() => handleClick(item, idx)}
                    >{item.label}</button>
                    {idx < items.length - 1 && <FontAwesomeIcon icon="fa-solid fa-angle-right" style={{color: "#eeeeee"}} />}
                </Fragment>
            ))}
        </div>
    );
};