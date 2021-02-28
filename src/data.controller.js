const data_controller = {}
const fs = require('fs');

/**
 * Loads data from database.
 * @param data_path path where data is located.
 * @param return data object if database exists. Null if database does not exist.
 */
data_controller.loadData = data_path => {
    const data_raw = fs.readFileSync(data_path, 'utf-8');
    console.log('Data loaded');
    return JSON.parse(data_raw);
}

/**
 * Checks if database exists;
 * @param { String } data_path path of application's database.
 */
data_controller.database_exists = data_path => {
    const status = fs.existsSync(data_path);
    if (status) {
        console.log('Database exists');
        return status;
    } else {
        console.log('Database does not exist');
        return status;
    }
}

/**
 * Saves current user data.
 * @param { Object } data object that contains complete user data. Go to
 * @param { String } data_path path where database file is located.
 * /Documentation/Database/Data base diagram - example.json to see data object
 * structure.
 */
data_controller.saveData = (data_path, data) => {
    const data_json = JSON.stringify(data);
    fs.writeFileSync(data_path, data_json);
    console.log('Data saved');
}

module.exports = data_controller;