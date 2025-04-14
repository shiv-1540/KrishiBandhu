import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./ExpertAdvice.css";

const ExpertAdvice = () => {
  const userId = localStorage.getItem("userId");
  const [email, setEmail] = useState(userId ? `${userId}@gmail.com` : ""); // Default email
  const [room, setRoom] = useState(""); // Room ID will be set dynamically
  const [experts, setExperts] = useState([]); // State to store experts
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [coins, setCoins] = useState(0); // State to store user's coin balance
  const [loading, setLoading] = useState(true); // Loading state
  const socket = useSocket();
  const navigate = useNavigate();

  // Fetch user's coin balance
  const fetchUserCoins = async () => {
    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/user/coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
      });
      const data = await response.json();
      if (data.success) {
        setCoins(data.coins);
      }
    } catch (error) {
      console.error("Failed to fetch user coins:", error);
    }
  };

  // Fetch experts from the backend
  const fetchExperts = async () => {
    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/all");
      const data = await response.json();
      if (Array.isArray(data)) {
        setExperts(data);
      } else {
        console.error("Invalid experts data:", data);
      }
    } catch (error) {
      console.error("Failed to fetch experts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchExperts();
      await fetchUserCoins();
      setLoading(false);
    };

    fetchData();

    // Check if the user is authenticated
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") setIsAuthenticated(true);
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

  const handleSubmitForm = useCallback(
    (roomId) => {
      socket.emit("room:join", { email, room: roomId });
      navigate(`/room/${roomId}`); // Redirect to the room page
    },
    [email, socket, navigate]
  );

  const handleJoinClick = (expertRoomId) => {
    handleSubmitForm(expertRoomId); // Call handleSubmitForm with the expert's room ID
  };

  useEffect(() => {
    const handleJoinRoom = (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    };

    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom); // Cleanup
    };
  }, [socket, navigate]);

  const handleOpenExpertPage = () => {
    navigate("/expert"); // Navigate to the Expert page
  };

  // Razorpay integration for coin top-up
  const handleTopUpCoins = async (amount) => {
    try {
      // Step 1: Fetch Razorpay Key
      const responseKey = await fetch("https://krushi-backend-1.onrender.com/api/payment/get-key");
      if (!responseKey.ok) {
        throw new Error(`Failed to fetch Razorpay key: ${responseKey.statusText}`);
      }
      const { key } = await responseKey.json();

      // Step 2: Create Razorpay Order
      const responseOrder = await fetch("https://krushi-backend-1.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!responseOrder.ok) {
        throw new Error(`Failed to create order: ${responseOrder.statusText}`);
      }
      const { order } = await responseOrder.json();

      // Step 3: Open Razorpay Checkout
      const options = {
        key, // Use the fetched key
        amount: order.amount,
        currency: order.currency,
        name: "KrushiDhan",
        description: "Top Up Coins",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 4: Verify Payment
            const verifyResponse = await fetch("https://krushi-backend-1.onrender.com/api/payment/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: localStorage.getItem("userId"),
                coins: amount,
              }),
            });
            const data = await verifyResponse.json();
            if (data.success) {
              alert(`Coins added successfully! Your new balance is ${data.coins}`);
              setCoins(data.coins); // Update coin balance in the UI
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error.message);
            alert("An error occurred during payment verification.");
          }
        },
        prefill: {
          name: "User Name", // Replace dynamically
          email: email, // Replace dynamically
          contact: "9999999999", // Replace dynamically
        },
        theme: {
          color: "#2e8b57",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
      });
    } catch (error) {
      console.error("Payment failed:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="expert-advice-container">
      {!isAuthenticated && showLogin && (
        <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}
      {!isAuthenticated && showSignup && (
        <Signup onClose={() => setShowSignup(false)} />
      )}

      {!isAuthenticated ? (
        <div className="auth-container">
          <h2>🔒 Please Login or Signup to Access Expert Advice</h2>
          <button onClick={() => setShowLogin(true)} className="auth-button">
            Login
          </button>
          <button onClick={() => setShowSignup(true)} className="auth-button">
            Signup
          </button>
        </div>
      ) : (
        <>
          <h1>Expert Advice</h1>

          {/* Display user's coin balance */}
          <div className="coin-balance-top-left">
            <i className="fa-brands fa-bitcoin"></i> Coins: {coins}
          </div>

          {/* Button to top up coins */}
          <button onClick={() => handleTopUpCoins(100)} className="top-up-button">
            Top Up 100 Coins for ₹100
          </button>

          {/* Floating Button with Bitcoin icon */}
          <button className="floating-button" onClick={handleOpenExpertPage}>
            Expert Page
          </button>

          {/* Display Experts */}
          <div className="experts-grid">
            {experts.map((expert) => (
              <div key={expert._id} className="expert-card">
                <img
                  src={`https://krushi-backend-1.onrender.com${expert.profilePhoto}`}
                  alt={`${expert.name}'s profile`}
                  className="expert-photo"
                />
                <h3>{expert.name}</h3>
                <p>
                  <strong>Specialization:</strong> {expert.specialization}
                </p>
                <p>
                  <strong>Email:</strong> {expert.email}
                </p>
                <p>
                  <strong>Experience:</strong> {expert.experience} years
                </p>
                <p>
                  <strong>Room ID:</strong> {expert.roomId}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-indicator ${
                      expert.isActive ? "active" : "inactive"
                    }`}
                  ></span>
                  {expert.isActive ? "Active" : "Inactive"}
                </p>
                <p className="coin-rate">
                  <span>10</span> <i className="fa-brands fa-bitcoin"></i> per min
                </p>
                <button onClick={() => handleJoinClick(expert.roomId)}>
                  Join
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertAdvice;

