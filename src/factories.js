const todoListFactory = (title, desc, dueDate, priority, isComplete) => {
    const changeStatus = function(){
        this.isComplete = !this.isComplete;
    }

    return {
        title,
        desc,
        dueDate,
        priority,
        isComplete,
        changeStatus
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


export {todoListFactory, projectFactory};