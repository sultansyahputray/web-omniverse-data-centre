import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

interface PaginationProps {
    max_page: number
}

export const Pagination = ({ max_page }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleFirst = () => {
        (currentPage != 1) && setCurrentPage(1);
    }
    
    const handlePrev = () => {
        (currentPage - 1 >= 1) && setCurrentPage(currentPage - 1);
    }

    const handleNext = () => {
        (currentPage + 1 <= max_page) && setCurrentPage(currentPage + 1);
    }

    const handleLast = () => {
        (currentPage != max_page) && setCurrentPage(max_page);
    }

    return (
        <div className="pagination-container">
            <button onClick={handleFirst}><FontAwesomeIcon icon="fa-solid fa-angle-double-left" style={{color: "#000000",}} /></button>
            <button onClick={handlePrev}><FontAwesomeIcon icon="fa-solid fa-angle-left" style={{color: "#000000",}} /></button>
            <label>{currentPage}</label>
            <label> / {max_page}</label>
            <button onClick={handleNext}><FontAwesomeIcon icon="fa-solid fa-angle-right" style={{color: "#000000",}} /></button>
            <button onClick={handleLast}><FontAwesomeIcon icon="fa-solid fa-angle-double-right" style={{color: "#000000",}} /></button>
        </div>
    );   
}