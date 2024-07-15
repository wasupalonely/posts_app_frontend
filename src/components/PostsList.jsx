import React, { useEffect, useState } from "react";
import { getUserById } from "../api/users";
import StatusMessage from "./StatusMessage";

const PostsList = ({
  posts,
  handleDeletePost,
  handleLikePost,
  handleBookmarkPost,
  loading,
  error,
}) => {
  console.log("🚀 ~ posts:", posts);
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
              photo: dummyImage,
            };
          }
        }
      }
      setUsers((prevUsers) => ({ ...prevUsers, ...usersData }));
    };

    fetchUsers();
  }, [posts]); // Ejecutar cuando cambia posts

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
        posts.map((post) => {
          const isLiked = post.likes.includes(id);
          return (
            <div
              key={post._id}
              className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex items-center mb-2">
                <img
                  src={users[post.authorId]?.profilePicture || dummyImage}
                  alt={`${
                    users[post.authorId]?.username || "Unknown"
                  }'s avatar`}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="text-white">
                  {users[post.authorId]?.username || "Unknown"}
                </p>
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
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLikePost(post._id)}
                    className="text-white hover:text-red-500 focus:outline-none"
                  >
                    <box-icon
                      name="heart"
                      type={isLiked ? "solid" : "regular"}
                      animation="tada-hover"
                      color={isLiked ? "red" : "white"}
                    ></box-icon>
                  </button>

                  <button
                    onClick={() =>
                      handleBookmarkPost(post._id)
                    }
                    className="text-white hover:text-blue-500 focus:outline-none"
                  >
                    <box-icon
                      name="bookmark"
                      type={post.bookmarks.includes(id) ? "solid" : "regular"}
                      color={post.bookmarks.includes(id) ? "yellow" : "white"}
                    ></box-icon>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                {id === post.authorId && handleDeletePost && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <box-icon name="trash-alt" color="red"></box-icon>
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default PostsList;
