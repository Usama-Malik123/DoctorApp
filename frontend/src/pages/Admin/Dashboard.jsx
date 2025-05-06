import React from "react";
import { assets } from "../../assets/assets_admin/assets"; 
import ViewDoctor from "./ViewDoctor";
import ViewAppointment from "./ViewAppointment";
import AppointmentsBarChart from "./AppointmentsBarChart";
import SpecializationPieChart from "./SpecializationPieChart";
import RevenueLineChart from "./RevenueLineChart";
import AdminFeedback from "./AdminFeedback";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaDollarSign } from "react-icons/fa";
export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10 w-full  min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8 bg-white shadow-md p-5 rounded-lg">
        <img src={assets.admin_logo} alt="Admin Logo" className="w-32 h-auto mr-4" />
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Doctors", count: 14, icon: assets.doctor_icon },
          { title: "Appointments", count: 3, icon: assets.appointments_icon },
          { title: "Patients", count: 5, icon: assets.patients_icon },
          { title: "Pending Appointments", count: 3, icon: <FaHourglassHalf className="text-yellow-500 w-12 h-12" /> },
          { title: "Completed Appointments", count: 7, icon: <FaCheckCircle className="text-green-500 w-12 h-12" /> },
          { title: "Cancelled Appointments", count: 1, icon: <FaTimesCircle className="text-red-500 w-12 h-12" /> },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-xl border border-gray-200"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{item.title}</p>
              <h1 className="text-4xl font-bold text-gray-900">{item.count}</h1>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt={`${item.title} Icon`} className="w-12 h-12 opacity-80" />
              ) : (
                item.icon
              )}
            </div>
          </div>
  ))}
</div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[AppointmentsBarChart, SpecializationPieChart, RevenueLineChart].map((Chart, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-center h-72">
            <Chart />
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <img src={assets.list_icon} alt="Appointments" className="w-5 h-5 mr-3" />
            Latest Appointments
          </h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">See All</button>
        </div>
        <hr className="mb-4" />
        
        <div className="space-y-4">
          {[
            { name: "John Doe", date: "24th July, 2024", status: "Pending" },
            { name: "Zaman", date: "24th January, 2025", status: "Completed" },
            { name: "Shayan", date: "5th February, 2025", status: "Pending" },
            { name: "Suffiyan", date: "24th February, 2025", status: "Completed" },
          ].map((appointment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={assets.profile_pic}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">{appointment.name}</p>
                  <p className="text-sm text-gray-600">{appointment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    appointment.status === "Pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {appointment.status}
                </span>

                {/* Cancel Button */}
                {appointment.status === "Pending" && (
                  <button className="text-red-500 hover:text-red-700 transition">
                    <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
      
      <hr className="my-6 border-gray-300" />
      <ViewDoctor />
      <hr className="my-6 border-gray-300" />
      <AdminFeedback/>
      <hr className="my-6 border-gray-300" />
      <ViewAppointment />
      
    </div>
  );
}
