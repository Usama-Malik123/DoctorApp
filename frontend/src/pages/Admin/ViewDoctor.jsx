import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function ViewDoctor() {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    setDoctorList(doctors);
  }, [doctors]);

  return (
    <div className="p-5">
      <p className="text-lg font-semibold flex items-center">Check  the doctors' list.</p>

      {/* Doctors List */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr mt-5">
        {doctorList.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm"
          >
            <img
              className="w-full h-48 object-cover bg-blue-50"
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
            <div className="p-4">
              {/* Availability Indicator */}
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Available</span>
              </div>
              {/* Doctor Info */}
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
