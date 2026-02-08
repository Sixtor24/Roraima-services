export interface Car {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck';
  year: number;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual' | 'Semi-Automatic';
  fuelType: 'Diesel' | 'Gasoline' | 'Hybrid' | 'Electric';
  location: string;
  available: boolean;
  features?: string[];
  description?: string;
}
