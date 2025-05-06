import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const AdminNavbar = () => {
  const renderNavLink = (to, icon, label) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-2 p-3 rounded-md text-sm 
          ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
        }
      >
        <img src={icon} alt={label} className="w-5" />
        <span>{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="w-64 h-screen bg-white text-gray-700 p-6 shadow-lg fixed top-0 left-0 flex flex-col border-r-2 border-gray-400">
      {/* Admin Logo */}
      <div className="flex justify-center mb-6">
        <img src={assets.admin_logo} alt="Admin Logo" className="w-40" />
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4">
        {renderNavLink("/admin/dashboard", assets.home_icon, "Dashboard")}
        {renderNavLink("/admin/appointments", assets.appointment_icon, "Appointments")}
        {renderNavLink("/admin/add-doctor", assets.add_icon, "Add Doctor")}

        <NavLink
          to="/admin/delete-doctor"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-md text-sm 
            ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
          }
        >
          <span className="material-icons text-blue-900">delete</span>
          <span>Delete Doctor</span>
        </NavLink>

        {renderNavLink("/admin/doctors-list", assets.people_icon, "Doctors List")}
        {renderNavLink("/admin/viewfeedback", assets.people_icon, "View Feedbacks")}
      </ul>
    </div>
  );
};

export default AdminNavbar;
