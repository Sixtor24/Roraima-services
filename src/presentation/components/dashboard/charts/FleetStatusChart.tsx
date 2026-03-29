import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Alquilados', 'Disponibles', 'Mantenimiento'],
  datasets: [
    {
      data: [7, 3, 2],
      backgroundColor: ['#1a1a1a', '#c00c22', '#E5E7EB'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a1a',
      bodyFont: { size: 13, weight: 'bold' as const },
      padding: 10,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 4,
    },
  },
};

const statusItems = [
  { label: 'Alquilados', value: 7, pct: '58%', color: '#1a1a1a' },
  { label: 'Disponibles', value: 3, pct: '25%', color: '#c00c22' },
  { label: 'Mantenimiento', value: 2, pct: '17%', color: '#E5E7EB' },
];

export const FleetStatusChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">Estado de Flota</h3>
        <span className="text-xs text-gray-400 font-medium">12 vehículos</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-36 h-36 relative shrink-0">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>12</span>
            <span className="text-xs text-gray-400">Total</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{item.pct}</span>
                <span className="text-xs text-gray-400">({item.value})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
