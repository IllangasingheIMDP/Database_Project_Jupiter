import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {





  return (
    <>
    <AuthProvider>
    <Router>
    <Routes>
    <Route path="/login" element={<LoginForm></LoginForm>} />
    <Route path="/home" element={<ProtectedRoute><Home></Home></ProtectedRoute>} />

    </Routes>
    </Router>



    </AuthProvider>
      
    </>
  );
}

export default App;
