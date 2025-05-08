import React, { useState } from "react";
import Navbar from "./AppSidebar";

const UserDashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-screen bg-gray-100">
      {/* Mobile menu button - only shows on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Navbar - part of the grid layout */}
      <div className={`
        fixed md:relative
        w-64 h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-white shadow-lg z-40
        col-start-1 row-start-1
      `}>
        <Navbar setIsOpen={setIsOpen}/>
      </div>

      {/* Main content area - part of the grid layout */}
      <main className="
        overflow-auto
        col-start-1 md:col-start-2
        row-start-1
        h-screen
      ">
        <div className="p-2 md:p-4 h-full">{children}</div>
      </main>

      {/* Overlay for mobile when nav is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 col-start-1 row-start-1"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;