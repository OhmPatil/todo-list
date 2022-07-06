import { projectFactory, todoFactory } from "./factories";
import { displayModule } from "./renderDOM";

let displayController = displayModule();

// Main form module
const formModule = (projects) => {

    // Accept form -> create project -> add project to projects array
    const acceptProjectForm = function(){
        document.getElementById('new-project-form').addEventListener('submit', function(e){
            e.preventDefault();

            // Getting form values
            const projectTitle = document.getElementById('form-project-title').value;
            const projectDesc = document.getElementById('form-project-desc').value;

            // Creating project and resetting form
            const project = projectFactory(projectTitle, projectDesc);
            document.getElementById('new-project-form').reset();
            console.log('project submitted');

            // Adding project to projects array
            addProjectToArray(project, projects);
            console.log('project added to array');

            // Closing popup
            document.querySelector('.project-popup').style.display = "none";   
        })
    }

    // Function for adding projects to array and displaying them
    const addProjectToArray = function(project, array){
        array.push(project);
        displayController.displayAllProjects(array);
    }

    // Accept form -> create todo -> add todo to project
    const acceptTaskForm = function(){
        document.getElementById('new-task-form').addEventListener('submit', function(e){
            e.preventDefault();
            // Getting id of project from which todo is being added
            let id = document.querySelector('.add-task-button').dataset.id;

            // Getting values from form
            const taskTitle = document.getElementById('form-task-title').value;
            const taskDesc = document.getElementById('form-task-desc').value;
            const taskPriority = document.getElementById('form-task-priority').value;
            const taskDate = document.getElementById('form-task-duedate').value;

            // Creating todo and adding to respective project
            const task = todoFactory(taskTitle, taskDesc, taskDate, taskPriority, false);
            projects[id].addTodo(task);
            console.log('task submitted');

            // Displaying all todos again including new one
            displayController.displayTodos(projects[id], id);

            // Resetting form and closing popup
            document.getElementById('new-task-form').reset();
            document.querySelector('.task-popup').style.display = "none";
        })
    }

    return {
        acceptProjectForm,
        addProjectToArray,
        acceptTaskForm,
    }
}

export {formModule};
