import React from 'react';

export const GlobalHeader: React.FC = () => {
    return (
        <header className="global-header">
            <h1 className="header-main-title">
                <span className="header-title-white">GLOBAL</span>
                <span className="header-title-cyan">DATA CENTRE PORTFOLIO</span>
            </h1>
            <div className="header-subtitle">
                PEOPLE &nbsp;|&nbsp; INFRASTRUCTURE &nbsp;|&nbsp; A MORE CONNECTED TOMORROW
            </div>
        </header>
    );
};
