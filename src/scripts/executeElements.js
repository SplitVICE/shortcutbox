/**
 * ----------------------------------------------------------------------------------------
 * Shortcut Box v1.0.0 - SPLIT VICE - MIT
 * ----------------------------------------------------------------------------------------
 * Script that contains the instructions to execute elements inside the file system such as
 * .exe and directories.
 * ----------------------------------------------------------------------------------------
 */

const execute_elements = {}
let childProcess = require('child_process').exec;
const fs = require('fs')

/**
 * Function that handles the execution of executable files such as .exe, .sh, .bat, .ps1, etc...
 * @param { Object } args contains the information needed to execute the executable file.
 * @param args.disk disk drive where the executable file is located.
 * @param args.path FULL path where executable file is located.
 * @param args.delay time to wait before performing open execution.
 */
execute_elements.execute_executable = (args) => {
    if (args.disk == undefined || args.path == undefined) {
        console.error('Missing parameters. disk: ' + args.disk + ', path: ' + args.path);
        return;
    }
    if (fileExists(args.path))
        execute(args.disk + ': && Start ' + args.path, args.delay);
    else
        console.error('Executable file path does not exist. ' + args.path);
}

/**
 * Function that handles the execution of folders or directories.
 * @param { Object } args contains the information needed to open a directory.
 * @param args.disk disk drive where the directory is located.
 * @param args.path FULL path where the directory is located.
 * @param args.delay time to wait before performing open execution.
 */
execute_elements.execute_folder = (args) => {
    if (args.disk == undefined || args.path == undefined) {
        console.error('Missing parameters. disk: ' + args.disk + ', path: ' + args.path);
        return;
    }
    if (fileExists(args.path))
        execute(args.disk + ': && Start ' + args.path, args.delay);
    else
        console.error('Directory path does not exist. ' + args.path);
}

/**
 * Function that handles the execution of url links.
 * @param { Object } args contains the information needed to open the url.
 * @param args.path FULL url phrase.
 * @param args.delay time to wait before opening the url on browser.
 */
execute_elements.execute_url = (args) => {
    if (args.path == undefined) {
        console.error('Missing parameters. path: ' + args.path);
        return;
    }
    let command;
    regex_checkHttpPhrase(args.path) ?
        command = 'Start ' + args.path :
        command = 'Start ' + 'http://' + args.path;
    execute(command, args.delay);
}

/**
 * Executes the opening of shortcut elements.
 * @param { string } command terminal command to execute.
 * @param { int } delay time expressed in milliseconds to delay the execution of
 * the command.
 */
async function execute(command, delay) {
    if (delay != undefined)
        await sleep(delay);
    childProcess(command, (error, stdout, stderr) => {
        if (error) console.error('An error has ocurred:\r\n', error)
    });
}

/**
 * Stops script execution.
 * @param { int } milliseconds time delay expression.
 */
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Checks if element given contains "http" phrase.
 * @param { string } element element to check if contains "http" phrase.
 * @param return true if element contains "http" phrase.
 */
function regex_checkHttpPhrase(element) {
    const regex = /^http/gm;
    let m, matchFound = false;
    while ((m = regex.exec(element)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            matchFound = true;
        });
    }
    return matchFound;
}

function fileExists(path) {
    try { return fs.existsSync(path) } catch (err) { console.error(err) }
}

module.exports = execute_elements;