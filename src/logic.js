import {projectFactory, todoFactory} from './factories.js';
import { formModule } from './form-control.js';
import {displayModule} from './renderDOM.js';

let projects = []
let todo = todoFactory('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = todoFactory('Learn React', 'Learn React', '2020-01-01', 'low', false);
let project = projectFactory('Project 1', 'Project 1');
let project2 = projectFactory('Project 2', 'Project 2');
project.addTodo(todo);
project.addTodo(todo2);
project2.addTodo(todo2)
// projects.push(project);
// projects.push(project2);

let displayController = displayModule();
let formControllerModule = formModule(projects);

displayController.displayAllProjects(projects);

formControllerModule.acceptProjectForm();
formControllerModule.addProjectToArray(project, projects);
formControllerModule.addProjectToArray(project2, projects);
// console.log(projects);