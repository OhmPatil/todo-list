import {projectFactory, todoFactory} from './factories.js';
import { formModule } from './form-control.js';
import {displayModule} from './renderDOM.js';


// Main app running logic starts here
function initializeApp(){

    // Creating empty array to store projects
    let projects = []

    // Checking if projects exist in local storage, if yes, add them to projects array
    if (localStorage.getItem('projects')){
        console.log('projects found in local storage');
        projects = JSON.parse(localStorage.getItem('projects'));
    }

    // If no projects exist in local storage, create default project and append to array
    else {
        let defaultProject = projectFactory('Default Project', 'This is a project created by default');
        let defaultTodo1 = todoFactory('Default Todo', 'This is a todo created by default', '2022-01-01', 'low', false);
        let defaultTodo2 = todoFactory('Default Todo', 'This is a todo created by default', '2022-01-01', 'medium', false);
        let defaultTodo3 = todoFactory('Default Todo', 'This is a todo created by default', '2022-01-01', 'high', false);
        defaultProject.todos.push(defaultTodo1);
        defaultProject.todos.push(defaultTodo2);
        defaultProject.todos.push(defaultTodo3);
        projects.push(defaultProject);
    }

    // Initializing display and form modules
    let displayController = displayModule(projects);
    let formController = formModule(projects);

    displayController.displayAllProjects(projects);
    formController.acceptProjectForm();
    formController.acceptTaskForm();
}

export {initializeApp};