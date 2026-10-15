import { projectCreator } from "./project.manager.js";
import { todoCreator } from "./todo.manager.js";
export const appManager = () =>{

    const defaultProject = projectCreator("Inbox")

    let activeProject = defaultProject;
    let projectList = [];
    
    const localData = localStorage.getItem("project_todos");

    const parsedData = JSON.parse(localData)

    if(localData == null){
        projectList = [defaultProject];
    }
    else{
        parsedData.forEach(project => {
            const newProject = projectCreator(project.projectTitle, project.projectId);
            projectList.push(newProject);
            project.todos.forEach(t => {
                const todo = todoCreator(t.todoTitle, t.todoDescription, t.todoDueDate, t.todoCreatetime, t.todoStatus, t.todoPriority, t.todoId);
                newProject.addTodo(todo);
            });
            
        });

        activeProject = projectList[0];
    }
    
    const getProjectList = () => projectList;
    
    const addProject = (project) => {

        projectList.push(project) 
    }

    const getDefaultProject = () => projectList[0];

    const getCurrentProject = () => activeProject;
    const setCurrentProject = (id) => {
        projectList.forEach(p =>{
            if(p.getId() == id){
                activeProject = p;
            }
        })
    };
    const saveData = () => {
        const projectData = 
            projectList.map(project => {
                return {
                    
                    projectTitle : project.getTitle(),
                    projectId : project.getId(),
                    
                    todos : project.getTodoList().map(todo => {
                        return {
                            todoTitle : todo.getTitle(),
                            todoDescription : todo.getDesc(),
                            todoDueDate : todo.getDueDate(),
                            todoCreatetime : todo.getCreateTime(),
                            todoStatus : todo.getChecked(),
                            todoPriority : todo.getPriority(),
                            todoId : todo.getId()

                        };
                    })
                };
            })

            localStorage.setItem("project_todos", JSON.stringify(projectData));
    };

        return {getProjectList, addProject, getCurrentProject, getDefaultProject, setCurrentProject, saveData}
    }

