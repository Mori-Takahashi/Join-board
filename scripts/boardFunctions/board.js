let taskAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
let contactAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";
let cureentDraggedElement;

window.onload = init;

function init() {
    renderData(taskAPI);
}

async function renderData(URL) {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inprogress').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
    document.getElementById('awaitingfeedback').innerHTML = ``;
    let data = await loadData(URL);
    console.log(data);
    if (data) {
        renderTaskData(data);
    }
}

function disableSpinner() {
    let element = document.getElementById('spinner');
    document.getElementById('laoding').classList.add('d-non');
    if (element === null) {
        console.error("Spinner not found!");
        
    } else {
        element.innerHTML = ``;
    }
}

function renderTaskData(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let task = data[key];
        let progress = task.progress;
        let todoDIV = document.getElementById('todo');
        let inprogressDIV = document.getElementById('inprogress');
        let doneDIV = document.getElementById('done');
        let awaitingfeedbackDIV = document.getElementById('awaitingfeedback');
        if (progress === "todo") {
            todoDIV.innerHTML += renderDivTodo(task, key);
        }
        if (progress === "inProgress") {
            inprogressDIV.innerHTML += renderDivInprogress(task, key);
        }
        if (progress === "done") {
            doneDIV.innerHTML += renderDivDone(task, key);
        }
        if (progress === "AwaitingFeedback") {
            awaitingfeedbackDIV.innerHTML += renderDivawaitingfeedback(task, key);
        }
    }
    disableSpinner();
}

function startDragging(id) {
    cureentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    let data = {
        progress: category
    }
    updateData(taskAPI, cureentDraggedElement, data);
}

function updateData(URL, id, data) {
    fetch(`${URL}/${id}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    init();
}

// Funktion zum Öffnen des Add Task Overlays und Laden des HTML-Inhalts
function openAddTaskOverlay() {
    // Zeige das Overlay an
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');

    // Container für den dynamisch geladenen Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];

    // Rufe die addTaskForm Funktion auf, um den HTML-Inhalt zu erhalten
    let htmlContent = addTaskForm();

    // Füge den HTML-Inhalt in das popupContent Div ein
    popupContent.innerHTML = htmlContent;
}

// Funktion zum Schließen des Overlays
function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.add('d-none');

    // Entfernt den dynamisch eingefügten Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];
    popupContent.innerHTML = '';
}

// Funktion um auf das Overlay klicken zu können ohne das es sich schließt

function doNotClose(event) {
    event.stopPropagation();
  }