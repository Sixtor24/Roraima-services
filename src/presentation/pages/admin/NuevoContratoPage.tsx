import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, Car, User, Calendar,
  Gauge, FileText, Check, AlertCircle, Loader2,
} from 'lucide-react';
import {
  getVehiculos,
  buscarClientePorCedula,
  crearContrato,
  getContratoPdfUrl,
} from '../../../infrastructure/api/contractApi';
import type { Vehiculo, Cliente, CreateContratoPayload } from '../../../infrastructure/api/contractApi';

/* ═══════════════════ COMPONENT ═══════════════════ */
export const NuevoContratoPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedVehiculo = searchParams.get('vehiculoId');

  // State
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loadingVehiculos, setLoadingVehiculos] = useState(true);

  const [vehiculoId, setVehiculoId] = useState<number | ''>('');
  const [cedula, setCedula] = useState('');
  const [clienteFound, setClienteFound] = useState<Cliente | null>(null);
  const [clienteSearched, setClienteSearched] = useState(false);
  const [searchingCliente, setSearchingCliente] = useState(false);

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [canonDiario, setCanonDiario] = useState(140);
  const [deposito, setDeposito] = useState(200);
  const [kmInicio, setKmInicio] = useState<number | ''>('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<number | null>(null);

  // Computed
  const selectedVehiculo = vehiculos.find((v) => v.id === vehiculoId);
  const dias = fechaInicio && fechaFin
    ? Math.ceil((new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalUsd = dias > 0 ? (canonDiario * dias) : 0;

  // Load vehicles
  useEffect(() => {
    getVehiculos()
      .then((data) => {
        setVehiculos(data);
        if (preselectedVehiculo) setVehiculoId(Number(preselectedVehiculo));
      })
      .catch(() => setError('Error al cargar vehículos'))
      .finally(() => setLoadingVehiculos(false));
  }, []);

  // When vehicle changes, set km ref
  useEffect(() => {
    if (selectedVehiculo && kmInicio === '') {
      setKmInicio(selectedVehiculo.kilometrajeActual);
    }
  }, [vehiculoId]);

  // Search client by cedula
  const handleBuscarCliente = async () => {
    if (!cedula.trim()) return;
    setSearchingCliente(true);
    setClienteSearched(false);
    setClienteFound(null);
    try {
      const c = await buscarClientePorCedula(cedula.trim());
      setClienteFound(c);
      setNombreCompleto(c.nombreCompleto);
      setDireccion(c.direccion || '');
      setTelefono(c.telefono || '');
      setEmail(c.email || '');
    } catch {
      setClienteFound(null);
    } finally {
      setSearchingCliente(false);
      setClienteSearched(true);
    }
  };

  // Submit
  const handleSubmit = async () => {
    setError('');
    if (!vehiculoId || !cedula || !nombreCompleto || !fechaInicio || !fechaFin || !kmInicio) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    if (dias <= 0) {
      setError('La fecha fin debe ser posterior a la fecha inicio');
      return;
    }
    if (selectedVehiculo && Number(kmInicio) < selectedVehiculo.kilometrajeActual) {
      setError(`Km inicio no puede ser menor a ${selectedVehiculo.kilometrajeActual}`);
      return;
    }

    const payload: CreateContratoPayload = {
      vehiculoId: Number(vehiculoId),
      cliente: { cedula, nombreCompleto, direccion, telefono, email },
      fechaInicio,
      fechaFin,
      canonDiarioUsd: canonDiario,
      depositoUsd: deposito,
      kilometrajeInicio: Number(kmInicio),
    };

    setSubmitting(true);
    try {
      const contrato = await crearContrato(payload);
      setSuccess(contrato.id);
      // Open PDF
      window.open(getContratoPdfUrl(contrato.id), '_blank');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al crear contrato');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-emerald-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Contrato Creado</h2>
        <p className="text-sm text-gray-500 mb-6">El contrato #{success} fue generado exitosamente. El PDF se ha abierto en una nueva pestaña.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/admin/contratos" className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Ver Contratos
          </Link>
          <a href={getContratoPdfUrl(success)} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-xs font-semibold transition-colors">
            Descargar PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/admin/contratos" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Link to="/admin/contratos" className="hover:text-primary transition-colors">Contratos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium">Nuevo Contrato</span>
        </div>
      </div>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
        Nuevo Contrato de Arrendamiento
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Form Column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Selection */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Vehículo</h3>
            </div>
            {loadingVehiculos ? (
              <div className="flex items-center gap-2 text-xs text-gray-400"><Loader2 className="w-4 h-4 animate-spin" />Cargando vehículos...</div>
            ) : (
              <select value={vehiculoId} onChange={(e) => { setVehiculoId(Number(e.target.value)); setKmInicio(''); }}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer">
                <option value="">Selecciona un vehículo</option>
                {vehiculos.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.marca} {v.modelo} ({v.placa})
                  </option>
                ))}
              </select>
            )}
            {selectedVehiculo && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="p-2.5 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-400">Placa</p><p className="text-xs font-semibold text-gray-800">{selectedVehiculo.placa}</p></div>
                <div className="p-2.5 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-400">Serial Motor</p><p className="text-xs font-semibold text-gray-800">{selectedVehiculo.serialMotor}</p></div>
                <div className="p-2.5 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-400">Km Actual</p><p className="text-xs font-semibold text-gray-800">{selectedVehiculo.kilometrajeActual.toLocaleString()}</p></div>
              </div>
            )}
          </motion.div>

          {/* Client */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Cliente</h3>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <div className="flex-1">
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Cédula <span className="text-red-500">*</span></label>
                <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)}
                  placeholder="V-12.345.678"
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <button onClick={handleBuscarCliente} disabled={searchingCliente || !cedula.trim()}
                className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap">
                {searchingCliente ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            {clienteSearched && clienteFound && (
              <p className="text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 mb-3 flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />Cliente encontrado: {clienteFound.nombreCompleto}</p>
            )}
            {clienteSearched && !clienteFound && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />Cliente no registrado. Completa los datos para crearlo.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Nombre completo <span className="text-red-500">*</span></label>
                <input type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Teléfono</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Dirección</label>
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
            </div>
          </motion.div>

          {/* Dates & Financial */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Periodo y Tarifas</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Fecha Inicio <span className="text-red-500">*</span></label>
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Fecha Fin <span className="text-red-500">*</span></label>
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Canon Diario (USD)</label>
                <input type="number" value={canonDiario} onChange={(e) => setCanonDiario(Number(e.target.value))}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Depósito (USD)</label>
                <input type="number" value={deposito} onChange={(e) => setDeposito(Number(e.target.value))}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
            </div>
          </motion.div>

          {/* Km */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Kilometraje</h3>
            </div>
            <div>
              <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block">Km de Inicio <span className="text-red-500">*</span></label>
              <input type="number" value={kmInicio} onChange={(e) => setKmInicio(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              {selectedVehiculo && (
                <p className="text-[11px] text-gray-400 mt-1.5">Km actual del vehículo: <span className="font-semibold">{selectedVehiculo.kilometrajeActual.toLocaleString()}</span></p>
              )}
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting}
            className="w-full py-3.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            {submitting ? 'Generando contrato...' : 'Generar Contrato y PDF'}
          </button>
        </div>

        {/* ── Summary Sidebar ── */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resumen del Contrato</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Vehículo</span>
                <span className="text-xs font-medium text-gray-800">
                  {selectedVehiculo ? `${selectedVehiculo.marca} ${selectedVehiculo.modelo}` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Placa</span>
                <span className="text-xs font-mono text-gray-800">{selectedVehiculo?.placa || '—'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Cliente</span>
                <span className="text-xs font-medium text-gray-800">{nombreCompleto || '—'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Días</span>
                <span className="text-xs font-bold text-gray-900">{dias > 0 ? `${dias} días` : '—'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Canon / día</span>
                <span className="text-xs font-medium text-gray-800">${canonDiario} USD</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Depósito</span>
                <span className="text-xs font-medium text-gray-800">${deposito} USD</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400">Km Inicio</span>
                <span className="text-xs font-medium text-gray-800">{kmInicio ? Number(kmInicio).toLocaleString() : '—'}</span>
              </div>
              <div className="flex items-center justify-between py-3 bg-gray-50 rounded-xl px-3 -mx-1 mt-2">
                <span className="text-xs font-semibold text-gray-600">Total</span>
                <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                  ${totalUsd.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
