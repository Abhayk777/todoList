import { projectCreator } from "./project manager.js";
export const appManager = () =>{

    const defaultProject = projectCreator("INBOX")

    let activeProject = defaultProject;
    let projectList = [defaultProject];
    
    
    const getProjectList = () => projectList;
    
    const addProject = (project) => {

        projectList.push(project) 
    }

    const getDefaultProject = () => defaultProject;

    const getCurrentProject = () => activeProject;
    const setCurrentProject = (id) => {
        projectList.forEach(p =>{
            if(p.getId() == id){
                activeProject = p;
            }
        })
    };

    return {getProjectList, addProject, getCurrentProject, getDefaultProject, setCurrentProject}
}
