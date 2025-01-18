import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import Tooltip from "../common/Tooltip";
import "./Home.css";
import {
  getFeaturedProjects,
  getRecentProjects,
} from "../../utils/projectUtils";
import ProjectSection from "../common/ProjectSection";
import FeaturedProjectCard from "../common/FeaturedProjectCard";
// import SignIn from "../Signin/Signin";
import SignUp from "../Signup/Signup";

const Home = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();

  const featuredProjects = getFeaturedProjects(projects, 6);
  const recentProjects = getRecentProjects(projects, 6);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <Tooltip text="Discover amazing investment opportunities">
            <h1>Invest in the Future</h1>
          </Tooltip>
          <p>Discover and support innovative startups</p>
          <Tooltip text="Begin your investment journey">
            <button onClick={SignUp} className="cta-button">Start Investing</button>
          </Tooltip>
        </div>
      </section>

      <section className="featured-projects">
        <div className="section-header">
          <h2>Featured Opportunities</h2>
          <p>Top performing investment opportunities</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.slice(0, 3).map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <ProjectSection
        title="Recently Added"
        description="Latest investment opportunities"
        projects={recentProjects}
        initialCount={3}
      />
    </div>
  );
};

export default Home;
