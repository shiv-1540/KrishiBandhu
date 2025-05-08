import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaTractor, FaStore, FaUserTie, FaShoppingCart} from "react-icons/fa";
import "./Ecommerce.css"; // Create this CSS file

const Ecommerce = () => {
  const [hoveredCard, setHoveredCard] = useState(null);


  return (
    <div className="py-1 ecommerce-container">
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
    </div>
  );
};

export default Ecommerce;