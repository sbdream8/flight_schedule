import { useState } from 'react';
import axios from 'axios';

const apiKey = "YOUR_API_KEY";

export default function FlightSearch() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const fetchFlights = async () => {
    const url = `https://api.flightapi.io/trackbyroute/${apiKey}?date=${date}&airport1=${departure}&airport2=${arrival}`;
    try {
      const response = await axios.get(url);
      setFlights(response.data);
      setError('');
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError('Failed to fetch flight data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <input
        type="text"
        placeholder="Departure Airport"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        type="text"
        placeholder="Arrival Airport"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchFlights}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id}>
              <h2>{flight.Airline}</h2>
              <p>Flight Number: {flight.FlightNumber}</p>
              <p>Price: {flight.price}</p>
            </div>
          ))
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
}
