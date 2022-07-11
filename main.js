/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeApp": () => (/* binding */ initializeApp)
/* harmony export */ });
/* harmony import */ var _factories_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _form_control_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _renderDOM_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);





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
        let defaultProject = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)('Default Project', 'This is a project created by default');
        let defaultTodo1 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)('Default Todo', 'This is a todo created by default', '2022-01-01', 'low', false);
        let defaultTodo2 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)('Default Todo', 'This is a todo created by default', '2022-01-01', 'medium', false);
        let defaultTodo3 = (0,_factories_js__WEBPACK_IMPORTED_MODULE_0__.todoFactory)('Default Todo', 'This is a todo created by default', '2022-01-01', 'high', false);
        defaultProject.todos.push(defaultTodo1);
        defaultProject.todos.push(defaultTodo2);
        defaultProject.todos.push(defaultTodo3);
        projects.push(defaultProject);
    }

    // Initializing display and form modules
    let displayController = (0,_renderDOM_js__WEBPACK_IMPORTED_MODULE_2__.displayModule)(projects);
    let formController = (0,_form_control_js__WEBPACK_IMPORTED_MODULE_1__.formModule)(projects);

    displayController.displayAllProjects(projects);
    formController.acceptProjectForm();
    formController.acceptTaskForm();
}



/***/ }),
/* 2 */
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

    return {
        title,
        desc,
        todos,
    }
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formModule": () => (/* binding */ formModule)
/* harmony export */ });
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _renderDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




let displayController = (0,_renderDOM__WEBPACK_IMPORTED_MODULE_1__.displayModule)();

