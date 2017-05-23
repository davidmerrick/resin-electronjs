const electron = require('electron');
const path = require('path');
const SonosSystem = require('sonos-discovery');

const { app, BrowserWindow } = electron;

// simple parameters initialization
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

// enable touch events if your device supports them
if(electronConfig.URL_LAUNCHER_TOUCH){
    app.commandLine.appendSwitch('--touch-devices');
}
// simulate touch events - might be useful for touchscreen with partial driver support
if(electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
    app.commandLine.appendSwitch('--simulate-touch-screen-with-mouse');
}

if(process.env.NODE_ENV === 'development') {
    console.log('Running in development mode');
    Object.assign(electronConfig, {
        URL_LAUNCHER_HEIGHT: 600,
        URL_LAUNCHER_WIDTH: 800,
        URL_LAUNCHER_KIOSK: 0,
        URL_LAUNCHER_CONSOLE: 1,
        URL_LAUNCHER_FRAME: 1,
    });
}

function updateAlbumArt(discovery, window){
    if(discovery.zones.length > 0) {
        let player = discovery.getAnyPlayer();
        let { state } = player.coordinator;
        if(state && typeof state != 'undefined') {
            let { currentTrack } = state;
            if(currentTrack.artist != '') {
                let currentTrackString = JSON.stringify(currentTrack);
                // Pass environment variables to the window
                window.webContents.executeJavaScript(`window.CURRENT_TRACK = ${currentTrackString};`);
            }
        };
    };
}

app.on('ready', () => {
    const discovery = new SonosSystem(null);

    // here we actually configure the behaviour of electronJS
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

    if(electronConfig.URL_LAUNCHER_CONSOLE) {
        window.openDevTools();
    }

    discovery.on('topology-change', stateChange => {
        updateAlbumArt(discovery, window);
    });

    discovery.on('transport-state', stateChange => {
        updateAlbumArt(discovery, window);
    });

    window.loadURL(electronConfig.URL_LAUNCHER_URL);
});
