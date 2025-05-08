import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { fetchUserData } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.BackendURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (!response.data.success) {
        alert("User logged in successfully! Fetching User data!");
      }

      await fetchUserData();
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-1">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