// Main form module
const formModule = (projects) => {
    
    let storageController = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.storageModule)(projects);

    // Accept form -> create project -> add project to projects array
    const acceptProjectForm = function(){
        document.getElementById('new-project-form').addEventListener('submit', function(e){
            e.preventDefault();

            // Getting form values
            const projectTitle = document.getElementById('form-project-title').value;
            const projectDesc = document.getElementById('form-project-desc').value;

            // Creating project and resetting form
            const project = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(projectTitle, projectDesc);
            document.getElementById('new-project-form').reset();
            console.log('project submitted');

            // Adding project to projects array
            addProjectToArray(project, projects);
            console.log('project added to array');
            // Updating local storage
            storageController.updateStorage();

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
            const task = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(taskTitle, taskDesc, taskDate, taskPriority, false);
            projects[id].todos.push(task);
            console.log('task submitted');

            // Updating local storage
            storageController.updateStorage();

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




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayModule": () => (/* binding */ displayModule)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


// Main display module
const displayModule = (projects) =>{

    let storageController = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.storageModule)(projects);
    
    // Function to create and display ONE project
    const displayProject = (project, id) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('delete-project');
        // deleteDiv.textContent = 'X';
        projectDiv.appendChild(deleteDiv);

        // Assigning unique data-id to each project and delete button
        deleteDiv.dataset.id = id;
        projectDiv.dataset.id = id;
        
        // Logic for displaying todos
        projectDiv.addEventListener('click', function(){
            console.log('clicked');
            displayTodos(project, id);
        })

        // Finally appending project to DOM
        document.querySelector('.projects-container').appendChild(projectDiv);
    }

    // Function to create and display Add Project button
    const displayAddProjectButton = () => {
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add Project';
        addProjectButton.classList.add('add-project-button');

        // Adding event listeners to button to open/close popup
        addProjectButton.addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "flex";
        });
        document.querySelector('.close-project').addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "none";
        });
            
        // Finally appending button to DOM
        document.querySelector('.projects-container').appendChild(addProjectButton);
    }

    // Function to create and display AddTask button
    const displayAddTaskButton = (id) => {
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('add-task-button');

        // Assigning unique data-id to each button, same id as project
        addTaskButton.dataset.id = id;

        // Adding event listeners to button to open/close popup
        addTaskButton.addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "flex";
            
        });
        document.querySelector('.close-task').addEventListener("click", function() {
            document.querySelector('.task-popup').style.display = "none";
        });

        // Finally appending button to DOM
        document.querySelector('.tasks-container').appendChild(addTaskButton);
    }

    // Function to display ALL projects in array with unique data-id
    const displayAllProjects = (projects) => {
        document.querySelector('.projects-container').replaceChildren();

        let id = 0;
        projects.forEach(project => {
            displayProject(project, id);
            id++;
        })

        // Displaying add project button after all projects are displayed
        displayAddProjectButton();

        // Listening for click on delete button to delete project
        deleteProjectListener(projects);
    }

    // Function to display all todos of one project
    const displayTodos = function(project, id){
        document.querySelector('.tasks-container').replaceChildren();
        
        // Display project title and desc on right side
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-desc').textContent = project.desc;

        // Appending each todo to dom
        const todos = project.todos;

        let todo_id = 0;
        todos.forEach(todo => {

            // Creating todo div and assigning color based on priority
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            if (todo.priority === 'high') todoDiv.classList.add('high')
            if (todo.priority === 'medium') todoDiv.classList.add('medium')
            if (todo.priority === 'low') todoDiv.classList.add('low')

            // Creating checkbox div witin todo div
            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('checkbox-div');
            checkboxDiv.dataset.todo_id = todo_id;
            if (todo.isComplete === true) {
                checkboxDiv.classList.add('completed');
            }
            todoDiv.appendChild(checkboxDiv);

            // Todo title
            const todoTitle = document.createElement('h3');
            todoTitle.textContent = `${todo.title}`;
            todoDiv.appendChild(todoTitle);
            
            // Todo due date
            const todoDueDate = document.createElement('p');
            todoDueDate.textContent = `${todo.dueDate}`;
            todoDiv.appendChild(todoDueDate);

            // Todo delete button
            const deleteDiv = document.createElement('div');
            deleteDiv.classList.add('delete-div');
            deleteDiv.dataset.todo_id = todo_id;
            todoDiv.appendChild(deleteDiv);

            // Assigning unique data-id to each todo and adding to DOM
            todoDiv.dataset.todo_id = todo_id;
            document.querySelector('.tasks-container').appendChild(todoDiv);

            todo_id++;
        })

        // Displaying add task button after all todos are displayed
        displayAddTaskButton(id);

        // Event listener function for checkbox
        checkboxListener(project);

        // Event listener function for delete button
        deleteTodoListener(project);
    }

    // Function to listen for checkbox button clicks
    const checkboxListener = (project) => {
        const allCheckboxes = document.querySelectorAll('.checkbox-div');
        allCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', function(){
                let checkboxID = checkbox.dataset.todo_id;
                console.log('checkbox clicked');
                project.todos[checkboxID].isComplete = !project.todos[checkboxID].isComplete;

                // Updating local storage
                storageController.updateStorage(projects);

                displayTodos(project, checkboxID);

                if (project.todos[checkboxID].isComplete === true){
                    checkbox.classList.add('completed');
                }
                else{
                    checkbox.classList.remove('completed');
                }
            })
        })
    }

    // Function to listen for delete button clicks
    const deleteTodoListener = (project) => {
        const allDeleteButtons = document.querySelectorAll('.delete-div');
        allDeleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function(){
                console.log('delete clicked');
                let deleteID = deleteButton.dataset.todo_id;
                project.todos.splice(deleteID, 1);

                // Updating local storage
                storageController.updateStorage(projects);
                
                displayTodos(project, deleteID);
                console.log('todo deleted');
            })
    })
}
    // Function to listen for delete project button clicks
    const deleteProjectListener = (projects) => {
        const allDeleteButtons = document.querySelectorAll('.delete-project');
        allDeleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function(){
                console.log('delete clicked');
                let deleteID = deleteButton.dataset.id;
                projects.splice(deleteID, 1);

                // Updating local storage
                storageController.updateStorage(projects);

                displayAllProjects(projects);
                console.log('project deleted');
            })
        })
    }
    
    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects,
        displayTodos,
    }
}




/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storageModule": () => (/* binding */ storageModule)
/* harmony export */ });
const storageModule = (projects) => {
    const updateStorage = function(){
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return{
        updateStorage,
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
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


(0,_logic__WEBPACK_IMPORTED_MODULE_0__.initializeApp)();
})();

/******/ })()
;