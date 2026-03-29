import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, Car, CalendarCheck, CarFront, Search,
  TrendingUp, TrendingDown, Plus, MoreHorizontal, Clock, Check, X as XIcon,
  ChevronDown, Filter,
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { BOOKINGS, RECENT_ACTIVITY, REMINDERS } from '../../../shared/data/adminMockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Filler, Legend);

/* ── Stat Card ── */
const StatCard = ({ title, value, change, trend, icon: Icon, delay = 0 }: {
  title: string; value: string; change: string; trend: 'up' | 'down';
  icon: React.ElementType; delay?: number;
}) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}
    className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
    <div className="flex items-center gap-2 mt-2">
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{change}
      </span>
      <span className="text-[11px] text-gray-400">vs sem. anterior</span>
    </div>
  </motion.div>
);

/* ── Status Badge ── */
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    Returned: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Ongoing: 'bg-blue-50 text-blue-600 border-blue-200',
    Cancelled: 'bg-red-50 text-red-500 border-red-200',
  };
  const iconMap: Record<string, React.ReactNode> = {
    Returned: <Check className="w-3 h-3" />,
    Ongoing: <Clock className="w-3 h-3" />,
    Cancelled: <XIcon className="w-3 h-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${map[status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
      {iconMap[status]}{status === 'Returned' ? 'Devuelto' : status === 'Ongoing' ? 'En curso' : 'Cancelado'}
    </span>
  );
};

/* ── Payment Badge ── */
const PaymentBadge = ({ status }: { status: string }) => (
  <span className={`text-xs font-medium ${status === 'Paid' ? 'text-emerald-600' : 'text-amber-500'}`}>
    {status === 'Paid' ? 'Pagado' : 'Pendiente'}
  </span>
);

/* ── Charts Data ── */
const earningsData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
  datasets: [{
    label: 'Ingresos', data: [8200, 9800, 12400, 18450, 14200, 11800, 13500, 15200],
    borderColor: '#c00c22', backgroundColor: (ctx: any) => {
      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 250);
      g.addColorStop(0, 'rgba(192,12,34,0.12)'); g.addColorStop(1, 'rgba(192,12,34,0)'); return g;
    }, fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 6,
    pointHoverBackgroundColor: '#c00c22', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 3,
  }],
};
const earningsOpts = {
  responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' as const },
  plugins: { tooltip: { backgroundColor: '#1a1a1a', padding: 10, cornerRadius: 8, displayColors: false,
    callbacks: { label: (c: any) => `$${c.parsed.y.toLocaleString()}` } } },
  scales: { x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false } },
    y: { grid: { color: '#F3F4F6' }, ticks: { color: '#9CA3AF', font: { size: 11 }, callback: (v: any) => `$${(v / 1000).toFixed(0)}K` }, border: { display: false } } },
};

const bookingsBarData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [{
    label: 'Alquileres', data: [340, 420, 380, 560, 650, 720, 985, 880, 760, 620, 550, 480],
    backgroundColor: (ctx: any) => {
      const i = ctx.dataIndex; const d = ctx.dataset.data; const max = Math.max(...d);
      return d[i] === max ? '#c00c22' : '#1a1a1a';
    }, borderRadius: 5, borderSkipped: false, barThickness: 22, hoverBackgroundColor: '#c00c22',
  }],
};
const bookingsBarOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { tooltip: { backgroundColor: '#1a1a1a', padding: 10, cornerRadius: 8, displayColors: false,
    callbacks: { label: (c: any) => `${c.parsed.y} reservas` } } },
  scales: { x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false } },
    y: { grid: { color: '#F3F4F6' }, ticks: { color: '#9CA3AF', font: { size: 11 } }, border: { display: false } } },
};

const donutData = {
  labels: ['Alquilados', 'Pendientes', 'Cancelados'],
  datasets: [{ data: [58, 24, 18], backgroundColor: ['#1a1a1a', '#c00c22', '#E5E7EB'], borderWidth: 0, hoverOffset: 4 }],
};
const donutOpts = {
  responsive: true, maintainAspectRatio: false, cutout: '72%',
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a1a1a', padding: 8, cornerRadius: 6 } },
};

const statusLegend = [
  { label: 'Alquilados', pct: '58%', color: '#1a1a1a' },
  { label: 'Pendientes', pct: '24%', color: '#c00c22' },
  { label: 'Cancelados', pct: '18%', color: '#E5E7EB' },
];

const carTypes = [
  { name: 'Sedan', pct: '30%', color: '#1a1a1a' },
  { name: 'SUV', pct: '25%', color: '#c00c22' },
  { name: 'Hatchback', pct: '20%', color: '#6B7280' },
  { name: 'Camioneta', pct: '15%', color: '#9CA3AF' },
  { name: 'Otro', pct: '10%', color: '#D1D5DB' },
];

