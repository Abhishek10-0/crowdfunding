import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import "./ProjectSection.css";

const ProjectSection = ({ title, description, projects, initialCount = 3 }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const displayedProjects = showAll
    ? projects
    : projects.slice(0, initialCount);

  return (
    <section className="project-section">
      <div className="project-section-container">
        <div className="section-header">
          <div className="header-content">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          {projects.length > initialCount && !showAll && (
            <button className="view-all-btn" onClick={() => setShowAll(true)}>
              View All
              <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>

        <div className="projects-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard
                project={project}
                isCompact={true}
                className="recent-project-card"
              />
              <div className="card-overlay">
                <div className="overlay-content">
                  <span className="new-tag">New</span>
                  <span className="time-added">
                    Added {getTimeAgo(project.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to format time ago
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};

export default ProjectSection;
