import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    carName: 'Toyota Corolla',
    carImage: 'https://ik.imagekit.io/greatstack/tr:w-1280:q-auto:f-webp/cars/car_image2_K-t4zyiXPE.png',
    pickupLocation: 'Puerto Ordaz',
    pickupDate: '2026-02-15',
    returnDate: '2026-02-20',
    totalPrice: 650,
    status: 'confirmed' as const,
  },
  {
    id: '2',
    carName: 'BMW X5',
    carImage: 'https://res.cloudinary.com/djbvf02yt/image/upload/v1744788418/lyuytro9fy4sjv58zecs.png',
    pickupLocation: 'San Félix',
    pickupDate: '2026-03-01',
    returnDate: '2026-03-05',
    totalPrice: 1500,
    status: 'pending' as const,
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

const statusText = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Completada',
};

export const MyBookings = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-5 py-2 bg-primary/8 text-primary rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6 border border-primary/10">
          Gestión
        </span>
        <h1 
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Mis Reservas
        </h1>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-4" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Gestiona tus reservas de vehículos
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-6">
        {mockBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg mb-4">
              No tienes reservas actualmente
            </p>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-all">
              Explorar Vehículos
            </button>
          </motion.div>
        ) : (
          mockBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.carImage}
                  alt={booking.carName}
                  className="w-full md:w-64 h-48 object-cover"
                />
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{booking.carName}</h3>
                      <p className="text-gray-500">Reserva #{booking.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                      {statusText[booking.status]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium">{booking.pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Recogida</p>
                        <p className="font-medium">{new Date(booking.pickupDate).toLocaleDateString('es-VE')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Devolución</p>
                        <p className="font-medium">{new Date(booking.returnDate).toLocaleDateString('es-VE')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Precio Total</p>
                        <p className="font-medium text-lg">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-all">
                      Ver Detalles
                    </button>
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all">
                        Cancelar Reserva
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
