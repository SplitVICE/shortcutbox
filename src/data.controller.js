const data_controller = {}
const path = require('path');
const db_conf = require('./config/database');
const fs = require('fs');
const db_path = path.join(db_conf.database_path + '/' + db_conf.database_name)

/**
 * Loads data from database.
 * @param return data object if database exists. Null if database does not exist.
 */
data_controller.loadData = () => {
    if (fs.existsSync(db_path)) {
        const data_raw = fs.readFileSync(db_path);
        return JSON.parse(data_raw);
    } else
        return null;
}

/**
 * Saves current user data.
 * @param { Object } data object that contains complete user data. Go to
 * /Documentation/Database/Data base diagram - example.json to see data object
 * structure.
 */
data_controller.saveData = data => {
    const data_json = JSON.stringify(data);
    fs.writeFileSync(db_path, data_json);
}

module.exports = data_controller;