import { getTasks, saveTask, onGetTasks, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded",() => {
    
    onGetTasks((querySnapshot) =>{ //querySnapshot"Datos que existen en ese momento"
        let html = "";

        querySnapshot.forEach(doc => { //El método forEach() ejecuta la función indicada una vez por cada elemento
            const task = doc.data(); //El .data lo transforma en un objeto de javascript y asi se pueden recorrer sus datos
            //Este es el String que va dentro del div id="tasks-container"
            html += `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button class="btn-delete" data-id="${doc.id}">Delete</button>
                <button class="btn-edit" data-id="${doc.id}">Edit</button>
            </div>`//Se le añade un elemento de escucha a los botones con el id unico de los botones
        });
        tasksContainer.innerHTML = html;

        //Selecciono todos los botones con la clase btn-delete
        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete")

        //Por cada boton que haya en este arreglo se le agregara un escucha, un evento click, se borrara del collection y de la base de datos
        btnsDelete.forEach(btn => {
            btn.addEventListener("click", ({target: {dataset}}) => {
                deleteTask(dataset.id)
            })
        })

        //Selecciono todos los botones de la clase btn-edit
        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit")
        btnsEdit.forEach(btn => {
            btn.addEventListener("click", async(e) => {
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm["task-title"].value = task.title
                taskForm["task-description"].value = task.description

                editStatus = true;
                id = doc.id;

                taskForm["btn-task-save"].innerText = "Update"
            });
        });
    });
});

//Cuando ocurra el evento no se recargara la pagina
taskForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    if (!editStatus){
        saveTask(title.value, description.value);
    } else {
        updateTask(id,{
            title: title.value,
            description: description.value,
        })

        editStatus = false;
        taskForm["btn-task-save"].innerText = "Save"
    }

    taskForm.reset(); //Limpia mi formulario despues del evento
});