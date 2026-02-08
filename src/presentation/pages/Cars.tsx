import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { CarCard } from '../components/ui/CarCard';
import { MOCK_CARS } from '../../shared/data/mockCars';

interface SearchParams {
  location: string;
  pickupDate: string;
  returnDate: string;
}

export const Cars = () => {
  const { state } = useLocation();
  const searchParams: SearchParams | null = state?.searchParams || null;
  const [filter, setFilter] = useState('all');

  const filteredCars = filter === 'all' 
    ? MOCK_CARS 
    : MOCK_CARS.filter(car => car.type === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-5 py-2 bg-primary/8 text-primary rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6 border border-primary/10">
          Colección
        </span>
        <h1 
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Nuestros Vehículos
        </h1>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-4" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explora nuestra amplia selección de vehículos disponibles para alquiler en Puerto Ordaz
        </p>
      </motion.div>

      {/* Search Summary */}
      {searchParams && (searchParams.location || searchParams.pickupDate) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8 px-6 py-4 bg-primary-subtle rounded-2xl border border-primary/10 max-w-3xl mx-auto"
        >
          {searchParams.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{searchParams.location}</span>
            </div>
          )}
          {searchParams.pickupDate && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{searchParams.pickupDate}</span>
              {searchParams.returnDate && (
                <>
                  <span className="text-muted-foreground">→</span>
                  <span>{searchParams.returnDate}</span>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center gap-3 mb-12 flex-wrap"
      >
        {['all', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
              filter === type
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white border border-border-color hover:border-primary/30 hover:bg-primary-subtle'
            }`}
          >
            {type === 'all' ? 'Todos' : type}
          </button>
        ))}
      </motion.div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} searchParams={searchParams} />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No se encontraron vehículos con este filtro
          </p>
        </div>
      )}
    </div>
  );
};
