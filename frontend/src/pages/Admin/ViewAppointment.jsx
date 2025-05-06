import React from 'react'
import doc1 from "../../assets/assets_frontend/doc1.png";
import doc2 from "../../assets/assets_frontend/doc3.png";
import doc3 from "../../assets/assets_frontend/doc2.png";
import doc4 from "../../assets/assets_frontend/doc4.png";

const appointments = [
    {
      id: 1,
      patient: "Shayan",
      department: "Physician",
      age: 28,
      dateTime: "24th July, 2024, 10:AM",
      doctor: "Dr. Richard James",
      fees: "$50",
      patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
      doctorImage: doc1,
    },
    {
      id: 2,
      patient: "Abdul Musawir",
      department: "Dermotologist",
      age: 28,
      dateTime: "24th december, 2024, 10:AM",
      doctor: "Dr. Sarah Patel",
      fees: "$50",
      patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
      doctorImage:  doc2,
    },

    {
        id: 3,
        patient: "Abdul Samad",
        department: "Gynecologist",
        age: 28,
        dateTime: "24th january, 2024, 10:AM",
        doctor: "Dr. Emily Larson",
        fees: "$50",
        patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
        doctorImage:  doc3,
      },

      {
        id: 4,
        patient: "Talha",
        department: "Pediatricians",
        age: 28,
        dateTime: "24th january, 2024, 10:AM",
        doctor: "Dr. Christopher Lee",
        fees: "$40",
        patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
        doctorImage:  doc4,
      },
  ];

export default function ViewAppointment() {
  return (

    <div className="p-6  min-h-screen">
    <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Patient</th>
            <th className="py-3 px-4">Department</th>
            <th className="py-3 px-4">Age</th>
            <th className="py-3 px-4">Date & Time</th>
            <th className="py-3 px-4">Doctor</th>
            <th className="py-3 px-4">Fees</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id} className="border-b">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <img
                  src={appointment.patientImage}
                  alt={appointment.patient}
                  className="w-8 h-8 rounded-full"
                />
                {appointment.patient}
              </td>
              <td className="py-3 px-4">{appointment.department}</td>
              <td className="py-3 px-4">{appointment.age}</td>
              <td className="py-3 px-4">{appointment.dateTime}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                <img
                  src={appointment.doctorImage}
                  alt={appointment.doctor}
                  className="w-8 h-8 rounded-full"
                />
                {appointment.doctor}
              </td>
              <td className="py-3 px-4">{appointment.fees}</td>
              <td className="py-3 px-4">
                <button className="bg-red-100 text-red-500 px-3 py-1 rounded-full hover:bg-red-200">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
 
  )
}
