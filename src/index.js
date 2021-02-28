const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
require('dotenv').config();
const data_empty = require('./data');
const data_conf = require('./config/database');
const data_controller = require('./data.controller');
const data_path = path.join(data_conf.database_path + '/' + data_conf.database_name);

/**
 * -------------------------------
 * ipcMain execute_x handlers.
 * -------------------------------
 */
const execute_elements = require('./scripts/executeElements');

ipcMain.handle('execute_executable', (e, args) => {
    execute_elements.execute_executable(args);
})

ipcMain.handle('execute_folder', (e, args) => {
    execute_elements.execute_folder(args);
})

ipcMain.handle('execute_url', (e, args) => {
    execute_elements.execute_url(args);
})


/**
 * -------------------------------
 * ipcMain CRUD database elements
 * -------------------------------
 */

ipcMain.on('data_request_fromRenderer', (e, args) => {
    let data_sending = undefined;
    const data_exists = data_controller.database_exists(data_path);
    if (data_exists)
        data_sending = data_controller.loadData(data_path);
    else
        data_sending = data_empty;
    mainWindow.webContents.send('data_request_fromMain', data_sending);
})

/**
 * Updates database with given data.
 * args object is database reflected JSON data.
 */
ipcMain.handle('save_database', (e, args) => {
    data_controller.saveData(data_path, args);
})

/**
 * -------------------------------
 * Electron app initialization.
 * -------------------------------
 */

const mainHTML = "./frontend/index.html";
let mainWindow;

function createRendererProcessWindow_mainWindow(mainHTML) {
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
        pathname: path.join(__dirname, mainHTML),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse = true;
app.on('ready', () => {
    createRendererProcessWindow_mainWindow(mainHTML);
});