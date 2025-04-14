import React, { useState } from "react";
import { FaUser, FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css"; // Create this CSS file

const Login = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
localStorage.setItem("token", data.token);
localStorage.setItem("userId", data.userId); // Store userId in localStorage
        localStorage.setItem("isAuthenticated", "true");
        onLogin();
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2 className="login-title">Krishi Mitra Login</h2>
          <button className="login-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {message && <div className="login-message">{message}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-container">
            <FaUser className="login-icon" />
            <input
              type="email"
              placeholder="Farmer ID / Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="login-input-container">
            <FaLock className="login-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <label className="login-remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="login-forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`login-submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="login-footer">
            Don't have an account?{" "}
            <a href="/Signup" className="login-register-link">
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;