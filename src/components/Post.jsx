import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../animations/like.json";
import animationBookmark from "../animations/bookmark.json";
import { useNavigate } from "react-router-dom";

const Post = ({
  post,
  user,
  id,
  handleLikePost,
  handleBookmarkPost,
  handleDeletePost,
  handleAddComment,
}) => {
  const dummyImage = "https://via.placeholder.com/150";
  const isLiked = post.likes.includes(id);
  const isBookmarked = post.bookmarks.includes(id);
  const me = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);
  const [isAnimatingBookmark, setIsAnimatingBookmark] = useState(false);
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/comments/post/${post._id}`
      );
      const data = await response.data;
      setComments(data);
      setLoadingComments(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await handleAddComment(post._id, comment);
        setComment("");
        setComments([
          ...comments,
          {
            content: comment,
            authorUsername: me.username,
          },
        ]);
      } catch (err) {
        toast.error("Error al crear el comentario 😢", {
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
    } else {
      toast.error("El comentario no puede estar vacío", {
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

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleLikeClick = (postId) => {
    setIsAnimatingLike(true);
    handleLikePost(postId);

    setTimeout(() => setIsAnimatingLike(false), 1000);
  };

  const handleBookmarkClick = (postId) => {
    setIsAnimatingBookmark(true);
    handleBookmarkPost(postId);

    setTimeout(() => setIsAnimatingBookmark(false), 1000);
  };

  useEffect(() => {
    getComments();
  }, []);

  if (!user) {
    return (
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
        <Skeleton
          height={40}
          width={40}
          circle={true}
          baseColor="#333"
          highlightColor="#444"
        />
        <Skeleton
          height={20}
          width={`60%`}
          baseColor="#333"
          highlightColor="#444"
        />
        <Skeleton
          height={20}
          width={`80%`}
          baseColor="#333"
          highlightColor="#444"
        />
        <Skeleton height={200} baseColor="#333" highlightColor="#444" />
      </div>
    );
  }

  const defaultLikeOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultBookmarkOptions = {
    loop: false,
    autoplay: false,
    animationData: animationBookmark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={user.profilePicture || dummyImage}
          alt={`${user.username || "Unknown"}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div
          onClick={() => navigate(`/profile/${user._id}`)}
          className="cursor-pointer"
        >
          <p className="text-white">
            {user.username || (
              <Skeleton width={100} baseColor="#333" highlightColor="#444" />
            )}
          </p>
        </div>
      </div>
      <p className="text-white">{post.content}</p>
      {post.media && post.media.length > 0 && (
        <div className="flex space-x-2 mt-2">
          {post.media.map((media, index) => (
            <img
              key={index}
              src={media}
              alt={`Media ${index}`}
              className="max-w-full h-auto rounded-md max-h-64 cursor-pointer"
              onClick={() => openModal(media)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-3">
          <button
            onClick={() => handleLikeClick(post._id)}
            className="text-white hover:text-red-500 focus:outline-none relative"
            style={{ width: 24, height: 24 }} // Asegúrate de que el botón tenga un tamaño fijo
          >
            {!isLiked ? (
              <box-icon
                name="heart"
                type="regular"
                animation="tada-hover"
                color="white"
                style={{ width: 24, height: 24 }}
              ></box-icon>
            ) : isAnimatingLike ? (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Lottie options={defaultLikeOptions} height={43} width={43} />
              </div>
            ) : (
              <box-icon
                name="heart"
                type="solid"
                animation="tada-hover"
                color="#f9423e"
                style={{ width: 24, height: 24 }}
              ></box-icon>
            )}
          </button>

          <p className="text-white">{post.likes.length}</p>
          <button
            onClick={() => handleBookmarkClick(post._id)}
            className="text-white hover:text-blue-500 focus:outline-none relative"
            style={{ width: 24, height: 24 }}
          >
            {!isBookmarked ? (
              <box-icon
                name="bookmark"
                type="regular"
                color="white"
                style={{ width: 24, height: 24 }}
              ></box-icon>
            ) : isAnimatingBookmark ? (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Lottie
                  options={defaultBookmarkOptions}
                  height={28}
                  width={28}
                />
              </div>
            ) : (
              <box-icon
                name="bookmark"
                type="solid"
                color="#ff9700"
                style={{ width: 24, height: 24 }}
              ></box-icon>
            )}
          </button>
          <p className="text-white">{post.bookmarks.length}</p>
          <button
            onClick={toggleComments}
            className="text-white hover:text-green-500 focus:outline-none"
          >
            <box-icon
              name="comment"
              type="regular"
              color={showComments ? "green" : "white"}
            ></box-icon>
          </button>
          <p className="text-white">{comments.length}</p>
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

      {showComments && (
        <div className="mt-4">
          <h3 className="text-white text-lg mb-2">Comentarios</h3>
          {loadingComments ? (
            <Skeleton count={3} baseColor="#333" highlightColor="#444" />
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-300 text-sm">
                  <strong>{comment.authorUsername}:</strong> {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay comentarios.</p>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-2">
            <input
              type="text"
              className="w-full border border-gray-600 rounded-md p-2 mb-2 text-white bg-gray-700"
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={handleCommentChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Comentar
            </button>
          </form>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Imagen Grande"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-4xl w-full max-h-screen z-50">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white text-xl z-50"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Imagen Grande"
            className="w-full h-auto object-contain z-50"
            style={{ maxHeight: "90vh" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Post;
