import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

interface FloatingZoneTagProps {
    label?: string;
    screenPosition?: ScreenPosition;
    defaultPosition?: { x: number; y: number };
    onClick?: () => void;
}

export const FloatingZoneTag: React.FC<FloatingZoneTagProps> = ({
    label = 'Main Building',
    screenPosition,
    defaultPosition = { x: 54, y: 38 },
    onClick
}) => {
    // If screenPosition is supplied by Omniverse Kit, use it; otherwise use defaultPosition
    const posX = screenPosition ? screenPosition.x : defaultPosition.x;
    const posY = screenPosition ? screenPosition.y : defaultPosition.y;
    const isVisible = screenPosition ? screenPosition.visible : true;

    return (
        <div
            className="floating-zone-container"
            style={{
                left: `${posX}%`,
                top: `${posY}%`,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                visibility: isVisible ? 'visible' : 'hidden'
            }}
        >
            <button
                className="floating-zone-tag"
                onClick={onClick}
                title={`Select ${label}`}
                role="button"
                tabIndex={0}
            >
                <span className="floating-zone-label">{label}</span>
                <span className="floating-zone-arrow">
                    <ChevronRightIcon size={14} color="#ffffff" />
                </span>
            </button>
        </div>
    );
};
