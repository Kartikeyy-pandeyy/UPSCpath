import axios from 'axios';

const api = axios.create({
  baseURL: 'https://upscpath-production.up.railway.app', // Update this if backend is deployed
  withCredentials: true, // This allows cookies/session to be sent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
