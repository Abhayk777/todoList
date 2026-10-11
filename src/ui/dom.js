import { appManager } from "../models/app manager.js";
import { projectCreator } from "../models/project manager.js";
import { todoCreator } from "../models/todo manager.js";

const container = document.getElementById("container");
const sideNav = document.getElementById("sideNav");
const content = document.getElementById("content");
const addProjectForm = document.getElementById("addProjectForm")
const addTodoForm = document.getElementById("addTodoForm")
const todoForm = document.getElementById("todo");
const projectForm = document.getElementById("project")
const projectTitle = document.getElementById("projectTitle");
const todoTitle = document.getElementById("todoTitle");
const desc = document.getElementById("desc");
const dueDate = document.getElementById("dueDate");
const status = document.getElementById("status");
const priority = document.getElementById("priority");
const cancelTodo = document.getElementById("cancelTodo");
const cancelProject = document.getElementById("cancelProject");
const defaultProject = document.getElementById("defaultProject");


const app = appManager();



const displayTodo = () => {
    
    let i = 0;
    
    content.textContent = "";
    
    app.getCurrentProject().getTodoList().forEach(t => {
            const todoStore = document.createElement("div");
            todoStore.classList.add(`todo_no.${i}`)
            todoStore.dataset.projectId = t.getId();
            
            const tTitle =  document.createElement("p");
            tTitle.classList.add("tTitle");
            tTitle.textContent = t.getTitle();
            todoStore.appendChild(tTitle);
            
            const tDescription =  document.createElement("p");
            tDescription.classList.add("tDescription");
            tDescription.textContent = t.getDesc();
            todoStore.appendChild(tDescription);
            
            const tDueDate =  document.createElement("p");
            tDueDate.classList.add("tDueDate");
            tDueDate.textContent = t.getDueDate();
            todoStore.appendChild(tDueDate);
            
            const tCreateTime =  document.createElement("p");
            tCreateTime.classList.add("tTitle");
            tCreateTime.textContent = t.getCreateTime();
            todoStore.appendChild(tCreateTime);

            const checkStatus = document.createElement("input")
            checkStatus.type = "checkbox";
            checkStatus.classList.add("checkStatus");
            checkStatus.value = t.getChecked();
            todoStore.appendChild(checkStatus);

            const tPriority = document.createElement("p");
            tPriority.classList.add("TPriority");
            tPriority.textContent = t.getPriority();
            todoStore.appendChild(tPriority);

            content.appendChild(todoStore)
            
            i = i+1;
    })
}



defaultProject.textContent = app.getCurrentProject().getTitle()
defaultProject.dataset.projectId = app.getCurrentProject().getId();
defaultProject.addEventListener("click", (e) => {
    
    const data = e.currentTarget.dataset.projectId
    app.setCurrentProject(data);

    addTodoForm.style.display = "flex";
    
    displayTodo();
})



addProjectForm.addEventListener("click", () => {
    addProjectForm.style.display = "none";
    projectForm.style.display = "flex";
})



projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const project = projectCreator(projectTitle.value);
    app.addProject(project);
    
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
   
    projectDiv.addEventListener("click", (e) => {
        
        const data = e.currentTarget.dataset.projectId
        
        app.setCurrentProject(data);

        addTodoForm.style.display = "flex";

        displayTodo();
    })
    
    projectDiv.dataset.projectId = project.getId();
    projectDiv.textContent = project.getTitle();
    document.getElementById("projectStore").appendChild(projectDiv);
    
    projectForm.style.display = "none";
    addProjectForm.style.display = "flex";

    projectForm.reset();
})



cancelProject.addEventListener("click", () => {

    projectForm.style.display = "none";
    addProjectForm.style.display = "flex";

    projectForm.reset();
})



addTodoForm.addEventListener("click", () => {
    addTodoForm.style.display = "none";
    todoForm.style.display = "flex";
})



todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
            
    const todo = todoCreator(todoTitle.value, desc.value, dueDate.value, statusChecker(), priority.value);
    app.getCurrentProject().addTodo(todo);

    todoForm.style.display = "none";
    addTodoForm.style.display = "flex";
    displayTodo();

    todoForm.reset();
        
})



cancelTodo.addEventListener("click", () => {

    todoForm.style.display = "none";
    addTodoForm.style.display = "flex";

    todoForm.reset();
})



const statusChecker = () => {
    if(status.checked){
        return true
    }else{
        return false
    }
}