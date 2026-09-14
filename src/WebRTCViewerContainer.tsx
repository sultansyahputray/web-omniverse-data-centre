import React from 'react';
import AppStream from './AppStream';

interface WebRTCViewerContainerProps {
    server?: string;
    signalingPort?: number;
    onStreamStarted?: () => void;
}

export const WebRTCViewerContainer: React.FC<WebRTCViewerContainerProps> = ({
    server = '127.0.0.1',
    signalingPort = 49100,
    onStreamStarted
}) => {
    return (
        <div className="stream-background-container">
            <AppStream
                sessionId=""
                backendUrl=""
                signalingserver={server}
                signalingport={signalingPort}
                mediaserver=""
                mediaport={0}
                accessToken=""
                onStarted={() => {
                    console.log('[WebRTC] Omniverse Stream connected successfully!');
                    if (onStreamStarted) onStreamStarted();
                }}
                onStreamFailed={() => console.warn('[WebRTC] Stream connecting/reconnecting...')}
                onLoggedIn={(userId) => console.log(`[WebRTC] Logged in: ${userId}`)}
                handleCustomEvent={(e) => console.log('[WebRTC] Custom event:', e)}
                onFocus={() => {}}
                onBlur={() => {}}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0
                }}
            />
        </div>
    );
};
