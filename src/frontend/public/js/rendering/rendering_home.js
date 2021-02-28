function render_home() {
    content_dynamic.innerHTML = `
    Welcome ${JSON.parse(localStorage.getItem('data')).userData.userName}
    <br>
    <hr>
    Amount of boxes: ${JSON.parse(localStorage.getItem('data')).box.length}
    <br>
    Amount of shortcuts: ${JSON.parse(localStorage.getItem('data')).shortcut.length}
    <hr>
    `;
}
