import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './App.css';
import CustomAlert from './components/CustomAlert';
import Home_Admin from './components/Home_Admin';
import Home_HR_1 from './components/Home_HR_1';
import Home_HR_2 from './components/Home_HR_2';
import Home_EMP from './components/Home_EMP';

import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import GenerateReport from './components/GenerateReport';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Define username and password using useState
  const [username, setUsername] = useState('');  // Initially empty
  const [password, setPassword] = useState('');  // Initially empty

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            setAlertMessage(data.message); // Show success message with custom alert
            setTimeout(() => {
                navigate(data.navigate); // Navigate to the User Home Page after a short delay
            }, 2000); // Delay navigation by 2 seconds for alert visibility
        } else {
            setAlertMessage(data.message); // Show error message with custom alert
        }
    } catch (error) {
        console.error('Error logging in:', error);
        setAlertMessage('Login failed. Please try again.'); // Show error message with custom alert
    }
};

  const backgroundImage = '/background.png';

  return (
    <div
      className="container-fluid"
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
        className="bg-light p-4 rounded shadow form-container"
      >
        <h2 className="text-center mb-4">Jupiter Apparels</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            
            <Form.Control type="text"
            placeholder="Enter username"
            value={username}  // Bind the input value to username state
            onChange={(e) => setUsername(e.target.value)}  // Update the username state when input changes
            />

          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
            placeholder="Enter password"
            value={password}  // Bind the input value to username state
            onChange={(e) => setPassword(e.target.value)}  // Update the username state when input changes
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="w-100 mt-3" onClick={handleLogin}>
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

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/admin-home" element={<Home_Admin />} />
      <Route path="/hr1-home" element={<Home_HR_1 />} />
      <Route path="/hr2-home" element={<Home_HR_2 />} />
      <Route path="/emp-home" element={<Home_EMP />} />

      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/edit-user" element={<EditUser />} />
      <Route path="/delete-user" element={<DeleteUser />} />
      <Route path="/generate-report" element={<GenerateReport />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  </Router>
);

export default App;