/* ═══════════════════════════════════ COMPONENT ═══════════════════════════════════ */
export const DashboardHome = () => {
  const [tableSearch, setTableSearch] = useState('');
  const dashboardBookings = BOOKINGS.slice(0, 5);

  return (
    <div className="flex gap-6 min-h-full">
      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Page Title */}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Dashboard
        </motion.h1>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Ingresos Totales" value="$8,450" change="+2.86%" trend="up" icon={DollarSign} delay={0} />
          <StatCard title="Nuevas Reservas" value="386" change="+1.73%" trend="up" icon={CalendarCheck} delay={0.06} />
          <StatCard title="Vehículos Alquilados" value="7 Unid." change="-2.88%" trend="down" icon={Car} delay={0.12} />
          <StatCard title="Disponibles" value="5 Unid." change="+3.45%" trend="up" icon={CarFront} delay={0.18} />
        </div>

        {/* Earnings + Rent Status */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Earnings Summary */}
          <div className="xl:col-span-3 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Resumen de Ingresos</h3>
              <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Últimos 8 Meses</option><option>Este Año</option>
              </select>
            </div>
            <div className="h-[220px]"><Line data={earningsData} options={earningsOpts} /></div>
          </div>
          {/* Rent Status Donut */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Estado de Alquileres</h3>
              <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Esta Semana</option><option>Este Mes</option>
              </select>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-32 h-32 relative shrink-0"><Doughnut data={donutData} options={donutOpts} /></div>
              <div className="space-y-3 flex-1">
                {statusLegend.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-gray-600">{s.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">{s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Overview + Reminders */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Resumen de Reservas</h3>
              <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Este Año</option><option>Año Anterior</option>
              </select>
            </div>
            <div className="h-[220px]"><Bar data={bookingsBarData} options={bookingsBarOpts} /></div>
          </div>
          {/* Reminders */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recordatorios</h3>
              <button className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              {REMINDERS.slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 font-medium leading-snug">{r.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Car Bookings Table ─── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Reservas de Vehículos</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <input value={tableSearch} onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Buscar cliente, vehículo..." className="bg-transparent outline-none text-xs text-gray-600 w-full placeholder:text-gray-400" />
              </div>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
                <Filter className="w-3.5 h-3.5" />Filtro
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Booking ID', 'Fecha', 'Cliente', 'Vehículo', 'Plan', 'Fechas', 'Pago', 'Estado'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">{h}<ChevronDown className="w-3 h-3" /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dashboardBookings.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5 text-xs font-medium text-gray-900">{b.id}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{b.bookingDate}</td>
                    <td className="px-5 py-3.5 text-xs font-medium text-gray-800">{b.clientName}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-800">{b.carModel}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{b.carPlate}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{b.plan}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-[11px] text-gray-500">
                        <span className="text-gray-400">Inicio</span> {b.startDate}
                        <br /><span className="text-gray-400">Fin</span> {b.endDate}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="text-xs font-semibold text-gray-900">${b.payment}</span>
                        <div><PaymentBadge status={b.paymentStatus} /></div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Right Sidebar Panel ─── */}
      <div className="hidden 2xl:flex flex-col gap-6 w-[300px] shrink-0">
        {/* Car Availability Check */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Disponibilidad</h3>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Tipo de Vehículo</label>
              <select className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none cursor-pointer">
                <option>Todos</option><option>Sedan</option><option>SUV</option><option>Camioneta</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Fecha</label>
              <input type="date" className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none" />
            </div>
            <button className="w-full py-2.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-xs font-semibold transition-colors">
              Verificar
            </button>
          </div>
        </div>

        {/* Car Types */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Tipos de Vehículos</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {carTypes.map((ct) => (
              <div key={ct.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Car className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">{ct.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">{ct.pct}</span>
                  <div className="w-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ backgroundColor: ct.color, width: ct.pct }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Actividad Reciente</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Hoy</p>
            {RECENT_ACTIVITY.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-start gap-2.5 py-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === 'booking' ? 'bg-blue-500' : a.type === 'payment' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">
                    <span className="font-semibold">{a.user}</span>{' '}{a.action}{' '}
                    <span className="font-semibold">{a.carModel} ({a.carPlate})</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-2">Ayer</p>
            {RECENT_ACTIVITY.slice(3).map((a) => (
              <div key={a.id} className="flex items-start gap-2.5 py-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === 'return' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">
                    <span className="font-semibold">{a.user}</span>{' '}{a.action}{' '}
                    <span className="font-semibold">{a.carModel} ({a.carPlate})</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
