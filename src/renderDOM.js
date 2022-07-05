import { formModule } from "./form-control";
import { projectFactory, todoFactory } from "./factories";


let displayModule = () =>{

    const displayProject = (project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);
        
        projectDiv.addEventListener('click', function(){
            console.log('clicked');
            displayTodos(project);
        })
        document.querySelector('.projects-container').appendChild(projectDiv);
    }

    const acceptTaskForm = function(project){
        document.getElementById('task-submit-button').addEventListener('click', function(e){
            e.preventDefault();
            const taskTitle = document.getElementById('form-task-title').value;
            const taskDesc = document.getElementById('form-task-desc').value;
            // const taskDate = document.getElementById('form-task-date').value;
            // const taskPriority = document.getElementById('form-task-priority').value;
            // const taskCompleted = document.getElementById('form-task-completed').checked;
            const task = todoFactory(taskTitle, taskDesc, '2020-01-01', 'low', false);
            document.getElementById('new-task-form').reset();
            console.log('task submitted');
            addTaskToProject(task, project);
            console.log('task added to array');

            document.querySelector('.task-popup').style.display = "none";   
        })
    }

    const addTaskToProject = function(task, project){
        project.addTodo(task);
    }

    const displayAddProjectButton = () => {
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add Project';
        addProjectButton.classList.add('add-project-button');

        addProjectButton.addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "flex";
        });
        document.querySelector('.close-project').addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "none";
        });
            
        document.querySelector('.projects-container').appendChild(addProjectButton);
    }

    const displayAddTaskButton = () => {
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('add-task-button');

        addTaskButton.addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "flex";
        });
        document.querySelector('.close-task').addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "none";
        });

        document.querySelector('.tasks-container').appendChild(addTaskButton);
    }

    const displayAllProjects = (projects) => {
        document.querySelector('.projects-container').replaceChildren();

        projects.forEach(project => {
            displayProject(project);
        })
        displayAddProjectButton();
    }

    const displayTodos = function(project){
        document.querySelector('.tasks-container').replaceChildren();
        
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-desc').textContent = project.desc;

        const todos = project.todos;
        todos.forEach(todo => {

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
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
        displayAddTaskButton();
    }
    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects,
        displayTodos,
    }
}


export {displayModule};