import React, { useState, useContext, useEffect } from 'react';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import axios from 'axios';
import { showToast } from '../../Components/utils/ShowToast';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const incompleteUser = urlParams.get('incompleteUser');

    if (token) {
      window.history.replaceState({}, document.title, window.location.pathname);
      login(token);
      if (incompleteUser === 'true') {
        navigate('/completeProfile');
      } else {
        showToast("Login Successful!", "success");
        navigate('/');
      }
    }
  }, [login, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/login`, formData);
      if (response.data.success) {
        const { token } = response.data;
        login(token);
        showToast("Login Successful!", "success");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.error || "Login Failed", "error");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/login/${provider}`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signInContainer">
      <form className="signInContent" onSubmit={handleSubmit}>
        <h2 className="signInTitle">LogIn to your Account</h2>
        <div className="inputContainer">
          <label htmlFor="email" className="label">Enter Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="inputField"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="inputContainer">
          <div className='passwordFieldUpper'>
          <label htmlFor="password" className="label">Enter Password</label>
            <div
              className='hidePasswordBtn'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="inputField pr-10"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <Link to="/resetPasswordRequest" className='forgotPasswordBtn'>Forgot Password?</Link>
        <button type="submit" className="primaryBtn">Continue</button>
        <div className="separator">Or Sign in with</div>
        <div className="socialLoginContainer">
          <button
            type="button"
            className="socialLogin googleLogin"
            onClick={() => handleSocialLogin('google')}
          >
            <FaGoogle className="icon" />
            Continue with Google
          </button>
          <button
            type="button"
            className="socialLogin facebookLogin"
            onClick={() => handleSocialLogin('facebook')}
          >
            <FaFacebook className="icon" />
            Continue with Facebook
          </button>
        </div>
        <div className="signInFooter">
          <p>Don't have an account yet? <Link to="/signup" className="signin">Sign Up</Link> </p>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;