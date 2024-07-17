import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUsers } from "../api/users";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    website: "",
    profilePicture: "",
  });
  const { userId } = useParams();
  const navigate = useNavigate();

  const myId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil del usuario:", error);
        toast.error("Error al cargar el perfil del usuario 😢", {
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

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    const {username, bio, email} = user
    console.log("camilq",user)
    await updateUsers(myId, {username, bio ,email})
    navigate(`/profile/${myId}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/users/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      toast.success("Perfil actualizado! 🦄", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil 😢", {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">Editar Perfil</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">
            Nombre de usuario:
          </label>
          <input

            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 dark:text-gray-300">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleUpdateUser}>
            Guardar Cambios
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
