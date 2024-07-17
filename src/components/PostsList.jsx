// PostsList.jsx
import React, { useEffect, useState } from "react";
import { getUserById } from "../api/users";
import StatusMessage from "./StatusMessage";
import Post from "./Post";
import axios from "axios";
import { toast } from "react-toastify";
import usePosts from "../hooks/usePosts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostsList = ({
  posts,
  handleDeletePost,
  handleLikePost,
  handleBookmarkPost,
  loading,
  error,
}) => {
  const [users, setUsers] = useState({});
  const { handleAddComment } = usePosts();
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
            handleAddComment={handleAddComment}
          />
        ))
      )}
    </>
  );
};

export default PostsList;
