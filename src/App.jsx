import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import Home from './components/Home';
import FollowerList from './components/FollowerList';
import Feed from './components/Feed';

const App = () => {
  const { isAuthenticated, login, logout, error } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      <Router>
        <Routes>
          <Route path='/*' element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Feed /> : <Login />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
          <Route path="/chat" element={isAuthenticated ? <FollowerList /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

export default App;
