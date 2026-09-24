import React from 'react';
import { ArrowLeftIcon } from '../../Icons';
import './LevelCountry.css';

interface CountryHeaderProps {
    onBack: () => void;
}

export const CountryHeader: React.FC<CountryHeaderProps> = ({ onBack }) => {
    return (
        <header className="country-header">
            <div className="country-header-left">
                <button
                    className="back-to-global-btn"
                    onClick={onBack}
                    title="Return to Global Earth View"
                >
                    <ArrowLeftIcon size={18} color="#00e5ff" />
                    <span className="back-btn-text">BACK TO GLOBAL</span>
                </button>

                <div className="country-title-block">
                    <div className="country-title-row">
                        <span className="country-cyan-accent" />
                        <h1 className="header-main-title">
                            <span className="header-title-white">SOUTHEAST ASIA</span>{' '}
                            <span className="header-title-cyan">COUNTRY CLUSTER</span>
                        </h1>
                        <span className="country-badge-pill">LEVEL COUNTRY</span>
                    </div>
                    <div className="header-subtitle">
                        SINGAPORE &nbsp;•&nbsp; BATAM &nbsp;•&nbsp; MALAYSIA &nbsp;•&nbsp; THAILAND &nbsp;|&nbsp; REGIONAL HUB
                    </div>
                </div>
            </div>
        </header>
    );
};
