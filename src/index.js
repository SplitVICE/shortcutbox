const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
require('dotenv').config();
const data = require('./data');

/**
 * -------------------------------
 * ipcMain execute_x handlers.
 * -------------------------------
 */
const execute_elements = require('./scripts/executeElements');

ipcMain.handle('execute_executable', (e, args) => {
    execute_elements.execute_executable(args);
})

ipcMain.handle('execute_folder', (e, args) =>{
    execute_elements.execute_folder(args);
})

ipcMain.handle('execute_url', (e, args) =>{
    execute_elements.execute_url(args);
})


/**
 * -------------------------------
 * ipcMain CRUD database elements
 * -------------------------------
 */

ipcMain.on('data_request_fromRenderer', (e, args) =>{
    mainWindow.webContents.send('data_request_fromMain', data);
})

ipcMain.on('save_newBox', (e,args) =>{

})

/**
 * -------------------------------
 * Electron app initialization.
 * -------------------------------
 */

const mainHTML = "./frontend/index.html";
let mainWindow;

function createRendererProcessWindow_mainWindow(htmlURI) {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        minHeight: 500,
        minWidth: 1000,
        height: 700,
        width: 900
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, htmlURI),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse = true;
app.on('ready', () => {
    createRendererProcessWindow_mainWindow(mainHTML);
});