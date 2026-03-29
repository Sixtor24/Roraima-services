export interface BookingRecord {
  id: string;
  bookingDate: string;
  clientName: string;
  carModel: string;
  carPlate: string;
  carType: string;
  plan: string;
  startDate: string;
  endDate: string;
  hasDriver: boolean;
  payment: number;
  paymentStatus: 'Paid' | 'Pending';
  status: 'Returned' | 'Ongoing' | 'Cancelled';
}

export interface VehicleUnit {
  id: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  plate: string;
  status: 'Available' | 'Maintenance' | 'Unavailable';
  units: number;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  fuelType: string;
  pricePerDay: number;
  image: string;
  description: string;
  topSpeed: string;
  acceleration: string;
  range: string;
  features: string[];
  kmTraveled: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  carModel: string;
  carPlate: string;
  time: string;
  type: 'booking' | 'payment' | 'return' | 'maintenance';
}

export interface ReminderItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'maintenance' | 'return' | 'document' | 'payment';
}

export const BOOKINGS: BookingRecord[] = [
  { id: 'BK-RS1001', bookingDate: 'Ago 1, 2026', clientName: 'Alice Johnson', carModel: 'Toyota Corolla', carPlate: 'TX1234', carType: 'Sedan', plan: '2 Días', startDate: 'Ago 1, 2026', endDate: 'Ago 2, 2026', hasDriver: false, payment: 50, paymentStatus: 'Paid', status: 'Returned' },
  { id: 'BK-RS1002', bookingDate: 'Ago 1, 2026', clientName: 'Bob Smith', carModel: 'Honda Civic', carPlate: 'HX5678', carType: 'Sedan', plan: '7 Días', startDate: 'Ago 1, 2026', endDate: 'Ago 8, 2026', hasDriver: false, payment: 350, paymentStatus: 'Pending', status: 'Ongoing' },
  { id: 'BK-RS1003', bookingDate: 'Ago 2, 2026', clientName: 'Charlie Davis', carModel: 'Ford Focus', carPlate: 'FX9101', carType: 'Hatchback', plan: '31 Días', startDate: 'Ago 2, 2026', endDate: 'Sep 2, 2026', hasDriver: false, payment: 1000, paymentStatus: 'Paid', status: 'Ongoing' },
  { id: 'BK-RS1004', bookingDate: 'Ago 2, 2026', clientName: 'Diana White', carModel: 'Chevrolet Malibu', carPlate: 'CX2345', carType: 'Sedan', plan: '1 Día', startDate: 'Ago 2, 2026', endDate: 'Ago 3, 2026', hasDriver: true, payment: 50, paymentStatus: 'Paid', status: 'Returned' },
  { id: 'BK-RS1005', bookingDate: 'Ago 3, 2026', clientName: 'Edward Green', carModel: 'Nissan Altima', carPlate: 'NX6789', carType: 'Sedan', plan: '8 Días', startDate: 'Ago 3, 2026', endDate: 'Ago 10, 2026', hasDriver: false, payment: 350, paymentStatus: 'Pending', status: 'Ongoing' },
  { id: 'BK-RS1006', bookingDate: 'Ago 3, 2026', clientName: 'Fiona Brown', carModel: 'BMW X5', carPlate: 'BW3456', carType: 'SUV', plan: '32 Días', startDate: 'Ago 3, 2026', endDate: 'Sep 3, 2026', hasDriver: true, payment: 1500, paymentStatus: 'Paid', status: 'Ongoing' },
  { id: 'BK-RS1007', bookingDate: 'Ago 4, 2026', clientName: 'George Clark', carModel: 'Audi Q7', carPlate: 'AQ7890', carType: 'SUV', plan: '2 Días', startDate: 'Ago 4, 2026', endDate: 'Ago 5, 2026', hasDriver: false, payment: 70, paymentStatus: 'Paid', status: 'Returned' },
  { id: 'BK-RS1008', bookingDate: 'Ago 4, 2026', clientName: 'Helen Martinez', carModel: 'Mazda 3', carPlate: 'MZ1234', carType: 'Sedan', plan: '7 Días', startDate: 'Ago 4, 2026', endDate: 'Ago 11, 2026', hasDriver: false, payment: 450, paymentStatus: 'Pending', status: 'Cancelled' },
  { id: 'BK-RS1009', bookingDate: 'Ago 5, 2026', clientName: 'Ivan Rodriguez', carModel: 'Hyundai Elantra', carPlate: 'HE5678', carType: 'Sedan', plan: '31 Días', startDate: 'Ago 5, 2026', endDate: 'Sep 5, 2026', hasDriver: false, payment: 1200, paymentStatus: 'Paid', status: 'Ongoing' },
  { id: 'BK-RS1010', bookingDate: 'Ago 5, 2026', clientName: 'Jane Wilson', carModel: 'Mercedes C-Class', carPlate: 'MC9012', carType: 'Sedan', plan: '2 Días', startDate: 'Ago 5, 2026', endDate: 'Ago 6, 2026', hasDriver: true, payment: 60, paymentStatus: 'Paid', status: 'Returned' },
];

