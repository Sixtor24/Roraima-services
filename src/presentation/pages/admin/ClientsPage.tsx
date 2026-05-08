import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Plus, Check, AlertCircle, Loader2, X, Mail, Phone, MapPin,
} from 'lucide-react';
import { getClientes, createCliente } from '../../../infrastructure/api/contractApi';
import type { Cliente } from '../../../infrastructure/api/contractApi';

/* ── Add Client Modal ── */
const AddClientModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!nombreCompleto.trim() || !cedula.trim()) {
      setError('Nombre completo y cédula son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await createCliente({
        nombreCompleto, cedula,
        direccion: direccion || null,
        telefono: telefono || null,
        email: email || null,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Error al crear cliente');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Nuevo Cliente</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Nombre Completo <span className="text-red-500">*</span></label>
            <input value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Juan Pérez" className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Cédula <span className="text-red-500">*</span></label>
            <input value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="V-12.345.678" className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+58 412 1234567" className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@ejemplo.com" className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Dirección</label>
            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ciudad Guayana, Bolívar" className={inputClass} />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />{error}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            {loading ? 'Guardando...' : 'Guardar Cliente'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════ MAIN ═══════════════════ */
export const ClientsPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchClientes = () => {
    setLoading(true);
    getClientes()
      .then(setClientes)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClientes(); }, []);

  const filtered = clientes.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.nombreCompleto.toLowerCase().includes(q) ||
      c.cedula.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.telefono && c.telefono.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Clientes
        </motion.h1>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-xs text-white bg-primary hover:bg-primary-dull rounded-lg px-4 py-2.5 font-semibold transition-colors">
          <Plus className="w-3.5 h-3.5" />Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-72">
        <Search className="w-3.5 h-3.5 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, cédula..."
          className="bg-transparent outline-none text-xs text-gray-600 w-full placeholder:text-gray-400" />
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              {clientes.length === 0 ? 'No hay clientes registrados.' : 'No se encontraron clientes con ese filtro.'}
            </p>
            {clientes.length === 0 && (
              <button onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline">
                <Plus className="w-3 h-3" />Registrar primer cliente
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['#', 'Nombre', 'Cédula', 'Teléfono', 'Email', 'Dirección'].map((h) => (
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
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">
                            {c.nombreCompleto.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-800">{c.nombreCompleto}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-gray-600">{c.cedula}</td>
                    <td className="px-5 py-3.5">
                      {c.telefono ? (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />{c.telefono}
                        </span>
                      ) : <span className="text-xs text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      {c.email ? (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <Mail className="w-3 h-3 text-gray-400" />{c.email}
                        </span>
                      ) : <span className="text-xs text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      {c.direccion ? (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-gray-400" />{c.direccion}
                        </span>
                      ) : <span className="text-xs text-gray-300">—</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {!loading && clientes.length > 0 && (
        <div className="text-xs text-gray-400 text-right">
          {filtered.length} de {clientes.length} clientes
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddClientModal
            onClose={() => setShowModal(false)}
            onSuccess={() => { setShowModal(false); fetchClientes(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
