import { formModule } from "./form-control";
import { projectFactory, todoFactory } from "./factories";

// Main display module
const displayModule = () =>{

    // Function to create and display ONE project
    const displayProject = (project, id) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);

        // Assigning unique data-id to each project
        projectDiv.dataset.id = id;
        
        // Logic for displaying todos
        projectDiv.addEventListener('click', function(){
            console.log('clicked');
            displayTodos(project, id);
        })

        // Finally appending project to DOM
        document.querySelector('.projects-container').appendChild(projectDiv);
    }

    // Function to create and display Add Project button
    const displayAddProjectButton = () => {
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add Project';
        addProjectButton.classList.add('add-project-button');

        // Adding event listeners to button to open/close popup
        addProjectButton.addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "flex";
        });
        document.querySelector('.close-project').addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "none";
        });
            
        // Finally appending button to DOM
        document.querySelector('.projects-container').appendChild(addProjectButton);
    }

    // Function to create and display AddTask button
    const displayAddTaskButton = (id) => {
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('add-task-button');

        // Assigning unique data-id to each button, same id as project
        addTaskButton.dataset.id = id;

        // Adding event listeners to button to open/close popup
        addTaskButton.addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "flex";
            
        });
        document.querySelector('.close-task').addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "none";
        });

        // Finally appending button to DOM
        document.querySelector('.tasks-container').appendChild(addTaskButton);
    }

    // Function to display ALL projects in array with unique data-id
    const displayAllProjects = (projects) => {
        document.querySelector('.projects-container').replaceChildren();

        let id = 0;
        projects.forEach(project => {
            displayProject(project, id);
            id++;
        })

        // Displaying add project button after all projects are displayed
        displayAddProjectButton();
    }

    // Function to display all todos of one project
    const displayTodos = function(project, id){
        document.querySelector('.tasks-container').replaceChildren();
        
        // Display project title and desc on right side
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-desc').textContent = project.desc;

        // Appending each todo to dom
        const todos = project.todos;
        todos.forEach(todo => {

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('checkbox-div');
            const todoCheckbox = document.createElement('input');
            todoCheckbox.type = 'checkbox';
            todoCheckbox.classList.add('todo-checkbox');
            checkboxDiv.appendChild(todoCheckbox);
            todoDiv.appendChild(checkboxDiv);

            const todoTitle = document.createElement('h3');
            todoTitle.textContent = `${todo.title}`;
            todoDiv.appendChild(todoTitle);
            const todoDesc = document.createElement('p');
            todoDesc.textContent = `${todo.desc}`;
            todoDiv.appendChild(todoDesc);
            const todoPriority = document.createElement('p');
            todoPriority.textContent = `${todo.priority}`;
            todoDiv.appendChild(todoPriority);
            const todoDueDate = document.createElement('p');
            todoDueDate.textContent = `${todo.dueDate}`;
            todoDiv.appendChild(todoDueDate);
            const todoComplete = document.createElement('p');
            todoComplete.textContent = `${todo.isComplete}`;
            todoDiv.appendChild(todoComplete);
            document.querySelector('.tasks-container').appendChild(todoDiv);
        })

        // Displaying add task button after all todos are displayed
        displayAddTaskButton(id);
    }
    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects,
        displayTodos,
    }
}


export {displayModule};