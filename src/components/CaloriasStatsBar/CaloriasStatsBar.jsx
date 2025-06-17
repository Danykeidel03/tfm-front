import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './CaloriasStatsBar.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CaloriasStatsBar = ({ caloriasConsumidas, caloriasQuemadas }) => {
  const data = {
    labels: ['Calorías Consumidas', 'Calorías Quemadas'],
    datasets: [
      {
        label: 'Calorías',
        data: [caloriasConsumidas, caloriasQuemadas],
        backgroundColor: ['#ff6384', '#36a2eb'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: false,
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#222',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#222',
          font: { size: 14 },
        },
        grid: {
          color: 'rgba(0,0,0,0.08)',
        },
      },
      x: {
        ticks: {
          color: '#222',
          font: { size: 14 },
        },
        grid: {
          color: 'rgba(0,0,0,0.08)',
        },
      },
    },
  };

  return (
    <div className="calorias-bar-container">
      <div className="calorias-bar-title">Estadísticas de Calorías</div>
      <Bar key={JSON.stringify(data)} data={data} options={options} />
    </div>
  );
};

export default CaloriasStatsBar;