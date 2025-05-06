import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
   
    const adminToken = localStorage.getItem("adminAuth");
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  

  return (
    <div className="flex items-center justify-between text-sm py-4 px-4 md:px-8 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
        <a
        href="/adminlogin"
        target="_blank"
        rel="noopener noreferrer"
        className="py-2 px-4 border border-gray-500 rounded-full text-xs transition cursor-pointer"
        >
        Admin Panel
        </a>

      </ul>

      {/* User Profile & Login */}
      <div className="hidden md:flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => navigate("/feedback")}
                  className="hover:text-black cursor-pointer"
                >
                  Give Feedbacks
                </p>

                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setShowMenu(!showMenu)}>
          <img className="w-8" src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-4 py-4">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              <li className="py-2">HOME</li>
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              <li className="py-2">ALL DOCTORS</li>
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              <li className="py-2">ABOUT</li>
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>
              <li className="py-2">CONTACT</li>
            </NavLink>

            {/* Admin Panel Button */}
            <li
              className="py-2 px-4 border border-gray-500 rounded-full text-xs transition cursor-pointer"
              onClick={() => {
                handleAdminPanelClick();
                setShowMenu(false);
              }}
            >
              Admin Panel
            </li>

            {/* User Profile & Logout */}
            {token ? (
              <div className="flex flex-col gap-3 text-center">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowMenu(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowMenu(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    setShowMenu(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-full"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
