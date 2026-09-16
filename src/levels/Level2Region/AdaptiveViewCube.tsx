import React, { useState, useEffect } from 'react';
import { CameraView } from '../../types';

interface AdaptiveViewCubeProps {
    focusLabel?: string;
    currentView?: CameraView;
    onSelectView: (view: CameraView) => void;
}

export const AdaptiveViewCube: React.FC<AdaptiveViewCubeProps> = ({
    focusLabel = 'SINGAPORE DC',
    currentView = 'iso',
    onSelectView
}) => {
    const [activeView, setActiveView] = useState<CameraView>(currentView);
    const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: -25, y: 45 });

    useEffect(() => {
        setActiveView(currentView);
        if (viewRotations[currentView]) {
            setRotation(viewRotations[currentView]);
        }
    }, [currentView]);

    const viewRotations: Record<CameraView, { x: number; y: number }> = {
        iso: { x: -25, y: 45 },
        front: { x: 0, y: 0 },
        back: { x: 0, y: 180 },
        right: { x: 0, y: -90 },
        left: { x: 0, y: 90 },
        top: { x: -90, y: 0 }
    };

    const handleSelectView = (view: CameraView) => {
        setActiveView(view);
        if (viewRotations[view]) {
            setRotation(viewRotations[view]);
        }
        onSelectView(view);
    };

    return (
        <div className="viewcube-container">
            <div className="viewcube-card">
                {/* Header: Focus Label & Reset ISO button */}
                <div className="viewcube-header">
                    <div className="viewcube-focus-badge">
                        <span className="focus-label-tag">CAMERA FOCUS:</span>
                        <span className="focus-name-tag" title={focusLabel}>
                            {focusLabel}
                        </span>
                    </div>

                    <button
                        className={`viewcube-home-btn ${activeView === 'iso' ? 'active' : ''}`}
                        onClick={() => handleSelectView('iso')}
                        title="Reset to Isometric Angle"
                    >
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        ISO
                    </button>
                </div>

                {/* 3D Interactive View Cube Canvas */}
                <div className="viewcube-viewport">
                    <div
                        className="viewcube-cube"
                        style={{
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                        }}
                    >
                        <div
                            className={`cube-face front ${activeView === 'front' ? 'active' : ''}`}
                            onClick={() => handleSelectView('front')}
                            title="Tampak Depan"
                        >
                            FRONT
                        </div>
                        <div
                            className={`cube-face back ${activeView === 'back' ? 'active' : ''}`}
                            onClick={() => handleSelectView('back')}
                            title="Tampak Belakang"
                        >
                            BACK
                        </div>
                        <div
                            className={`cube-face right ${activeView === 'right' ? 'active' : ''}`}
                            onClick={() => handleSelectView('right')}
                            title="Tampak Kanan"
                        >
                            RIGHT
                        </div>
                        <div
                            className={`cube-face left ${activeView === 'left' ? 'active' : ''}`}
                            onClick={() => handleSelectView('left')}
                            title="Tampak Kiri"
                        >
                            LEFT
                        </div>
                        <div
                            className={`cube-face top ${activeView === 'top' ? 'active' : ''}`}
                            onClick={() => handleSelectView('top')}
                            title="Tampak Atas"
                        >
                            TOP
                        </div>
                        <div
                            className="cube-face bottom"
                            onClick={() => handleSelectView('front')}
                            title="Bawah"
                        >
                            BOT
                        </div>
                    </div>
                </div>

                {/* Quick Presets Grid */}
                <div className="viewcube-presets">
                    <button
                        className={`preset-btn ${activeView === 'front' ? 'active' : ''}`}
                        onClick={() => handleSelectView('front')}
                        title="Tampak Depan (Front View)"
                    >
                        FRONT
                    </button>
                    <button
                        className={`preset-btn ${activeView === 'right' || activeView === 'left' ? 'active' : ''}`}
                        onClick={() => handleSelectView(activeView === 'right' ? 'left' : 'right')}
                        title="Tampak Samping (Side View - Klik untuk ganti Kanan/Kiri)"
                    >
                        {activeView === 'left' ? 'LEFT' : 'SIDE'}
                    </button>
                    <button
                        className={`preset-btn ${activeView === 'top' ? 'active' : ''}`}
                        onClick={() => handleSelectView('top')}
                        title="Tampak Atas (Top View)"
                    >
                        TOP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdaptiveViewCube;
