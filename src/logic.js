import {projectFactory, todoFactory} from './factories.js';
import { formModule } from './form-control.js';
import {displayModule} from './renderDOM.js';

// Creating empty array to store projects
let projects = []

// Initializing display and form modules
let displayController = displayModule();
let formController = formModule(projects);

// Creating dummy projects and todos
let project1 = projectFactory('Project 1', 'This is project 1');
let project2 = projectFactory('Project 2', 'This is project 2');
let project3 = projectFactory('Project 3', 'This is project 3');
let todo1 = todoFactory('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = todoFactory('Learn React', 'Learn React', '2020-01-01', 'low', false);

// Adding dummy projects and todos to projects array/projects
projects.push(project1);
projects.push(project2);
projects.push(project3);

project1.addTodo(todo1);
project1.addTodo(todo2);
project2.addTodo(todo2);


// Main app running logic starts here
function initializeApp(){
    displayController.displayAllProjects(projects);
    formController.acceptProjectForm();
    formController.acceptTaskForm();

    displayController.displayTodos(project1, 0);
}

initializeApp();

// Exporting projects array for use in other modules
export {projects};