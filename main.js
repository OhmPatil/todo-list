/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "todoFactory": () => (/* binding */ todoFactory)
/* harmony export */ });
const todoFactory = (title, desc, dueDate, priority, isComplete) => {
    const changeStatus = function(){
        this.isComplete = !this.isComplete;
    }

    const changePriority = function(newPriority){
        this.priority = newPriority;
    }

    const edit = function(newTitle, newDesc, newDueDate){
        this.title = newTitle;
        this.desc = newDesc;
        this.dueDate = newDueDate;
    }

    return {
        title,
        desc,
        dueDate,
        priority,
        isComplete,
        changeStatus,
        changePriority,
        edit
    }
}

const projectFactory = (title, desc) => {
    let todos = []
    const addTodo = function(todo){
        todos.push(todo);
    }
    return {
        title,
        desc,
        todos,
        addTodo
    }
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formModule": () => (/* binding */ formModule)
/* harmony export */ });
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _renderDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



let displayController = (0,_renderDOM__WEBPACK_IMPORTED_MODULE_1__.displayModule)();

let formModule = (projects) => {
    const acceptProjectForm = function(){
        document.getElementById('new-project-form').addEventListener('submit', function(e){
            e.preventDefault();
            const projectTitle = document.getElementById('form-project-title').value;
            const projectDesc = document.getElementById('form-project-desc').value;
            const project = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(projectTitle, projectDesc);
            document.getElementById('new-project-form').reset();
            console.log('project submitted');
            addProjectToArray(project, projects);
            console.log('project added to array');

            document.querySelector('.project-popup').style.display = "none";   
        })
    }

    const addProjectToArray = function(project, array){
        array.push(project);
        displayController.displayAllProjects(array);
    }

    // const acceptTaskForm = function(project){
    //     document.getElementById('task-submit-button').addEventListener('click', function(e){
    //         e.preventDefault();
    //         const taskTitle = document.getElementById('form-task-title').value;
    //         const taskDesc = document.getElementById('form-task-desc').value;
    //         // const taskDate = document.getElementById('form-task-date').value;
    //         // const taskPriority = document.getElementById('form-task-priority').value;
    //         // const taskCompleted = document.getElementById('form-task-completed').checked;
    //         const task = todoFactory(taskTitle, taskDesc, '2020-01-01', 'low', false);
    //         document.getElementById('new-task-form').reset();
    //         console.log('task submitted');
    //         addTaskToProject(task, project);
    //         console.log('task added to array');

    //         document.querySelector('.task-popup').style.display = "none";   
    //     })
    // }

    // const addTaskToProject = function(task, project){
    //     project.addTodo(task);
    //     console.log(project.todos);
    // }

    return {
        acceptProjectForm,
        addProjectToArray,
        // acceptTaskForm,
    }
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayModule": () => (/* binding */ displayModule)
/* harmony export */ });
/* harmony import */ var _form_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



let displayModule = () =>{

    const displayProject = (project, id) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);

        projectDiv.dataset.id = id;
        
        projectDiv.addEventListener('click', function(){
            console.log('clicked');
            displayTodos(project, id);
            // displayAddTaskButton(id);
        })
        document.querySelector('.projects-container').appendChild(projectDiv);
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

    const displayAddTaskButton = (id) => {
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('add-task-button');

        addTaskButton.dataset.id = id;

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

        let id = 0;
        projects.forEach(project => {
            displayProject(project, id);
            id++;
        })
        displayAddProjectButton();
    }

    const displayTodos = function(project, id){
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
        displayAddTaskButton(id);
    }
    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects,
        displayTodos,
    }
}




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _factories_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _form_control_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _renderDOM_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




let projects = []
let displayController = (0,_renderDOM_js__WEBPACK_IMPORTED_MODULE_2__.displayModule)();
let formController = (0,_form_control_js__WEBPACK_IMPORTED_MODULE_1__.formModule)(projects);

let project1 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Project 1', 'This is project 1');
let project2 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Project 2', 'This is project 2');
let project3 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Project 3', 'This is project 3');
let todo1 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)('Learn React', 'Learn React', '2020-01-01', 'low', false);
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
        const task = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(taskTitle, taskDesc, '2020-01-01', 'low', false);
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

})();

/******/ })()
;