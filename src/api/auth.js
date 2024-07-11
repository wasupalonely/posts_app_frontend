import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const login = async (identifier, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { identifier, password });
  return response.data;
};