export const VEHICLES: VehicleUnit[] = [
  {
    id: 'v1', brand: 'Toyota', model: 'Corolla', type: 'Sedan', year: 2024, plate: 'TX1234',
    status: 'Available', units: 3, transmission: 'Automatic', seats: 5, fuelType: 'Gasolina',
    pricePerDay: 45, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop',
    description: 'El Toyota Corolla es un sedán confiable y eficiente, ideal para viajes urbanos y recorridos largos. Reconocido por su rendimiento de combustible y comodidad excepcional.',
    topSpeed: '180 km/h', acceleration: '9.2s (0-100)', range: '650 km', features: ['Aire Acondicionado', 'Bluetooth', 'Cámara de Reversa', 'Control Crucero', 'Entrada sin llave', 'Ventanas Eléctricas', 'Radio AM/FM con USB', 'Puertos de Carga USB', 'Baúl Espacioso'],
    kmTraveled: 489,
  },
  {
    id: 'v2', brand: 'Honda', model: 'Civic', type: 'Sedan', year: 2024, plate: 'HX5678',
    status: 'Available', units: 8, transmission: 'Manual', seats: 5, fuelType: 'Gasolina',
    pricePerDay: 45, image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=400&h=250&fit=crop',
    description: 'El Honda Civic combina diseño deportivo con eficiencia. Perfecto para conductores que buscan rendimiento y estilo en un paquete accesible.',
    topSpeed: '195 km/h', acceleration: '8.5s (0-100)', range: '600 km', features: ['Aire Acondicionado', 'Bluetooth', 'Cámara de Reversa', 'Control Crucero', 'Honda Sensing', 'Ventanas Eléctricas'],
    kmTraveled: 312,
  },
  {
    id: 'v3', brand: 'Nissan', model: 'Ariya', type: 'SUV', year: 2025, plate: 'NA9012',
    status: 'Available', units: 10, transmission: 'Automatic', seats: 5, fuelType: 'Híbrido',
    pricePerDay: 55, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop',
    description: 'El Nissan Ariya ofrece tecnología de punta con un diseño futurista. SUV crossover ideal para familias que buscan comodidad y eficiencia.',
    topSpeed: '160 km/h', acceleration: '7.5s (0-100)', range: '480 km', features: ['Aire Acondicionado', 'Bluetooth', 'ProPILOT Assist', 'Pantalla Táctil', 'Carga Inalámbrica', 'Baúl Espacioso'],
    kmTraveled: 567,
  },
  {
    id: 'v4', brand: 'Toyota', model: 'Hilux', type: 'Camioneta', year: 2024, plate: 'TH3456',
    status: 'Maintenance', units: 2, transmission: 'Automatic', seats: 5, fuelType: 'Diesel',
    pricePerDay: 60, image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop',
    description: 'La Toyota Hilux es la camioneta más resistente del mercado. Ideal para rutas exigentes y trabajo pesado en Ciudad Guayana.',
    topSpeed: '170 km/h', acceleration: '10.1s (0-100)', range: '700 km', features: ['Aire Acondicionado', 'Bluetooth', 'Tracción 4x4', 'Control de Estabilidad', 'Frenos ABS'],
    kmTraveled: 890,
  },
  {
    id: 'v5', brand: 'Toyota', model: 'Fortuner', type: 'SUV', year: 2025, plate: 'TF7890',
    status: 'Available', units: 4, transmission: 'Automatic', seats: 7, fuelType: 'Diesel',
    pricePerDay: 120, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop',
    description: 'La Toyota Fortuner ofrece espacio, potencia y lujo. Perfecta para familias grandes y viajes de aventura por Venezuela.',
    topSpeed: '175 km/h', acceleration: '9.8s (0-100)', range: '750 km', features: ['Aire Acondicionado', 'Bluetooth', 'Cámara 360°', 'Tracción 4x4', '7 Asientos', 'Pantalla Táctil', 'Puertos USB'],
    kmTraveled: 234,
  },
  {
    id: 'v6', brand: 'Chevrolet', model: 'Malibu', type: 'Sedan', year: 2024, plate: 'CX2345',
    status: 'Available', units: 6, transmission: 'Automatic', seats: 5, fuelType: 'Gasolina',
    pricePerDay: 100, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
    description: 'El Chevrolet Malibu combina elegancia con tecnología avanzada. Un sedán premium para quienes buscan confort superior.',
    topSpeed: '190 km/h', acceleration: '8.0s (0-100)', range: '620 km', features: ['Aire Acondicionado', 'Bluetooth', 'Apple CarPlay', 'Android Auto', 'Asientos de Cuero', 'Ventanas Eléctricas'],
    kmTraveled: 445,
  },
  {
    id: 'v7', brand: 'Ford', model: 'Focus', type: 'Hatchback', year: 2023, plate: 'FX9101',
    status: 'Unavailable', units: 0, transmission: 'Manual', seats: 5, fuelType: 'Gasolina',
    pricePerDay: 40, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop',
    description: 'El Ford Focus es ágil y divertido de conducir. Compacto y eficiente, perfecto para la ciudad.',
    topSpeed: '200 km/h', acceleration: '8.8s (0-100)', range: '580 km', features: ['Aire Acondicionado', 'Bluetooth', 'SYNC 3', 'Cámara de Reversa'],
    kmTraveled: 678,
  },
  {
    id: 'v8', brand: 'Hyundai', model: 'Tucson', type: 'SUV', year: 2025, plate: 'HT6789',
    status: 'Available', units: 5, transmission: 'Automatic', seats: 5, fuelType: 'Gasolina',
    pricePerDay: 65, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop',
    description: 'El Hyundai Tucson redefine el segmento SUV compacto con diseño audaz y tecnología de vanguardia.',
    topSpeed: '185 km/h', acceleration: '8.2s (0-100)', range: '650 km', features: ['Aire Acondicionado', 'Bluetooth', 'BlueLink', 'Pantalla Táctil 10.25"', 'Cámara de Reversa', 'Control Crucero Adaptativo'],
    kmTraveled: 356,
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', user: 'Alice Johnson', action: 'completó una reserva para', carModel: 'Toyota Corolla', carPlate: 'TX1234', time: '10:15 AM', type: 'booking' },
  { id: '2', user: 'Bob Smith', action: 'pago pendiente para', carModel: 'Honda Civic', carPlate: 'HX5678', time: '11:30 AM', type: 'payment' },
  { id: '3', user: 'Charlie Davis', action: 'inició un alquiler mensual para', carModel: 'Ford Focus', carPlate: 'FX9101', time: '09:45 AM', type: 'booking' },
  { id: '4', user: 'Diana White', action: 'devolvió el', carModel: 'Chevrolet Malibu', carPlate: 'CX2345', time: '02:20 PM', type: 'return' },
  { id: '5', user: 'Edward Green', action: 'pago pendiente para', carModel: 'Nissan Altima', carPlate: 'NX6789', time: '03:10 PM', type: 'payment' },
];

export const REMINDERS: ReminderItem[] = [
  { id: '1', title: 'Mantenimiento Programado para Toyota Corolla', date: '2026-08-10', time: '10:00 AM', type: 'maintenance' },
  { id: '2', title: 'Devolución de Honda Civic', date: '2026-08-12', time: '02:00 PM', type: 'return' },
  { id: '3', title: 'Cambio de Cauchos para Toyota Fortuner', date: '2026-08-15', time: '09:00 AM', type: 'maintenance' },
  { id: '4', title: 'Cambio de Aceite para Hyundai Tucson', date: '2026-08-19', time: '11:30 AM', type: 'maintenance' },
];
