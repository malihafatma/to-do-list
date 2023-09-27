document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearCompletedButton = document.getElementById('clear-completed-button');
    const taskCountElement = document.getElementById('task-count');
    const sortByNameButton = document.getElementById('sort-by-name-button');
    const sortByCompletionButton = document.getElementById('sort-by-completion-button');
    const markAllButton = document.getElementById('mark-all-button');

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Function to update task count in the UI
    function updateTaskCount() {
        const tasks = todoList.querySelectorAll('li:not(.completed)');
        taskCountElement.textContent = `${tasks.length} task(s) left`;
    }

    // Function to update "Clear Completed" button visibility
    function updateClearCompletedButtonVisibility() {
        const completedTasks = todoList.querySelectorAll('li.completed');
        clearCompletedButton.style.display = completedTasks.length > 0 ? 'block' : 'none';
    }

    // Function to mark a task as completed
    function markTaskAsCompleted(task) {
        task.classList.toggle('completed');
        updateTaskCount();
        updateClearCompletedButtonVisibility();
    }

    // Function to delete a task
    function deleteTask(task) {
        todoList.removeChild(task);
        updateTaskCount();
        updateClearCompletedButtonVisibility();
    }

    // Event listener for the dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        toggleDarkMode();
    });

    // Event listener for editing a task
    todoList.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('edit-button')) {
            const listItem = e.target.closest('li');
            const textSpan = listItem.querySelector('span');
            const newText = prompt('Edit task:', textSpan.textContent);
            if (newText !== null) {
                textSpan.textContent = newText;
            }
        }
    });

    // Event listener for adding a new task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            const listItem = document.createElement('li');

            const textSpan = document.createElement('span');
            textSpan.textContent = todoText;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                markTaskAsCompleted(listItem);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(listItem);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');

            listItem.appendChild(textSpan);
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);

            todoList.appendChild(listItem);
            todoInput.value = '';

            updateTaskCount();
            updateClearCompletedButtonVisibility();
        }
    });

    // Event listener for clearing completed tasks
    clearCompletedButton.addEventListener('click', () => {
        const completedTasks = todoList.querySelectorAll('li.completed');
        completedTasks.forEach((task) => {
            deleteTask(task);
        });
    });

    // Event listener for "Mark All Completed" button
    markAllButton.addEventListener('click', () => {
        const tasks = todoList.querySelectorAll('li:not(.completed)');
        tasks.forEach((task) => {
            markTaskAsCompleted(task);
        });
    });

    // Event listener for sorting tasks by name
    sortByNameButton.addEventListener('click', () => {
        const tasks = Array.from(todoList.querySelectorAll('li'));
        tasks.sort((a, b) => {
            const textA = a.querySelector('span').textContent.toLowerCase();
            const textB = b.querySelector('span').textContent.toLowerCase();
            return textA.localeCompare(textB);
        });

        // Clear and append sorted tasks
        todoList.innerHTML = '';
        tasks.forEach((task) => {
            todoList.appendChild(task);
        });
    });

    // Event listener for sorting tasks by completion status
    sortByCompletionButton.addEventListener('click', () => {
        const tasks = Array.from(todoList.querySelectorAll('li'));
        tasks.sort((a, b) => {
            const completedA = a.classList.contains('completed');
            const completedB = b.classList.contains('completed');
            return completedA - completedB;
        });

        // Clear and append sorted tasks
        todoList.innerHTML = '';
        tasks.forEach((task) => {
            todoList.appendChild(task);
        });
    });

    // Initial update of task count and clear completed button visibility
    updateTaskCount();
    updateClearCompletedButtonVisibility();
});
