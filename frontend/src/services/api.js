import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this if backend is deployed
  withCredentials: true, // This allows cookies/session to be sent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
