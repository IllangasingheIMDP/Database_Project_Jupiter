// src/routes/ProtectedRoute.js

import React, { useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children,allowedRoles  }) {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user } = useSelector(state => state.user);

  // Get user function
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('http://localhost:5555/getUserData',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        
        
      } else {
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  // Only perform role checks once user is set
  if (user) {
    if (allowedRoles && !allowedRoles.includes(user.Auth_Level)) {
      return <Navigate to="/unauthorized" />;
    }
    return children; // Proceed if user is authenticated and authorized
  }

  // Handle token case where user is not set yet
  if (localStorage.getItem("token")) {
    return <div>Loading...</div>; // Optional: Show a loading spinner while fetching user
  } else {
    return <Navigate to="/login" />;
  }
}