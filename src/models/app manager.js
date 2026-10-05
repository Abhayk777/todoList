import { projectCreator } from "./project manager";
export const appManager = () =>{

    let activeProject = projectCreator("INBOX");
    let projectList = [activeProject];
    
    
    const getProjectList = () => projectList;
    
    const addProject = (project) => {

        projectList.push(project) 
    }

    const getCurrentProject = () => activeProject;
    const setCurrentProject = (project) => {activeProject = project};

    return {getProjectList, addProject, getCurrentProject, setCurrentProject}
}
