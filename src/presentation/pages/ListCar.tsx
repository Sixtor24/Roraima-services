import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { LOCATIONS } from '../../shared/constants/locations';

export const ListCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    year: '',
    pricePerDay: '',
    seats: '',
    transmission: '',
    fuelType: '',
    location: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('List car form:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-5 py-2 bg-primary/8 text-primary rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6 border border-primary/10">
          Publicar
        </span>
        <h1 
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Publica tu Vehículo
        </h1>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-4" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Genera ingresos pasivos alquilando tu vehículo de forma segura
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl border border-border-color p-8 relative overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
              Foto del Vehículo
            </label>
            <div className="border-2 border-dashed border-border-color rounded-xl p-8 text-center hover:border-primary/40 hover:bg-primary-subtle/30 transition-all cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-primary/30 mb-4" />
              <p className="text-muted-foreground">Haz clic para subir o arrastra una imagen</p>
              <p className="text-sm text-muted-foreground/60 mt-2">PNG, JPG hasta 10MB</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Nombre del Vehículo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Ej: Toyota Corolla"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Tipo de Vehículo *
              </label>
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Seleccionar...</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Truck">Camioneta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Año *
              </label>
              <input
                type="number"
                name="year"
                required
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Precio por Día ($) *
              </label>
              <input
                type="number"
                name="pricePerDay"
                required
                min="1"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Número de Asientos *
              </label>
              <input
                type="number"
                name="seats"
                required
                min="2"
                max="12"
                value={formData.seats}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Transmisión *
              </label>
              <select
                name="transmission"
                required
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Seleccionar...</option>
                <option value="Automatic">Automática</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automática</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Tipo de Combustible *
              </label>
              <select
                name="fuelType"
                required
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Seleccionar...</option>
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasolina</option>
                <option value="Hybrid">Híbrido</option>
                <option value="Electric">Eléctrico</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                Ubicación *
              </label>
              <select
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Seleccionar...</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-border-color rounded-xl bg-cream/30 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              placeholder="Describe tu vehículo..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-primary-dull transition-all text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide"
          >
            Publicar Vehículo
          </button>
        </form>
      </motion.div>
    </div>
  );
};
