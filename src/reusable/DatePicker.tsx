import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface DatePickerProps {
    value?: string;
    onChange?: (date: string) => void;
    className?: string;
}

export const DatePicker = ({ value, onChange, className }: DatePickerProps) => {
    return (
        <div className={`date-picker-container ${className || ''}`.trim()}>
            <input 
                type="date"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <FontAwesomeIcon icon="fa-regular fa-calendar" className="date-picker-icon" style={{ color: "#d97706" }} />
        </div>
    );    
};