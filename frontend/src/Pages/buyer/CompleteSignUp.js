import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../../Components/utils/MultiSelect';
import Dropdown from '../../Components/utils/Dropdown';
import firstBackground from '../../images/svgs/signUp3.svg';
import secondImage from '../../images/pngs/signUp3.png';
import thirdImage from '../../images/pngs/signUp4.png';
import { showToast } from '../../Components/utils/ShowToast';
import axios from 'axios';
import countries from "../../data/countries.json"
import { states } from "../../data/constants"

const SignUpForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        country: '', state: '', city: '',
        address: '', username: '', phone: '', secondaryPhone: '', languages: '',
        currency: ''
    });
    // let [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();
    const nextStep = () => setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);


    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/checkLogin`, {headers: {Authorization: `Bearer ${token}`}});
                if (response.data.success && response.data.user) {
                    const user = response.data.user;
                    setFormData(prevData => ({
                        ...prevData,
                        username: user.username || '',
                        phone: user.phone || '',
                        secondaryPhone: user.secondaryPhone || '',
                        languages: user.languages || '',
                        currency: user.currency || '',
                        country: user.buyerAddress?.country?.name ?
                            { value: user.buyerAddress.country.code, label: user.buyerAddress.country.name } : '',
                        state: user.buyerAddress?.state?.name ?
                            { value: user.buyerAddress.state.tax, label: user.buyerAddress.state.name } : '',
                        city: user.buyerAddress?.city || '',
                        address: user.buyerAddress?.address || ''
                    }));
                }
            } catch (error) {
                console.error('Error fetching user details', error);
                showToast('Failed to fetch user details', 'error');
            }
        };

        fetchUserDetails();
    }, [])

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
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const submissionData = {
            ...formData,
            country: {
                name: formData.country.label,
                code: formData.country.value
            },
        };
        const token = localStorage.getItem("token");
        // setLoading(true);
        axios.post(`${process.env.REACT_APP_Backend_Host_Name}/api/v1/auth/updateUser`, submissionData, {headers: {Authorization: `Bearer ${token}`}}).then(() => {
            showToast("Profile completed successfully!", "success");
            navigate("/")
        }).catch((e) => {
            console.log(e);
            showToast(e.response?.data?.error || "Something went wrong", "error")
        })
        // .finally(() => {
        // setLoading(false);
        // })
    };


    const renderPage = () => {
        switch (step) {

            case 1:
                return (
                    <div className="signUpSection">
                        <div className="rightSection">
                            <img src={thirdImage} alt="Food Dish" className="centerImage" />
                        </div>
                        <div className="leftSection">
                            <div className="signUpContent">
                                <div className="headerText">
                                    <h2 className="welcomeTitle">Complete your Profile</h2>
                                    <p className="topText">You are just 2 steps away!</p>
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

            case 2:
                return (
                    <div className="signUpSection">
                        <div className="leftSection">
                            <div className="signUpContent">
                                <div className="headerText">
                                    <h2 className="welcomeTitle">Enter your Details</h2>
                                </div>
                                <form className='signUpForm' onSubmit={handleSubmit}>
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