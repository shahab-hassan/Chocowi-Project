import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../Components/utils/ShowToast';
import axios from "axios"

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/checkLogin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.isLogin) {
          setIsLogin(true);
          setUser(response.data.user);
        } else {
          setIsLogin(false);
          setUser(null);
        }
      } catch (error) {
        setIsLogin(false);
        setUser(null);
      }
    }
    else {
      setIsLogin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loggedOut')) {
      showToast("Logged out Successfully!", "success");
      localStorage.removeItem('loggedOut');
    }
    fetchUserData();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLogin(true);
    fetchUserData();
    localStorage.removeItem('adminToken');
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      setIsLogin(false);
      setUser(null);
      localStorage.setItem("loggedOut", 'true');
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <LoginContext.Provider value={{ isLogin, login, logout, fetchUserData, user }}>
      {children}
    </LoginContext.Provider>
  );
};
