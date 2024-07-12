import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getUserById } from '../api/users';

const socket = io('https://postsappbackend-production.up.railway.app', {
  auth: {
    token: localStorage.getItem('token'),
  }
});

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserAndLoadMessages = async () => {
      if (!user || !user.id) return;

      try {
        const userData = await getUserById(user.id);
        if (!userData) {
          throw new Error('User not found');
        }

        const response = await fetch(`https://postsappbackend-production.up.railway.app/messages/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    fetchUserAndLoadMessages();

    if (user && user.id) {
      socket.emit('startChat', user.id);
    }

    socket.on('privateMessage', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('privateMessage');
    };
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    socket.emit('privateMessage', user.id, message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="h-8 w-8 rounded-full" />
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">{user.username}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active now</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.667 3.5a.75.75 0 000 1.5h14.666a.75.75 0 000-1.5H2.667zM10 8.25a.75.75 0 00-.75.75v5.5a.75.75 0 001.5 0v-5.5a.75.75 0 00-.75-.75zm-4.75.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm8.5 0a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === user.username ? 'items-end' : 'items-start'} my-2`}>
            <div className={`rounded-lg py-2 px-4 ${msg.sender === user.username ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white self-start'}`}>
              <p>{msg.message}</p>
            </div>
            <span className={`text-xs text-gray-600 dark:text-gray-400 mt-1 ${msg.sender === user.username ? 'text-right' : 'text-left'}`}>
              {msg.sender}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center p-3 border-t border-gray-300 dark:border-gray-700">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        />
        <button
          className="ml-3 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
