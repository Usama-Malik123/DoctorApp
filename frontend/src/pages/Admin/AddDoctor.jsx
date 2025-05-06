import React, { useState } from "react";

function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General Physician",
    degree: "",
    address1: "",
    address2: "",
    about: "",
  });

  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the API
    const doctorData = {
      name: formData.name,
      email: formData.email,
      speciality: formData.speciality,
      experience: formData.experience,
      fees: formData.fees,
      degree: formData.degree,
      address1: formData.address1,
      address2: formData.address2,
      about: formData.about,
    };

    try {
      const response = await fetch("http://localhost:8000/api/doctors/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Doctor added successfully!" });
        setFormData({
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          speciality: "General Physician",
          degree: "",
          address1: "",
          address2: "",
          about: "",
        });
      } else {
        setMessage({ type: "error", text: result.detail || "Failed to add doctor" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>

      {message && (
        <div className={`p-2 text-white text-center ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter name" required />
        </div>

        <div>
          <label className="block font-medium">Doctor Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter email" required />
        </div>

        <div>
          <label className="block font-medium">Set Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter password" required />
        </div>

        <div>
          <label className="block font-medium">Experience</label>
          <select name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option>1 Year</option>
            <option>2 Years</option>
            <option>5+ Years</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Fees</label>
          <input type="number" name="fees" value={formData.fees} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Doctor fees" required />
        </div>

        <div>
          <label className="block font-medium">Speciality</label>
          <select name="speciality" value={formData.speciality} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option>General Physician</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Pediatricians</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Degree</label>
          <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter degree" required />
        </div>

        <div>
          <label className="block font-medium">Address 1</label>
          <input type="text" name="address1" value={formData.address1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter address" required />
        </div>

        <div>
          <label className="block font-medium">Address 2</label>
          <input type="text" name="address2" value={formData.address2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter address" />
        </div>

        <div>
          <label className="block font-medium">About Doctor</label>
          <textarea name="about" value={formData.about} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Write about the doctor"></textarea>
        </div>

        <button type="submit" className="w-30 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
