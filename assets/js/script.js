// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return taskList.length > 0 ? Math.max(...taskList.map(task => task.id)) + 1 : 1;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-task-id', task.id);
    taskCard.draggable = true;
    setColorBasedOnDueDate(taskCard, task);

    taskCard.innerHTML = `
        <div class="card mb-1">
            <div class="card-header">${task.title}</div>
            <div class="card-body">
                <p class="card-text">${task.description}</p>
                <p class="card-text">${task.dueDate}</p>
                <button type="button" class="btn btn-danger delete-task-btn">Delete</button>
            </div>
        </div>
    `;

    // Append the task card to the container with the ID "todo-cards"
    document.getElementById('todo-cards').appendChild(taskCard);

    return taskCard;
}

// Function to set color of task based on due date and status
function setColorBasedOnDueDate(taskCard, task) {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Set background color to white if status is "done"
    if (task.status === 'done') {
        taskCard.style.backgroundColor = '#FAFFFD';
        
    // Set background color to red if task is overdue
    } else if (daysDiff < 0) {
        taskCard.style.backgroundColor = '#DF2935'; 

    // Set background color to yellow if task is nearing the deadline
    } else if (daysDiff <= 3) {
        taskCard.style.backgroundColor = '#F6F740';

    // Set background color to white if task is not overdue and has more than 3 days until the deadline
    } else {
        taskCard.style.backgroundColor = '#FAFFFD'; 
    }
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    // Clear existing task cards
    document.querySelectorAll('.task-card').forEach(card => card.remove());

    // Render task cards for each task in the taskList
    taskList.forEach(task => {

        // Get the corresponding swim lane container based on the task status
        let taskColumn;
        if (task.status === 'to-do') {
            taskColumn = document.getElementById('to-do');
        } else if (task.status === 'in-progress') {
            taskColumn = document.getElementById('in-progress');
        } else if (task.status === 'done') {
            taskColumn = document.getElementById('done');
        }

        // Check if the swim lane container exists
        if (taskColumn) {

            // Create the task card
            const taskCard = createTaskCard(task);

            // Append the task card to the swim lane container
            taskColumn.querySelector('.card-body').appendChild(taskCard);
        } else {
            console.error(`Swim lane container for status '${task.status}' not found.`);
        }
    });

    // Make task cards draggable
    $('.task-card').draggable({
        revert: 'invalid',
        helper: 'clone',
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve task details from the form inputs
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;

    // Create a new task object with the retrieved details
    const newTask = {
        id: generateTaskId(), // Generate a unique task ID
        title: title,
        description: description,
        dueDate: dueDate,
        status: 'to-do', // Set the initial status of the task to "to-do"
    };

    // Add the new task to the taskList array
    taskList.push(newTask);

    // Update the tasks data stored in localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Render the updated task list
    renderTaskList();

    // Hide the modal after adding the task
    $('#formModal').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    // Retrieve the task ID of the task to be deleted
    const taskId = $(this).closest('.task-card').attr('data-task-id');
    
    // Find the index of the task with the matching ID in the taskList array
    const index = taskList.findIndex(task => task.id === parseInt(taskId));
    
    // Check if the task exists in the taskList
    if (index !== -1) {

        // Remove the task from the taskList array
        taskList.splice(index, 1);

        // Update the tasks data stored in localStorage
        localStorage.setItem('tasks', JSON.stringify(taskList));

        // Render the updated task list
        renderTaskList();
    }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

    // Retrieve the task ID of the dropped task
    const taskId = ui.draggable.attr('data-task-id');
    
    // Retrieve the ID of the new status lane where the task is dropped
    const newStatus = $(this).attr('id');
    
    // Find the index of the dropped task in the taskList array
    const taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));

    // Log the task drop details
    console.log('Task dropped:', taskId, newStatus);

    // Check if the dropped task exists in the taskList
    if (taskIndex !== -1) {

        // Change the status of the dropped task to the new status lane
        taskList[taskIndex].status = newStatus;

        // Update the background color of the task card based on its status
        if (newStatus === 'done') {
            ui.draggable.find('.card').css('background-color', 'white');
        } else {
            // Set color based on due date if status is not "done"
            setColorBasedOnDueDate(ui.draggable.find('.card').get(0), taskList[taskIndex]);
        }

        // Update the tasks data stored in localStorage
        localStorage.setItem('tasks', JSON.stringify(taskList));

        // Render the updated task list
        renderTaskList();
    }
}

// Function to reset color of task
function resetColor(taskCard) {

    // Remove any inline style to reset the color
    $(taskCard).removeAttr('style');
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    // Load task list from localStorage or initialize an empty array if no tasks are stored
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Render the task list when the page loads
    renderTaskList();

    // Add event listener for submitting the task form
    $('#task-form').submit(handleAddTask);

    // Add event listener for deleting a task
    $(document).on('click', '.delete-task-btn', handleDeleteTask);

    // Make the swim lanes droppable to allow task dragging
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    // Initialize date picker for the task due date field
    $('#task-due-date').datepicker({
        dateFormat: 'yy-mm-dd' // Set the date format
    });
});
