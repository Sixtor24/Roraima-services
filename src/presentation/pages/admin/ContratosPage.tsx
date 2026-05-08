import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Search, CheckCircle2,
  Clock, Download,
} from 'lucide-react';
import {
  getContratosActivos,
  getContratos,
  finalizarContrato,
  getContratoPdfUrl,
} from '../../../infrastructure/api/contractApi';
import type { Contrato } from '../../../infrastructure/api/contractApi';

/* ── Status Badge ── */
const StatusBadge = ({ estado }: { estado: string }) => {
  const map: Record<string, string> = {
    activo: 'bg-blue-50 text-blue-600 border-blue-200',
    finalizado: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  const icons: Record<string, React.ReactNode> = {
    activo: <Clock className="w-3 h-3" />,
    finalizado: <CheckCircle2 className="w-3 h-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${map[estado] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
      {icons[estado]}{estado === 'activo' ? 'Activo' : 'Finalizado'}
    </span>
  );
};

/* ── Finalizar Modal ── */
const FinalizarModal = ({ contrato, onClose, onSuccess }: {
  contrato: Contrato; onClose: () => void; onSuccess: () => void;
}) => {
  const [kmFin, setKmFin] = useState('');
  const [obs, setObs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const km = Number(kmFin);
    if (!km || km < contrato.kilometrajeInicio) {
      setError(`El kilometraje final debe ser >= ${contrato.kilometrajeInicio}`);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await finalizarContrato(contrato.id, { kilometrajeFin: km, observaciones: obs || undefined });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al finalizar contrato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>Finalizar Contrato</h3>
        <p className="text-xs text-gray-400 mb-5">
          {contrato.vehiculo.marca} {contrato.vehiculo.modelo} — {contrato.cliente.nombreCompleto}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">
              Kilometraje Final <span className="text-red-500">*</span>
            </label>
            <input type="number" value={kmFin} onChange={(e) => setKmFin(e.target.value)}
              placeholder={`Mínimo: ${contrato.kilometrajeInicio}`}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            <p className="text-[11px] text-gray-400 mt-1">Km inicio: {contrato.kilometrajeInicio.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Observaciones</label>
            <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3}
              placeholder="Rayones, daños, notas..."
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none" />
          </div>
          {error && <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50">
            {loading ? 'Finalizando...' : 'Finalizar Contrato'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════ MAIN ═══════════════════ */
export const ContratosPage = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todos' | 'activo' | 'finalizado'>('todos');
  const [search, setSearch] = useState('');
  const [finalizarTarget, setFinalizarTarget] = useState<Contrato | null>(null);

  const fetchContratos = async () => {
    setLoading(true);
    try {
      const data = filter === 'activo'
        ? await getContratosActivos()
        : await getContratos();
      setContratos(data);
    } catch {
      console.error('Error cargando contratos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContratos(); }, [filter]);

  const filtered = contratos.filter((c) => {
    if (filter === 'finalizado' && c.estado !== 'finalizado') return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      c.cliente.nombreCompleto.toLowerCase().includes(q) ||
      c.cliente.cedula.includes(q) ||
      c.vehiculo.placa.toLowerCase().includes(q) ||
      c.vehiculo.modelo.toLowerCase().includes(q) ||
      String(c.id).includes(q)
    );
  });

  const formatDate = (d: string) => new Date(d).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Contratos
        </motion.h1>
        <Link to="/admin/contratos/nuevo"
          className="flex items-center gap-1.5 text-xs text-white bg-primary hover:bg-primary-dull rounded-lg px-4 py-2.5 font-semibold transition-colors">
          <Plus className="w-3.5 h-3.5" />Nuevo Contrato
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-72">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, placa, ID..."
            className="bg-transparent outline-none text-xs text-gray-600 w-full placeholder:text-gray-400" />
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
          {(['todos', 'activo', 'finalizado'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
              {f === 'todos' ? 'Todos' : f === 'activo' ? 'Activos' : 'Finalizados'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No se encontraron contratos.</p>
            <Link to="/admin/contratos/nuevo" className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline">
              <Plus className="w-3 h-3" />Crear primer contrato
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Cliente', 'Vehículo', 'Fechas', 'Días', 'Canon/día', 'Km Inicio', 'Estado', 'Acciones'].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-xs font-bold text-gray-900">#{c.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-medium text-gray-800">{c.cliente.nombreCompleto}</p>
                      <p className="text-[11px] text-gray-400">{c.cliente.cedula}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs text-gray-800">{c.vehiculo.marca} {c.vehiculo.modelo}</p>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{c.vehiculo.placa}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-[11px] text-gray-500 whitespace-nowrap">
                        {formatDate(c.fechaInicio)} → {formatDate(c.fechaFin)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-gray-900">{c.dias}d</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-gray-900">${c.canonDiarioUsd}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{c.kilometrajeInicio.toLocaleString()} km</td>
                    <td className="px-5 py-3.5"><StatusBadge estado={c.estado} /></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <a href={getContratoPdfUrl(c.id)} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Descargar PDF">
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        {c.estado === 'activo' && (
                          <button onClick={() => setFinalizarTarget(c)}
                            className="px-2.5 py-1.5 text-[11px] font-medium bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
                            Finalizar
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {finalizarTarget && (
          <FinalizarModal
            contrato={finalizarTarget}
            onClose={() => setFinalizarTarget(null)}
            onSuccess={() => { setFinalizarTarget(null); fetchContratos(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
