import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ project, isCompact = false }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    navigate("/payment", { state: { project } });
  };

  return (
    <div className={`project-card ${isCompact ? "compact" : ""}`}>
      <div className="card-header">
        <div className="project-image">
          <img src={project.image} alt={project.name} />
          <div className="category-badge">
            <i className={project.icon}></i>
            {project.category}
          </div>
        </div>
        <h3 className="project-title">{project.name}</h3>
      </div>

      <div className="card-content">
        {!isCompact && (
          <p className="description">
            {project.description || "Revolutionizing the industry"}
          </p>
        )}

        <div className="project-stats">
          <div className="stats-row">
            <div className="stat">
              <span className="stat-label">Raised</span>
              <span className="stat-value">£{project.raised}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Target</span>
              <span className="stat-value">£{project.target}</span>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            >
              <span className="progress-tooltip">
                {project.progress}% funded
              </span>
            </div>
          </div>

          <div className="stats-footer">
            <span className="investors">
              <i className="fas fa-users"></i>
              {project.investors} investors
            </span>
            <span className="days-left">
              <i className="fas fa-clock"></i>
              {project.daysLeft} days left
            </span>
          </div>
        </div>

        {!isCompact && (
          <button className="invest-button" onClick={handleInvestClick}>
            Invest Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
