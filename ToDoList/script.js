document.addEventListener('DOMContentLoaded', () =>{

let input = document.getElementById("todo-input")
let btn = document.getElementById("add-task-btn")
let list = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => renderTask(task))


btn.addEventListener('click',() => {

    const taskText = input.value.trim();
    if(taskText === "") return;

    const newTask = {
        id : Date.now(),
        text :taskText,
        isCompleted : false,
    }

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask)
    input.value = "" 
    console.log(tasks) 

})

function renderTask(task){
    const li = document.createElement('li');
    li.setAttribute("data-id", task.id)
    li.innerHTML = `
   <span>${task.text}</span>
    <button>delete</button>
    `;
    list.appendChild(li);

    li.addEventListener('click',(e) => {
       if( e.target.tagName = 'BUTTON') return;
       task.isCompleted = !(task.isCompleted)
       li.classList.toggle("completed");
       saveTasks();
    })

     li.querySelector('button').addEventListener('click',(e) =>{
        e.stopPropagation();
        tasks = tasks.filter((t) => t.id !== task.id);
        li.remove();
        saveTasks();
     })
    
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
})