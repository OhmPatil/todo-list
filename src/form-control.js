import { projectFactory, todoFactory } from "./factories";
import { displayModule } from "./renderDOM";

let displayController = displayModule();

let formModule = (projects) => {
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

export {formModule};
