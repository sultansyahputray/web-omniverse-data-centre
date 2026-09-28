import React, { useState, useEffect, useRef } from 'react';
import { CloseButton } from '../../reusable/Button';
import './PowerSimulationModal.css';

export type PowerSimulationMode = 'normal' | 'simulated' | 'load';

export interface PowerSimulationModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoPaths?: {
        normal?: string;
        simulated?: string;
        load?: string;
    };
}

interface FlowConfig {
    key: PowerSimulationMode;
    label: string;
    description: string;
    defaultPath: string;
}

const FLOW_CONFIGS: FlowConfig[] = [
    {
        key: 'normal',
        label: 'Single Line Diagram (SLD)',
        description: '',
        defaultPath: '/videos/power_normal_flow.mp4'
    },
    {
        key: 'simulated',
        label: 'Power Load Flow',
        description: '',
        defaultPath: '/videos/power_simulated_flow.mp4'
    },
    {
        key: 'load',
        label: 'Power Heat Map',
        description: '',
        defaultPath: '/videos/power_load_flow.mp4'
    }
];

export const PowerSimulationModal: React.FC<PowerSimulationModalProps> = ({
    isOpen,
    onClose,
    videoPaths
}) => {
    const [activeMode, setActiveMode] = useState<PowerSimulationMode>('normal');
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

    // Reset video error state whenever active flow mode changes
    useEffect(() => {
        setVideoError(false);
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [activeMode]);

    if (!isOpen) return null;

    const currentConfig = FLOW_CONFIGS.find((cfg) => cfg.key === activeMode) || FLOW_CONFIGS[0];
    const currentVideoPath = (videoPaths && videoPaths[activeMode]) || currentConfig.defaultPath;

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
                   SECTION 1: TOP SECTION (Button Bar & Close Button)
                   ========================================================= */}
                <div className="power-sim-top-section">
                    <div className="power-sim-header-left">
                        <div className="power-sim-title-group">
                            <h2 className="power-sim-title">ETAP</h2>
                            <span className="power-sim-subtitle">Electrical Transient Analyzer Program</span>
                        </div>
                    </div>

                    <div className="power-sim-button-bar-group">
                        <div className="power-sim-button-bar" role="tablist" aria-label="Simulation Flow Selection">
                            {FLOW_CONFIGS.map((cfg) => {
                                const isActive = activeMode === cfg.key;
                                return (
                                    <button
                                        key={cfg.key}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`power-sim-tab-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveMode(cfg.key)}
                                    >
                                        <span>{cfg.label}</span>
                                    </button>
                                );
                            })}
                        </div>

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
                        {/* Video Element */}
                        {!videoError && (
                            <video
                                ref={videoRef}
                                key={currentVideoPath}
                                className="power-sim-video-player"
                                src={currentVideoPath}
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                onError={() => setVideoError(true)}
                            >
                                Video Error
                            </video>
                        )}

                        {/* Fallback Placeholder (shown when dummy video is not placed yet) */}
                        {videoError && (
                            <div className="power-sim-placeholder-container">
                                <div className="power-sim-placeholder-icon-wrap">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="5 3 19 12 5 21 5 3" fill="#00E5FF" opacity="0.85" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerSimulationModal;
