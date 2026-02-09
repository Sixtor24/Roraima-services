import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Star, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchForm } from '../components/ui/SearchForm';
import { CarCard } from '../components/ui/CarCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { Newsletter } from '../components/ui/Newsletter';
import { MOCK_CARS } from '../../shared/data/mockCars';
import heroBg from '../../assets/pzo.avif';

const testimonials = [
  {
    name: 'María González',
    location: 'Puerto Ordaz, Venezuela',
    rating: 5,
    comment: 'Excelente servicio, el carro estaba en perfectas condiciones y la atención fue excepcional.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Carlos Pérez',
    location: 'San Félix, Venezuela',
    rating: 5,
    comment: 'Roraima Services hizo mi viaje mucho más fácil. El carro fue entregado directamente a mi puerta!',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Ana Rodríguez',
    location: 'Ciudad Guayana, Venezuela',
    rating: 5,
    comment: 'Altamente recomendado! Su flota es increíble y siempre siento que obtengo el mejor trato.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const FEATURES = [
  { icon: Shield, title: 'Seguro Integral', desc: 'Todos nuestros vehículos cuentan con cobertura total para tu tranquilidad.' },
  { icon: Clock, title: 'Entrega Inmediata', desc: 'Recibe tu vehículo en el lugar y hora que prefieras, sin esperas.' },
  { icon: Star, title: 'Flota Premium', desc: 'Vehículos en excelente estado, revisados y preparados para cada viaje.' },
];

export const Home = () => {
  const [searchParams, setSearchParams] = useState<{ location: string; pickupDate: string; returnDate: string } | null>(null);

  const handleSearch = (params: { location: string; pickupDate: string; returnDate: string }) => {
    setSearchParams(params);
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO — Cinematic full-bleed with layered depth
      ═══════════════════════════════════════════════════ */}
      <div className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-7xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <span>
                🇻🇪
              </span>
              <span className="text-white/70 text-xs font-medium tracking-widest uppercase">Venezuela, Puerto Ordaz</span>
            </motion.div>

            {/* Headline — editorial split */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tu próximo
              <br />
              <span className="text-primary-light">destino</span> te espera
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base md:text-lg text-white/60 max-w-lg mb-10 leading-relaxed"
            >
              Alquila vehículos premium en Ciudad Guayana. 
              Reserva en minutos, conduce con confianza.
            </motion.p>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <SearchForm onSearch={handleSearch} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          FEATURES — Horizontal strip
      ═══════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-border-color">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-subtle flex items-center justify-center shrink-0">
                  <feat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          FEATURED VEHICLES — Editorial grid
      ═══════════════════════════════════════════════════ */}
      <div className="py-24 md:py-32 px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-b from-light to-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Nuestra Flota</span>
              <h2
                className="text-3xl md:text-5xl text-gray-900 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Vehículos<br className="hidden md:block" /> Destacados
              </h2>
            </div>
            <Link to="/cars" className="group flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Ver toda la colección
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_CARS.slice(0, 6).map((car, index) => (
              <CarCard key={car.id} car={car} index={index} searchParams={searchParams} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-14"
          >
            <Link to="/cars">
              <button className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dull text-white rounded-xl cursor-pointer font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Explorar Vehículos
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          CTA — Propietarios
      ═══════════════════════════════════════════════════ */}
      <div className="py-20 md:py-28 px-6 md:px-16 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Image side */}
          <div className="relative h-64 lg:h-auto">
            <img
              alt="Vehículo de lujo"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/30 hidden lg:block" />
          </div>

          {/* Content side */}
          <div
            className="relative p-8 md:p-12 lg:p-14 flex flex-col justify-center"
            style={{
              background: 'linear-gradient(135deg, #1a0a0c 0%, #990322 60%, #c00c22 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6 border border-white/15 text-white/70">
                Propietarios
              </span>
              <h2
                className="text-3xl md:text-4xl text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ¿Tienes un vehículo?
                <br />
                <span className="text-white/70">Ponlo a trabajar.</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed max-w-md">
                Nos encargamos de todo: seguro integral, verificación de conductores 
                y pagos seguros. Tú solo recibe tus ganancias.
              </p>
              <Link to="/contact">
                <button className="px-7 py-3.5 bg-white hover:bg-gray-100 transition-all text-primary-dull rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                  Contáctanos
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <div className="py-24 md:py-28 px-6 md:px-16 lg:px-24 xl:px-32 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Testimonios</span>
              <h2
                className="text-3xl md:text-5xl text-gray-900 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Lo que dicen<br className="hidden md:block" /> nuestros clientes
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Cientos de clientes satisfechos confían en nosotros para cada viaje.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};
