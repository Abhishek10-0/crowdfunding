import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const { updateProjectProgress } = useProjects();

  const [paymentDetails, setPaymentDetails] = useState({
    amount: project?.minInvestment || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  if (!project) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <h2>No project selected</h2>
          <button className="cancel-button" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update project progress
    updateProjectProgress(project.id, parseFloat(paymentDetails.amount));

    // Show success message
    alert(`Successfully invested £${paymentDetails.amount} in ${project.name}`);

    // Navigate back to home
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="project-details-section">
          <div className="project-header">
            <img
              src={project.image}
              alt={project.name}
              className="project-image"
            />
            <div className="project-title">
              <h2>{project.name}</h2>
              <span className="project-category">{project.category}</span>
            </div>
          </div>

          <div className="project-metrics">
            <div className="metric-card">
              <div className="metric-value">£{project.raised}</div>
              <div className="metric-label">Raised</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">£{project.target}</div>
              <div className="metric-label">Target</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{project.investors || 127}</div>
              <div className="metric-label">Investors</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{project.daysLeft}</div>
              <div className="metric-label">Days Left</div>
            </div>
          </div>

          <div className="funding-status">
            <div className="progress-header">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="investment-terms">
            <h3>Investment Terms</h3>
            <div className="terms-grid">
              <div className="term-item">
                <span className="term-label">Minimum Investment</span>
                <span className="term-value">£{project.minInvestment}</span>
              </div>
              <div className="term-item">
                <span className="term-label">Equity Offered</span>
                <span className="term-value">{project.equity || "10%"}</span>
              </div>
              <div className="term-item">
                <span className="term-label">Valuation</span>
                <span className="term-value">£{project.valuation || "3M"}</span>
              </div>
              <div className="term-item">
                <span className="term-label">Share Price</span>
                <span className="term-value">
                  £{project.sharePrice || "100"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Investment Details</h3>
          <div className="form-group">
            <label htmlFor="amount">Investment Amount (£)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleInputChange}
              min={project.minInvestment}
              required
            />
            <span className="min-investment">
              Minimum investment: £{project.minInvestment}
            </span>
          </div>

          <h3>Payment Information</h3>
          <div className="form-group">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Complete Investment
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
