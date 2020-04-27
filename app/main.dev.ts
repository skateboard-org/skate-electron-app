/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let isAppHidden: boolean;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    // REMOVE IN PROD
    webSecurity: false,
    allowRunningInsecureContent: true,
    // REMOVE IN PROD
    show: false,
    width: 1250,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    center: true,
    fullscreenable: false,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });
  mainWindow.hide();
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

  const hideMainWindow = () => {
    if (!isAppHidden) {
      mainWindow?.webContents.send('window-did-hide');
      console.log('Hide app!');
      isAppHidden = true;
      mainWindow?.hide();
    }
  };

  const showMainWindow = () => {
    if (isAppHidden) {
      console.log('Show app!');
      mainWindow?.webContents.send('window-did-show');
      mainWindow?.show();
      mainWindow?.focus();
      isAppHidden = false;
    }
  };

  const toggleMainWindow = () => {
    if (isAppHidden) {
      showMainWindow();
    } else {
      hideMainWindow();
    }
  };

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    isAppHidden = true;
    globalShortcut.register('Option+Space', () => {
      console.log('Skate Toggle Key Pressed!');
      toggleMainWindow();
    });
    globalShortcut.register('Escape', () => {
      hideMainWindow();
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', event => {
    event.preventDefault();
    hideMainWindow();
  });

  mainWindow.on('blur', () => {
    hideMainWindow();
  });

  ipcMain.on('hide-main-window', () => {
    hideMainWindow();
  });

  ipcMain.on('show-main-window', () => {
    if (mainWindow === null) createWindow();
    else showMainWindow();
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  app.dock.hide();
  createWindow();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// eslint-disable-next-line promise/catch-or-return
