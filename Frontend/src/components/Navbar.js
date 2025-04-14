import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for additional styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Default: Sidebar Closed

  return (
    <div className={`navbar-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <Link to="/" className="logo">🌿 कृषि-मित्र</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="link" onClick={() => setIsOpen(false)}><span>🏠</span> Home</Link></li>
          <li><Link to="/weather" className="link" onClick={() => setIsOpen(false)}><span>⛅</span> Weather</Link></li>
          <li><Link to="/schemes" className="link" onClick={() => setIsOpen(false)}><span>🏛</span> Schemes</Link></li>
          <li><Link to="/ecommerce" className="link" onClick={() => setIsOpen(false)}><span>🛒</span> E-commerce</Link></li>
          <li><Link to="/market-price" className="link" onClick={() => setIsOpen(false)}><span>📊</span> Market Price</Link></li>
          <li><Link to="/FertilizerDealer" className="link" onClick={() => setIsOpen(false)}><span>🌾</span> Fertilizer Dealer</Link></li>
          <li><Link to="/news" className="link" onClick={() => setIsOpen(false)}><span>📰</span> News</Link></li>
          <li><Link to="/loans" className="link" onClick={() => setIsOpen(false)}><span>💰</span> Loans</Link></li>
          <li><Link to="/cold-storages" className="link" onClick={() => setIsOpen(false)}><span>❄</span> Cold Storages</Link></li>
          <li><Link to="/learning-hub" className="link" onClick={() => setIsOpen(false)}><span>📚</span> Learning Hub</Link></li>
          <li><Link to="/Crop-Disease" className="link" onClick={() => setIsOpen(false)}><span>🌿</span> Plant Disease Detection Hub</Link></li>
          <li><Link to="/expert-advice" className="link" onClick={() => setIsOpen(false)}><span>👨‍🔬</span> Expert Advice</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;