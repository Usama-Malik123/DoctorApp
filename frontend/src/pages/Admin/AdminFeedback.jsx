import React, { useState, useEffect } from 'react';

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  // Load feedback from local storage when the component mounts
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(storedFeedback);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br  p-10">
      <div className="max-w-4xl mx-auto bg-indigo-500  shadow-2xl rounded-3xl p-8 border border-gray-300  ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Doctor Feedbacks 📋
        </h2>

        {feedbackList.length > 0 ? (
          <div className="space-y-6">
            {feedbackList.map((feedback, index) => (
              <div 
                key={index} 
                className="p-6 border border-gray-200 bg-white shadow-lg rounded-2xl transform hover:scale-105 transition duration-300"
              >
                <p className="text-xl font-semibold text-indigo-600">{feedback.doctor}</p>
                <p className="text-yellow-500 text-lg">⭐ {feedback.rating} Stars</p>
                <p className="text-gray-700 mt-2">{feedback.review}</p>
                <p className="text-xs text-gray-500 mt-2">📅 {feedback.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 text-lg">No feedback available.</p>
        )}
      </div>
    </div>
  );
}
