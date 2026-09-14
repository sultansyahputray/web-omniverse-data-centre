import React from 'react';
import { ArrowLeftIcon } from '../../Icons';
import { SiteMetric } from '../../types';

interface RegionHeaderProps {
    regionMetric?: SiteMetric;
    onBack: () => void;
}

export const RegionHeader: React.FC<RegionHeaderProps> = ({ regionMetric, onBack }) => {
    const regionName = regionMetric?.title || 'SINGAPORE';
    const hubSubtitle = regionMetric?.subtitle || 'Main Hub 01';

    return (
        <div className="region-header-container">
            {/* Back Button to return to Level 1 */}
            <button className="back-to-global-btn" onClick={onBack} title="Return to Global Earth View">
                <ArrowLeftIcon size={18} color="#00e5ff" />
                <span className="back-btn-text">BACK TO GLOBAL</span>
            </button>

            {/* Region Title Block */}
            <div className="region-title-block">
                <div className="region-title-row">
                    <span className="region-cyan-accent" />
                    <h1 className="region-main-title">{regionName}</h1>
                    <span className="region-badge-pill">LEVEL 02</span>
                </div>
                <div className="region-subtitle">
                    {hubSubtitle.toUpperCase()} &nbsp;|&nbsp; LOCAL TERRAIN &amp; SITE VIEW
                </div>
            </div>
        </div>
    );
};
