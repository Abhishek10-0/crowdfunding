import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import ProjectSection from "../common/ProjectSection";
import ProjectCard from "../common/ProjectCard";
import "./Categories.css";

const Categories = () => {
  const { category } = useParams();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

 
  const categoryProjects = projects.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );

  const categoryStats = categoryProjects.reduce(
    (acc, project) => {
      acc.totalRaised += parseFloat(project.raised.replace(/[^0-9.-]+/g, ""));
      acc.totalInvestors += project.investors || 0;
      acc.averageProgress += project.progress;
      return acc;
    },
    { totalRaised: 0, totalInvestors: 0, averageProgress: 0 }
  );

  if (categoryProjects.length > 0) {
    categoryStats.averageProgress /= categoryProjects.length;
  }

  const filteredProjects = categoryProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="categories-page">
    
      <div className="category-overview">
        <h1>{category} Projects</h1>
        <div className="category-stats">
          <div className="stat-card">
            <h3>£{categoryStats.totalRaised.toLocaleString()}</h3>
            <p>Total Raised</p>
          </div>
          <div className="stat-card">
            <h3>{categoryProjects.length}</h3>
            <p>Active Projects</p>
          </div>
          <div className="stat-card">
            <h3>{categoryStats.totalInvestors.toLocaleString()}</h3>
            <p>Total Investors</p>
          </div>
          <div className="stat-card">
            <h3>{categoryStats.averageProgress.toFixed(1)}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>

    
      <div className="category-search">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder={`Search ${category} projects...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

    
      <div className="projects-section">
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
