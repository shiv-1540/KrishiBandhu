import React, { useState, useEffect } from "react";
import { Clock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setOtpSent(false);
      setOtp("");
      alert("OTP expired, please try again!");
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const sendOtpHandler = () => {
    if (!email) return alert("Please enter your email.");
    setOtpSent(true);
    setTimeLeft(300);
    alert(`Simulated OTP sent to ${email}`);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert("Please enter a 6-digit OTP.");
    if (newPassword !== confirmPassword) return alert("Passwords do not match.");
    if (timeLeft <= 0) return alert("OTP has expired.");
    alert("Password reset successfully!");
    navigate("/login");
  };

  return (
    <form
      className="border mt-10 p-4 flex flex-col gap-6 max-w-md mx-auto bg-white"
      onSubmit={formSubmitHandler}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-sm text-gray-500">Enter your email to reset your password.</p>
      </div>

      {!otpSent ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Email<sup className="text-red-500">*</sup>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <button type="button" onClick={sendOtpHandler} className="w-full bg-black text-white py-2 rounded">
            Send OTP
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="flex items-center justify-center gap-2 py-2">
            <Clock size={18} className="text-gray-500" />
            <div className={`text-center font-mono text-lg ${timeLeft < 60 ? "text-red-500" : "text-gray-500"}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Enter OTP<sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              required
              className="border rounded px-3 py-2 text-center tracking-widest font-mono"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              New Password<sup className="text-red-500">*</sup>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="border rounded px-3 py-2 w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Confirm Password<sup className="text-red-500">*</sup>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="border rounded px-3 py-2 w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Verify OTP & Reset Password
          </button>
        </div>
      )}

      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
