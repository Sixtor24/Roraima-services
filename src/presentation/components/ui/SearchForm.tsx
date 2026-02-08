import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { LOCATIONS } from '../../../shared/constants/locations';

registerLocale('es', es);

interface SearchFormProps {
  onSearch?: (params: { location: string; pickupDate: string; returnDate: string }) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = {
      location,
      pickupDate: pickupDate ? pickupDate.toISOString().split('T')[0] : '',
      returnDate: returnDate ? returnDate.toISOString().split('T')[0] : '',
    };
    if (onSearch) onSearch(params);
    navigate('/cars', { state: { searchParams: params } });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3 tracking-wide">
              <MapPin className="w-4 h-4 text-primary" />
              Ubicación
            </label>
            <select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium"
            >
              <option value="">Selecciona ubicación</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="relative datepicker-wrapper">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3 tracking-wide">
              <Calendar className="w-4 h-4 text-primary" />
              Recogida
            </label>
            <DatePicker
              selected={pickupDate}
              onChange={(date: Date | null) => {
                setPickupDate(date);
                if (returnDate && date && returnDate < date) {
                  setReturnDate(null);
                }
              }}
              minDate={new Date()}
              locale="es"
              dateFormat="dd MMM yyyy"
              placeholderText="Selecciona fecha"
              className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium"
              calendarClassName="roraima-calendar"
              required
            />
          </div>

          {/* Return Date */}
          <div className="relative datepicker-wrapper">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3 tracking-wide">
              <Calendar className="w-4 h-4 text-primary" />
              Devolución
            </label>
            <DatePicker
              selected={returnDate}
              onChange={(date: Date | null) => setReturnDate(date)}
              minDate={pickupDate || new Date()}
              locale="es"
              dateFormat="dd MMM yyyy"
              placeholderText="Selecciona fecha"
              className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium"
              calendarClassName="roraima-calendar"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="relative">
            <label className="hidden md:flex items-center gap-2 text-sm font-medium text-transparent mb-3 tracking-wide pointer-events-none">
              &nbsp;
            </label>
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};
