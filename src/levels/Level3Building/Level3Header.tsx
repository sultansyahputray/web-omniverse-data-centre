import React from 'react';
import { SiteMetric } from '../../types';
import { ChevronLeftIcon } from '../../Icons';

interface Level3HeaderProps {
    regionMetric?: SiteMetric;
    onBack?: () => void;
}

export const Level3Header: React.FC<Level3HeaderProps> = ({ regionMetric, onBack }) => {
    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const subtitle = regionMetric?.subtitle || 'BATAM HUB';

    return (
        <div className="level3-header-container">
            <button
                className="back-to-region-btn"
                onClick={onBack}
                title="Return to Level 2: Region Detail"
                aria-label="Back to Region"
            >
                <ChevronLeftIcon size={16} color="#00E5FF" />
                <span>BACK TO REGION</span>
            </button>

            <div className="level3-title-row">
                <span className="level3-accent-bar" />
                <h1 className="level3-main-title">{title}</h1>
                <span className="level3-badge">LEVEL 03</span>
            </div>

            <div className="level3-subtitle">
                {subtitle} &bull; MAIN BUILDING INTERIOR &amp; HALLS
            </div>
        </div>
    );
};
