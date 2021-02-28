var assert = require('assert');
const fs = require('fs');
const path = require('path');
const tasks = require('../scripts/tasks');

const data_path = path.join(__dirname, 'data.json');

const data = {
    userData: {
        userName: "VICE",
        firstTimeLaunchingApp: false,
        userHasSeenTutorial: false,
        startAppAt: "home"
    },
    box: [
        {
            boxId: "B92883E39293",
            boxName: "Drawing programs",
            description: "Shortcuts to start drawing :>",
            favorite: true
        }
    ],
    shortcut: [
        {
            shortcutId: "S82948B91839",
            boxId: "B92883E39293",
            diskDrive: "c",
            shortcutName: "Fire Alpaca",
            shortcutDescription: "My favorite drawing program!",
            shortcutUri: "C:\\FireAlpaca\\FireAlpaca.exe",
            shortcutType: "executable",
            delayToOpen: 0,
            execute: true
        },
        {
            shortcutId: "S92019F82912",
            boxId: "B92883E39293",
            diskDrive: "c",
            shortcutName: "Fire Alpaca folder",
            shortcutDescription: "Folder where I also keep my references.",
            shortcutUri: "C:\\FireAlpaca\\",
            shortcutType: "directory",
            delayToOpen: 0,
            execute: true
        },
        {
            shortcutId: "S88292U99182",
            boxId: "B92883E39293",
            diskDrive: "n/a",
            shortcutName: "Lofi hip hop radio ^o^",
            shortcutDescription: "Relax uwu",
            shortcutUri: "https://youtu.be/5qap5aO4i9A",
            shortcutType: "browserUrl",
            delayToOpen: 5000,
            execute: true
        }
    ]
}

describe('File system tests', () => {
    describe('Create data', () => {
        it('Data created', () => {
            const data_json = JSON.stringify(data);
            fs.writeFileSync(data_path, data_json);
            assert(true);
        });
    });
    describe('Read data', () => {
        it('Data read', () => {
            const data_raw = fs.readFileSync(data_path, 'utf-8');
            var data_jsObj = JSON.parse(data_raw);
            if (data_jsObj.userData && data_jsObj.box && data_jsObj.shortcut)
                assert(true);
            else
                assert(false, 'Data reading failed');
        });
    });
    describe('Updating data', () => {
        it('Data update - multiple updates', () => {
            const data_temp = data;
            data_temp.userData.userName = 'Thomas';
            data_temp.userData.userHasSeenTutorial = true;
            data_temp.box.push(
                {
                    boxId: tasks.generateObjectID('B'),
                    boxName: "Test generated box",
                    description: "This is a test generated box",
                    favorite: true
                });
            const box_id_temp = tasks.generateObjectID('B');
            data_temp.box.push(
                {
                    boxId: box_id_temp,
                    boxName: "Another test generated box",
                    description: "This is another test generated box",
                    favorite: false
                });
            data_temp.shortcut.push({
                shortcutId: tasks.generateObjectID('S'),
                boxId: box_id_temp,
                diskDrive: "c",
                shortcutName: "Shortcut Box",
                shortcutDescription: "Hey a 4 wall reference?",
                shortcutUri: "C:\\JUSTVICE\\shortcutbox.exe",
                shortcutType: "executable",
                delayToOpen: 0,
                execute: true
            });
            const data_json_temp = JSON.stringify(data_temp);
            fs.writeFileSync(data_path, data_json_temp);
            assert(true);
        });
        it('Data update - check changes made', () => {
            const data_temp_raw = fs.readFileSync(data_path, 'utf-8');
            var data_updated = JSON.parse(data_temp_raw);
            let database_properly_updated = [];

            database_properly_updated.push(data_updated.userData.userName == 'Thomas');
            database_properly_updated.push(data_updated.userData.userHasSeenTutorial == true);

            database_properly_updated[2] = false;
            data_updated.box.forEach(element => {
                if (element.boxName == 'Test generated box')
                    database_properly_updated[2] = true;
            });

            database_properly_updated[3] = false;
            data_updated.box.forEach(element => {
                if (element.boxName == 'Another test generated box')
                    database_properly_updated[3] = true;
            });

            database_properly_updated[4] = false;
            data_updated.shortcut.forEach(element => {
                if (element.shortcutName == 'Shortcut Box')
                    database_properly_updated[4] = true;
            });

            database_properly_updated.forEach(element => {
                if (!element) {
                    console.log(database_properly_updated);
                    assert(false, 'Changes made on update failed');
                }
            });

            assert(true);
        });
    });
    describe('Deleting data', () => {
        it('Data reset', () => {
            const data_json = JSON.stringify(data);
            fs.writeFileSync(data_path, data_json);
            assert(true);
        });
        it('Data deletion - multiple deletions', () => {
            data.box = []; // Deletes all boxes.
            for (var i = 0; i < data.shortcut.length; i++) {
                if (data.shortcut[i].shortcutId === 'S82948B91839') {
                    data.shortcut.splice(i, 1);
                    break;
                }
            }
            const data_json = JSON.stringify(data);
            fs.writeFileSync(data_path, data_json);
            assert(true);
        });
        it('Data deletion - checking changes', () => {
            const data_raw = fs.readFileSync(data_path, 'utf-8');
            var data_temp = JSON.parse(data_raw);
            if (data_temp.box.length == 0 && data_temp.shortcut.length == 3)
                assert(true);
            else{
                console.log(data_temp.box.length);
                console.log(data_temp.shortcut.length);
                assert(false, 'Deleting data failed');
            }
        });
    });
    describe('Check db file if exists', () => {
      it('File exists', () => {
          const result = fs.existsSync(data_path);
          if(result)
        assert(true);
        else
        assert(false, 'db file does not exist');
      });
    });
    /*
    describe('xxxxxxxxxxxxx', () => {
      it('xxxxxxxxxxxxxxxxxxxxxxx', () => {
        assert(true);
      });
    });
    */
});