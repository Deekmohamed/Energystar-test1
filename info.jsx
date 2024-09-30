import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Fetch = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://data.energystar.gov/resource/j7nq-iepp.json?category_1_tec_of_model_kwh=1.3')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);  // Log the data to see the structure
        setItems(data);     // Update the state with the fetched data
      });
  }, []);

  // Prepare data for the Bar chart
  const data = {
    labels: items.map((item, index) => `Model ${index + 1}`),  // Label each bar with the model index
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: items.map((item) => item.category_1_tec_of_model_kwh), // Energy consumption values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energy Consumption of Models',
      },
    },
  };

  return (
    <div className="chart-container">
      {/* Bar chart component */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default Fetch;
