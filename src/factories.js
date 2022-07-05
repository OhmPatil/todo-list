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


export {todoFactory, projectFactory};