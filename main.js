/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "todoListFactory": () => (/* binding */ todoListFactory)
/* harmony export */ });
const todoListFactory = (title, desc, dueDate, priority, isComplete) => {
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
    let todos = [];
    const addTodo = function(todo){
        this.todos.push(todo);
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
/* harmony export */   "displayModule": () => (/* binding */ displayModule)
/* harmony export */ });
const displayModule = () =>{
    const displayProject = (project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);
        document.querySelector('.projects-container').appendChild(projectDiv);
}
    return {
        displayProject
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
/* harmony import */ var _factories_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _renderDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



let projects = []
let todo = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoListFactory)('Learn JavaScript', 'Learn JavaScript', '2020-01-01', 'low', false);
let todo2 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoListFactory)('Learn React', 'Learn React', '2020-01-01', 'low', false);
let project = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Project 1', 'Project 1');
let project2 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Project 2', 'Project 2');
project.addTodo(todo);
project.addTodo(todo2);
console.log(todo.priority, todo.title, todo.desc, todo.dueDate); 
todo.changePriority('medium');
todo.edit('edited', 'edited', '123123123');
console.log(todo.priority, todo.title, todo.desc, todo.dueDate); 
projects.push(project);
projects.push(project2);

let displayController = (0,_renderDOM_js__WEBPACK_IMPORTED_MODULE_1__.displayModule)();

projects.forEach(project => {
    displayController.displayProject(project);
});
    
})();

/******/ })()
;