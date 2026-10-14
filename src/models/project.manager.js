export const projectCreator = (projectTitle, id = crypto.randomUUID()) =>{

    let todoList = [];
    
    const getTitle = () => projectTitle;
    const getTodoList = () => todoList;
    const getId = () => id;

    const setTitle = (newTitle) => {projectTitle = newTitle};
    
    const addTodo = (todo) => {

        todoList.push(todo)
    }

    return {getTitle, getTodoList, getId, setTitle, addTodo}
}
