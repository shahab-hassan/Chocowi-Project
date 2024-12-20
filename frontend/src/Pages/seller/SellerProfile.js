import React from 'react';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import image from '../../images/pngs/seller2.png';

const SellerProfile = () => {
  const profile = {
    fullName: 'Shahab Hassan',
    displayName: 'Shahab Designs',
    location: 'Islamabad, Pakistan',
    rating: 4.7,
    totalRatings: 120,
    totalOrdersCompleted: 24,
    sellerDescription: 'Hi... elizajhones here, a professional Graphic designer with great experience and extraordinary skills in Adobe Photoshop and Adobe Illustrator. I am a freelance Graphic Designer & logo designer with strong experience in corporate designs...',
    contactInfo: {
      primaryPhone: '+92-00000000',
      secondaryPhone: '+92-00000000',
      email: 'Shahab@gmail.com',
      address: 'Margalla Town, Islamabad, Pakistan (1090)',
      languages: 'Urdu, English',
    }
  };

  return (
    <div className="profilePageContainer">
      <section className="mainSection">
        <h1 className="pageMainHeading">Seller Profile</h1>
        <div className="profilePageHeader">
          <div className="profilePageUserInfo">
            <img src={image} alt="Profile" className="profilePageImage" />
            <div>
              <h2 className="profilePageName">{profile.fullName}</h2>
              <p className="profilePageLocation">{profile.location}</p>
              <p className="profilePageDisplayName">Display Name: {profile.displayName}</p>
            </div>
          </div>
          <div className="profilePageRating">
            <FaStar className="profilePageStarIcon" />
            <div>
              <span>Rating</span>
              <strong>{profile.rating} ({profile.totalRatings})</strong>
            </div>
          </div>
          <div className="profilePageOrders">
            <div>
              <strong>Total</strong>
              <span>orders completed</span>
            </div>
            <strong className="profilePageOrdersCount">{profile.totalOrdersCompleted}</strong>
          </div>
          <button className="primaryBtn3">Manage Orders</button>
        </div>

        <div className="profilePageSection">
          <div className="profilePageSectionHeader">
            <h3>Seller Description</h3>
            <button className="profilePageEditButton"></button>
          </div>
          <p className="profilePageSectionContent">{profile.sellerDescription}</p>
        </div>

        <div className="profilePageSection">
          <div className="profilePageSectionHeader">
            <h3>Contact Info</h3>
            <button className="profilePageEditButton"></button>
          </div>
          <div className="profilePageContactInfo">
            <div className="profilePageContactItem">
              <FaPhone className="profilePageContactIcon" />
              <div>
                <p>Primary Phone No:</p>
                <p>{profile.contactInfo.primaryPhone}</p>
              </div>
            </div>
            <div className="profilePageContactItem">
              <FaPhone className="profilePageContactIcon" />
              <div>
                <p>Secondary Phone No:</p>
                <p>{profile.contactInfo.secondaryPhone}</p>
              </div>
            </div>
            <div className="profilePageContactItem">
              <FaLanguage className="profilePageContactIcon" />
              <div>
                <p>Languages:</p>
                <p>{profile.contactInfo.languages}</p>
              </div>
            </div>
            <div className="profilePageContactItem">
              <FaEnvelope className="profilePageContactIcon" />
              <div>
                <p>Email:</p>
                <p>{profile.contactInfo.email}</p>
              </div>
            </div>
            <div className="profilePageContactItem">
              <FaMapMarkerAlt className="profilePageContactIcon" />
              <div>
                <p>Address:</p>
                <p>{profile.contactInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profilePageNote">
          <p>Note: *Some of the fields may coincide with your buyer account.*</p>
        </div>
      </section>
    </div>
  );
};

export default SellerProfile;
