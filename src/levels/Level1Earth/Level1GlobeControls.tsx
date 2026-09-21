import React, { useEffect } from 'react';
import './Level1GlobeControls.css';

interface Level1GlobeControlsProps {
    onRotate: (direction: 'left' | 'right') => void;
    onZoom: (action: 'in' | 'out') => void;
    onReset?: () => void;
}

export const Level1GlobeControls: React.FC<Level1GlobeControlsProps> = ({
    onRotate,
    onZoom,
    onReset
}) => {
    // Keyboard shortcut navigation (Left/Right arrow to rotate, +/- to zoom)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                onRotate('left');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                onRotate('right');
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                onZoom('in');
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                onZoom('out');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onRotate, onZoom]);

    return (
        <div className="globe-controls-layer">
            {/* Floating Left Spin Button (Circular Cyber Pill) */}
            <button
                type="button"
                className="globe-spin-arrow globe-spin-arrow-left"
                onClick={() => onRotate('left')}
                title="Rotate West / Spin Left (Left Arrow Key)"
                aria-label="Rotate West"
            >
                <div className="spin-arrow-glow" />
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
            </button>

            {/* Floating Right Spin Button (Circular Cyber Pill) */}
            <button
                type="button"
                className="globe-spin-arrow globe-spin-arrow-right"
                onClick={() => onRotate('right')}
                title="Rotate East / Spin Right (Right Arrow Key)"
                aria-label="Rotate East"
            >
                <div className="spin-arrow-glow" />
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                </svg>
            </button>

            {/* Glassmorphic Earth Orbit Dock (Bottom-Right) */}
            <div className="globe-dock-panel">
                <div className="globe-dock-header">
                    <span className="dock-status-dot" />
                    <span className="dock-title">EARTH ORBIT</span>
                    {/* <span className="dock-badge">23.44° AXIAL LOCK</span> */}
                </div>

                <div className="globe-dock-buttons">
                    {/* Rotate Left in Dock */}
                    {/* <button
                        type="button"
                        className="globe-dock-btn"
                        onClick={() => onRotate('left')}
                        title="Rotate West (Left Arrow Key)"
                        aria-label="Rotate West"
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        <span>WEST</span>
                    </button> */}

                    {/* Rotate Right in Dock */}
                    {/* <button
                        type="button"
                        className="globe-dock-btn"
                        onClick={() => onRotate('right')}
                        title="Rotate East (Right Arrow Key)"
                        aria-label="Rotate East"
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                        <span>EAST</span>
                    </button> */}

                    {/* Zoom In */}
                    <button
                        type="button"
                        className="globe-dock-btn"
                        onClick={() => onZoom('in')}
                        title="Zoom In (+ Key)"
                        aria-label="Zoom In"
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>ZOOM IN</span>
                    </button>

                    {/* Zoom Out */}
                    <button
                        type="button"
                        className="globe-dock-btn"
                        onClick={() => onZoom('out')}
                        title="Zoom Out (- Key)"
                        aria-label="Zoom Out"
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>ZOOM OUT</span>
                    </button>

                    {/* Reset Camera to Singapore */}
                    {onReset && (
                        <button
                            type="button"
                            className="globe-dock-btn globe-dock-btn-reset"
                            onClick={onReset}
                            title="Reset View to Singapore / SEA Hub"
                            aria-label="Reset View"
                        >
                            <span>RESET</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
