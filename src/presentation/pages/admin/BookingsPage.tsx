import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Clock, XCircle, CheckCircle2, TrendingUp, TrendingDown,
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Check, X as XIcon, Plus,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip,
} from 'chart.js';
import { BOOKINGS } from '../../../shared/data/adminMockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

/* ── Stat Mini Card ── */
const MiniStat = ({ title, value, change, trend, icon: Icon, delay = 0 }: {
  title: string; value: string; change: string; trend: 'up' | 'down';
  icon: React.ElementType; delay?: number;
}) => (
  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay }}
    className="bg-white rounded-2xl p-5 border border-gray-100">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs text-gray-400 font-medium">{title}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
    <div className="flex items-center gap-2 mt-2">
      <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{change}
      </span>
      <span className="text-[11px] text-gray-400">vs sem. anterior</span>
    </div>
  </motion.div>
);

/* ── Status Badge ── */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Returned: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Ongoing: 'bg-blue-50 text-blue-600 border-blue-200',
    Cancelled: 'bg-red-50 text-red-500 border-red-200',
  };
  const icons: Record<string, React.ReactNode> = {
    Returned: <Check className="w-3 h-3" />,
    Ongoing: <Clock className="w-3 h-3" />,
    Cancelled: <XIcon className="w-3 h-3" />,
  };
  const labels: Record<string, string> = { Returned: 'Devuelto', Ongoing: 'En curso', Cancelled: 'Cancelado' };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status] || ''}`}>
      {icons[status]}{labels[status] || status}
    </span>
  );
};

/* ── Chart ── */
const chartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Completadas', data: [220, 280, 250, 380, 420, 500, 586, 520, 460, 380, 340, 300],
      backgroundColor: '#c00c22', borderRadius: 4, borderSkipped: false, barPercentage: 0.6,
    },
    {
      label: 'Canceladas', data: [80, 100, 90, 120, 130, 140, 160, 150, 130, 110, 100, 90],
      backgroundColor: '#1a1a1a', borderRadius: 4, borderSkipped: false, barPercentage: 0.6,
    },
  ],
};
const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    tooltip: { backgroundColor: '#1a1a1a', padding: 10, cornerRadius: 8 },
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false }, stacked: true },
    y: { grid: { color: '#F3F4F6' }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false }, stacked: true },
  },
};

/* ═══════════════════ COMPONENT ═══════════════════ */
export const BookingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 10;
  const totalPages = Math.ceil(BOOKINGS.length / perPage);
  const paginatedBookings = BOOKINGS.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
        Reservas
      </motion.h1>

      {/* Top: Stats + Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Stats 2x2 */}
        <div className="xl:col-span-2 grid grid-cols-2 gap-4">
          <MiniStat title="Próximas" value="145" change="+2.97%" trend="up" icon={CalendarCheck} delay={0} />
          <MiniStat title="Pendientes" value="106" change="+1.72%" trend="up" icon={Clock} delay={0.06} />
          <MiniStat title="Canceladas" value="86" change="-4.02%" trend="down" icon={XCircle} delay={0.12} />
          <MiniStat title="Completadas" value="298" change="+3.15%" trend="up" icon={CheckCircle2} delay={0.18} />
        </div>

        {/* Bookings Overview Chart */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900">Resumen de Reservas</h3>
            <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
              <option>Últimos 8 Meses</option><option>Este Año</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-primary" /><span className="text-[11px] text-gray-500">Completadas</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /><span className="text-[11px] text-gray-500">Canceladas</span></div>
          </div>
          <div className="h-[200px]"><Bar data={chartData} options={chartOpts} /></div>
        </div>
      </div>

      {/* ── Table Section ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Reservas de Vehículos</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cliente, vehículo..."
                className="bg-transparent outline-none text-xs text-gray-600 w-full placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors border border-gray-200">
              <Filter className="w-3.5 h-3.5" />Tipo
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors border border-gray-200">
              <Filter className="w-3.5 h-3.5" />Estado
            </button>
            <button className="flex items-center gap-1.5 text-xs text-white bg-primary hover:bg-primary-dull rounded-lg px-4 py-2 font-semibold transition-colors">
              <Plus className="w-3.5 h-3.5" />Agregar Reserva
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                {['Booking ID', 'Fecha', 'Cliente', 'Vehículo', 'Plan', 'Fechas', 'Chofer', 'Pago', 'Estado'].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">{h}<ChevronDown className="w-3 h-3" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 text-xs font-medium text-gray-900">{b.id}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{b.bookingDate}</td>
                  <td className="px-5 py-3.5 text-xs font-medium text-gray-800">{b.clientName}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-800">{b.carModel}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{b.carType}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{b.plan}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-[11px] text-gray-500 whitespace-nowrap">
                      {b.startDate} <span className="text-gray-300 mx-0.5">→</span> {b.endDate}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {b.hasDriver ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 inline-flex items-center justify-center"><Check className="w-3 h-3" /></span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-red-50 text-red-400 inline-flex items-center justify-center"><XIcon className="w-3 h-3" /></span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-gray-900">${b.payment}</span>
                    <span className={`ml-2 text-[11px] font-medium ${b.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {b.paymentStatus === 'Paid' ? 'Pagado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Resultados por página</span>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer">
              <option>10</option><option>25</option><option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />Ant
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === currentPage ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Sig<ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
