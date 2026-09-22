import { BuildingSubView, SiteMetric } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../../Icons';
import { CoolingModeToggleBar, CoolingMode } from './CoolingModeToggleBar';

interface Level3HeaderProps {
    regionMetric?: SiteMetric;
    subView?: BuildingSubView;
    coolingMode?: CoolingMode;
    onCoolingModeChange?: (mode: CoolingMode) => void;
    onBack?: () => void;
    onBackToCutaway?: () => void;
    onPowerDetails?: () => void;
    onCoolingDetails?: () => void;
}

export const Level3Header: React.FC<Level3HeaderProps> = ({
    regionMetric,
    subView = 'cutaway',
    coolingMode = 'liquid',
    onCoolingModeChange,
    onBack,
    onBackToCutaway,
    onPowerDetails,
    onCoolingDetails
}) => {
    const title = regionMetric?.title || 'SOUTHEAST ASIA';
    const subtitle = regionMetric?.subtitle || 'BATAM HUB';
    const isPowerPath = subView === 'power_details';
    const isCoolingPath = subView === 'cooling_details';
    const isDetailMode = isPowerPath || isCoolingPath;

    const handleBackClick = () => {
        if (isDetailMode && onBackToCutaway) {
            onBackToCutaway();
        } else if (onBack) {
            onBack();
        }
    };

    const getBadgeText = () => {
        if (isPowerPath) return 'ELECTRICAL POWER PATH';
        if (isCoolingPath) {
            return coolingMode === 'air' ? 'AIR COOLING PATH' : 'LIQUID COOLING PATH';
        }
        return 'LEVEL 03';
    };

    const getSubtitleText = () => {
        if (isPowerPath) return `${subtitle} • ELECTRICAL POWER PATHWAY & HALL DISTRIBUTION`;
        if (isCoolingPath) return `${subtitle} • COOLING DISTRIBUTION & THERMAL TELEMETRY`;
        return `${subtitle} • MAIN BUILDING INTERIOR & HALLS`;
    };

    return (
        <>
            <div className="level3-header-container">
                <button
                    className="back-to-region-btn"
                    onClick={handleBackClick}
                    title={isDetailMode ? "Return to Building Cutaway" : "Return to Level 2: Region Detail"}
                    aria-label={isDetailMode ? "Back to Cutaway" : "Back to Region"}
                >
                    <ChevronLeftIcon size={16} color="#00E5FF" />
                    <span>{isDetailMode ? 'BACK TO CUTAWAY' : 'BACK TO REGION'}</span>
                </button>

                <div className="level3-title-row">
                    <span className="level3-accent-bar" />
                    <h1 className="level3-main-title">{title}</h1>
                    <span className="level3-badge">
                        {getBadgeText()}
                    </span>
                </div>

                <div className="level3-subtitle">
                    {getSubtitleText()}
                </div>
            </div>

            {/* Static Top-Right Action Buttons: Power Details & Cooling Details (Hidden in both Detail modes) */}
            {!isDetailMode && (
                <div className="level3-top-actions">
                    <button
                        className="level3-detail-pill-btn"
                        onClick={onPowerDetails}
                        title="Power Details"
                        aria-label="Power Details"
                    >
                        <span className="detail-pill-text">Power Details</span>
                        <span className="detail-pill-arrow">
                            <ChevronRightIcon size={15} color="#ffffff" />
                        </span>
                    </button>

                    <button
                        className="level3-detail-pill-btn"
                        onClick={onCoolingDetails}
                        title="Cooling Details"
                        aria-label="Cooling Details"
                    >
                        <span className="detail-pill-text">Cooling Details</span>
                        <span className="detail-pill-arrow">
                            <ChevronRightIcon size={15} color="#ffffff" />
                        </span>
                    </button>
                </div>
            )}

            {/* In Cooling Details mode: Top-Right Liquid Cooling vs Air Cooling toggle bar */}
            {isCoolingPath && (
                <div className="level3-top-actions">
                    <CoolingModeToggleBar
                        mode={coolingMode}
                        onChange={onCoolingModeChange}
                    />
                </div>
            )}
        </>
    );
};


