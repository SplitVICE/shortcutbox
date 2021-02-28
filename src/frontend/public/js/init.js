const { ipcRenderer } = require('electron');

ipcRenderer.send('data_request_fromRenderer');
ipcRenderer.on('data_request_fromMain', (e, args) => {
    localStorage.setItem('data', JSON.stringify(args));
});