document.getElementById('btn_aside_home').addEventListener('click', () => {
    render_home();
});

document.getElementById('btn_aside_shortcuts').addEventListener('click', () => {
    render_shortcut();
});

document.getElementById('btn_aside_boxes').addEventListener('click', () => {
    render_box();
});

document.getElementById('btn_aside_about').addEventListener('click', () => {
    render_about();
});

// Default init screen
render_home();
