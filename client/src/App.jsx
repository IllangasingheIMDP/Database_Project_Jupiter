import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './pages/Login';
import Home from './pages/Home';
import ADD_Employee from './pages/Add_Employee';
import Manage_CustomField from './pages/Manage_Custom_Fields';
import EditTableAttributes from './pages/Admin/Edit_Table_Attributes';
import TableDetails from './pages/Admin/EditTable';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {





  return (
    <>
    <AuthProvider>
    <Router>
    <Routes>
    <Route path="/" element={<LoginForm></LoginForm>} />
    <Route path="/login" element={<LoginForm></LoginForm>} />
    <Route path="/home" element={<ProtectedRoute allowedRoles={['Employee','Admin User','HR Manager','Second Manager']}><Home></Home></ProtectedRoute>} />
    <Route path="/add-new-employee" element={<ProtectedRoute allowedRoles={['Admin User','HR Manager']}><ADD_Employee></ADD_Employee></ProtectedRoute>} />
    <Route path="/manage-custom-field" element={<ProtectedRoute allowedRoles={['Admin User','HR Manager']}><Manage_CustomField></Manage_CustomField></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Employee','Admin User','HR Manager','Second Manager']}><Dashboard></Dashboard></ProtectedRoute>} />
    <Route path="/edit-table-data" element={<ProtectedRoute allowedRoles={['Admin User']}><EditTableAttributes /></ProtectedRoute>} />
    <Route path="/edit-table-data/:tableName" element={<ProtectedRoute allowedRoles={['Admin User']}><TableDetails /></ProtectedRoute>} />

    </Routes>
    </Router>



    </AuthProvider>
      
    </>
  );
}

export default App;
