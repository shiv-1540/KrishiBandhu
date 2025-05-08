import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) setEmailSent(false);
    if (!emailSent || timeLeft <= 0) return;

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, emailSent]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const otpSendHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/send-otp`, {
        name,
        email,
        password,
        role,
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to send OTP");
      }

      setEmailSent(true);
      setTimeLeft(300);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong during OTP send"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.BackendURL}/api/auth/verify-otp`, {
        name,
        email,
        password,
        code: verificationCode,
        role,
      });

      if (!res.data.success) {
        alert(res.data.message || "Verification failed");
        return;
      }

      alert("User registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-2">
        {emailSent ? "Verify Your Email" : "Create an Account"}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {emailSent
          ? "Enter the verification code sent to your email"
          : "Register to start using the platform"}
      </p>

      <form onSubmit={handleSubmit}>
        {emailSent ? (
          <>
            <div className={`text-center mb-4 font-medium ${timeLeft < 60 ? "text-red-500" : "text-gray-500"}`}>
              <strong>OTP Expires In:</strong> {formatTime(timeLeft)}
            </div>

            <label className="block mb-4">
              <span className="text-sm font-medium">
                Enter OTP <sup className="text-red-500">*</sup>
              </span>
              <input
                type="text"
                maxLength={6}
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </>
        ) : (
          <>
            <label className="block mb-4">
              <span className="text-sm font-medium">
                Full Name <sup className="text-red-500">*</sup>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium">
                Role <sup className="text-red-500">*</sup>
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>
                <option value="business">Business</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium">
                Email <sup className="text-red-500">*</sup>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium">
                Password <sup className="text-red-500">*</sup>
              </span>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>
          </>
        )}

        <button
          type={emailSent ? "submit" : "button"}
          onClick={emailSent ? undefined : otpSendHandler}
          disabled={loading}
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
        >
          {emailSent ? (loading ? "Creating Account..." : "Register") : "Send OTP"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
