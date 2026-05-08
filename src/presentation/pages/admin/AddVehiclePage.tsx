import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, Car, Settings2, Fuel,
  Users, Gauge, Zap, Route, Check, AlertCircle, Loader2, Plus,
} from 'lucide-react';
import { createVehiculo } from '../../../infrastructure/api/contractApi';

const TIPOS = ['Sedan', 'SUV', 'Camioneta', 'Hatch Back', 'Coupe', 'Van'];
const COMBUSTIBLES = ['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico', 'GNV'];
const TRANSMISIONES = ['Manual', 'Automático'];

export const AddVehiclePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState('Sedan');
  const [ano, setAno] = useState(new Date().getFullYear());
  const [color, setColor] = useState('');
  const [placa, setPlaca] = useState('');
  const [serialMotor, setSerialMotor] = useState('');
  const [kilometrajeActual, setKilometrajeActual] = useState(0);
  const [precioPorDia, setPrecioPorDia] = useState(50);
  const [transmision, setTransmision] = useState('Manual');
  const [asientos, setAsientos] = useState(5);
  const [tipoCombustible, setTipoCombustible] = useState('Gasolina');
  const [descripcion, setDescripcion] = useState('');
  const [velocidadMaxima, setVelocidadMaxima] = useState('');
  const [aceleracion, setAceleracion] = useState('');
  const [autonomia, setAutonomia] = useState('');
  const [caracteristica, setCaracteristica] = useState('');
  const [caracteristicas, setCaracteristicas] = useState<string[]>([]);

  const addCaracteristica = () => {
    const val = caracteristica.trim();
    if (val && !caracteristicas.includes(val)) {
      setCaracteristicas([...caracteristicas, val]);
      setCaracteristica('');
    }
  };

  const removeCaracteristica = (idx: number) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setError('');
    if (!marca || !modelo || !placa || !serialMotor) {
      setError('Completa los campos obligatorios: marca, modelo, placa, serial motor');
      return;
    }

    setSubmitting(true);
    try {
      await createVehiculo({
        marca, modelo, tipo, ano, color, placa, serialMotor,
        kilometrajeActual, precioPorDia, transmision, asientos, tipoCombustible,
        descripcion: descripcion || undefined,
        velocidadMaxima: velocidadMaxima || undefined,
        aceleracion: aceleracion || undefined,
        autonomia: autonomia || undefined,
        caracteristicas,
      });
      navigate('/admin/vehicles');
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Error al crear vehículo');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all';
  const labelClass = 'text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1.5 block';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/admin/vehicles" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Link to="/admin/vehicles" className="hover:text-primary transition-colors">Unidades</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium">Agregar Vehículo</span>
        </div>
      </div>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
        Agregar Nuevo Vehículo
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Información Básica</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Marca <span className="text-red-500">*</span></label>
                <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Toyota" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Modelo <span className="text-red-500">*</span></label>
                <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Corolla" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tipo</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Año</label>
                <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Color</label>
                <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Blanco" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Placa <span className="text-red-500">*</span></label>
                <input value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} placeholder="AB123CD" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Serial Motor <span className="text-red-500">*</span></label>
                <input value={serialMotor} onChange={(e) => setSerialMotor(e.target.value)} placeholder="2NZ-FE-TY07" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Km Actual</label>
                <input type="number" value={kilometrajeActual} onChange={(e) => setKilometrajeActual(Number(e.target.value))} className={inputClass} />
              </div>
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Especificaciones</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Transmisión</label>
                <select value={transmision} onChange={(e) => setTransmision(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  {TRANSMISIONES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Asientos</label>
                <input type="number" value={asientos} onChange={(e) => setAsientos(Number(e.target.value))} min={1} max={15} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Combustible</label>
                <select value={tipoCombustible} onChange={(e) => setTipoCombustible(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  {COMBUSTIBLES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}><Gauge className="w-3 h-3 inline mr-1" />Vel. Máxima</label>
                <input value={velocidadMaxima} onChange={(e) => setVelocidadMaxima(e.target.value)} placeholder="180 km/h" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}><Zap className="w-3 h-3 inline mr-1" />Aceleración</label>
                <input value={aceleracion} onChange={(e) => setAceleracion(e.target.value)} placeholder="9.2s (0-100)" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}><Route className="w-3 h-3 inline mr-1" />Autonomía</label>
                <input value={autonomia} onChange={(e) => setAutonomia(e.target.value)} placeholder="650 km" className={inputClass} />
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Fuel className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Precio y Descripción</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Precio por Día (USD)</label>
                <input type="number" value={precioPorDia} onChange={(e) => setPrecioPorDia(Number(e.target.value))} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3}
                  placeholder="Descripción del vehículo..."
                  className={`${inputClass} resize-none`} />
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-900">Características</h3>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <div className="flex-1">
                <input value={caracteristica} onChange={(e) => setCaracteristica(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCaracteristica())}
                  placeholder="Ej: Aire Acondicionado" className={inputClass} />
              </div>
              <button onClick={addCaracteristica}
                className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {caracteristicas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caracteristicas.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
                    <Check className="w-3 h-3 text-primary" />{c}
                    <button onClick={() => removeCaracteristica(i)} className="ml-1 text-gray-400 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={submitting}
            className="w-full py-3.5 bg-primary hover:bg-primary-dull text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Car className="w-4 h-4" />}
            {submitting ? 'Guardando...' : 'Guardar Vehículo'}
          </button>
        </div>

        {/* Preview sidebar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 h-fit">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Vista Previa</h3>
          <div className="space-y-3">
            {[
              ['Marca', marca || '—'],
              ['Modelo', modelo || '—'],
              ['Tipo', tipo],
              ['Año', String(ano)],
              ['Color', color || '—'],
              ['Placa', placa || '—'],
              ['Transmisión', transmision],
              ['Asientos', String(asientos)],
              ['Combustible', tipoCombustible],
              ['Precio/día', `$${precioPorDia} USD`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-xs font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
