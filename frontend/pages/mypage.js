import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyPage() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the page loads
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setMessage('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.put(
        'http://localhost:5000/api/user',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating user data:', err);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Page</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter a new password"
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Update Profile</button>
      {message && <p>{message}</p>}
    </div>
  );
}
