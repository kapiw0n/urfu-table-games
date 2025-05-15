import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes';
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;