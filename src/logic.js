import {projectFactory, todoFactory} from './factories.js';
import { formModule } from './form-control.js';
import {displayModule} from './renderDOM.js';

let projects = []
let displayController = displayModule();
let formController = formModule(projects);

let project1 = projectFactory('Project 1', 'This is project 1');
let project2 = projectFactory('Project 2', 'This is project 2');
let project3 = projectFactory('Project 3', 'This is project 3');
let todo1 = todoFactory('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = todoFactory('Learn React', 'Learn React', '2020-01-01', 'low', false);
projects.push(project1);
projects.push(project2);
projects.push(project3);

project1.addTodo(todo1);
project2.addTodo(todo2);



function initializeApp(){
    displayController.displayAllProjects(projects);
    formController.acceptProjectForm();
    // console.log(projects);
    document.getElementById('new-task-form').addEventListener('submit', function(e){
        e.preventDefault();
        let id = document.querySelector('.add-task-button').dataset.id;
        const taskTitle = document.getElementById('form-task-title').value;
        const taskDesc = document.getElementById('form-task-desc').value;
        const task = todoFactory(taskTitle, taskDesc, '2020-01-01', 'low', false);
        // projects[id].todos.push(task);
        projects[id].addTodo(task);
        // displayController.displayAllProjects(projects);
        displayController.displayTodos(projects[id], id);
        console.log(projects[id].todos);
        document.getElementById('new-task-form').reset();
        document.querySelector('.task-popup').style.display = "none";
        console.log('task submitted');
    })
}

initializeApp();
export {projects};