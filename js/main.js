let mainInput = document.querySelector('.main-input');
let section = document.querySelector('.show-Note');
let arrayTodos = [];


mainInput.addEventListener('keydown', function (event){
    if (event.code == "Enter") {
        if (mainInput.value.length) {
            let newNote = {
                id: arrayTodos.length,
                title: mainInput.value,
                completed: false,
            }
            showNewNote(newNote);
            arrayTodos.push(newNote);
            console.log(arrayTodos);
            mainInput.value = null;
        }
    }
});

function showNewNote(newObj) {
    let div = document.createElement('div');
    div.className = "new-note";
    div.innerHTML =`<input id="${arrayTodos.length}" class="checkbox-note" type="checkbox" onchange="check()" ><p class="title-note">${newObj.title}</p>`;
    section.prepend(div);
}

function check() {
    target = event.target;

    console.log(target.id);
}


