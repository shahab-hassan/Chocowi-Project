import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { Edit2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import MultiSelect from '../../Components/utils/MultiSelect';

const SettingsProfile = () => {
    const location = useLocation();
    const isSeller = location.state?.isSellerAccount || false;  

    const [savedPassword] = useState("daudraja786"); 

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        isCurrentPasswordValid: false,
        currentPasswordError: ''
    });


    const [profileData, setProfileData] = useState({
        username: 'Shahab Hassan',
        email: 'shahab@gmail.com',
        languages: ['Urdu', 'English', 'Reading'],
        fullName: '',
        displayName: '',
        sellerType: 'individual',
        yearEstablished: '',
        numberOfEmployees: '',
        sellerDescription: 'We are a company dedicated to providing high-quality products...',
    });

   

    const [contactData, setContactData] = useState({
        primaryPhone: '+12 349 3495',
        secondaryPhone: '+38 231 2134',
        country: 'Pakistan',
        state: 'Punjab',
        city: 'Islamabad',
        address: 'street256, phase2, MargallaTown'
    });

    const [editMode, setEditMode] = useState({
        profile: false,
        password: false,
        contact: false
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (section) => {
        setEditMode({ ...editMode, [section]: true });
    };

    const handleSave = (section) => {
        setEditMode({ ...editMode, [section]: false });
        // Saving data back to the database here
    };

    const handleCancel = (section) => {
        setEditMode({ ...editMode, [section]: false });
        // We will reset changes here
    };


    const validateCurrentPassword = (password) => {
        if (password === savedPassword) {
            setPasswordData(prev => ({
                ...prev,
                isCurrentPasswordValid: true,
                currentPasswordError: ''
            }));
        } else {
            setPasswordData(prev => ({
                ...prev,
                isCurrentPasswordValid: false,
                currentPasswordError: 'Incorrect current password'
            }));
        }
    };

    const handlePasswordChange = (e, field) => {
        const value = e.target.value;
        
        if (field === 'currentPassword') {
            validateCurrentPassword(value);
        }
        
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePasswordSave = () => {
        if (!passwordData.isCurrentPasswordValid) {
            return; // Don't proceed if current password is invalid
        }
        
        if (!passwordData.newPassword) {
            setPasswordData(prev => ({
                ...prev,
                newPasswordError: 'New password is required'
            }));
            return;
        }
        
        // Here you would typically make an API call to update the password
        console.log('Password updated successfully');
        
        // Reset the form
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            isCurrentPasswordValid: false,
            currentPasswordError: '',
            newPasswordError: ''
        });
        
        setEditMode(prev => ({
            ...prev,
            password: false
        }));
    };

    const passwordContent = (
        <div className="settingsForm">
            <div className="settingsFormGroup">
                <label>Current Password</label>
                <input
                    type="password"
                    className={`inputField ${passwordData.currentPasswordError ? 'error' : ''}`}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange(e, 'currentPassword')}
                    disabled={!editMode.password}
                    placeholder="Enter your current password"
                />
                {passwordData.currentPasswordError && (
                    <span className="errorMessage">{passwordData.currentPasswordError}</span>
                )}
            </div>
            <div className="settingsFormGroup">
                <label>New Password</label>
                <input
                    type="password"
                    className="inputField"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange(e, 'newPassword')}
                    disabled={!editMode.password || !passwordData.isCurrentPasswordValid}
                    placeholder="Enter new password"
                />
                {passwordData.newPasswordError && (
                    <span className="errorMessage">{passwordData.newPasswordError}</span>
                )}
            </div>
        </div>
    );

    const renderSellerFields = () => {
        if (!isSeller) return null;

        return (
            <>
                <div className="settingsFormGroup">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="inputField"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        disabled={!editMode.profile}
                        placeholder="Full Name"
                    />
                </div>

                <div className="settingsFormGroup">
                    <label>Display Name</label>
                    <input
                        type="text"
                        className="inputField"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        disabled={!editMode.profile}
                        placeholder="Display Name"
                    />
                </div>

                <div className="settingsFormGroup">
                    <label>Seller Type</label>
                    <select
                        className="inputField"
                        value={profileData.sellerType}
                        onChange={(e) => setProfileData({ ...profileData, sellerType: e.target.value })}
                        disabled={!editMode.profile}
                    >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                    </select>
                </div>

                {profileData.sellerType === 'company' && (
                    <>
                        <div className="settingsFormGroup">
                            <label>Year Established</label>
                            <input
                                type="number"
                                className="inputField"
                                value={profileData.yearEstablished}
                                onChange={(e) => setProfileData({ ...profileData, yearEstablished: e.target.value })}
                                disabled={!editMode.profile}
                                placeholder="Year Established"
                            />
                        </div>

                        <div className="settingsFormGroup">
                            <label>Number of Employees</label>
                            <input
                                type="number"
                                className="inputField"
                                value={profileData.numberOfEmployees}
                                onChange={(e) => setProfileData({ ...profileData, numberOfEmployees: e.target.value })}
                                disabled={!editMode.profile}
                                placeholder="Number of Employees"
                            />
                        </div>
                    </>
                )}

                <div className="settingsFormGroup">
                    <label>Seller Description</label>
                    <textarea
                        className="inputField settingsDescriptionField"
                        value={profileData.sellerDescription}
                        onChange={(e) => setProfileData({ ...profileData, sellerDescription: e.target.value })}
                        disabled={!editMode.profile}
                        placeholder="Describe your business..."
                    />
                    <span className="settingsCharacterLimit">* Max 400 words</span>
                </div>
            </>
        );
    };
    const renderSection = (title, content, section) => (
        <div className="settingsSection">
            <div className="settingsHeaderContainer">
                <div className="settingsHeaderLeft">
                    <h2 className="settingsTitle">{title}</h2>
                </div>
                <div className="settingsHeaderRight">
                    {!editMode[section] ? (
                        <button onClick={() => handleEdit(section)} className="settingsEditButton">
                            <Edit2 />
                        </button>
                    ) : (
                        <div className="settingsActionButtons">
                            <button onClick={() => handleCancel(section)} className="settingsCancelButton">
                                Cancel
                            </button>
                            <button onClick={() => handleSave(section)} className="settingsSaveButton">
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="settingsDivider" />
            {content}
        </div>
    );

    const languageOptions = [
        { value: 'Urdu', label: 'Urdu' },
        { value: 'English', label: 'English' },
        { value: 'Reading', label: 'Reading' },
        { value: 'French', label: 'French' }, 
        { value: 'Spanish', label: 'Spanish' },
    ];

    const profileContent = (
        <div className="settingsForm">
            <div className="settingsPhotoSection">
                <div className="settingsImageContainer">
                    <div className="profileImageWrapper"
                        onClick={editMode.profile ? () => document.getElementById('profilePhotoInput').click() : undefined}
                    >
                        {profileImage ? (
                            <img 
                                src={profileImage} 
                                alt="Profile" 
                                className="settingsProfileImage"
                            />
                        ) : (
                            <div className="settingsImagePlaceholder">
                                <span>Upload Photo</span>
                            </div>
                        )}
                        {editMode.profile && (
                            <>
                                <input
                                    type="file"
                                    id="profilePhotoInput"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="settingsPhotoInput"
                                />
                                <div className="settingsCameraIconWrapper">
                                    <FaCamera className="settingsCameraIcon" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="settingsFormGroup">
                <label>Username</label>
                <input
                    type="text"
                    className="inputField"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    disabled={!editMode.profile}
                    placeholder="Username"
                />
            </div>

            {/* Render seller-specific fields */}
            {renderSellerFields()}

            <div className="settingsFormGroup">
                <label>Email</label>
                <div className="settingsEmailContainer">
                    <input
                        type="email"
                        className="inputField"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!editMode.profile}
                        placeholder="Email"
                    />
                    <span className="settingsVerifiedBadge">verified</span>
                </div>
            </div>

            <div className="settingsFormGroup">
                <label>Language</label>
                {editMode.profile ? (
                    <MultiSelect
                        options={languageOptions}
                        value={profileData.languages}
                        onChange={(selectedOptions) => {
                            const newLanguages = selectedOptions.map(option => option.value);
                            setProfileData({ ...profileData, languages: newLanguages });
                        }}
                        placeholder="Select languages..."
                    />
                ) : (
                    <div className="settingsLanguageContainer">
                        {profileData.languages.map((lang, index) => (
                            <span key={index} className="settingsLanguageTag">
                                {lang}
                                {editMode.profile && (
                                    <button 
                                        className="settingsRemoveLanguage"
                                        onClick={() => {
                                            const newLanguages = profileData.languages.filter((_, i) => i !== index);
                                            setProfileData({ ...profileData, languages: newLanguages });
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </div>

           
        </div>
    );



    const contactContent = (
        <div className="settingsForm">
            <div className="settingsFormGroup">
                <label>Primary Phone Number</label>
                <input
                    type="tel"
                    className="inputField"
                    value={contactData.primaryPhone}
                    onChange={(e) => setContactData({ ...contactData, primaryPhone: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="Primary Phone Number"
                />
            </div>
            <div className="settingsFormGroup">
                <label>Secondary Phone</label>
                <input
                    type="tel"
                    className="inputField"
                    value={contactData.secondaryPhone}
                    onChange={(e) => setContactData({ ...contactData, secondaryPhone: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="Secondary Phone"
                />
            </div>
            <div className="settingsFormGroup">
                <label>Country</label>
                <input
                    type="text"
                    className="inputField"
                    value={contactData.country}
                    onChange={(e) => setContactData({ ...contactData, country: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="Country"
                />
            </div>
            <div className="settingsFormGroup">
                <label>State/Province</label>
                <input
                    type="text"
                    className="inputField"
                    value={contactData.state}
                    onChange={(e) => setContactData({ ...contactData, state: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="State/Province"
                />
            </div>
            <div className="settingsFormGroup">
                <label>City</label>
                <input
                    type="text"
                    className="inputField"
                    value={contactData.city}
                    onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="City"
                />
            </div>
            <div className="settingsFormGroup">
                <label>Address</label>
                <input
                    type="text"
                    className="inputField"
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    disabled={!editMode.contact}
                    placeholder="Address"
                />
            </div>
        </div>
    );

    return (
        <div className='settingsPage'>
            <section className='mainSection'>
                <h1 className='pageMainHeading'>Settings</h1>
                <div className="settingsContainer">
                    {renderSection("My Profile", profileContent, "profile")}
                    {renderSection("Password", passwordContent, "password")}
                    {renderSection("Contact Info", contactContent, "contact")}
                </div>
            </section>
        </div>
    );
};

export default SettingsProfile;