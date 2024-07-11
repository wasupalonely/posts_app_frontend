import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import Home from './components/Home';
import Post from './components/Post';
import Chat from './components/Chat';

const App = () => {
  const { isAuthenticated, login, logout, error } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      <Router>
        <Routes>
          <Route path='/*' element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/post" element={isAuthenticated ? <Post /> : <Navigate to="/" />} />
          <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

export default App;
