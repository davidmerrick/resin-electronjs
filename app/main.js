const electron = require('electron');
const path = require('path');
const SonosSystem = require('sonos-discovery');

const { app, BrowserWindow } = electron;

const electronConfig = {
    URL_LAUNCHER_TOUCH: process.env.URL_LAUNCHER_TOUCH === '1' ? 1 : 0,
    URL_LAUNCHER_TOUCH_SIMULATE: process.env.URL_LAUNCHER_TOUCH_SIMULATE === '1' ? 1 : 0,
    URL_LAUNCHER_FRAME: process.env.URL_LAUNCHER_FRAME === '1' ? 1 : 0,
    URL_LAUNCHER_KIOSK: process.env.URL_LAUNCHER_KIOSK === '1' ? 1 : 0,
    URL_LAUNCHER_NODE: process.env.URL_LAUNCHER_NODE === '1' ? 1 : 0,
    URL_LAUNCHER_WIDTH: parseInt(process.env.URL_LAUNCHER_WIDTH || 1920, 10),
    URL_LAUNCHER_HEIGHT: parseInt(process.env.URL_LAUNCHER_HEIGHT || 1080, 10),
    URL_LAUNCHER_TITLE: process.env.URL_LAUNCHER_TITLE || 'RESIN.IO',
    URL_LAUNCHER_CONSOLE: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
    URL_LAUNCHER_URL: process.env.URL_LAUNCHER_URL || `file:///${path.join(__dirname, 'data', 'index.html')}`,
    URL_LAUNCHER_ZOOM: parseFloat(process.env.URL_LAUNCHER_ZOOM || 1.0),
    URL_LAUNCHER_OVERLAY_SCROLLBARS: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
};

if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode');
    Object.assign(electronConfig, {
        URL_LAUNCHER_HEIGHT: 600,
        URL_LAUNCHER_WIDTH: 800,
        URL_LAUNCHER_KIOSK: 0,
        URL_LAUNCHER_CONSOLE: 1,
        URL_LAUNCHER_FRAME: 1,
    });
}

function updateAlbumArt(discovery, window) {
    if (discovery.zones.length > 0) {
        const player = discovery.getAnyPlayer();
        const { state } = player.coordinator;
        if (state && typeof state !== 'undefined') {
            const { currentTrack } = state;
            if (currentTrack.artist != '') {
                const currentTrackString = JSON.stringify(currentTrack);
                window.webContents.executeJavaScript(`window.CURRENT_TRACK = ${currentTrackString};`);
                window.webContents.executeJavaScript('document.dispatchEvent(new CustomEvent("currentTrackChanged", null));');
            }
        }
    }
}

app.on('ready', () => {
    const discovery = new SonosSystem(null);

    const window = new BrowserWindow({
        width: electronConfig.URL_LAUNCHER_WIDTH,
        height: electronConfig.URL_LAUNCHER_HEIGHT,
        frame: !!(electronConfig.URL_LAUNCHER_FRAME),
        title: electronConfig.URL_LAUNCHER_TITLE,
        kiosk: !!(electronConfig.URL_LAUNCHER_KIOSK),
        webPreferences: {
            nodeIntegration: !!(electronConfig.URL_LAUNCHER_NODE),
            zoomFactor: electronConfig.URL_LAUNCHER_ZOOM,
            overlayScrollbars: !!(electronConfig.URL_LAUNCHER_OVERLAY_SCROLLBARS),
        },
    });

    window.webContents.on('did-finish-load', () => {
        setTimeout(() => {
            window.show();
        },
        300);
    });

    if (electronConfig.URL_LAUNCHER_CONSOLE) {
        window.openDevTools();
    }

    discovery.on('topology-change', () => {
        updateAlbumArt(discovery, window);
    });

    discovery.on('transport-state', () => {
        updateAlbumArt(discovery, window);
    });

    window.loadURL(electronConfig.URL_LAUNCHER_URL);
});
