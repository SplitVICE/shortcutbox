const { app, BrowserWindow, Menu, icpMain } = require('electron');

const tasks = require("./scripts/logic/tasksBackend.js");

app.allowRendererProcessReuse = true;

const url = require('url');

const path = require('path');

require('dotenv').config();

let developer_mode = process.env.DEVELOPER_MODE || false;
let developerModeMessage = `Developer mode: ${developer_mode}`;
console.log(developerModeMessage);

let mainWindow;

const mainHTML = "./views/home/index.html";

function createRendererProcessWindow_mainWindow(htmlURI) {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        minHeight: 500,
        minWidth: 500,

        height: 700,
        width: 900
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, htmlURI),
        protocol: 'file',
        slashes: true
    }));
}

app.on('ready', () => {
    createRendererProcessWindow_mainWindow(mainHTML);
});