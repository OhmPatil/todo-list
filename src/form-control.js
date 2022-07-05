import { projectFactory } from "./factories";
import { displayModule } from "./renderDOM";

let displayController = displayModule();

const formModule = (projects) => {
    const acceptProjectForm = function(){
        document.getElementById('new-project-form').addEventListener('submit', function(e){
            e.preventDefault();
            const projectTitle = document.getElementById('form-project-title').value;
            const projectDesc = document.getElementById('form-project-desc').value;
            const project = projectFactory(projectTitle, projectDesc);
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

    return {
        acceptProjectForm,
        addProjectToArray,
    }
}

export {formModule};
