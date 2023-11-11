import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from '../src/pages/Profile/profile';
import Login from '../src/pages/Login/login';
import Register from '../src/pages/Register/register';
import Home from '../src/pages/home/home';
import React from 'react'

function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <code>{import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER}</code>
    </>
  )
}

export default App;

