import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface PaginationProps {
    max_page: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export const Pagination = ({ max_page, currentPage: controlledPage, onPageChange, className }: PaginationProps) => {
    const [internalPage, setInternalPage] = useState(1);
    const activePage = controlledPage !== undefined ? controlledPage : internalPage;

    const setPage = (page: number) => {
        setInternalPage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const handleFirst = () => {
        if (activePage !== 1) setPage(1);
    };
    
    const handlePrev = () => {
        if (activePage - 1 >= 1) setPage(activePage - 1);
    };

    const handleNext = () => {
        if (activePage + 1 <= max_page) setPage(activePage + 1);
    };

    const handleLast = () => {
        if (activePage !== max_page) setPage(max_page);
    };

    const formatPageNum = (num: number) => String(num).padStart(2, '0');

    return (
        <div className={`pagination-container ${className || ''}`.trim()}>
            <button 
                type="button" 
                onClick={handleFirst} 
                disabled={activePage <= 1}
                aria-label="First page"
            >
                <FontAwesomeIcon icon="fa-solid fa-angle-double-left" />
            </button>
            <button 
                type="button" 
                onClick={handlePrev} 
                disabled={activePage <= 1}
                aria-label="Previous page"
            >
                <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            </button>
            <div className="pagination-label-pill">
                <span className="pagination-current-page">{formatPageNum(activePage)}</span>
                <span className="pagination-separator">/</span>
                <span className="pagination-max-page">{formatPageNum(max_page)}</span>
            </div>
            <button 
                type="button" 
                onClick={handleNext} 
                disabled={activePage >= max_page}
                aria-label="Next page"
            >
                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            </button>
            <button 
                type="button" 
                onClick={handleLast} 
                disabled={activePage >= max_page}
                aria-label="Last page"
            >
                <FontAwesomeIcon icon="fa-solid fa-angle-double-right" />
            </button>
        </div>
    );   
};