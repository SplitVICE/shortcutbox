function render_box() {
    content_dynamic.innerHTML = /* html */`
    <div class='h1'>Box menu</div>
    <div class='h3'>Create new box</div>
    <label class='h5' for="input_box_name">Box name</label>
    <input type="text" name="input_box_name" id="input_box_name">
    <label class='h5' for="input_box_description">Box description</label>
    <input type="text" name="input_box_description" id="input_box_description">
    <button onclick='save_newBox();'>Save new box</button>
    `;
}

function render_updateView() {
    if (JSON.parse(localStorage.getItem('data')).box.length < 0) {
        console.log('No boxes stored.');
        return `No boxes stored.`;
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
    }
}


function save_newBox() {
    const box_name = document.getElementById('input_box_name').value;
    const box_description = document.getElementById('input_box_description').value;
    if (box_name && box_description) {
        const box = { boxId: generateObjectID('B'), boxName: box_name, description: box_description, favorite: false }
        const data = JSON.parse(localStorage.getItem('data'));
        data.box.push(box);
        render_updateView();
    }
}

