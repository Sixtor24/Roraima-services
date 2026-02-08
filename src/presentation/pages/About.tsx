import { motion } from 'framer-motion';
import { Shield, Award, Users, Heart, MapPin, Clock } from 'lucide-react';

const VALUES = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Cada vehículo pasa por rigurosas inspecciones para garantizar tu seguridad y tranquilidad en cada viaje.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Nos comprometemos a ofrecer el más alto estándar de servicio, desde la reserva hasta la devolución.',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Nuestro equipo está dedicado a entender tus necesidades y brindarte la mejor experiencia posible.',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Amamos lo que hacemos y eso se refleja en cada detalle de nuestro servicio.',
  },
];

const STATS = [
  { value: '500+', label: 'Clientes Satisfechos' },
  { value: '50+', label: 'Vehículos Disponibles' },
  { value: '5+', label: 'Años de Experiencia' },
  { value: '24/7', label: 'Soporte al Cliente' },
];

export const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-br from-gray-950 via-gray-900 to-primary-dull/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(192,12,34,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-light text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Nuestra Historia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Más que un servicio de alquiler,<br className="hidden md:block" />
            <span className="text-primary-light">una experiencia premium</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            En Roraima Services nos dedicamos a transformar cada viaje en una experiencia 
            inolvidable, combinando vehículos de primera calidad con un servicio excepcional 
            en el corazón de Ciudad Guayana.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center border border-border-color shadow-lg"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="py-20 md:py-28 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1449965408869-ebd3fee7e2c3?q=80&w=1200&auto=format&fit=crop"
                alt="Equipo Roraima Services"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ¿Quiénes Somos?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Roraima Services nació con la visión de ofrecer un servicio de alquiler de 
                vehículos que superara las expectativas de nuestros clientes en Ciudad Guayana 
                y sus alrededores.
              </p>
              <p>
                Desde nuestros inicios, nos hemos enfocado en mantener una flota diversa y 
                en excelente estado, que va desde sedanes ejecutivos hasta SUVs de lujo, 
                adaptándonos a las necesidades de cada cliente.
              </p>
              <p>
                Nuestro compromiso va más allá del simple alquiler: brindamos asesoría 
                personalizada, asistencia en carretera y la tranquilidad de saber que estás 
                en las mejores manos.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Puerto Ordaz, Venezuela
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Lun - Sáb: 8:00 AM - 6:00 PM
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 md:py-28 px-6 md:px-16 lg:px-24 xl:px-32 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">Lo que nos define</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nuestros Valores
          </h2>
          <div className="w-16 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-border-color hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
