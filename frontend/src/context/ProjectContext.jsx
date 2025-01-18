import { createContext, useContext, useState, useEffect } from "react";
import { categories } from "../config/categories";
import { defaultProjects } from "../data/defaultProjects";

const ProjectContext = createContext();

const STORAGE_KEY = "crowdfund_projects";

export const ProjectProvider = ({ children }) => {
 
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
   
    let imageUrl = project.image;
    if (project.image instanceof File) {
    
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const newProject = {
          ...project,
          id: `custom-${Date.now()}`,
          progress: 0,
          investors: 0,
          raised: "0",
          createdAt: new Date().toISOString(),
          image: base64String,
        };

        setProjects((prevProjects) => [newProject, ...prevProjects]);
      };
      reader.readAsDataURL(project.image);
    } else {
    
      const newProject = {
        ...project,
        id: `custom-${Date.now()}`,
        progress: 0,
        investors: 0,
        raised: "0",
        createdAt: new Date().toISOString(),
        image: imageUrl,
      };

      setProjects((prevProjects) => [newProject, ...prevProjects]);
    }
  };

  const value = {
    projects,
    addProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
