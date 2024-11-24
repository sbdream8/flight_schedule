import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Airline: { type: String, required: true },
  FlightNumber: { type: String, required: true },
  DepartureAirport: { type: String, required: true },
  ArrivalAirport: { type: String, required: true },
  Price: { type: Number, required: true },
});

export default mongoose.model('Favorite', favoriteSchema);
