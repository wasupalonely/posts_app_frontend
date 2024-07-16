import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const getCommentById = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/comments/${id}`, config);
    console.log("🚀 ~ getUserById ~ response:", response)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};