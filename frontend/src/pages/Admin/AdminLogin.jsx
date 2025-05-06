import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (username === "admin123" && password === "admin123") {
      alert("Login successful!");
  
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <form 
      className="min-h-screen flex items-center justify-center"
      onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl bg-white shadow-lg text-gray-700">
        <p className="text-2xl font-semibold text-center">Admin Login</p>
        <p className="text-center text-sm text-gray-500">Enter your credentials to access the dashboard</p>
        <div className="w-full">
          <p className="text-sm">Username</p>
          <input 
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            type="text" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username} 
            required
          />
        </div>
        <div className="w-full">
          <p className="text-sm">Password</p>
          <input 
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 rounded-md text-base transition duration-300"
        >
          Login
        </button>
      </div>
    </form>
  );
}
