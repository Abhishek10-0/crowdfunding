import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/");
  };

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-content">
          <h1>Empowering Innovation Through Community</h1>
          <p>
            Connecting visionary entrepreneurs with passionate investors to
            build a better future together.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At CrowdFund, we believe in the power of collective funding to
              bring revolutionary ideas to life. Our platform bridges the gap
              between innovative startups and investors who want to be part of
              the next big thing.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>£50M+</h3>
              <p>Total Raised</p>
            </div>
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Successful Projects</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Active Investors</p>
            </div>
            <div className="stat-card">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose CrowdFund</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Secure & Regulated</h3>
              <p>
                FCA regulated platform with bank-level security to protect your
                investments.
              </p>
            </div>
            <div className="feature-card">
              <i className="fas fa-hand-holding-usd"></i>
              <h3>Low Minimum Investment</h3>
              <p>
                Start your investment journey with as little as £100 and build
                your portfolio.
              </p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Curated Opportunities</h3>
              <p>
                Carefully vetted startups with high growth potential and
                innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                alt="CEO"
              />
              <h3>John Smith</h3>
              <p className="position">CEO & Founder</p>
              <p className="bio">
                15+ years experience in fintech and investment banking.
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="CTO"
              />
              <h3>Sarah Johnson</h3>
              <p className="position">CTO</p>
              <p className="bio">
                Former tech lead at major financial institutions.
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                alt="COO"
              />
              <h3>Michael Chen</h3>
              <p className="position">COO</p>
              <p className="bio">
                Expertise in operations and business development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Investing?</h2>
            <p>Join thousands of investors building their portfolio with us.</p>
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
