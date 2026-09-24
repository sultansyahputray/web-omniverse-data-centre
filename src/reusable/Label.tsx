import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';
import { RegionalAvailabilityGauge } from '../Icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

interface LabelProps {
    label: string,
    value?: number | null,
    unit?: string | null,
    color?: string | null,
    border?: string | null
}

export const DonutGaugeLabel = ({ label, value, color }: LabelProps) => {
    return (
        <div className="donut-gauge-container">
            <label className="donut-gauge-label">{label}</label>
            <RegionalAvailabilityGauge percentage={value} size={75} strokeWidth={6} color={color} bgColor='#00000022' />
        </div>
    );
}

export const PureLabel = ({ label }: LabelProps) => {
    return (
        <label className="pure-label-container">
            {label}
        </label>
    );
}

export const VerticalValueLabel = ({ label, value, unit, color, border }: LabelProps) => {
    return (
        <div className="vertical-label-with-value-container">
            <label style={{textAlign: "center"}}>{label}</label>
            <div className="value-with-unit-container">
                <label style={{backgroundColor: color, padding: "4px 8px", borderRadius: "8px", border: border}}>{value}</label>
                <label>{unit}</label>
            </div>
        </div>
    );
}

export const HorizontalValueLabel = ({ label, value, unit, color, border }: LabelProps) => {
    return (
        <div className="horizontal-label-with-value-container">
            <label style={{textAlign: "center"}}>{label}</label>
            <div className="value-with-unit-container">
                <label style={{backgroundColor: color, padding: "4px 8px", borderRadius: "8px", border: border}}>{value}</label>
                <label>{unit}</label>
            </div>
        </div>
    );
}