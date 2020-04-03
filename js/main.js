let arrayTodos = [];
let arrowSelectedAll = document.querySelector('.arrow-selected-all')
let mainInput = document.querySelector('.main-input');
let allNote = document.querySelector('.show-note');
let activeNote = document.querySelector('.active-note');
let completedNote = document.querySelector('.completed-note');
let footer = document.querySelector('.footer')
let counterItemsLeft = document.querySelector('.counter-items')
let buttonControl = document.querySelector('.wrapper-btn');
let clearCompleted = document.querySelector('.clear-completed');

// create new note
mainInput.addEventListener('keydown', function (event) {
    if (event.code == "Enter") {
        if (mainInput.value.length) {
            let newNote = {
                id: 'E' + Math.floor(Math.random() * Math.random() * 1000),
                title: mainInput.value,
                completed: false,
            }
            arrayTodos.push(newNote);
            showNewNote(newNote, null, allNote);
            showArrowSelected();
            setColorArrowSelected();
            showFooter(arrayTodos);
            showItemsLeft();
            mainInput.value = null;
        }
    }
});

// display new note
function showNewNote(newObj, inputChecked, parentTag) {
    let div = document.createElement('div');
    div.className = "new-note";
    div.id = newObj.id;
    div.innerHTML = `<input class="selected-note" type="checkbox" ${inputChecked} onchange="selectedNote(event)">
                    <p class="title-note">${newObj.title}</p>
                    <i class="fa fa-times remove-note" aria-hidden="true" onclick="removeNote(event)"></i>`;
    parentTag.prepend(div);
}

// display all note
function showAllNote(arr) {
    Array.from(allNote.childNodes).forEach((item) => {
        item.remove();
    })
    arr.forEach(item => {
        if (item.completed === true) {
            showNewNote(item, 'checked', allNote);
            showTextCompletedTodo(allNote);
        } else {
            showNewNote(item, null, allNote);
        }
    })
}

// display active note
function showActiveNote(arrComleted) {
    Array.from(activeNote.childNodes).forEach((item) => {
        item.remove();
    })
    arrComleted.forEach((item, index) => {
        if (item.completed === false) {
            showNewNote(item, null, activeNote);
        }
    })
}

// display completed note
function showCompletedNote(arrComleted) {
    Array.from(completedNote.childNodes).forEach((item) => {
        item.remove();
    })
    arrComleted.forEach((item, index) => {
        if (item.completed === true) {
            showNewNote(item, 'checked', completedNote);
            clearCompleted.style.visibility = 'visible';
            showTextCompletedTodo(completedNote);
        }
    })
}

// selection and display of buttons
let selectedButtonControl = null;
buttonControl.addEventListener('click', function (event) {
    let target = event.target;
    if (target.tagName != 'BUTTON') return
    if (selectedButtonControl) selectedButtonControl.classList.remove('active')
    selectedButtonControl = target;
    selectedButtonControl.classList.add('active');
})


let btnAllNote = document.querySelector('.btn-all-note');
btnAllNote.addEventListener('click', function () {
    allNote.style.display = 'block';
    completedNote.style.display = 'none';
    activeNote.style.display = 'none';
    showAllNote(arrayTodos);
})

let btnCompletedNote = document.querySelector('.btn-completed-note');
btnCompletedNote.addEventListener('click', function () {
    allNote.style.display = 'none';
    completedNote.style.display = 'block';
    activeNote.style.display = 'none';
    showCompletedNote(arrayTodos);
})

let btnActiveNote = document.querySelector('.btn-active-note');
btnActiveNote.addEventListener('click', function () {
    allNote.style.display = 'none';
    completedNote.style.display = 'none';
    activeNote.style.display = 'block';
    showActiveNote(arrayTodos);
})

//getting the index of the selected note
function getNote(event) {
    const target = event.target;
    const parentId = target.parentNode.id;
    return arrayTodos.findIndex(item => item.id == parentId);
}

// selection note
function selectedNote(event) {
    if (arrayTodos[getNote(event)].completed === false) {
        arrayTodos[getNote(event)].completed = true;
        let completedTodo = document.querySelector('#' + arrayTodos[getNote(event)].id)
        showTextCompletedTodo(completedTodo);
    } else {
        arrayTodos[getNote(event)].completed = false;
        let completedTodo = document.querySelector('#' + arrayTodos[getNote(event)].id)
        showTextCompletedTodo(completedTodo);
    }
    setColorArrowSelected()
    showItemsLeft();
    showClearCompleted(arrayTodos);
    showCompletedNote(arrayTodos);
    showActiveNote(arrayTodos);
}

// change the text of the selected note
function showTextCompletedTodo(section) {
    section.querySelector('.title-note').classList.toggle('completed-title-note');
}

//display of the arrow for selecting all notes
function showArrowSelected (){
    if (arrayTodos.length >0) arrowSelectedAll.style.display = 'block';
    else arrowSelectedAll.style.display = 'none';
};

function setColorArrowSelected() {
    arrowSelectedAll.style.color = arrayTodos.find(item => item.completed === false) ? '#aaaaaa' : '#000000';
};

// selection of all notes
arrowSelectedAll.addEventListener('click', function(){
    if (arrayTodos.find(item => item.completed === false)){
        arrayTodos.forEach(item => item.completed = true)
    }
    else arrayTodos.forEach(item => item.completed = false);
    showItemsLeft()
    setColorArrowSelected()
    showAllNote(arrayTodos);
    showCompletedNote(arrayTodos);
    showActiveNote(arrayTodos);
})

// note deletion
function removeNote(event) {
    event.target.parentNode.remove();
    arrayTodos.splice(getNote(event), 1);
    showArrowSelected()
    showItemsLeft();
    showClearCompleted(arrayTodos);
    showFooter(arrayTodos);
}

// delete all completed note
function showClearCompleted(array) {
    let completedItemFromArrayTodo = array.find(item => item.completed === true);
    clearCompleted.style.visibility = completedItemFromArrayTodo ? 'visible' : 'hidden';
};

clearCompleted.addEventListener('click', function () {
    arrayTodos = arrayTodos.filter(item => item.completed === false);
    showArrowSelected()
    showFooter(arrayTodos);
    showAllNote(arrayTodos);
    showCompletedNote(arrayTodos);
    showClearCompleted(arrayTodos);
    return arrayTodos;
})

// display footer
function showFooter(arr) {
    footer.style.display = arr.length != 0 ? 'flex' : 'none';
};

// display active note
function showItemsLeft() {
    let counter = 0;
    arrayTodos.forEach(item => {
        counter += !item.completed ? 1 : 0;
    })
    if (counter === 1) counterItemsLeft.innerHTML = `${counter} item left`
    else counterItemsLeft.innerHTML = `${counter} items left`
};






