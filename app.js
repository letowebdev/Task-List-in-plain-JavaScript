// Defining the variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Loading all event listners
loadEventListners();

function loadEventListners()
{
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks events
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// add Task function
function addTask(e)
{
    if (taskInput.value === '') {
        alert('Add a Task');
    }
        
    // Create li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Creating text node and appending it to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Appending the link to li
    li.appendChild(link);

    // Appending li to the ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';


    e.preventDefault();
}

// Storing Task
function storeTaskInLocalStorage(task)
{
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Get tasks from local storage
function getTasks()
{
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task)
    {
    // Create li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Creating text node and appending it to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Appending the link to li
    li.appendChild(link);

    // Appending li to the ul
    taskList.appendChild(li);
    });
}

// remove Task
function removeTask(e)
{
  if (e.target.parentElement.classList.contains('delete-item')) {
     if (confirm('Are you sure ?')) {
        e.target.parentElement.parentElement.remove();

        // Remove from local storage
        removeTaskFromLs(e.target.parentElement.parentElement);
     }
  }
}

// remove from local storage
function removeTaskFromLs(taskItem)
{
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index)
    {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks()
{
    // The easiest way
    // taskList.innerHTML = '';

    /* The faster way (400 times faster in chrome 26 using a while-loop 
    to remove children "in a desktop browser")*/
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    clearTasksfromLs();

}

// clear tasks from local storage
function clearTasksfromLs()
{
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();

    // querySelectorAll will return a node list so no array conversion is necessary
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });
}