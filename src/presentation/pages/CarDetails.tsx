import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Fuel, Settings, MapPin, ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { MOCK_CARS } from '../../shared/data/mockCars';
import { LOCATIONS } from '../../shared/constants/locations';

registerLocale('es', es);

export const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const navState = location.state as { searchParams?: { location: string; pickupDate: string; returnDate: string } } | null;

  const [bookingLocation, setBookingLocation] = useState(navState?.searchParams?.location || '');
  const [pickupDate, setPickupDate] = useState<Date | null>(
    navState?.searchParams?.pickupDate ? new Date(navState.searchParams.pickupDate) : null
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    navState?.searchParams?.returnDate ? new Date(navState.searchParams.returnDate) : null
  );

  const car = MOCK_CARS.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Vehículo no encontrado</h2>
          <button
            onClick={() => navigate('/cars')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-all"
          >
            Volver a Carros
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppBooking = () => {
    const phone = '5804122036693';
    const pickupStr = pickupDate ? pickupDate.toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' }) : 'No seleccionada';
    const returnStr = returnDate ? returnDate.toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' }) : 'No seleccionada';
    const locationStr = bookingLocation || 'No seleccionada';

    const message = `Hola, estoy interesado en reservar el vehículo: *${car.name} ${car.year}*%0A%0AFecha de recogida: ${pickupStr}%0AFecha de devolución: ${returnStr}%0AUbicación: ${locationStr}`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
        {/* Left Column — Image + Specs */}
        <div className="lg:col-span-3 space-y-6">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-80 md:h-112 object-cover"
            />
            <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide">
              {car.available ? 'Disponible' : 'No Disponible'}
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-border-color"
          >
            <h3 className="text-lg font-semibold mb-5">Especificaciones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Asientos</p>
                  <p className="font-medium">{car.seats} personas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Combustible</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Transmisión</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Ubicación</p>
                  <p className="font-medium">{car.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          {car.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-border-color"
            >
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </motion.div>
          )}
        </div>

        {/* Right Column — Booking Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <div className="bg-white p-6 rounded-2xl border border-border-color sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {car.name}
                </h2>
                <p className="text-sm text-muted-foreground">{car.type} • {car.year}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">${car.pricePerDay}</span>
                <p className="text-xs text-muted-foreground">/ día</p>
              </div>
            </div>

            <div className="w-full h-px bg-border-color mb-6" />

            {/* Booking Form */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Ubicación de Recogida
                </label>
                <select
                  value={bookingLocation}
                  onChange={(e) => setBookingLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium text-sm"
                >
                  <option value="">Selecciona ubicación</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="datepicker-wrapper">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
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
                    placeholderText="Fecha"
                    className="w-full px-3 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium text-sm"
                    calendarClassName="roraima-calendar"
                  />
                </div>

                <div className="datepicker-wrapper">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Devolución
                  </label>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date: Date | null) => setReturnDate(date)}
                    minDate={pickupDate || new Date()}
                    locale="es"
                    dateFormat="dd MMM yyyy"
                    placeholderText="Fecha"
                    className="w-full px-3 py-3 bg-cream/50 border border-border-color rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-gray-700 font-medium text-sm"
                    calendarClassName="roraima-calendar"
                  />
                </div>
              </div>

              {/* Price Summary */}
              {pickupDate && returnDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-primary-subtle/50 p-4 rounded-xl"
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      ${car.pricePerDay} × {Math.max(1, Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)))} días
                    </span>
                    <span className="font-semibold">
                      ${car.pricePerDay * Math.max(1, Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)))}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* WhatsApp Booking Button */}
            <button
              onClick={handleWhatsAppBooking}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-xl transition-all text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-6 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Reservar por WhatsApp
            </button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Serás redirigido a WhatsApp para completar tu reserva
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
