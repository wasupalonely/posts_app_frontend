import React, { useState, useEffect } from "react";
import { getUsers } from "../api/users";
import ChatWindow from "./ChatWindow";
import Testxd from "./Testxd"; // No se usa en el componente, considera eliminarlo si no es necesario.
import StatusMessage from "./StatusMessage";
const dummyProfileImg = 'https://via.placeholder.com/150';

const FollowerList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 h-screen">
      {/* Lista de usuarios */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-200 dark:bg-gray-800 p-2 md:p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 text-center">Chats</h1>
        <div>
          {users.map((user) => (
            <div key={user._id} onClick={() => setSelectedUser(user)} className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 cursor-pointer">
              <img src={user.profilePicture || dummyProfileImg} alt="Profile" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
              <div>
                <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white">{user.username}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
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
  );
};

export default FollowerList;
