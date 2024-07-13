import React, { useState, useEffect } from 'react';
import { getUserById } from '../api/users';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user && user._id) {
            const userData = await getUserById(user._id);
            setUser(userData);
          }
        } else {
          console.error("No se pudo obtener el id del usuario desde localStorage.");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center mt-8">Cargando perfil...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <img
            src={user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            alt="Imagen de perfil"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(-1)} // Navegar hacia atrás en la historia
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
