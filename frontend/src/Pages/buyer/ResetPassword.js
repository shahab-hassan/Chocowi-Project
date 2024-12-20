import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import secondBackground from '../../images/svgs/signUp5.svg';
import fourthImage from '../../images/pngs/signUp5.png';
import { showToast } from '../../Components/utils/ShowToast';
import axios from 'axios';

function ResetPassword() {

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPass] = React.useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const togglePasswordVisibility = (type) => {
        if (type === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };


    const resetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

        if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
            setPasswordError('Password must include uppercase, lowercase, number, and special character');
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/resetPassword/${token}`, { password, confirmPassword });
            showToast("Password reset successful", "success");
            navigate("/signin");
        } catch (e) {
            if (e.response?.data?.error)
                showToast(e.response?.data?.error, "error");
            else {
                console.log(e)
                showToast("Can't Reset Password... Something went wrong", "error");
            }

        }
    };


    return (
        <div className="signUpSection">
            <div className="leftSection">
                <div className="signUpContent">
                    <div className="headerText">
                        <h2 className="welcomeTitle">Reset Password</h2>
                        <p className="topText">Set a strong new password for your account</p>
                    </div>
                    <form className='signUpForm' onSubmit={resetPassword}>
                        <div className='passwordFieldUpper'>
                            <label htmlFor="password" className="label">New Password</label>
                            <div
                                className='hidePasswordBtn'
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
                            required
                            minLength="8"
                            className='inputField'
                        />
                        <div className='passwordFieldUpper'>
                            <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
                            <div
                                className='hidePasswordBtn'
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPass(e.target.value); setPasswordError('')}}
                            required
                            minLength="8"
                            className='inputField'
                        />
                        {passwordError && (
                            <p className="errorText" style={{ color: 'red', marginTop: '10px' }}>
                                {passwordError}
                            </p>
                        )}
                        <p className="passwordRequirements" style={{ fontSize: '0.8em', marginTop: '10px' }}>
                            Password must:
                            <ul>
                                <li>Be at least 8 characters long</li>
                                <li>Include uppercase and lowercase letters</li>
                                <li>Include a number</li>
                                <li>Include a special character</li>
                            </ul>
                        </p>
                        <button type="submit" className="primaryBtn">Confirm Reset Password</button>
                    </form>
                </div>
            </div>
            <div className="rightSection" style={{ backgroundImage: `url(${secondBackground})`, backgroundColor: 'transparent' }}>
                <img src={fourthImage} alt="Food Dish" className="centerImage" />
            </div>
        </div>
    );
}

export default ResetPassword