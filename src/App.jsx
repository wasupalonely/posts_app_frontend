import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword'
import Register from './components/Register';
import Home from './components/Home';
import FollowerList from './components/FollowerList';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';

const App = () => {
  const { isAuthenticated, login, logout, error } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      <Router>
        <div className="font-sans">
        <Routes>
          <Route path='/*' element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Feed /> : <Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
          <Route path="/chat" element={isAuthenticated ? <FollowerList /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path='/bookmarks' element={isAuthenticated ? <Bookmarks /> : <Navigate to="/" />} />
        </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

export default App;
