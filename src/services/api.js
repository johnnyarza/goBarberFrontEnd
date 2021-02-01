import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://192.81.219.9:3333',
});

export default api;
