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
