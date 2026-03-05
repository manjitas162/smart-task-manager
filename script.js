let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

let taskInput = document.getElementById("taskInput");
let priority = document.getElementById("priority").value;

if(taskInput.value === ""){
alert("Enter a task");
return;
}

let task = {
text: taskInput.value,
priority: priority,
completed: false
};

tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));

taskInput.value="";

displayTasks();
}

function displayTasks(){

let list = document.getElementById("taskList");

list.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML = `
${task.text} (${task.priority})

<div>
<button onclick="toggleTask(${index})">✔</button>
<button onclick="deleteTask(${index})">❌</button>
</div>
`;

list.appendChild(li);

});
}

function toggleTask(index){

tasks[index].completed = !tasks[index].completed;

localStorage.setItem("tasks", JSON.stringify(tasks));

displayTasks();
}

function deleteTask(index){

tasks.splice(index,1);

localStorage.setItem("tasks", JSON.stringify(tasks));

displayTasks();
}
