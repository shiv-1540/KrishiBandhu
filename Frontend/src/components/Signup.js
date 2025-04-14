import React, { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaUserTie, 
  FaTimes, 
  FaStore,
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";
import "./Signup.css";

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: "Signup successful! Please login.", type: "success" });
        setTimeout(() => {
          onSwitchToLogin();
        }, 1500);
      } else {
        setMessage({ text: data.error || "Signup failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <div className="signup-header">
          <h2 className="signup-title">Create Account</h2>
          <button className="signup-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {message.text && (
          <div className={`signup-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-input-container">
            <FaUser className="signup-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-container">
            <FaEnvelope className="signup-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-container">
            <FaLock className="signup-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="signup-password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="signup-role-selector">
            <div className="signup-role-option">
              <input
                type="radio"
                id="farmer"
                name="role"
                value="farmer"
                checked={role === "farmer"}
                onChange={() => setRole("farmer")}
              />
              <label htmlFor="farmer">
                <FaUserTie /> Farmer
              </label>
            </div>
            <div className="signup-role-option">
              <input
                type="radio"
                id="business"
                name="role"
                value="business"
                checked={role === "business"}
                onChange={() => setRole("business")}
              />
              <label htmlFor="business">
                <FaStore /> Business
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`signup-submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="signup-spinner"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="signup-footer">
            Already have an account?{" "}
            <button
              type="button"
              className="signup-login-link"
              onClick={onSwitchToLogin}
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;