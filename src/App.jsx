import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import FollowerList from './components/FollowerList';
import Feed from './components/Feed';
import LandingPage from './components/LandingPage'; // Importa el nuevo componente

const App = () => {
  const { isAuthenticated, login, logout, error } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/feed" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/feed" element={isAuthenticated ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/chat" element={isAuthenticated ? <FollowerList /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

export default App;
