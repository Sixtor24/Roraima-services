import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, List, LayoutGrid, Plus, Pencil,
  Users, Fuel, Settings2,
} from 'lucide-react';
import { VEHICLES } from '../../../shared/data/adminMockData';
import type { VehicleUnit } from '../../../shared/data/adminMockData';

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
    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md border ${map[status] || ''}`}>
      {labels[status] || status}
    </span>
  );
};

/* ── List Row ── */
const VehicleListRow = ({ v, i }: { v: VehicleUnit; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
    className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
  >
    {/* Image */}
    <div className="w-full sm:w-44 h-28 rounded-xl bg-gray-50 overflow-hidden shrink-0">
      <img src={v.image} alt={`${v.brand} ${v.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full">
      <div className="min-w-[140px]">
        <p className="text-xs text-gray-400">{v.brand}</p>
        <p className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{v.model}</p>
        <div className="flex items-center gap-2 mt-1">
          <VehicleStatusBadge status={v.status} />
          {v.units > 0 && <span className="text-[11px] text-gray-400 font-medium">{v.units} Unid.</span>}
        </div>
      </div>

      {/* Specs */}
      <div className="flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-1.5">
          <Settings2 className="w-4 h-4 text-gray-400" />
          <div><p className="text-[10px] text-gray-400 leading-none">Transmisión</p><p className="text-xs font-medium">{v.transmission === 'Automatic' ? 'Automático' : 'Manual'}</p></div>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-gray-400" />
          <div><p className="text-[10px] text-gray-400 leading-none">Capacidad</p><p className="text-xs font-medium">{v.seats} asientos</p></div>
        </div>
      </div>

      {/* Price */}
      <div className="sm:ml-auto text-right shrink-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Precio</p>
        <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          ${v.pricePerDay}<span className="text-xs font-normal text-gray-400">/día</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link to={`/admin/vehicles/${v.id}`}
          className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg text-xs font-semibold transition-colors">
          Seleccionar
        </Link>
        <button className="px-3 py-2 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
          Editar
        </button>
        <button className="px-3 py-2 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200">
          Eliminar
        </button>
      </div>
    </div>
  </motion.div>
);

/* ── Grid Card ── */
const VehicleGridCard = ({ v, i }: { v: VehicleUnit; i: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group flex flex-col"
  >
    {/* Header */}
    <div className="p-4 pb-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>{v.brand} {v.model}</p>
          <p className="text-xs text-gray-400">{v.type}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>${v.pricePerDay}</p>
          <p className="text-[11px] text-gray-400">/día</p>
        </div>
      </div>
    </div>

    {/* Image */}
    <div className="px-4 py-2">
      <div className="h-36 rounded-xl bg-gray-50 overflow-hidden">
        <img src={v.image} alt={`${v.brand} ${v.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    </div>

    {/* Status + Specs */}
    <div className="px-4 py-3 space-y-3 flex-1">
      <div className="flex items-center gap-2">
        <VehicleStatusBadge status={v.status} />
        {v.units > 0 && <span className="text-[11px] text-gray-400 font-medium">{v.units} Unid.</span>}
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <div className="flex items-center gap-1">
          <Settings2 className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px]">{v.transmission === 'Automatic' ? 'Automático' : 'Manual'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px]">{v.seats} asientos</span>
        </div>
        <div className="flex items-center gap-1">
          <Fuel className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px]">{v.fuelType}</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="px-4 pb-4 flex items-center gap-2">
      <Link to={`/admin/vehicles/${v.id}`}
        className="flex-1 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-xs font-semibold transition-colors text-center">
        Seleccionar
      </Link>
      <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
        <Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  </motion.div>
);

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export const VehiclesPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = VEHICLES.filter((v) => {
    const matchSearch = !search || `${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || v.type === typeFilter;
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
        Unidades
      </motion.h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar vehículo..." className="bg-transparent outline-none text-xs text-gray-600 w-full placeholder:text-gray-400" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="flex items-center gap-1 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer">
            <option value="all">Tipo</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="flex items-center gap-1 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer">
            <option value="all">Estado</option>
            <option value="Available">Disponible</option>
            <option value="Maintenance">Mantenimiento</option>
            <option value="Unavailable">No disponible</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <Link to="/admin/vehicles/new"
            className="flex items-center gap-1.5 text-xs text-white bg-primary hover:bg-primary-dull rounded-lg px-4 py-2.5 font-semibold transition-colors">
            <Plus className="w-3.5 h-3.5" />Agregar Unidad
          </Link>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-3">
            {filtered.map((v, i) => <VehicleListRow key={v.id} v={v} i={i} />)}
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((v, i) => <VehicleGridCard key={v.id} v={v} i={i} />)}
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-gray-400">No se encontraron vehículos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};
