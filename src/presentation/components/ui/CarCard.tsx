import { Link } from 'react-router-dom';
import { Users, Fuel, Settings, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Car } from '../../../domain/entities/Car';

interface CarCardProps {
  car: Car;
  index?: number;
  searchParams?: { location: string; pickupDate: string; returnDate: string } | null;
}

export const CarCard = ({ car, index = 0, searchParams }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/cars/${car.id}`} state={searchParams ? { searchParams } : undefined}>
        <div className="group rounded-2xl overflow-hidden bg-white border border-border-color hover:-translate-y-1.5 transition-all duration-500 cursor-pointer hover:shadow-xl hover:border-primary/20">
          <div className="relative h-52 overflow-hidden">
            <img
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={car.image}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium tracking-wide">
              {car.available ? 'Disponible' : 'No Disponible'}
            </p>
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-primary px-3 py-2 rounded-lg shadow-lg">
              <span className="font-bold text-lg">${car.pricePerDay}</span>
              <span className="text-sm text-muted-foreground"> / día</span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                <p className="text-muted-foreground text-sm">{car.type} • {car.year}</p>
              </div>
            </div>

            <div className="w-full h-px bg-border-color mb-4" />

            <div className="grid grid-cols-2 gap-y-2.5">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 text-primary/60" />
                <span>{car.seats} Asientos</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Fuel className="h-4 w-4 mr-2 text-primary/60" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Settings className="h-4 w-4 mr-2 text-primary/60" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary/60" />
                <span>{car.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
