import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getUsers } from '../api/users'; // Ajustar según la ubicación real del archivo de API

const socket = io('https://postsappbackend-production.up.railway.app', {
  auth: {
    token: localStorage.getItem('token'),
  }
});

const Testxd = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await getUsers(); // Función para obtener usuarios, ajuste según su estructura
        setUsers(usersResponse);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      socket.emit('loadMessages', selectedUser.userId);
      socket.on('loadMessages', (msgs) => {
        setMessages(msgs);
      });
    }

    socket.on('privateMessage', (msg) => {
      if (msg.sender === selectedUser.userId || msg.receiver === selectedUser.userId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off('loadMessages');
      socket.off('privateMessage');
    };
  }, [selectedUser]);

  const handleStartChat = () => {
    socket.emit('startChat', receiver);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('privateMessage', receiver, message);
    setMessage('');
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  return (
    <div className="flex h-screen">
      {/* Lista de usuarios */}
      <div className="bg-gray-900 text-white p-4 w-1/4">
        <h1 className="text-xl font-semibold mb-4">Usuarios</h1>
        <div className="overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.userId}
              className={`cursor-pointer p-2 rounded-lg mb-2 ${
                selectedUser?.userId === user.userId ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleUserClick(user)}
            >
              {user.username}
            </div>
          ))}
        </div>
      </div>
      {/* Chat */}
      <div className="flex-1 flex flex-col bg-gray-800 text-white overflow-y-auto">
        <div className="p-4 flex justify-between items-center bg-gray-900">
          <h1 className="text-xl font-semibold">{selectedUser ? selectedUser.username : 'Chat'}</h1>
          <button className="text-gray-300 hover:text-gray-100 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4">
          {selectedUser ? (
            <>
              <div className="flex flex-col items-start mb-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start mb-2 ${msg.sender === selectedUser.userId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`bg-gray-700 rounded-lg p-2 max-w-xs ${msg.sender === selectedUser.userId ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                      <p>{msg.message}</p>
                      <p className="text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Message"
                  className="bg-gray-700 rounded-md p-2 text-white outline-none flex-1 mr-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-center mt-4">Selecciona un usuario para comenzar a chatear</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testxd;
