import { storageModule } from "./storage";

// Main display module
const displayModule = (projects) =>{

    let storageController = storageModule(projects);
    
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


export {displayModule};