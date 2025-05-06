import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter]=useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="p-5">
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm tarnsition-all sm:hidden ${showFilter ? 'bg-indigo-500 text-white' : '' }`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        {/* Sidebar */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600${showFilter ?'flex':'hidden sm:flex'}`}>
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((specialty, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === specialty
                  ? navigate("/doctors")
                  : navigate(`/doctors/${specialty}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-all 
                ${speciality === specialty ? "bg-indigo-100 text-black" : ""}`}
            >
              {specialty}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm"
            >
              <img
                className="w-full h-48 object-cover bg-blue-50"
                src={item.image}
                alt={item.name}
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
    </div>
  );
}
