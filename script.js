document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value !== '') {
        var li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        saveTask(taskInput.value);
        taskInput.value = '';
    }
}

function deleteTask(button) {
    var taskItem = button.parentNode;
    var taskText = taskItem.querySelector('span').innerText;
    var taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);
    removeTaskFromLocalStorage(taskText);
}

function saveTask(task) {
    var tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = getTasksFromLocalStorage();
    var taskList = document.getElementById('taskList');

    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function getTasksFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function removeTaskFromLocalStorage(task) {
    var tasks = getTasksFromLocalStorage();
    var updatedTasks = tasks.filter(function (t) {
        return t !== task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
