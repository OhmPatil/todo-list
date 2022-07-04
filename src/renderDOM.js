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


export {displayModule};