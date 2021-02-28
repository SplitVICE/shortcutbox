function render_box() {
    content_dynamic.innerHTML = /* html */`
    <div class='h1'>Box menu</div>
    <div class='h3'>Create new box</div>
    <label class='h5' for="input_box_name">Box name</label>
    <input type="text" name="input_box_name" id="input_box_name">
    <label class='h5' for="input_box_description">Box description</label>
    <input type="text" name="input_box_description" id="input_box_description">
    <button onclick='save_client_newBox();'>Save new box</button>
    <hr>
    <div id='content_box_list'></div>
    `;
    render_box_list();
}

// Stores a new box inside client localStorage.
function save_client_newBox() {
    const box_name = document.getElementById('input_box_name').value;
    const box_description = document.getElementById('input_box_description').value;
    if (box_name && box_description) {
        const box = { boxId: generateObjectID('B'), boxName: box_name, description: box_description, favorite: false }
        const data = JSON.parse(localStorage.getItem('data'));
        data.box.push(box);
        save_localStorage(data);
        save_database(data);
        render_box_list();
    } else
        console.log('Missing parameters. box_name: ' + box_name + '. box_description: ' + box_description);
}

function render_box_list() {
    const data = get_localStorage();
    const content_box_list = document.getElementById('content_box_list');
    if (data.box.length <= 0) {
        console.log('No boxes stored.');
        content_box_list.innerHTML = `No boxes stored.`;
    } else {
        console.log('Boxes found.');
        let content = "";
        const box_list = JSON.parse(localStorage.getItem('data')).box;
        box_list.forEach(box => {
            content += `
            ${box.boxName}
            <br>
            ${box.description}
            <hr>
            `;
        });
        content_box_list.innerHTML = content;
    }
}
