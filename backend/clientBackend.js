const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../frontend/client.html'),
        protocol: 'file:',
        slashed: true
    }));
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    };
});

global.encryptionService = require(__dirname + '/encryptionService.js').EncryptionService;
global.authService = require(__dirname + '/authService.js').AuthService;
global.userService = require(__dirname + '/userService.js').UserService;
global.conversationService = require(__dirname + '/convService.js').ConversationService;

console.log("encService = " + JSON.stringify(encryptionService));
console.log("authService = " + JSON.stringify(authService));
console.log("userService = " + JSON.stringify(userService));
console.log("convService = " + JSON.stringify(conversationService));
