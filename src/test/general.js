var assert = require('assert');
const tasksBackend = require("../scripts/tasks");
const database = require('../config/database');
const path = require('path');

const runTest = {
    idGenerator: false,
    database: true
}

describe('Shortcut Box tests', function () {
    if (runTest.idGenerator) {
        it('Generating IDs', function () {
            console.log(tasksBackend.generateObjectID('S'));
            console.log(tasksBackend.generateObjectID('B'));
            console.log(tasksBackend.generateObjectID('B'));
            console.log(tasksBackend.generateObjectID('B'));
            console.log(tasksBackend.generateObjectID('S'));
        });
    }
    if(runTest.database){
        it('Database path', function () {
            console.log(database.database_path);
            console.log(database.database_name);
            console.log(path.join(database.database_path + "/" + database.database_name));
        });
    }
});