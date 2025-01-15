import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../common/ConfirmDialog";
import "./Nav.css";
import { categories } from "../../config/categories";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleCategorySelect = async (category) => {
    setIsLoading(true);
    try {
      setSelectedCategory(category.name);
      setIsDropdownOpen(false);
      await navigate(`/category/${category.name.toLowerCase()}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOutClick = (e) => {
    e.preventDefault();
    setShowSignOutDialog(true);
  };

  const handleConfirmSignOut = () => {
    logout();
    setShowSignOutDialog(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            CrowdFund
          </Link>
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search fundraisers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`nav-item dropdown-trigger ${
                selectedCategory ? "active" : ""
              }`}
            >
              {selectedCategory || "Categories"}{" "}
              <i className="fas fa-chevron-down"></i>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {isLoading ? (
                  <div className="dropdown-loading">
                    <i className="fas fa-spinner"></i>
                    Loading categories...
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.name} className="category-group">
                      <div
                        className="category-main"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <i className={category.icon}></i>
                        <span>{category.name}</span>
                      </div>
                      <div className="subcategories">
                        {category.subcategories.map((sub) => (
                          <div
                            key={sub}
                            className="subcategory"
                            onClick={() => handleCategorySelect({ name: sub })}
                          >
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <Link
            to="/about"
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-project"
                  className="nav-item create-project-btn"
                >
                  <i className="fas fa-plus"></i> Create Project
                </Link>
                <button
                  className="nav-item sign-out-btn"
                  onClick={handleSignOutClick}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={login} className="nav-item sign-in-btn">
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <ConfirmDialog
        isOpen={showSignOutDialog}
        message="Are you sure you want to sign out?"
        onConfirm={handleConfirmSignOut}
        onCancel={() => setShowSignOutDialog(false)}
      />
    </>
  );
};

export default Nav;
