import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext"; 

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    healthDetails: "",
    time: "",
    doctor: "",
    appointmentDate: "",
  });

  const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details
  const { doctors, currencySymbol } = useContext(AppContext); // Destructure context values

  const timeslots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the booking details in state
    setBookingDetails({
      doctor: formData.doctor,
      time: formData.time,
      appointmentDate: formData.appointmentDate,
      fee: `${currencySymbol}50`,
    });
    // Reset form after submission
    setFormData({ name: "", fatherName: "", healthDetails: "", time: "", doctor: "", appointmentDate: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-indigo-500">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Book an Appointment</h2>
        
        {/* Form Section */}
        {!bookingDetails ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-white/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Father's Name Field */}
            <div>
              <label className="block text-sm font-medium">Father's Name:</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-white/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Health Details */}
            <div>
              <label className="block text-sm font-medium">Health Details:</label>
              <textarea
                name="healthDetails"
                value={formData.healthDetails}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-white/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              ></textarea>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium">Select Time:</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-purple-500 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="">Select a time</option>
                {timeslots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium">Select Date:</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-white/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium">Select Doctor:</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 bg-purple-500 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name} ({doctor.specialty})
                  </option>
                ))}
              </select>
            </div>

            {/* Book Appointment Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-all hover:shadow-2xl"
            >
              Book Appointment
            </button>
          </form>
        ) : (
          // Booking Details Section
          <div className="text-center mt-6 bg-white/30 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Booking Details:</h3>
            <p><strong>Doctor:</strong> {bookingDetails.doctor}</p>
            <p><strong>Time:</strong> {bookingDetails.time}</p>
            <p><strong>Date:</strong> {bookingDetails.appointmentDate}</p>
            <p><strong>Fee:</strong> {bookingDetails.fee}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
