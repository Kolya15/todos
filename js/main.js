let mainInput = document.querySelector('.main-input');
let section = document.querySelector('.show-Note');
let section1 = document.querySelector('.completed-note');
console.log(section1);
let arrayTodos = [];

mainInput.addEventListener('keydown', function (event){
    if (event.code == "Enter") {
        if (mainInput.value.length) {
            let newNote = {
                id: Math.random()*Math.random(),
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
    div.id = newObj.id;
    div.innerHTML =`<input class="checkbox-note" type="checkbox" onchange="check(event)">
                    <p class="title-note">${newObj.title}</p>
                    <button class="remove-note" onclick="removeNote(event)">Remove</button>`;
    section.prepend(div);
}

function getTodo(event) {
    const target = event.target;
    const parentId = target.parentNode.id;
    return arrayTodos.findIndex(item => item.id == parentId);
}

function check(event) {
    if (arrayTodos[getTodo(event)].completed == false){
        arrayTodos[getTodo(event)].completed = true;
        showCompletedNote();
    }
    else {
        arrayTodos[getTodo(event)].completed = false;
    }
    console.log(arrayTodos);


}

function removeNote(event) {
    event.target.parentNode.remove();
    arrayTodos.splice(getTodo(event),1);
    console.log(arrayTodos);
}



// function showCompletedNote() {
// //     let arrayCompletedNote = [];
// //     arrayTodos.forEach((item) =>{
// //         if (item.completed == true){
// //             arrayCompletedNote.push(item);
// //         }
// //         console.log(arrayCompletedNote);
// //         showCompletedArr(arrayCompletedNote);
// //     });
// // }

function showCompletedNote() {
    arrayTodos.forEach((item) =>{
        if (item.completed == true){
            let div = document.createElement('div');
            div.className = "new-note completedNote";
            div.id = item.id;
            div.innerHTML =`<input class="checkbox-note" type="checkbox" checked onchange="check(event)">
                    <p class="title-note">${item.title}</p>
                    <button class="remove-note" onclick="removeNote(event)">Remove</button>`;
            section1.prepend(div);
            item.completed = false;
            // section1.querySelectorAll('.completedNote').forEach(item => item.remove())
            // showCompletedArr(arrayCompletedNote);
        }
    });
}

// function showCompletedArr(arrComleted) {
//     arrComleted.forEach((item) => {
//
//         let div = document.createElement('div');
//         div.className = "new-note";
//         div.id = item.id;
//         div.innerHTML =`<input class="checkbox-note" type="checkbox" checked onchange="check(event)">
//                     <p class="title-note">${item.title}</p>
//                     <button class="remove-note" onclick="removeNote(event)">Remove</button>`;
//         section1.prepend(div);
//         //
//     })
// }

let btnCompletedNote = document.querySelector('.btn-completed-note');
btnCompletedNote.addEventListener('click', function () {
    section1.style.display = 'block';
})






