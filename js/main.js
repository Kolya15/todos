let mainInput = document.querySelector('.main-input');
let section = document.querySelector('.show-Note');
let section1 = document.querySelector('.completed-note');
let arrayTodos = [];

mainInput.addEventListener('keydown', function (event){
    if (event.code == "Enter") {
        if (mainInput.value.length) {
            let newNote = {
                id: 'E'+ Math.floor(Math.random()*Math.random() * 1000),
                title: mainInput.value,
                completed: false,
            }
            showNewNote(newNote);
            arrayTodos.push(newNote);
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

    }
    else {
        arrayTodos[getTodo(event)].completed = false;
        const target = event.target;
        const parentId = target.parentNode.id;
            // console.log(Array.from(document.querySelectorAll('${parentId}')))
        //
        let activCheck = Array.from(document.querySelectorAll('#' + `${parentId}`));
        // let activCheck = document.querySelector('#' + `${parentId}`);elem.removeAttribute

        for (var i = 0; i < activCheck.length; i++) {
            console.log(activCheck[i].children[0])
            activCheck[i].children[0].removeAttribute("checked");
            // console.log(activCheck[i].children[i].setAttribute('checked', null));
            // console.log(i)
            // alert( activCheck[i].children[i].); // DIV, UL, DIV, SCRIPT
        }
        // console.log(activCheck.childNodes[1]);
    }


}

let qqq = document.querySelector('.q123');
console.log(qqq)
function removeNote(event) {
    event.target.parentNode.remove();
    arrayTodos.splice(getTodo(event),1);
    console.log(arrayTodos);
}



// function showCompletedNote() {
//     let arrayCompletedNote = [];
//     arrayTodos.forEach((item) =>{
//         if (item.completed == true){
//             arrayCompletedNote.push(item);
//         }
//     });
//     return arrayCompletedNote;
// }

function showCompletedArr(arrComleted) {
    Array.from(section1.childNodes).forEach((item) => {
        item.remove();
    })
    
    arrComleted.forEach((item, index) =>{
        if (item.completed == true){
            let div = document.createElement('div');
            div.className = "new-note";
            div.id = item.id;
            div.innerHTML =`<input class="checkbox-note" type="checkbox" checked onchange="check(event)">
                    <p class="title-note">${item.title}</p>
                    <button class="remove-note" onclick="removeNote(event)">Remove</button>`;
            section1.prepend(div);
                }
            })
    console.log(arrComleted);
        }

let btnCompletedNote = document.querySelector('.btn-completed-note');
btnCompletedNote.addEventListener('click', function () {
    section1.style.display = 'block';
    showCompletedArr(arrayTodos);
})






