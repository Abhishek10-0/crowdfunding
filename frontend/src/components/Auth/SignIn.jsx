import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, isAuthenticated, user } = useAuth();
  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isAuthenticated ? (
          <>
            <div className="welcome-section">
              <h2>Welcome, {user?.name}!</h2>
              <button onClick={logout} className="logout-button">
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Sign In to Create Project</h2>
            <button onClick={login} className="login-button">
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
