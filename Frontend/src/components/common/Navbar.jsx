import React from "react"; 
import { LogOut, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav
      className="w-full backdrop-blur-md bg-white/75 sticky top-0 px-4 lg:px-20 md:px-6 sm:px-4 z-50 border-b"
      style={{ borderBottom: "1px solid #ddd" }}
    >
      <div className="w-full flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-xl text-green-600">कृषिबंधू</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-6 items-center">
              {/* Avatar and user info */}
              <div className="flex items-center gap-3 cursor-pointer">
                <div
                  className="rounded-full overflow-hidden h-8 w-8"
                  style={{ backgroundColor: "#ccc", textAlign: "center", lineHeight: "2rem" }}
                >
                    <span className="text-white font-bold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                </div>

                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{user.name}</span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Mail size={12} />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Dashboard & Logout Buttons */}
              <div className="flex gap-3">
                <Link to="/dashboard">
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Dashboard
                  </button>
                </Link>

                <button
                  onClick={logout}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  Logout <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
