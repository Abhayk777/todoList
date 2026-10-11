import { te } from "date-fns/locale";
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
const saveButton = document.getElementById("saveButton");
const projectStore = document.getElementById("projectStore")


const app = appManager();



let editingTodo = null;


const displayProject = () => {
    let i = 0;

    projectStore.textContent = "";

    app.getProjectList().forEach(p => {


        const projectDiv = document.createElement("div");
        projectDiv.classList.add(`project_no.${i}`);
        projectDiv.dataset.projectId = p.getId();
        projectDiv.textContent = p.getTitle();

        const deleteProject = document.createElement("button");
        deleteProject.classList.add("deleteProject");
        deleteProject.textContent = "Delete";
        if(p !== app.getDefaultProject()){
            projectDiv.append(deleteProject);
        }
    
        projectDiv.addEventListener("click", (e) => {
            
            const data = e.currentTarget.dataset.projectId
            
            app.setCurrentProject(data);

            addTodoForm.style.display = "flex";

            displayTodo();
        })

        deleteProject.addEventListener("click", (e) => {

            e.stopPropagation();

            let j = 0;

            app.getProjectList().forEach(d => {

            if(d.getId() == p.getId()){
                
                app.getProjectList().splice(j, 1);
            }
            
            j = j + 1;
            
            })

            displayProject();
            app.setCurrentProject(app.getDefaultProject().getId());
            displayTodo();

        })

        projectStore.appendChild(projectDiv);
        
        projectForm.style.display = "none";
        addProjectForm.style.display = "flex";

    })

    i = i + 1;      
}



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
        tCreateTime.classList.add("tCreatetime");
        tCreateTime.textContent ="created on-"+ t.getCreateTime();
        todoStore.appendChild(tCreateTime);

        const checkStatus = document.createElement("input")
        checkStatus.type = "checkbox";
        checkStatus.classList.add("checkStatus");
        checkStatus.value = t.getChecked();
        if (checkStatus.value == "true"){
            checkStatus.checked = true;
        }
        todoStore.appendChild(checkStatus);

        const tPriority = document.createElement("p");
        tPriority.classList.add("TPriority");
        tPriority.textContent = t.getPriority();
        todoStore.appendChild(tPriority);

        const tEdit = document.createElement("button");
        tEdit.classList.add("tEdit");
        tEdit.textContent = "Edit";
        todoStore.appendChild(tEdit)

        tEdit.addEventListener("click", ()  => {

            editingTodo = t;

            todoForm.style.display = "flex";

            todoTitle.value = t.getTitle();
            desc.value = t.getDesc();
            dueDate.value = t.getDueDate();
            priority.value = t.getPriority();
            saveButton.value = "Save";
            if (checkStatus.value == "true"){
                
                status.checked = true;
            
            }
            
        })

        const deleteTodo = document.createElement("button");
        deleteTodo.classList.add("deleteTodo");
        deleteTodo.textContent = "Delete";
        todoStore.appendChild(deleteTodo);

        deleteTodo.addEventListener("click", () => {

            let j = 0;

            app.getCurrentProject().getTodoList().forEach(d => {

                if(d.getId() == t.getId()){
                    app.getCurrentProject().getTodoList().splice(j, 1)
                }
                j = j + 1;
            })

            displayTodo()
        })

        content.appendChild(todoStore)
        
        i = i+1;
    })
}



addProjectForm.addEventListener("click", () => {
    addProjectForm.style.display = "none";
    projectForm.style.display = "flex";
})



projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const project = projectCreator(projectTitle.value);
    app.addProject(project);
    
    projectForm.reset();

    displayProject();
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

    const now = new Date();


    const options = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    };


    const formattedDateTime = new Intl.DateTimeFormat(undefined, options).format(now);
            
    if(editingTodo == null){
        const todo = todoCreator(todoTitle.value, desc.value, dueDate.value,  formattedDateTime , statusChecker(), priority.value);
        app.getCurrentProject().addTodo(todo);

        todoForm.style.display = "none";
        addTodoForm.style.display = "flex";
        displayTodo();

        todoForm.reset();
    }

    else{
        editingTodo.setTitle(todoTitle.value);
        editingTodo.setDesc(desc.value);
        editingTodo.setDueDate(dueDate.value);
        editingTodo.setChecked(statusChecker());
        editingTodo.setPriority(priority.value);

        saveButton.value = "Add";
        

        displayTodo();

        todoForm.style.display = "none";

        editingTodo = null;
    }
        
})



cancelTodo.addEventListener("click", () => {

    editingTodo = null;
    saveButton.value = "Add"

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

displayProject();