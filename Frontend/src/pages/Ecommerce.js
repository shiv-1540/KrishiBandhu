import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { FaLeaf, FaTractor, FaStore, FaUserTie, FaShoppingCart, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import "./Ecommerce.css"; // Create this CSS file

const Ecommerce = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Krishi-Bandhu...</p>
      </div>
    );
  }

  return (
    <div className="py-1 ecommerce-container">
      {/* Authentication Modals */}
      {!isAuthenticated && showLogin && (
        <Login 
          onLogin={handleLogin} 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
      {!isAuthenticated && showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={() => {
            setShowLogin(true);
            setShowSignup(false);
          }}
        />
      )}

      {/* Main Content */}
      {!isAuthenticated ? (
        <div className="auth-container">
          <div className="auth-header">
            <FaLeaf className="logo-icon" />
            <h2>Welcome to Krishi-Bandhu Marketplace</h2>
            <p>Connect with farmers and businesses for sustainable agriculture</p>
          </div>
          <div className="auth-buttons">
            <button 
              onClick={() => setShowLogin(true)} 
              className="auth-button login-button"
            >
              <FaSignInAlt /> Login
            </button>
            <button 
              onClick={() => setShowSignup(true)} 
              className="auth-button signup-button"
            >
              <FaUserPlus /> Sign Up
            </button>
          </div>
          <div className="auth-features">
            <div className="feature-item">
              <FaTractor />
              <span>Buy/Sell Farming Equipment</span>
            </div>
            <div className="feature-item">
              <FaStore />
              <span>Direct Market Access</span>
            </div>
            <div className="feature-item">
              <FaUserTie />
              <span>Business Partnerships</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="hero-section">
            <div className="hero-content">
              <FaLeaf className="hero-icon" />
              <h1>Welcome to Krishi-Bandhu</h1>
              <p>Connecting Farmers, Businesses & Consumers for a Sustainable Future</p>
              <div className="hero-buttons">
                <Link to="/ecommerce" className="marketplace-button">
                  <FaShoppingCart /> Explore Marketplace
                </Link>
                <button onClick={handleLogout} className="logout-button1">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section className="features-section">
            <h2><FaLeaf /> How Krishi-Bandhu Helps You?</h2>
            <div className="features-grid">
              <div
                className={`feature-card ${hoveredCard === 1 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-icon">
                  <FaUserTie />
                </div>
                <h3>Farmer to Farmer</h3>
                <p>Rent or sell farming tools & equipment within the community</p>
                <Link to="/farmer-tools" className="card-button">
                  Explore Options
                </Link>
              </div>

              <div
                className={`feature-card ${hoveredCard === 2 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-icon">
                  <FaTractor />
                </div>
                <h3>Farmer to Business</h3>
                <p>Sell your crops directly to businesses at fair prices</p>
                <Link to="/farmer-to-business" className="card-button">
                  Sell Your Crops
                </Link>
              </div>

              <div
                className={`feature-card ${hoveredCard === 3 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-icon">
                  <FaStore />
                </div>
                <h3>Business to Farmer</h3>
                <p>Access quality farming tools and supplies</p>
                <Link to="/business-to-farmer" className="card-button">
                  Shop Equipment
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <h2>What Our Community Says</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <p>"Krishi-Bandhu helped me sell my produce directly to retailers, increasing my profits by 30%"</p>
                <div className="testimonial-author">- Ramesh, Farmer</div>
              </div>
              <div className="testimonial-card">
                <p>"As a small business, I now get fresh produce directly from farmers at competitive prices"</p>
                <div className="testimonial-author">- Priya, Grocery Owner</div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Ecommerce;