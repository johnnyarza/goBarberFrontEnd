import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://192.168.1.9:3333',
});
console.log(process.env.BASE_URL);

export default api;
