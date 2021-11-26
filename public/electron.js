const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

let win;

const createWindow = () => {
  win = new BrowserWindow({fullscreen: true});

  win.loadURL(isDev ? 'http://localhost:5000' : `file://${path.join(__dirname, '../build/index.html')}`)

  // win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate',() => {
    if(win == null) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
    app.quit();
});
