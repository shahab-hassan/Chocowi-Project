import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import MultiSelect from '../../Components/utils/MultiSelect';
import Dropdown from '../../Components/utils/Dropdown';
import firstImage from '../../images/pngs/signUp1.png';
import firstBackground from '../../images/svgs/signUp3.svg';
import secondBackground from '../../images/svgs/signUp5.svg';
import secondImage from '../../images/pngs/signUp3.png';
import thirdImage from '../../images/pngs/signUp4.png';
import fourthImage from '../../images/pngs/signUp5.png';
import { showToast } from '../../Components/utils/ShowToast';
import axios from 'axios';
import countries from "../../data/countries.json"
import { states } from "../../data/constants"

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', country: '', state: '', city: '',
    address: '', username: '', phone: '', secondaryPhone: '', languages: '',
    currency: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // let [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);


  const togglePasswordVisibility = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleInputChange = (input, value) => {
    setFormData(prevData => {
      if (input === 'country') {
        return {
          ...prevData,
          country: value,
          state: value.label === 'Canada' ? null : { name: '', tax: 5 }
        };
      }

      if (input === 'state' && formData.country?.label === 'Canada') {
        return {
          ...prevData,
          state: {
            name: value.label,
            tax: value.value
          }
        };
      }

      return { ...prevData, [input]: value };
    });

    if (input === 'password' || input === 'confirmPassword')
      setPasswordError('');
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      setPasswordError('Password must include uppercase, lowercase, number, and special character');
      return;
    }

    const submissionData = {
      ...formData,
      country: {
        name: formData.country.label,
        code: formData.country.value
      },
    };

    // setLoading(true);
    axios.post(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/register`, submissionData).then(() => {
      showToast("An Email has been sent to you for verification... Please check your inbox!", "success")
      navigate("/signin")
    }).catch((e) => {
      console.log(e);
      showToast(e.response?.data?.error || "Something went wrong", "error")
    })
    // .finally(() => {
    // setLoading(false);
    // })
  };


  const handleSocialLogin = (provider) => {
    window.location.href = `${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/login/${provider}`;
  };


  const renderPage = () => {
    switch (step) {

      case 1:
        return (
          <div className="signUpSection">
            <div className="leftSection">
              <div className="signUpContent">
                <div className="headerText">
                  <h2 className="welcomeTitle">Welcome</h2>
                  <p className="topText">Get started - it's free. No credit card needed.</p>
                </div>
                <button className="socialLogin googleLogin" onClick={() => handleSocialLogin('google')}>
                  <FaGoogle className="icon" />
                  Continue with Google
                </button>
                <button className="socialLogin facebookLogin" onClick={() => handleSocialLogin('facebook')}>
                  <FaFacebook className="icon" />
                  Continue with Facebook
                </button>
                <div className="separator">Or</div>
                <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <label htmlFor="email" className="label">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className='inputField'
                  />
                  <button type="submit" className="primaryBtn">Next</button>
                </form>
                <div className="loginOption">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </div>
              </div>
            </div>
            <div className="rightSection">
              <img key={step} src={firstImage} alt="Food Dish" className="centerImage" />
            </div>
          </div>
        );

      // case 2:
      //   return (
      //     <div className="signUpSection">
      //       <div className="leftSection">
      //         <div className="signUpContent">
      //           <div className="headerText">
      //             <h2 className="welcomeTitle">Welcome</h2>
      //             <p className="topText">Enter application language</p>
      //           </div>
      //           <form  className='signUpForm'onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
      //             <label htmlFor="language" className="label">Application Language</label>
      //             <Dropdown
      //               id="language"
      //               options={[{ value: 'English-CAD', label: 'English-CAD' }, { value: 'French', label: 'French' }]}
      //               value={formData.language}
      //               onChange={(value) => handleInputChange('language', value)}
      //               placeholder='Select application language'
      //               required
      //             />
      //             <button type="submit" className="primaryBtn">Next</button>
      //           </form>
      //           <div className="loginOption">
      //             Already have an account? <Link to="/signin">Sign In</Link>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="rightSection">
      //         <img key={step} src={thirdImage} alt="Food Dish" className="centerImage" />
      //       </div>
      //     </div>
      //   );

      case 2:
        return (
          <div className="signUpSection">
            <div className="rightSection">
              <img src={thirdImage} alt="Food Dish" className="centerImage" />
            </div>
            <div className="leftSection">
              <div className="signUpContent">
                <div className="headerText">
                  <h2 className="welcomeTitle">Enter Your Details</h2>
                </div>
                <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <label htmlFor="username" className="label">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                    className='inputField'
                  />
                  <label htmlFor="phone" className="label">Phone Number</label>
                  <input
                    id="phone"
                    type="Number"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className='inputField'
                  />
                  <label htmlFor="secondaryPhone" className="label">Secondary Phone Number (Optional)</label>
                  <input
                    id="secondaryPhone"
                    type="Number"
                    placeholder="Enter secondary phone number"
                    value={formData.secondaryPhone}
                    onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                    className='inputField'
                  />
                  <label htmlFor="languages" className="label">Languages</label>
                  <MultiSelect
                    id="languages"
                    options={[{ value: 'English', label: 'English' }, { value: 'French', label: 'French' }]}
                    value={formData.languages?.split(', ') || []}
                    onChange={(selectedLanguages) => handleInputChange('languages', selectedLanguages.map(lang => lang.label).join(', '))}
                    placeholder="Select languages"
                    required
                  />
                  <label htmlFor="currency" className="label">Currency</label>
                  <Dropdown
                    id="currency"
                    options={[{ value: 'USD', label: 'United States Dollars (USD)' }, { value: 'CAD', label: 'Canadian Dollar (CAD)' }]}
                    value={formData.currency}
                    onChange={(value) => handleInputChange('currency', value)}
                    placeholder='Select currency'
                    required
                  />
                  <button type="submit" className="primaryBtn">Next</button>
                </form>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="signUpSection">
            <div className="leftSection">
              <div className="signUpContent">
                <div className="headerText">
                  <h2 className="welcomeTitle">Enter Your Details</h2>
                </div>
                <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <label htmlFor="country" className="label">Country</label>
                  <Dropdown
                    id="country"
                    options={countries.map(country => ({ value: country.code, label: country.name }))}
                    value={formData.country}
                    onChange={(value) => handleInputChange('country', value)}
                    placeholder='Select Country'
                    required
                  />
                  <label htmlFor="state" className="label">State/Province</label>
                  {formData.country.label === "Canada" ?
                    <Dropdown
                      id="state"
                      options={states.map(state => ({ value: state.tax, label: state.name }))}
                      value={formData.state ? { value: formData.state.tax, label: formData.state.name } : null}
                      onChange={(value) => handleInputChange('state', value)}
                      placeholder='Select State'
                      required
                    /> :
                    <input
                      id="state"
                      type="text"
                      placeholder="State/Province"
                      value={formData.state?.name || ''}
                      onChange={(e) => handleInputChange('state', { name: e.target.value, tax: 5 })}
                      required
                      className='inputField'
                    />}
                  <label htmlFor="city" className="label">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    className='inputField'
                  />
                  <label htmlFor="address" className="label">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className='inputField'
                  />
                  <p className="noteText">
                    Note: This will be helpful for us to find sellers near you
                  </p>
                  <button type="submit" className="primaryBtn">Next</button>
                </form>
              </div>
            </div>
            <div className="rightSection" style={{ backgroundImage: `url(${firstBackground})`, backgroundColor: 'transparent' }}>
              <img key={step} src={secondImage} alt="Food Dish" className="centerImage" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="signUpSection">
            <div className="leftSection">
              <div className="signUpContent">
                <div className="headerText">
                  <h2 className="welcomeTitle">Create Password</h2>
                  <p className="topText">Set a strong password for your account</p>
                </div>
                <form className='signUpForm' onSubmit={handleSubmit}>
                  <div className='passwordFieldUpper'>
                    <label htmlFor="password" className="label">Password</label>
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
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    minLength="8"
                    className='inputField'
                  />
                  <div className='passwordFieldUpper'>
                    <label htmlFor="confirmPassword" className="label">Confirm Password</label>
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
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
                  <button type="submit" className="primaryBtn">Confirm and Create Account</button>
                </form>
              </div>
            </div>
            <div className="rightSection" style={{ backgroundImage: `url(${secondBackground})`, backgroundColor: 'transparent' }}>
              <img src={fourthImage} alt="Food Dish" className="centerImage" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className="signUpContainer">
      {step > 1 && (
        <div className={`backArrow ${step === 1 ? 'disabled' : ''}`} onClick={prevStep}>
          <FaArrowLeft />
        </div>
      )}
      {renderPage()}
    </div>
  );
};

export default SignUpForm;