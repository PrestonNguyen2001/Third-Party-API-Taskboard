# Web APIs Challenge: Task Board
This repository contains the solution to the Web APIs Challenge, focusing on creating a simple task board application that allows a team to manage project tasks by modifying starter code.

## Challenge Description
The goal of this challenge is to create a task board application where project team members can manage project tasks by adding, updating, and deleting them. The application should display tasks in columns representing different progress states and provide functionality for tracking deadlines and overall project progress.

## Challenge Elements

### User Story
```markdown
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```
### Acceptance Criteria
```markdown
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Solution
To address the challenge requirements, the following components were implemented:
1. Modal Structure: A modal was added to facilitate the input of new tasks. The modal contains a form with input fields for the task title, due date, and description. This allows users to easily input the necessary information for creating a new task.
2. Task Board Display: Upon opening the task board, the list of project tasks is displayed in columns representing different progress states: Not Yet Started, In Progress, and Completed. Each task is color-coded to indicate its deadline status, with tasks nearing the deadline highlighted in yellow and overdue tasks highlighted in red.
3. Task Management Functionalit:
    - Adding Tasks: Users can click on a button to define a new task, triggering the display of the modal dialog. From there, they can enter the title, description, and deadline date for the new task. Upon saving, the task's properties are stored in localStorage, ensuring that the task persists even after the page is refreshed.
    - Updating Task Progress: Tasks can be dragged from one progress column to another, updating their progress state accordingly. This functionality allows users to easily track and manage the progress of individual tasks within the project.
    - Deleting Tasks: Users can delete tasks by clicking on the delete button associated with each task card. Once deleted, the task is removed from the task board and will not reappear after refreshing the page.
4. Persistence of Saved Tasks: Even after refreshing the page, the saved tasks persist due to their storage in localStorage. This ensures that users can continue to access and manage their tasks across sessions without losing any data.
5. Styling: Custom CSS styles are applied to enhance the visual appearance of the task board and task cards. Bootstrap is used for responsive design and styling components.

### Specific Changes Made:
1. Retrieve Tasks and Next ID: In the second script, the retrieval of tasks and the next ID from local storage is updated to handle cases where there are no tasks stored in local storage. It initializes an empty array for taskList if no tasks are stored.
2. Generate Task ID: The generateTaskId() function is implemented in the second script to generate a unique task ID. It calculates the ID based on the length of the taskList array and ensures uniqueness by finding the maximum existing ID and incrementing it by 1.
3. Create Task Card: The createTaskCard(task) function is implemented in the second script to dynamically create HTML elements representing task cards. It takes a task object as input and generates the corresponding HTML structure for a task card with title, description, due date, and a delete button.
4. Render Task List: The renderTaskList() function is implemented in the second script to render the task list dynamically on the page. It clears existing task cards, loops through the taskList array, creates task cards for each task, and appends them to the corresponding swim lane container based on the task's status.

5. Handle Add Task: The handleAddTask(event) function is implemented in the second script to handle the submission of the task form. It retrieves task details from the form inputs, creates a new task object, adds it to the taskList array, updates local storage, and renders the updated task list.

6. Handle Delete Task: The handleDeleteTask(event) function is implemented in the second script to handle the deletion of a task. It retrieves the task ID of the task to be deleted, finds its index in the taskList array, removes it from the array, updates local storage, and renders the updated task list.

7. Handle Drop: The handleDrop(event, ui) function is implemented in the second script to handle dropping a task into a new status lane. It retrieves the task ID and the ID of the new status lane, updates the status of the dropped task, updates local storage, and renders the updated task list.

8. Reset Color: The resetColor(taskCard) function is added in the second script to reset the background color of a task card by removing any inline style.

9. Document Ready Function: The $(document).ready(function () { ... }) function is updated in the second script to initialize the page when it loads. It loads the task list from local storage, renders the task list, adds event listeners for form submission and task deletion, makes swim lanes droppable, and initializes the date picker for the task due date field.

## Usage
1. Click the "Add Task" button to define a new task.
2. Enter the task title, description, and deadline date in the modal dialog.
3. Click the "Add Task" button in the modal to save the task.
4. Drag tasks between swimlanes to update their progress status.
5. Click the delete button on a task card to remove it from the task board.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

