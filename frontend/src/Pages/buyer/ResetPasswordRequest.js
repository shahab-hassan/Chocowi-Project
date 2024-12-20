import axios from 'axios';
import React from 'react'
import { showToast } from '../../Components/utils/ShowToast';
import firstBackground from '../../images/svgs/signUp3.svg';
import secondImage from '../../images/pngs/signUp3.png';

function ResetPasswordRequest() {

    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const requestPasswordReset = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/resetPasswordRequest`, { email });
            if(response.data.success)
                showToast("Password reset link has been sent to your email", "success");
            else
                showToast("Something went wrong", "success");
        } catch (e) {
            if(e.response?.data?.error)
                showToast(e.response?.data?.error || "Something went wrong!", "error");
            else{
                console.log(e);
                showToast('Error Sending Email', "error");
            }
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="signUpSection">
            <div className="leftSection">
                <div className="signUpContent">
                    <div className="headerText">
                        <h2 className="welcomeTitle">Forgot Password</h2>
                    </div>
                    <form className='signUpForm' onSubmit={requestPasswordReset}>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='inputField'
                        />
                        <p className="noteText">
                            Note: We will send you an Email with the link to reset your password
                        </p>
                        <button type="submit" className="primaryBtn" disabled={loading}>{loading? "Sending Email..." : "Send Password Reset Link"}</button>
                    </form>
                </div>
            </div>
            <div className="rightSection" style={{ backgroundImage: `url(${firstBackground})`, backgroundColor: 'transparent' }}>
                <img src={secondImage} alt="Food Dish" className="centerImage" />
            </div>
        </div>
    )
}

export default ResetPasswordRequest