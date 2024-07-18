import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const likePost = async (postId, userId) => {
  console.log("🚀 ~ likePost ~ postId, userId:", postId, userId);
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(
      `${API_URL}/posts/${postId}/like`,
      {
        userId,
      },
      config
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getPostById = async (postId) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/posts/${postId}`, config);
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getPostsByUserId = async (userId, page) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/posts/author/${userId}?limit=10&page=${page}`, config);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
