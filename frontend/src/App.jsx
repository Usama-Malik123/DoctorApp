import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppoinments from './pages/MyAppoinments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import DoctorsList from './pages/DoctorsList';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DeleteDoctor from './pages/Admin/DeleteDoctor';
import AdminLogin from './pages/Admin/AdminLogin';
import ViewDoctor from './pages/Admin/ViewDoctor';
import ViewAppointment from './pages/Admin/ViewAppointment';
import Feedback from './pages/Feedback';
import AdminFeedback from './pages/Admin/AdminFeedback';
import BookAppointment from './pages/BookAppointment';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && !location.pathname.startsWith('/adminlogin')
  return (
    <div className='mx-4 sm:mx-[10%]'>
      {!isAdminRoute && <Navbar />}
      <div>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/my-appointments' element={<MyAppoinments />} />
            <Route path='/appointment/:docId' element={<Appointment />} />
            <Route path="/adminlogin" element={<AdminLogin/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/BookAppointment" element={<BookAppointment/>} />

          </Routes>
        </div>
           {/* Render Admin Panel Routes only if authenticated */}
        {isAdminRoute  && <AdminNavbar />}
          <div className="ml-30">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/appointments" element={<ViewAppointment />} />
              <Route path="/admin/add-doctor" element={<AddDoctor />} />
              <Route path="/admin/doctors-list" element={<ViewDoctor />} />
              <Route path="/admin/delete-doctor" element={<DeleteDoctor />} />
              <Route path="/admin/viewfeedback" element={<AdminFeedback />} />
            </Routes>
          </div>   
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
