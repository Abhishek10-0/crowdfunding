import "./WhyInvestSection.css";

const WhyInvestSection = () => {
  return (
    <section className="why-invest-section">
      <div className="about-content">
        <h2>Why Invest With Us</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-chart-line"></i>
            <h3>High Growth Potential</h3>
            <p>Access carefully vetted investment opportunities</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Platform</h3>
            <p>Your investments are protected and regulated</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-hand-holding-usd"></i>
            <h3>Low Minimum Investment</h3>
            <p>Start investing with as little as $100</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvestSection;
