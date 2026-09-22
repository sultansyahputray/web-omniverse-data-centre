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
    id: string,
    label: string
}

interface SortProps {
    items: SortItem[],
    is_asc: boolean,
    label string
}

interface SearchFilterProps {
    placeholder: string
}

export const Sort = ({ items, is_asc, label }: SortProps) => {
    const getSortIcon = (is_asc) => {
        if (is_asc) {
            return <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" style={{color: "#FFFFFF"}} /> 
        }

        return <FontAwesomeIcon icon="fa-solid fa-arrow-up-short-wide" style={{color: "#FFFFFF"}} /> 
    };

    return (
        <div className="sort-container">
            <Dropdown items={items} label={label}/>
            <button>{getSortIcon(is_asc)}</button>
        </div>
    );
}

export const SearchFilter = ({ placeholder }: SearchFilterProps) => {
    return (
        <div className="search-filter-container">
            <input type="text" placeholder={placeholder}></input>
            <button><FontAwesomeIcon icon="fa-solid fa-search" style={{color: "#FFFFFF"}} /></button>
        </div>
    );
}