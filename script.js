document.addEventListener("DOMContentLoaded", function() {
    let addButton = document.getElementById('add-task-btn');
    let taskInput = document.getElementById('task-input');
    let taskList = document.getElementById('task-list');

    function addTask() {
        let taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        let listItem = document.createElement('li');
        listItem.textContent = taskText;

        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
