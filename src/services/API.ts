import axios from 'axios';
import { API_URL, API_KEY } from '@env';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    language: 'pt-BR',
  },
});

export default API;
