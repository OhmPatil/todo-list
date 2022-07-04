import {projectFactory, todoListFactory} from './factories.js';

let todo = todoListFactory('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = todoListFactory('Learn React', 'Learn React', '2020-01-01', 'low', false);
let project = projectFactory('Project 1', 'Project 1');
project.addTodo(todo);
project.addTodo(todo2);
console.log(project.todos);