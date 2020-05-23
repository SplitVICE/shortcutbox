const Run = {};

// Generates Boxes and Shortcuts objects IDs.
function generateObjectID(prefix) {

    let prefix_result = "";

    prefix != undefined ?
    prefix_result = prefix :
    prefix_result = 'x';

    const firstNumberBlock = Math.floor(Math.random() * 100000);
    const secondNumberBlock = Math.floor(Math.random() * 100000);
    const vocalSelection_number = Math.floor(Math.random() * 10);

    let vocalSelection_result = "";
    vocalSelection_number <= 5 ?
        vocalSelection_result = 'a' :
        vocalSelection_result = 'e';

    return "" + prefix_result + firstNumberBlock + vocalSelection_result + secondNumberBlock;
}

Run.generateObjectID = generateObjectID;
module.exports = Run;