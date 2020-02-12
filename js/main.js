let mainInput = document.querySelector('.main-input');
let section = document.querySelector('.show-Note');
let section1 = document.querySelector('.completed-note');
let section2= document.querySelector('.active-note');
let arrayTodos = [];

mainInput.addEventListener('keydown', function (event){
    if (event.code == "Enter") {
        if (mainInput.value.length) {
            let newNote = {
                id: 'E'+ Math.floor(Math.random()*Math.random() * 1000),
                title: mainInput.value,
                completed: false,
            }
            showNewNote(newNote, null, section);
            arrayTodos.push(newNote);
            mainInput.value = null;
        }
    }
});

function showNewNote(newObj, inputChecked, parentTag) {
    let div = document.createElement('div');
    div.className = "new-note";
    div.id = newObj.id;
    div.innerHTML =`<input class="checkbox-note" type="checkbox" ${inputChecked} onchange="check(event)">
                    <p class="title-note">${newObj.title}</p>
                    <button class="remove-note" onclick="removeNote(event)">Remove</button>`;
    parentTag.prepend(div);
}

function allNote(arr) {
    Array.from(section.childNodes).forEach((item) => {
        item.remove();
    })
    arr.forEach(item =>{
        if (item.completed == true){
            showNewNote(item, 'checked', section);
        }
        else {
            showNewNote(item, null, section);
        }
    })
}

function getTodo(event) {
    const target = event.target;
    const parentId = target.parentNode.id;
    return arrayTodos.findIndex(item => item.id == parentId);
}

function check(event) {
    if (arrayTodos[getTodo(event)].completed == false){
        arrayTodos[getTodo(event)].completed = true;
    }
    else {
        arrayTodos[getTodo(event)].completed = false;
        }
    showCompletedArr(arrayTodos);
    showActiveArr(arrayTodos);
    }

function removeNote(event) {
    event.target.parentNode.remove();
    arrayTodos.splice(getTodo(event),1);
}

function showCompletedArr(arrComleted) {
    Array.from(section1.childNodes).forEach((item) => {
        item.remove();
    })
    arrComleted.forEach((item, index) =>{
        if (item.completed == true){
            showNewNote(item, 'checked', section1);
        }
    })
}
function showActiveArr(arrComleted){
    Array.from(section2.childNodes).forEach((item) => {
        item.remove();
    })
    arrComleted.forEach((item, index) =>{
        if (item.completed == false){
            showNewNote(item, null, section2);
        }
    })
}

let btnAllNote = document.querySelector('.btn-all-note');
btnAllNote.addEventListener('click', function () {
    section.style.display = 'block';
    section1.style.display = 'none';
    section2.style.display = 'none';
    allNote(arrayTodos);
})

let btnCompletedNote = document.querySelector('.btn-completed-note');
btnCompletedNote.addEventListener('click', function () {
    section.style.display = 'none';
    section1.style.display = 'block';
    section2.style.display = 'none';
    showCompletedArr(arrayTodos);
})

let btnActiveNote = document.querySelector('.btn-active-note');
btnActiveNote.addEventListener('click', function () {
    section.style.display = 'none';
    section1.style.display = 'none';
    section2.style.display = 'block';
    showActiveArr(arrayTodos);
})