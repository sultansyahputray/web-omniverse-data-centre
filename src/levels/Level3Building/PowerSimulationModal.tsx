import React, { useState, useEffect, useRef } from 'react';
import { CloseButton } from '../../reusable/Button';
import { Dropdown, DropdownItem } from '../../reusable/Dropdown';
import './PowerSimulationModal.css';

export type PowerSimulationMode = 'normal' | 'simulated' | 'load';
export type SldLoadType = 'it' | 'non-it';

export interface PowerSimulationModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoPaths?: {
        normal?: string;
        simulated?: string;
        load?: string;
        sldItLoad?: string;
        sldNonItLoad?: string;
    };
}

const DROPDOWN_ITEMS: DropdownItem[] = [
    {
        id: 'normal',
        label: 'Single Line Diagram (SLD)'
    },
    {
        id: 'simulated',
        label: 'Power Load Flow'
    },
    {
        id: 'load',
        label: 'Power Heat Map'
    }
];

export const PowerSimulationModal: React.FC<PowerSimulationModalProps> = ({
    isOpen,
    onClose,
    videoPaths
}) => {
    const [activeMode, setActiveMode] = useState<PowerSimulationMode>('normal');
    const [sldLoadType, setSldLoadType] = useState<SldLoadType>('it');
    const [videoError, setVideoError] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Reset video error state whenever active flow mode or SLD load type changes and auto-play cleanly
    useEffect(() => {
        setVideoError(false);
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeMode, sldLoadType, isOpen]);

    if (!isOpen) return null;

    // Resolve the active video path
    let currentVideoPath = '';
    if (activeMode === 'normal') {
        if (sldLoadType === 'it') {
            currentVideoPath = (videoPaths && (videoPaths.sldItLoad || videoPaths.normal)) || '/videos/power_normal_flow.mp4';
        } else {
            currentVideoPath = (videoPaths && videoPaths.sldNonItLoad) || '/videos/NonIT%20Load.mp4';
        }
    } else if (activeMode === 'simulated') {
        currentVideoPath = (videoPaths && videoPaths.simulated) || '/videos/power_simulated_flow.mp4';
    } else if (activeMode === 'load') {
        currentVideoPath = (videoPaths && videoPaths.load) || '/videos/power_load_flow.mp4';
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="power-sim-backdrop"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Power Simulation Modal"
        >
            <div className="power-sim-card">
                {/* =========================================================
                   SECTION 1: TOP SECTION (Dropdown, Sub-tabs & Close Button)
                   ========================================================= */}
                <div className="power-sim-top-section">
                    <div className="power-sim-header-left">
                        <div className="power-sim-title-group">
                            <h2 className="power-sim-title">ETAP</h2>
                            <span className="power-sim-subtitle">Electrical Transient Analyzer Program</span>
                        </div>
                    </div>

                    <div className="power-sim-button-bar-group">
                        {/* Dropdown using reusable component */}
                        <Dropdown
                            className="power-sim-dropdown"
                            items={DROPDOWN_ITEMS}
                            value={activeMode}
                            onChange={(val) => setActiveMode(val as PowerSimulationMode)}
                        />

                        {/* SLD Sub-tabs: Visible only when Single Line Diagram is selected */}
                        {activeMode === 'normal' && (
                            <div className="power-sim-button-bar" role="tablist" aria-label="SLD Load Type Selection">
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={sldLoadType === 'it'}
                                    className={`power-sim-tab-btn ${sldLoadType === 'it' ? 'active' : ''}`}
                                    onClick={() => setSldLoadType('it')}
                                >
                                    <span>IT Load</span>
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={sldLoadType === 'non-it'}
                                    className={`power-sim-tab-btn ${sldLoadType === 'non-it' ? 'active' : ''}`}
                                    onClick={() => setSldLoadType('non-it')}
                                >
                                    <span>Non-IT Load</span>
                                </button>
                            </div>
                        )}

                        <div className="power-sim-header-right">
                            <CloseButton
                                onClick={onClose}
                                title="Close Power Simulation"
                                ariaLabel="Close Power Simulation"
                            />
                        </div>
                    </div>
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div className="title-h-divider"></div>

                {/* =========================================================
                   SECTION 2: BOTTOM SECTION (Video Player Container)
                   ========================================================= */}
                <div className="power-sim-body">
                    <div className="power-sim-video-wrapper">
                        {/* Video Element - Restricted Simulation View (No Pause / No Controls) */}
                        {!videoError && currentVideoPath && (
                            <video
                                ref={videoRef}
                                key={currentVideoPath}
                                className="power-sim-video-player"
                                src={currentVideoPath}
                                autoPlay
                                loop
                                muted
                                playsInline
                                disablePictureInPicture
                                disableRemotePlayback
                                controlsList="nodownload nofullscreen noremoteplayback"
                                onContextMenu={(e) => e.preventDefault()}
                                onLoadedData={() => {
                                    if (videoRef.current) {
                                        videoRef.current.play().catch(() => { });
                                    }
                                }}
                                onError={() => setVideoError(true)}
                            />
                        )}

                        {/* Fallback Placeholder (shown when dummy video is not placed yet or load error) */}
                        {videoError && (
                            <div className="power-sim-placeholder-container">
                                <div className="power-sim-placeholder-icon-wrap">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="5 3 19 12 5 21 5 3" fill="#00E5FF" opacity="0.85" />
                                    </svg>
                                </div>
                                <h3 className="power-sim-placeholder-title">
                                    {activeMode === 'normal' && sldLoadType === 'non-it'
                                        ? 'Non-IT Load Simulation'
                                        : 'Simulation Video Unavailable'}
                                </h3>
                                <p className="power-sim-placeholder-desc">
                                    {activeMode === 'normal' && sldLoadType === 'non-it'
                                        ? 'Video simulation for Non-IT Load is not yet available.'
                                        : 'The requested simulation video could not be loaded.'}
                                </p>
                                {activeMode === 'normal' && sldLoadType === 'non-it' && (
                                    <div className="power-sim-path-info-box">
                                        <span className="power-sim-path-label">Expected Video Path:</span>
                                        <code className="power-sim-path-code">/videos/NonIT Load.mp4</code>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerSimulationModal;

