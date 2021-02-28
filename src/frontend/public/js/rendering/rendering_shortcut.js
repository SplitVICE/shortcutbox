function render_shortcut() {
    content_dynamic.innerHTML = `
    <div class='h1'>Shortcuts menu</div>
    ${foo()}
    `;
}

function foo(){
    if(JSON.parse(localStorage.getItem('data')).box.length == 0){
        return `No shortcut boxes stored. Go to box section and create some.`
    }
}