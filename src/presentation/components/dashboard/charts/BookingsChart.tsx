import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const data = {
  labels,
  datasets: [
    {
      label: 'Alquileres',
      data: [45, 52, 38, 65, 72, 85, 98, 88, 76, 62, 55, 48],
      backgroundColor: (context: any) => {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        const max = Math.max(...context.dataset.data);
        if (value === max) return '#c00c22';
        return '#1a1a1a';
      },
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 24,
      hoverBackgroundColor: '#c00c22',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleFont: { size: 12, weight: 'normal' as const },
      bodyFont: { size: 14, weight: 'bold' as const },
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (context: any) => `${context.parsed.y} alquileres`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#9CA3AF',
        font: { size: 12 },
      },
      border: { display: false },
    },
    y: {
      grid: { color: '#F3F4F6' },
      ticks: {
        color: '#9CA3AF',
        font: { size: 12 },
      },
      border: { display: false },
    },
  },
};

export const BookingsChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Resumen de Alquileres</h3>
          <p className="text-sm text-gray-500 mt-0.5">Cantidad de alquileres por mes</p>
        </div>
        <select className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-primary cursor-pointer">
          <option>Este Año</option>
          <option>Año Anterior</option>
        </select>
      </div>
      <div className="h-[280px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
