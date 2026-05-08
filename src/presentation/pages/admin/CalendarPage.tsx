import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { getContratos } from '../../../infrastructure/api/contractApi';
import type { Contrato } from '../../../infrastructure/api/contractApi';

const COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-amber-100 text-amber-700 border-amber-200',
  'bg-purple-100 text-purple-700 border-purple-200',
  'bg-rose-100 text-rose-700 border-rose-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
];

const DAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Mon = 0
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(day: Date, start: Date, end: Date) {
  const d = day.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d >= s && d <= e;
}

export const CalendarPage = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    getContratos()
      .then(setContratos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeContratos = useMemo(
    () => contratos.filter((c) => c.estado === 'activo'),
    [contratos],
  );

  const vehicleColorMap = useMemo(() => {
    const map = new Map<number, string>();
    const uniqueVehicleIds = [...new Set(activeContratos.map((c) => c.vehiculoId))];
    uniqueVehicleIds.forEach((id, i) => {
      map.set(id, COLORS[i % COLORS.length]);
    });
    return map;
  }, [activeContratos]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const getContratosForDay = (day: number) => {
    const dayDate = new Date(year, month, day);
    return activeContratos.filter((c) =>
      isInRange(dayDate, new Date(c.fechaInicio), new Date(c.fechaFin)),
    );
  };

  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Calendario de Alquileres
        </motion.h1>
        <div className="flex items-center gap-2">
          <button onClick={goToday}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Hoy
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              {MONTHS_ES[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS_ES.map((d) => (
              <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {/* Empty slots for days before 1st */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-gray-50 bg-gray-50/30" />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayContratos = getContratosForDay(day);
              const isToday = isSameDay(new Date(year, month, day), today);

              return (
                <div
                  key={day}
                  className={`min-h-[100px] border-b border-r border-gray-50 p-1.5 ${isToday ? 'bg-primary/5' : 'hover:bg-gray-50/50'} transition-colors`}
                >
                  <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : 'text-gray-500'}`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayContratos.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded border truncate ${vehicleColorMap.get(c.vehiculoId) || COLORS[0]}`}
                        title={`${c.vehiculo.marca} ${c.vehiculo.modelo} (${c.vehiculo.placa}) — ${c.cliente.nombreCompleto}`}
                      >
                        {c.vehiculo.marca} {c.vehiculo.modelo}
                      </div>
                    ))}
                    {dayContratos.length > 3 && (
                      <div className="text-[10px] text-gray-400 font-medium pl-1">
                        +{dayContratos.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      {activeContratos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Car className="w-4 h-4 text-primary" />Vehículos Alquilados
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...new Map(activeContratos.map((c) => [c.vehiculoId, c])).values()].map((c) => (
              <div key={c.vehiculoId}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border ${vehicleColorMap.get(c.vehiculoId) || COLORS[0]}`}>
                {c.vehiculo.marca} {c.vehiculo.modelo}
                <span className="opacity-60">({c.vehiculo.placa})</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
