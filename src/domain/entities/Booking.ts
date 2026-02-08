export interface Booking {
  id: string;
  carId: string;
  userId: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
