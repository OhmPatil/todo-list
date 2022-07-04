import {projectFactory, todoListFactory} from './factories.js';
import {displayModule} from './renderDOM.js';

let projects = []
let todo = todoListFactory('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = todoListFactory('Learn React', 'Learn React', '2020-01-01', 'low', false);
let project = projectFactory('Project 1', 'Project 1');
let project2 = projectFactory('Project 2', 'Project 2');
project.addTodo(todo);
project.addTodo(todo2);
console.log(todo.priority, todo.title, todo.desc, todo.dueDate); 
todo.changePriority('medium');
todo.edit('edited', 'edited', '123123123');
console.log(todo.priority, todo.title, todo.desc, todo.dueDate); 
projects.push(project);
projects.push(project2);

let displayController = displayModule();

projects.forEach(project => {
    displayController.displayProject(project);
});
    