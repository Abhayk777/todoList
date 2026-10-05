export const projectCreator = (projectTitle) =>{

    let todoList = [];
    
    const getTitle = () => projectTitle;
    const getTodoList = () => todoList;

    const setTitle = (newTitle) => {projectTitle = newTitle};
    
    const addTodo = (todo) => {

        todoList.push(todo)
    }

    return {getTitle, setTitle, addTodo, getTodoList}
}
