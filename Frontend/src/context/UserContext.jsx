import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.BackendURL}/api/user/get-user`, {
        withCredentials: true,
      });

      const { id, name, email, coins, role } = response.data;
      setUser({ id, name, email, coins, role });
    } catch (error) {
      console.error("Auth error or not logged in:", error);
      setUser(null);
    }
    finally{
      setLoading(false);
    }
  };

  // Logout function (server should clear the cookie)
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.BackendURL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if(loading){
    return <div className="w-full h-screen">
      Loading...
    </div>
  }

  return (
    <UserContext.Provider value={{ user, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user
export const useUser = () => useContext(UserContext);
