const displayModule = () =>{
    const displayProject = (project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = `${project.title}`;
        projectDiv.appendChild(projectTitle);
        document.querySelector('.projects-container').appendChild(projectDiv);
    }

    const displayAddProjectButton = () => {
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add Project';
        addProjectButton.classList.add('add-project-button');
        document.querySelector('.projects-container').appendChild(addProjectButton);
    }

    const displayAllProjects = (projects) => {
        projects.forEach(project => {
            displayProject(project);
        })
        displayAddProjectButton();
    }

    return {
        displayProject,
        displayAddProjectButton,
        displayAllProjects
    }
}


export {displayModule};