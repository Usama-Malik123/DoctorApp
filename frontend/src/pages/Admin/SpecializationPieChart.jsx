import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const SpecializationPieChart = () => {
  const data = {
    labels: ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician"],
    datasets: [
      {
        data: [5, 8, 3, 6, 10], 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default SpecializationPieChart;
