import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch favorite flights when the page loads
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage
        const response = await axios.get('http://localhost:5000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setMessage('Failed to load favorite flights.');
      }
    };

    fetchFavorites();
  }, []);

  // Remove a flight from favorites
  const handleRemoveFavorite = async (flightId) => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      await axios.delete(`http://localhost:5000/api/favorites/${flightId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the favorites list
      setFavorites((prevFavorites) =>
        prevFavorites.filter((flight) => flight.id !== flightId)
      );
      setMessage('Flight removed from favorites.');
    } catch (err) {
      console.error('Error removing favorite:', err);
      setMessage('Failed to remove flight from favorites.');
    }
  };

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <div>
      <h1>Favorite Flights</h1>
      {message && <p>{message}</p>}
      {favorites.length > 0 ? (
        <div>
          {favorites.map((flight) => (
            <div key={flight.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h2>{flight.Airline}</h2>
              <p>Flight Number: {flight.FlightNumber}</p>
              <p>Departure: {flight.DepartureAirport}</p>
              <p>Arrival: {flight.ArrivalAirport}</p>
              <p>Price: ${flight.Price}</p>
              <button onClick={() => handleRemoveFavorite(flight.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite flights found.</p>
      )}
    </div>
  );
}
