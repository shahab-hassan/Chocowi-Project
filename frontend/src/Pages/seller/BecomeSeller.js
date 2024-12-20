import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../../Components/utils/MultiSelect';
import Dropdown from '../../Components/utils/Dropdown'
import { FaArrowLeft, FaPlayCircle, FaPen,FaCamera } from 'react-icons/fa';
import image1 from '../../images/pngs/signUp4.png';
import image2 from '../../images/pngs/signUp1.png';
import image3 from '../../images/pngs/signUp3.png';
import image4 from '../../images/pngs/signUp4.png';
import image6 from '../../images/pngs/signUp5.png';
import firstBackground from '../../images/svgs/signUp3.svg';
import secondBackground from '../../images/svgs/signUp5.svg';

const SellerSignUpForm = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(image1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sellerType: { value: 'individual', label: 'Individual' },
    fullName: '',
    displayName: '',
    phoneNo: '',
    languages: [],
    briefDescription: '',
    yearEstablished: '',
    numberOfEmployees: '',
    services: [],
    country: '',
    state: '',
    city: '',
    address: '',
  });

  const handleInputChange = (input, value) => {
    setFormData(prevData => ({
      ...prevData,
      [input]: value
    }));
  };

 
  const serviceOptions = [
    { value: 'delivery', label: 'Delivery' },
    { value: 'pickup', label: 'Pickup' }
  ];

  const handleMultiSelectChange = (field, selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.label);
    handleInputChange(field, selectedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/sellerDashboard');
  };

  const handleDropdownChange = (field, selectedOption) => {
    console.log(`Dropdown ${field} changed:`, selectedOption.value);
    console.log('Current sellerType:', formData.sellerType);
    handleInputChange(field, selectedOption);
  };

  const changeImage = (newStep) => {
    switch (newStep) {
      case 1:
        setImage(image1);
        break;
      case 2:
        setImage(image3);
        break;
      case 3:
        setImage(image2);
        break;
      case 4:
        setImage(image4);
        break;
      case 5:
        setImage(image6);
        break;
      default:
        setImage(image1);
        break;
    }
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    changeImage(newStep);
  };

  const prevStep = () => {
    const newStep = step - 1;
    if (step > 1) {
      setStep(newStep);
      changeImage(newStep);
    }
  };

  const renderStep = () => {
    console.log('Rendering step:', step);
    console.log(formData);

    switch (step) {
      case 1:
        return (
          <div className="signUpContent">
            <div className="headerText">
              <h2 className="welcomeTitle">Seller Registration</h2>
              <p className="topText">Are you an individual or a company?</p>
            </div>
            <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <label htmlFor="sellerType" className="label">Seller Type</label>
              <Dropdown
                id="sellerType"
                options={[
                  { value: 'individual', label: 'Individual' },
                  { value: 'company', label: 'Company' }
                ]}
                value={formData.sellerType}
                onChange={(selectedOption) => handleDropdownChange('sellerType', selectedOption)}
                placeholder='Select seller type'
                required
              />
              <button type="submit" className="primaryBtn" disabled={!formData.sellerType}>Next</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="signUpContent">
            <div className="headerText">
              <h2 className="welcomeTitle">Enter Your Details</h2>
            </div>
            <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); 
              formData.sellerType.value === 'company' ? nextStep() : nextStep() }}>
                 <label htmlFor="sellerPicture" className="label">Seller Picture/Logo</label>
              <div className="sellerPictureUpload">
                <div className="uploadArea">
                  {formData.sellerPicture ? (
                    <div className="previewContainer">
                      <img
                        src={URL.createObjectURL(formData.sellerPicture)}
                        alt="Preview"
                        className="previewImage"
                      />
                      <button
                        onClick={(e) => {
                          handleInputChange('sellerPicture', null);
                          document.getElementById('sellerPicture').value = '';
                        }}
                        className="removeButton"
                      >
                        <FaPen />
                      </button>
                    </div>
                  ) : (
                    <div className="sellerUploadPlaceholder">
                      <FaCamera className="uploadIcon" />
                      <span>Seller Picture/Logo</span>
                    </div>
                  )}
                  <input
                    id="sellerPicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('sellerPicture', e.target.files[0])}
                    className="fileInput"
                  />
                </div>
              </div>
              <label htmlFor="fullName" className="label">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
                className='inputField'
              />
              <label htmlFor="displayName" className="label">Display Name</label>
              <input
                id="displayName"
                type="text"
                placeholder="Enter your Display Name"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                required
                className='inputField'
              />
             
              <button type="submit" className="primaryBtn">Next</button>
            </form>
          </div>
        );
      case 3:
        // Only render this step for companies
        if (formData.sellerType.value === 'individual') {
          nextStep();
          return null;
        }
        return (
          <div className="signUpContent">
            <div className="headerText">
              <h2 className="welcomeTitle">Business Details</h2>
            </div>
            <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <label htmlFor="yearEstablished" className="label">Year Established</label>
              <input
                id="yearEstablished"
                type="number"
                placeholder="Year established"
                value={formData.yearEstablished}
                onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                required
                className='inputField'
              />
              <label htmlFor="numberOfEmployees" className="label">Number of Employees</label>
              <input
                id="numberOfEmployees"
                type="number"
                placeholder="Number of employees"
                value={formData.numberOfEmployees}
                onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                required
                className='inputField'
              />
              <button type="submit" className="primaryBtn">Next</button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="signUpContent">
            <div className="headerText">
              <h2 className="welcomeTitle">Additional Information</h2>
            </div>
            <form className='signUpForm' onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <label htmlFor="services" className="label">Services</label>
              <MultiSelect
                options={serviceOptions}
                value={formData.services}
                onChange={(selectedOptions) => handleMultiSelectChange('services', selectedOptions)}
                placeholder="Select services"
              />
              <label htmlFor="country" className="label">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
                className='inputField'
              />
              <label htmlFor="state" className="label">State/Province</label>
              <input
                id="state"
                type="text"
                placeholder="State/Province"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
                className='inputField'
              />
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
              <button type="submit" className="primaryBtn">Next</button>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="signUpContent">
            <div className="headerText">
              <h2 className="welcomeTitle">About Your Business</h2>
            </div>
            <form className='signUpForm' onSubmit={handleSubmit}>
              <label htmlFor="briefDescription" className="label">Brief Description</label>
              <textarea
                id="briefDescription"
                placeholder="Tell us about your business"
                value={formData.briefDescription}
                onChange={(e) => handleInputChange('briefDescription', e.target.value)}
                maxLength="400"
                rows="6"
                required
                className='inputField'
              />
              <p className="wordCount">* Max 400 words ({formData.briefDescription.length} / 400)</p>

              <button type="submit" className="primaryBtn">Become a Seller</button>
            </form>
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
      <div className="signUpSection">
        <div className="leftSection">
          {renderStep()}
        </div>
        {step !== 2 && step != 5 && (
          <div className="rightSection">
            <img key={step} src={image} alt="Food Dish" className="centerImage" />
          </div>
        )}
        {(step === 2 || step === 5) && (
          <div className="rightSection" style={{ backgroundImage: `url(${step == 5 ? secondBackground : firstBackground})`, backgroundColor: 'transparent' }}>
            <img key={step} src={image} alt="Food Dish" className="centerImage" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerSignUpForm