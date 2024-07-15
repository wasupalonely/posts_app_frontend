// PostsList.jsx
import React, { useEffect, useState } from "react";
import { getUserById } from "../api/users";
import StatusMessage from "./StatusMessage";
import Post from "./Post";
import axios from "axios";
import { toast } from "react-toastify";

const PostsList = ({
  posts,
  handleDeletePost,
  handleLikePost,
  handleBookmarkPost,
  loading,
  error,
}) => {
  const [users, setUsers] = useState({});
  const dummyImage = "https://via.placeholder.com/150";
  const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = {};
      for (const post of posts) {
        if (!users[post.authorId] && !usersData[post.authorId]) {
          try {
            const response = await getUserById(post.authorId);
            usersData[post.authorId] = response;
          } catch (error) {
            console.error(
              `Error fetching user data for authorId ${post.authorId}:`,
              error
            );
            usersData[post.authorId] = {
              username: "Unknown",
              profilePicture: dummyImage,
            };
          }
        }
      }
      setUsers((prevUsers) => ({ ...prevUsers, ...usersData }));
    };

    fetchUsers();
  }, [posts]);

  const handleFollowUser = async (authorId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/users/${authorId}/toggle-follow`, {userId: id}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const updatedUser = response.data;

      setUsers((prevUsers) => ({
        ...prevUsers,
        [authorId]: {
          ...prevUsers[authorId],
          followers: updatedUser.followers,
        },
      }));
      toast.success('Seguido! 🦄', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
      toast.error('Error al seguir al usuario 😢', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {posts.length === 0 ? (
        <div>
          <StatusMessage message="Aún no hay posts por acá" type={"empty"} />
        </div>
      ) : error ? (
        <div>
          <StatusMessage type={"error"} message={error} />
        </div>
      ) : loading ? (
        <div>
          <StatusMessage type={"loading"} message={"Cargando..."} />
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            user={users[post.authorId]}
            id={id}
            handleLikePost={handleLikePost}
            handleBookmarkPost={handleBookmarkPost}
            handleDeletePost={handleDeletePost}
            handleFollowUser={handleFollowUser}
          />
        ))
      )}
    </>
  );
};

export default PostsList;
