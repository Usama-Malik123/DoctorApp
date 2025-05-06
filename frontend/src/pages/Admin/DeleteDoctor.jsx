import { useState } from "react";

const DeleteDoctor = () => {
    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [speciality, setSpeciality] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        // Corrected API request with query parameters
        const response = await fetch(
            `http://127.0.0.1:8000/api/doctors/${doctorId}?doctor_name=${doctorName}&speciality=${speciality}`, 
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("Doctor deleted successfully!");
            setDoctorId(""); 
            setDoctorName("");
            setSpeciality("");
        } else {
            alert(`Error: ${data.detail}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Delete Doctor
                </h2>
                <form onSubmit={handleDelete} className="space-y-4">
                    {/* Doctor ID */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Doctor ID:</label>
                        <input
                            type="number"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* Doctor Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Doctor Name:</label>
                        <input
                            type="text"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Speciality */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Speciality:</label>
                        <input
                            type="text"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Delete Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Delete Doctor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteDoctor;
