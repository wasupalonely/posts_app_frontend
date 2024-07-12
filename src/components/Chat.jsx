import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io('https://postsappbackend-production.up.railway.app', {
      auth: { token },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('loadMessages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('privateMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('userList', (users) => {
      setUsers(users);
    });

    return () => {
      socket.off('loadMessages');
      socket.off('privateMessage');
      socket.off('userList');
    };
  }, [socket]);

  const handleStartChat = () => {
    socket.emit('startChat', receiver);
  };

  const handleSendMessage = () => {
    socket.emit('privateMessage', receiver, message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Chat en tiempo real</h2>
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4zM2 8a6 6 0 1110.92 4.92l4.42 4.42a1 1 0 01-1.42 1.42l-4.42-4.42A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div className="bg-gray-700 rounded-lg p-2">
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 shadow-md p-4 flex flex-wrap sm:flex-nowrap">
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="border border-gray-600 rounded-md p-2 flex-1 mr-2 bg-gray-700 text-white mb-2 sm:mb-0 sm:mr-2"
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button
          onClick={handleStartChat}
          className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-300"
        >
          Iniciar Chat
        </button>
      </div>
      <div className="bg-gray-800 shadow-md p-4 mt-2">
        <input
          type="text"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-600 rounded-md p-2 flex-1 mr-2 bg-gray-700 text-white"
        />
        <button
          onClick={handleSendMessage}
          className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-300 mt-2 sm:mt-0"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
