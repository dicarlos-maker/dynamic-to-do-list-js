document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

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
        removeButton.classList.add('remove-btn');

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



// Function to load tasks from Local Storage and display them on the page
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving again to Local Storage
}

// Function to add a new task to the list and update Local Storage
function addTask(taskText, save = true) {
    if (taskText.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    let listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a remove button
    let removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    // Remove task when button is clicked
    removeButton.onclick = function() {
        taskList.removeChild(listItem);
        // Update Local Storage after removal
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    // Append remove button to list item and list item to list
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
    
    // Clear the input field
    taskInput.value = '';

    if (save) {
        // Update Local Storage with new task
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Event listener for page load to initialize and load tasks
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add task when button is clicked
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});
