// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Home from './components/Home';
import FollowerList from './components/FollowerList';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';
import ResetPassword from './components/ResetPassword'; // Importa el componente ResetPassword
import SocketProvider from './components/SocketProvider';
import { ToastContainer } from 'react-toastify';

export const AuthContext = React.createContext();

const App = () => {
  const { isAuthenticated, loading, login, logout, error } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      <SocketProvider>
        <Router>
          <div className="font-sans">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Feed /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
              <Route path="/chat" element={isAuthenticated ? <FollowerList /> : <Navigate to="/" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
              <Route path="/bookmarks" element={isAuthenticated ? <Bookmarks /> : <Navigate to="/" />} />
              
              {/* Ruta para restablecer la contraseña con el token */}
              <Route path="/recovery" element={<ResetPassword />} />
              
              {/* Ruta para manejar cualquier otra URL */}
              <Route path='/*' element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default App;
