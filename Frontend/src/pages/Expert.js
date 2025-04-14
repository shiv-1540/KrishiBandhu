import React, { useState, useCallback, useEffect } from "react";
import ExpertLogin from "../components/ExpertLogin";
import ExpertSignup from "../components/ExpertSignup";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./Expert.css"; // Import the CSS file

const Expert = () => {
  const [isExpertAuthenticated, setIsExpertAuthenticated] = useState(
    localStorage.getItem("isExpertAuthenticated") === "true"
  );
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [expertProfile, setExpertProfile] = useState(null);
  const [room, setRoom] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const socket = useSocket();
  const navigate = useNavigate();

  // Fetch expert profile
  const fetchExpertProfile = async () => {
    try {
      const token = localStorage.getItem("expertToken");
      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setExpertProfile(data);
        setIsActive(data.isActive);
      } else {
        console.error("Failed to fetch profile:", data.error);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (isExpertAuthenticated) {
      fetchExpertProfile();
    }

    // Cleanup function to handle auto-logout when the user leaves the page
    // return () => {
    //   handleLogout();
    // };
  }, [isExpertAuthenticated]);

  // Toggle Active Status
  const toggleActiveStatus = async () => {
    try {
      const token = localStorage.getItem("expertToken");
      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/active-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (response.ok) {
        setIsActive(!isActive);
      } else {
        console.error("Failed to update active status");
      }
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  };

  // Update Profile
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("expertToken");
      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
      if (response.ok) {
        setEditMode(false);
        fetchExpertProfile();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("expertToken");
    localStorage.removeItem("isExpertAuthenticated");
    setIsExpertAuthenticated(false);
    setExpertProfile(null);
    console.log("User has been logged out automatically.");
  };

  const handleJoinRoomClick = useCallback(() => {
    if (expertProfile && expertProfile.roomId) {
      socket.emit("room:join", { email: expertProfile.email, room: expertProfile.roomId });
      navigate(`/room/${expertProfile.roomId}`);
    } else {
      alert("Room ID is missing. Please update your profile with a valid Room ID.");
    }
  }, [expertProfile, socket, navigate]);

  if (!isExpertAuthenticated) {
    return (
      <div className="expert-container">
        {showLogin && (
          <ExpertLogin
            onLogin={() => setIsExpertAuthenticated(true)}
            onClose={() => setShowLogin(false)}
          />
        )}
        {showSignup && <ExpertSignup onClose={() => setShowSignup(false)} />}
        <h2 className="expert-heading">🔒 Please Login or Signup as an Expert to Access This Page</h2>
        <div className="expert-buttons">
          <button onClick={() => setShowLogin(true)} className="expert-button">
            Login
          </button>
          <button onClick={() => setShowSignup(true)} className="expert-button">
            Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="expert-container">
      <h1 className="expert-heading">Welcome to Expert Advice</h1>

      {expertProfile && (
        <div className="expert-profile">
          <h2>Profile</h2>
          {editMode ? (
            <div className="edit-profile-container">
              <input
                type="text"
                placeholder="Name"
                defaultValue={expertProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Specialization"
                defaultValue={expertProfile.specialization}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, specialization: e.target.value })}
              />
              <input
                type="number"
                placeholder="Experience"
                defaultValue={expertProfile.experience}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, experience: e.target.value })}
              />
              <input
                type="text"
                placeholder="Room ID"
                defaultValue={expertProfile.roomId}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, roomId: e.target.value })}
              />
              <button onClick={handleProfileUpdate} className="save-button">
                Save
              </button>
              <button onClick={() => setEditMode(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {expertProfile.name}</p>
              <p><strong>Email:</strong> {expertProfile.email}</p>
              <p><strong>Specialization:</strong> {expertProfile.specialization}</p>
              <p><strong>Experience:</strong> {expertProfile.experience} years</p>
              <p><strong>Room ID:</strong> {expertProfile.roomId}</p>
              <div className="button-container">
              <button onClick={() => setEditMode(true)} className="edit-button">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button2">
                Logout
              </button>
              </div>
              
            </div>
          )}
        </div>
        
      )}
      <div className="lobycontenar">
        <div className="active-status">
          <h3>Active Status: {isActive ? "Active" : "Inactive"}</h3>
          <button onClick={toggleActiveStatus} className="status-button">
            {isActive ? "Set Inactive" : "Set Active"}
          </button>
        </div>

        <div className="lobby-container">
          <h1>Lobby</h1>
          <button onClick={handleJoinRoomClick} className="join-button">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
