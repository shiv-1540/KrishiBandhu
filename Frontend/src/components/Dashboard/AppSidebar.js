import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({setIsOpen }) => {
  return (
    <div className="w-64 h-full bg-gradient-to-b from-green-600 to-green-700 text-white flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-4 border-b border-green-500">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold tracking-wide"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-2xl">🌿</span>
          <span>कृषि-मित्र</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-scroll py-4 px-4">
        <ul className="space-y-2">
          {[
            { to: "/", icon: "🏠", label: "Home" },
            { to: "/weather", icon: "⛅", label: "Weather" },
            { to: "/schemes", icon: "🏛", label: "Schemes" },
            { to: "/ecommerce", icon: "🛒", label: "E-commerce" },
            { to: "/market-price", icon: "📊", label: "Market Price" },
            { to: "/FertilizerDealer", icon: "🌾", label: "Fertilizer Dealer" },
            { to: "/news", icon: "📰", label: "News" },
            { to: "/loans", icon: "💰", label: "Loans" },
            { to: "/cold-storages", icon: "❄", label: "Cold Storages" },
            { to: "/learning-hub", icon: "📚", label: "Learning Hub" },
            { to: "/Crop-Disease", icon: "🌿", label: "Plant Disease Detection" },
            { to: "/expert-advice", icon: "👨‍🔬", label: "Expert Advice" },
          ].map((item) => (
            <li key={item.to} className="">
              <Link
                to={item.to}
                className="px-2 py-2 flex items-center space-x-3 rounded-lg transition-all hover:bg-green-500 hover:bg-opacity-30 active:bg-green-500 active:bg-opacity-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional Footer */}
      <div className="p-4 border-t border-green-500 text-sm text-green-100">
        <p>Help farmers to grow</p>
      </div>
    </div>
  );
};

export default Navbar;