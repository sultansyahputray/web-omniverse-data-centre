// SPDX-FileCopyrightText: Copyright (c) 2024 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: LicenseRef-NvidiaProprietary

import React from 'react';
import './AutoTourControls.css';

interface AutoTourControlsProps {
    isAutoPlaying: boolean;
    currentStepIndex: number;
    totalSteps: number;
    currentStepLabel: string;
    onToggleTour: () => void;
}

export const AutoTourControls: React.FC<AutoTourControlsProps> = ({
    isAutoPlaying,
    currentStepIndex,
    totalSteps,
    currentStepLabel,
    onToggleTour
}) => {
    return (
        <div className="auto-tour-container" role="region" aria-label="Exhibition Auto Tour Controls">
            {/* Active Tour Progress Pill */}
            {/* {isAutoPlaying && (
                <div className="auto-tour-status-pill">
                    <span className="auto-tour-pulse-dot" />
                    <span className="auto-tour-step-counter">
                        STEP {currentStepIndex + 1}/{totalSteps}:
                    </span>
                    <span className="auto-tour-step-label">{currentStepLabel}</span>
                </div>
            )} */}

            {/* Master Toggle Button (Styled harmoniously with the Back Button) */}
            <button
                type="button"
                className={`auto-tour-btn ${isAutoPlaying ? 'is-active' : ''}`}
                onClick={onToggleTour}
                title={isAutoPlaying ? 'Stop Auto Tour and switch to manual navigation' : 'Start automatic exhibition tour sequence'}
                aria-label={isAutoPlaying ? 'Stop Auto Tour' : 'Start Auto Tour'}
            >
                {isAutoPlaying ? (
                    <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF3B5C">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                        </svg>
                        <span className="auto-tour-btn-text stop-text">STOP TOUR</span>
                    </>
                ) : (
                    <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#00E5FF">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="auto-tour-btn-text">PLAY TOUR</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default AutoTourControls;
