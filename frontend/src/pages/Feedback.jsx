import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function Feedback() {
  const { doctors } = useContext(AppContext);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  // Load feedback from local storage when the component mounts
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(storedFeedback);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !review.trim()) {
      alert("Please select a doctor and provide a review.");
      return;
    }

    const newFeedback = {
      doctor: selectedDoctor,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    };

    const updatedFeedbackList = [...feedbackList, newFeedback];
    setFeedbackList(updatedFeedbackList);

    // Store updated feedback list in local storage
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedbackList));

    // Reset form fields
    setSelectedDoctor('');
    setRating(5);
    setReview('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 text-white p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-300 text-gray-900">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Doctor Feedback & Reviews ✨
        </h2>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold text-lg">Select Doctor:</label>
            <select 
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-gray-50 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={selectedDoctor} 
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doc, index) => (
                <option key={index} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Rating:</label>
            <select 
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-gray-50 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              value={rating} 
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg">Your Review:</label>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-gray-50 focus:ring-4 focus:ring-indigo-400 focus:outline-none" 
              rows="3" 
              value={review} 
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your feedback here..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 text-lg font-bold rounded-xl shadow-xl hover:scale-105 transform transition duration-300"
          >
            Submit Feedback
          </button>
        </form>

        {/* Display Feedback */}
        {feedbackList.length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Recent Reviews 📝
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackList.map((feedback, index) => (
                <div 
                  key={index} 
                  className="p-6 border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-2xl transform hover:scale-105 transition duration-300"
                >
                  <p className="text-indigo-600 font-extrabold text-2xl">{feedback.doctor}</p>
                  <p className="text-yellow-500 text-lg font-medium">⭐ {feedback.rating} Stars</p>
                  <p className="text-gray-700 text-md mt-2">{feedback.review}</p>
                  <p className="text-sm text-gray-500 mt-2">📅 {feedback.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
