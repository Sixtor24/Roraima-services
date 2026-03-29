import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Pencil, Trash2, Settings2, Users, Fuel, Gauge,
  Zap, Route, CheckCircle2, Clock, ChevronRight,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Filler,
} from 'chart.js';
import { VEHICLES, REMINDERS } from '../../../shared/data/adminMockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

/* ── Status Badge ── */
const VehicleStatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    Available: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Maintenance: 'bg-amber-50 text-amber-600 border-amber-200',
    Unavailable: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  const labels: Record<string, string> = {
    Available: 'Disponible', Maintenance: 'Mantenimiento', Unavailable: 'No disponible',
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md border ${map[status] || ''}`}>
      {labels[status] || status}
    </span>
  );
};

/* ── Spec Item ── */
const SpecItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
    <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-gray-500" />
    </div>
    <div>
      <p className="text-[11px] text-gray-400 leading-none">{label}</p>
      <p className="text-xs font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

/* ═══════════════════ COMPONENT ═══════════════════ */
export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const vehicle = VEHICLES.find((v) => v.id === id) || VEHICLES[0];
  const [selectedImage, setSelectedImage] = useState(0);

  // Activity Chart Data
  const activityData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [{
      label: 'Km', data: [45, 38, 65, 52, 78, 60, 55, 70],
      borderColor: '#c00c22',
      backgroundColor: (ctx: any) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
        g.addColorStop(0, 'rgba(192,12,34,0.12)'); g.addColorStop(1, 'rgba(192,12,34,0)'); return g;
      },
      fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
      pointHoverRadius: 5, pointHoverBackgroundColor: '#c00c22',
      pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2,
    }],
  };
  const activityOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: { tooltip: { backgroundColor: '#1a1a1a', padding: 8, cornerRadius: 6, displayColors: false,
      callbacks: { label: (c: any) => `${c.parsed.y} Km` } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 10 } }, border: { display: false } },
      y: { grid: { color: '#F3F4F6' }, ticks: { color: '#9CA3AF', font: { size: 10 } }, border: { display: false } },
    },
  };

  // Generate fake gallery from same image
  const gallery = [vehicle.image, vehicle.image, vehicle.image];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/admin/vehicles" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Link to="/admin/vehicles" className="hover:text-primary transition-colors">Unidades</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium">Detalles</span>
        </div>
      </div>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
        Detalles de Unidad
      </motion.h1>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ── Left Column: Vehicle Info ── */}
        <div className="xl:col-span-3 space-y-6">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Main Image */}
            <div className="h-[320px] bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
              <img src={gallery[selectedImage]} alt={`${vehicle.brand} ${vehicle.model}`}
                className="max-h-full max-w-full object-contain drop-shadow-xl" />
            </div>
            {/* Thumbnails */}
            <div className="flex items-center gap-3 p-4 border-t border-gray-100">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-200'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{vehicle.type}</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {vehicle.brand} {vehicle.model}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <VehicleStatusBadge status={vehicle.status} />
                  {vehicle.units > 0 && <span className="text-xs text-gray-400">{vehicle.units} Unid.</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                  ${vehicle.pricePerDay}
                </p>
                <p className="text-xs text-gray-400">/día</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-6">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-700 transition-colors border border-gray-200">
                <Pencil className="w-3.5 h-3.5" />Editar
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-medium text-red-500 transition-colors border border-red-200">
                <Trash2 className="w-3.5 h-3.5" />Eliminar
              </button>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Acerca de</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Specifications Grid */}
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Especificaciones</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SpecItem icon={Settings2} label="Transmisión" value={vehicle.transmission === 'Automatic' ? 'Automático' : 'Manual'} />
              <SpecItem icon={Users} label="Capacidad" value={`${vehicle.seats} asientos`} />
              <SpecItem icon={Route} label="Autonomía" value={vehicle.range} />
              <SpecItem icon={Fuel} label="Combustible" value={vehicle.fuelType} />
              <SpecItem icon={Gauge} label="Vel. Máxima" value={vehicle.topSpeed} />
              <SpecItem icon={Zap} label="Aceleración" value={vehicle.acceleration} />
            </div>
          </motion.div>
        </div>

        {/* ── Right Column: Activity, Features, Reminders ── */}
        <div className="xl:col-span-2 space-y-6">
          {/* Activity Chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-900">Actividad</h3>
              <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Últimos 8 Meses</option><option>Este Año</option>
              </select>
            </div>
            <div className="mb-3">
              <p className="text-[11px] text-gray-400">Total recorrido este año</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{vehicle.kmTraveled} Km</p>
            </div>
            <div className="h-[160px]"><Line data={activityData} options={activityOpts} /></div>
          </motion.div>

          {/* Car Features */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Características</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features.map((f) => (
                <div key={f} className="flex items-start gap-2 py-1">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recordatorios</h3>
              <Link to="/admin/maintenance" className="text-xs text-primary font-medium hover:underline">Ver Todo</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {REMINDERS.map((r) => (
                <div key={r.id} className="p-3 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-[11px] font-medium text-gray-700 leading-snug mb-1.5">{r.title}</p>
                  <p className="text-[10px] text-gray-400">{r.date}</p>
                  <p className="text-[10px] text-gray-400">{r.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
