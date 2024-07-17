import { useState, useEffect } from "react";
import { getUsers } from "../api/users";
import ChatWindow from "./ChatWindow";
import StatusMessage from "./StatusMessage";
import Sidebar from "./Sidebar";

const dummyProfileImg = 'https://via.placeholder.com/150';

const FollowerList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authorId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.filter((user) => user._id !== authorId));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Renderiza la barra lateral si está abierta */}
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Botón para abrir la barra lateral en pantallas pequeñas */}
        <div className="md:hidden p-4 bg-gray-800">
          <button onClick={toggleSidebar} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Lista de usuarios */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-200 dark:bg-gray-800 p-2 md:p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Botón para volver atrás */}
            <div className="p-4 bg-gray-800">
              <button onClick={() => window.history.back()} className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>

            {/* Encabezado "Chats" */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Chats</h1>
          </div>

          <div>
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 cursor-pointer"
              >
                <img src={user.profilePicture || dummyProfileImg} alt="Profile" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                <div>
                  <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white">{user.username}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ventana de chat */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-2 md:p-4">
          {selectedUser ? (
            <ChatWindow user={selectedUser} />
          ) : (
            <StatusMessage
              type="info"
              message="Empieza una charla con tus amigos!"
              genericImage={'group'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowerList;
