const storageModule = (projects) => {
    const updateStorage = function(){
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return{
        updateStorage,
    }
}

export {storageModule};