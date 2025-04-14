import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io("https://webrtc-server-tlhd.onrender.com");
  console.log("Socket instance created:", socket); // Debugging

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};