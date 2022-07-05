const displayModule = () =>{
    const displayProject = (project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);
        
        projectDiv.addEventListener('click', function(){
            console.log('clicked');
            displayTodos(project);
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
        document.querySelector('.close').addEventListener("click", function() {
            document.querySelector('.project-popup').style.display = "none";
        });
            
        document.querySelector('.projects-container').appendChild(addProjectButton);
    }

    const displayAllProjects = (projects) => {
        document.querySelector('.projects-container').replaceChildren();

        projects.forEach(project => {
            displayProject(project);
        })
        displayAddProjectButton();
    }

    const displayTodos = function(project){
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
        

    }

    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects,
        displayTodos,
    }
}


export {displayModule};