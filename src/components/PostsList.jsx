import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserById } from "../api/users";

const PostsList = ({ posts, handleDeletePost }) => {
  const [users, setUsers] = useState({});

  const dummyImage = "https://via.placeholder.com/150"; // URL de una imagen dummy

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = {};
      for (const post of posts) {
        if (!users[post.authorId] && !usersData[post.authorId]) {
          try {
            const response = await getUserById(post.authorId);
            console.log("🚀 ~ fetchUsers ~ response:", response)
            usersData[post.authorId] = response;
          } catch (error) {
            console.error(`Error fetching user data for authorId ${post.authorId}:`, error);
            usersData[post.authorId] = { username: "Unknown", photo: dummyImage };
          }
        }
      }

      console.log("first usersData", usersData);
      setUsers((prevUsers) => ({ ...prevUsers, ...usersData }));
    };

    fetchUsers();
  }, [posts]);

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
        >
          <div className="flex items-center mb-2">
            <img
              src={users[post.authorId]?.profilePicture || dummyImage}
              alt={`${users[post.authorId]?.username || "Unknown"}'s avatar`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="text-white">{users[post.authorId]?.username || "Unknown"}</p>
          </div>
          <p className="text-white">{post.content}</p>
          {post.media && post.media.length > 0 && (
            <div className="flex space-x-2 mt-2">
              {post.media.map((media, index) => (
                <img
                  key={index}
                  src={media}
                  alt={`Media ${index}`}
                  className="max-w-full h-auto rounded-md max-h-64"
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-400 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleDeletePost(post._id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostsList;
