import { useNavigate } from "react-router-dom";
import "./JoinCommunitySection.css";

const JoinCommunitySection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/about");
  };

  return (
    <section className="join-community-section">
      <div className="video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-business-team-meeting-in-an-office-4819-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-content">
          <h2>Join Our Investment Community</h2>
          <p>Be part of the next big innovation</p>
          <button className="video-cta" onClick={handleGetStarted}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;
