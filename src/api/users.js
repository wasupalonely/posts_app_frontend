import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);

  console.log("🚀 ~ getUsers ~ response:", response.data);
  if (!response.data || response.data.length === 0) {
    return [];
  }

  return response.data;
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/users/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
