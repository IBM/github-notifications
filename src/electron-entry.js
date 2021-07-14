const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

const createWindow = () => {
  win = new BrowserWindow({fullscreen: true});

  win.loadURL('http://localhost:3000');

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
