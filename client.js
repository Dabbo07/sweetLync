const {BrowserWindow, app} = require('electron');

let win;

var startClientApp = function() {
    win = new BrowserWindow({
        width: 600,
        height: 500,
        frame: true
    });
    win.loadURL('file://' + __dirname + '/index.html');
    win.webContents.openDevTools();
};

app.on('ready', startClientApp);