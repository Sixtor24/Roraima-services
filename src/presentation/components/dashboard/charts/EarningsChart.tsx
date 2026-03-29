import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];

const data = {
  labels,
  datasets: [
    {
      label: 'Ingresos',
      data: [8200, 9800, 12400, 18450, 14200, 11800, 13500, 15200],
      borderColor: '#c00c22',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, 'rgba(192, 12, 34, 0.15)');
        gradient.addColorStop(1, 'rgba(192, 12, 34, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#c00c22',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 3,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleFont: { size: 12, weight: 'normal' as const },
      bodyFont: { size: 14, weight: 'bold' as const },
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (context: any) => `$${context.parsed.y.toLocaleString()}`,
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
        callback: (value: any) => `$${(value / 1000).toFixed(0)}K`,
      },
      border: { display: false },
    },
  },
};

interface EarningsChartProps {
  period?: string;
}

export const EarningsChart = ({ period = 'Últimos 8 Meses' }: EarningsChartProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Resumen de Ingresos</h3>
          <p className="text-sm text-gray-500 mt-0.5">Ingresos por alquileres en USD</p>
        </div>
        <select className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-primary cursor-pointer">
          <option>{period}</option>
          <option>Últimos 6 Meses</option>
          <option>Este Año</option>
        </select>
      </div>
      <div className="h-[280px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
