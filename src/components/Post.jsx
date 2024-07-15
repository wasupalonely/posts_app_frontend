// Post.jsx
import React from "react";
import { toast } from "react-toastify";

const Post = ({
  post,
  user,
  id,
  handleLikePost,
  handleBookmarkPost,
  handleDeletePost,
  handleFollowUser,
}) => {
  const dummyImage = "https://via.placeholder.com/150";
  const isLiked = post.likes.includes(id);
  const isFollowing = user?.followers?.includes(id);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={user?.profilePicture || dummyImage}
          alt={`${user?.username || "Unknown"}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <p className="text-white">{user?.username || "Unknown"}</p>
        {/* {user?._id !== id && (
          <button
            onClick={() => handleFollowUser(user._id)}
            className={`ml-3 px-4 py-2 font-semibold rounded-full focus:outline-none transition-colors duration-300 ${
              isFollowing
                ? "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isFollowing ? "Siguiendo" : "Seguir"}
          </button>
        )} */}
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
            onClick={() => handleBookmarkPost(post._id)}
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
};

export default Post;
