
export const getRelatedProjects = (allProjects, currentProject, limit = 3) => {
  if (!currentProject) return [];

  return allProjects
    .filter(
      (project) =>
        project.id !== currentProject.id &&
        (project.category === currentProject.category ||
          project.category.includes(currentProject.category) ||
          currentProject.category.includes(project.category))
    )
    .slice(0, limit);
};

export const getFeaturedProjects = (projects, limit = 3) => {
  return [...projects].sort((a, b) => b.progress - a.progress).slice(0, limit);
};

// Get recent projects
export const getRecentProjects = (projects, limit = 3) => {
  return [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};
