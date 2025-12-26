import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router-dom";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import backgroundImage from "../../../public/images/brand/hero-image.jpg";
import Logo from "../../../public/images/logo/main-logo.png";
export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0">
        {/* Left side (Auth Form) */}
        {children}

        {/* Right side (Background Image) */}
        <div
          className="items-center bg-violet-900 hidden w-full h-full lg:w-1/2 lg:grid bg-cover bg-center relative"
          // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay (optional for readability) */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative flex items-center justify-center z-10">
            <GridShape />

            <div className="flex flex-col items-center max-w-xl text-white">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src={Logo}
                  alt="Logo"
                />
              </Link>
              <h1 className="text-4xl font-bold">Ride Smarter with Zoom Ride</h1>
              <p className="text-center text-white/80">
             Sign up to access trusted drivers, transparent pricing, and smooth rides—every time.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
