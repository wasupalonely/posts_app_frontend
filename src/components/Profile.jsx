import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import useUsers from "../hooks/useUsers";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const me = JSON.parse(localStorage.getItem("user"));
  const myId = JSON.parse(localStorage.getItem("user"))?._id;

  const { user, loading, error, setUser } = useUsers(userId);

  const isFollowing = user?.followers?.includes(myId);

  const handleImageClick = useCallback((imageUrl) => {
    setSelectedImage(imageUrl);
  }, []);

  const handleFollowUser = async (authorId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/users/${authorId}/toggle-follow`,
        { userId: myId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const userToFollow = await axios.get(
        `http://localhost:3000/api/v1/users/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!isFollowing) {
        const notificationBody = {
          from: myId,
          to: authorId,
          type: "follow",
          title: `@${me.username} te ha seguido!`,
          content: `${userToFollow.data.username}, mira quién te ha seguido!`,
        };

        await axios.post(
          "http://localhost:3000/api/v1/notifications",
          notificationBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      // Actualiza manualmente el estado del usuario para reflejar el cambio de seguimiento
      setUser((prevUser) => ({
        ...prevUser,
        followers: isFollowing
          ? prevUser.followers.filter((followerId) => followerId !== myId)
          : [...prevUser.followers, myId],
      }));

      toast.success(isFollowing ? "Dejado de seguir 🦄" : "Seguido! 🦄", {
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
      toast.error("Error al seguir al usuario 😢", {
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

  useEffect(() => {
    // Fetch posts for current user (me)
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/author/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          posts: response.data,
        }));
      } catch (error) {
        console.error("Error al cargar los posts del usuario:", error);
        toast.error("Error al cargar los posts del usuario 😢", {
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

    fetchPosts();
  }, [userId, setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error al cargar el perfil: {error.message}
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-8">No se encontró el usuario.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
          <img
            src={
              user.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Imagen de perfil"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-0"
          />
          <div className="sm:ml-6 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {user.bio}
              </p>
            )}
            {user.website && (
              <a
                href={user.website}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            )}
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {user?._id === myId && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => navigate(`/edit-profile/${userId}`)}
              >
                Editar Perfil
              </button>
            )}
            {user?._id !== myId && (
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
            )}
            <button
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center"
              onClick={() => navigate(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver
            </button>
          </div>
        </div>

        <div className="flex justify-around mt-8 mb-6 ">
          <div className="text-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {user.posts?.length || 0}
            </span>
            <p className="text-gray-600 dark:text-gray-400">Publicaciones</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {user.followers?.length || 0}
            </span>
            <p className="text-gray-600 dark:text-gray-400">Seguidores</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {user.following?.length || 0}
            </span>
            <p className="text-gray-600 dark:text-gray-400">Seguidos</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {user.posts &&
            user.posts.map((post, index) => (
              <div
                key={index}
                className="cursor-pointer relative rounded-lg overflow-hidden"
                onClick={() => handleImageClick(post.imageUrl)}
              >
                {post.media.length > 0 ? (
                  <img
                    src={post.media[0]}
                    alt={`Post ${index + 1}`}
                    className="w-full h-32 sm:h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No hay imagen
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center">
                  <span>{post.likes} Me gusta</span>
                  <span>{post.comments} Comentarios</span>
                </div>
              </div>
            ))}
        </div>

        <Modal
          isOpen={selectedImage !== null}
          onRequestClose={() => setSelectedImage(null)}
          className="absolute inset-0 flex items-center justify-center"
          overlayClassName="absolute inset-0 bg-black bg-opacity-75"
        >
          <img
            src={selectedImage}
            alt="Imagen seleccionada"
            className="max-h-full max-w-full"
          />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
