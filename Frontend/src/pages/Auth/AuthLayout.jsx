import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../imgs/logo.png";
import img from "../../imgs/loginsignUp.webp";
import { Link, useLocation } from "react-router-dom";


const AuthenticateLayout = ({
  children,
  childrenClassName = "",
}) => {
  const location = useLocation();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Background Image & Logo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden bg-gray-100 lg:block"
      >
        <img
          src={img}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
        />
        <img
          src={logo}
          className="absolute left-10 top-10 h-12 w-auto"
          alt="College Logo"
        />
      </motion.div>

      {/* Right Side */}
      <div className="w-full h-screen overflow-y-auto">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-pink-100 text-pink-500">
              🌿
              </div>
              कृषिबंधू
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`w-full min-w-[350px] max-w-xs shadow-sm ${childrenClassName}`}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticateLayout;
