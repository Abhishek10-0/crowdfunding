import { useNavigate } from "react-router-dom";
import "./FeaturedProjectCard.css";

const FeaturedProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    navigate("/payment", { state: { project } });
  };

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  return (
    <div className="featured-project-card">
      <div className="featured-image">
        <img src={project.image} alt={project.name} />
        <div className="category-tag">
          <i className={project.icon}></i>
          {project.category}
        </div>
      </div>

      <div className="featured-content">
        <div className="featured-header">
          <h2>{project.name}</h2>
          <div className="time-remaining">
            <i className="fas fa-clock"></i>
            <span>{project.daysLeft} days left</span>
          </div>
        </div>

        <p className="featured-description">{project.description}</p>

        <div className="investment-stats">
          <div className="stat-item">
            <span className="stat-label">Raised</span>
            <span className="stat-value">£{project.raised}</span>
            <span className="stat-target">of £{project.target}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Investors</span>
            <span className="stat-value">{project.investors}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Min. Investment</span>
            <span className="stat-value">£{project.minInvestment}</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            >
              <span className="progress-tooltip">
                {project.progress}% Funded
              </span>
            </div>
          </div>
        </div>

        <div className="featured-actions">
          <button className="invest-now-btn" onClick={handleInvestClick}>
            <i className="fas fa-hand-holding-usd"></i>
            Invest Now
          </button>
          <button className="view-details-btn" onClick={handleViewDetails}>
            <i className="fas fa-info-circle"></i>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
