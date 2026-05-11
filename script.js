// Get tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when the page loads
displayTasks();

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let priority = document.getElementById("priority").value;

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        text: taskInput.value.trim(),
        priority: priority,
        completed: false
    };

    // Add the task to the array
    tasks.push(task);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the input field
    taskInput.value = "";

    // Update the displayed task list
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = ""; // Clear the current list

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            ${task.text} <span class="priority">(${task.priority})</span>
            <div class="task-buttons">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Refresh the task list
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Refresh the task list
    displayTasks();
}

// Register Service Worker (PWA feature)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then((registration) => {
                console.log("Service Worker Registered:", registration);
            })
            .catch((error) => {
                console.log("Service Worker Registration Failed:", error);
            });
    });
}