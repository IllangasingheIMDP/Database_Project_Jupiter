import React, { useState } from 'react';
import {  useNavigate,Link} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import CustomAlert from '../components/CustomAlert'; // Assuming you have a CustomAlert component
import backgroundImage from '../../public/background.png'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import api from '../axios'; 
import './Login.css'
const LoginForm = () => {

  const [alertMessage, setAlertMessage] = useState(null); // No need for TypeScript type definition
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  // Define username and password using useState
  const [username, setUsername] = useState('');  // Initially empty
  const [password, setPassword] = useState('');  // Initially empty

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      dispatch(showLoading());
      
      const res = await api.post('/login', {
        username,
        password
    });
    dispatch(hideLoading());
      

      if (res.data.success) {
        
        localStorage.setItem('token', res.data.token);
        
        setAlertMessage(res.data.message); // Show success message with custom alert
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); 
      } else {
        
        setAlertMessage(res.data.message); // Show error message with custom alert
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setAlertMessage('Login failed. Please try again.'); // Show error message with custom alert
    }
  };

 

  return (
    <div
      className="container-fluid border"
      style={{
        height: '100vh',
        background: `url(${backgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="p-4 rounded shadow bg-white/60 backdrop-blur-md form-container  "
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-900">Jupiter Apparels</h2>
        <Form >
          <Form.Group controlId="formUsername" className='flex justify-start items-start flex-col'>
            <Form.Label className='mb-1 text-yellow-700 font-semibold'>Username</Form.Label>
            <Form.Control
            className='w-full p-2 border-b-2 border-gray-300 focus:border-yellow-500 outline-none bg-transparent'
              type="text"
              placeholder="Enter username"
              value={username}  // Bind the input value to username state
              onChange={(e) => setUsername(e.target.value)}  // Update the username state when input changes
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label className='mb-1 text-yellow-700 font-semibold' >Password</Form.Label>
            <Form.Control
            className='w-full p-2 border-b-2 border-gray-300 focus:border-yellow-500 outline-none bg-transparent'
              type="password"
              placeholder="Enter password"
              value={password}  // Bind the input value to password state
              onChange={(e) => setPassword(e.target.value)}  // Update the password state when input changes
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="w-full py-2 px-4 mt-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-900 transition-colors duration-300" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
      {/* Custom Alert for showing messages */}
      {alertMessage && (
        <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default LoginForm;
