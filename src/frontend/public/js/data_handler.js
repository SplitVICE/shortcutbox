/**
 * Updates current localStorage - data variable.
 * @param { Object } data Shortcut Box complete data.
 */
function save_localStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function get_localStorage() {
    return JSON.parse(localStorage.getItem('data'));
}

// Overrides Shortcut Box database with current localStorage data or
// passed data object if given.
function save_database(data) {
    data != undefined ?
        ipcRenderer.invoke('save_database', data) :
        ipcRenderer.invoke('save_database', get_localStorage())
}
