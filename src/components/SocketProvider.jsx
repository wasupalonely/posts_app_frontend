import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App'; // Asegúrate de importar AuthContext

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext); // Añadir loading
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!loading && isAuthenticated) { // Esperar a que loading sea false
      const token = localStorage.getItem('authToken');
      if (token) {
        const newSocket = io('http://localhost:3000', {
          auth: {
            token: token,
          },
        });
        setSocket(newSocket);

        return () => newSocket.disconnect();
      }
    }
  }, [isAuthenticated, loading]); // Añadir loading a las dependencias

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
