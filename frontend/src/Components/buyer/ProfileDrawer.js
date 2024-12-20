import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import image1 from '../../images/pngs/seller2.png';
import { LoginContext } from '../../Contexts/LoginContext';

export default function ProfileDrawer({ isSeller }) {

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  let { logout } = useContext(LoginContext);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && isOpen) {
        toggleDrawer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="profileDrawerContainer">
      {/* Profile Icon */}
      <FaUserCircle className="profileIcon" onClick={toggleDrawer} />

      {/* Drawer */}
      {isOpen && (
        <div className="drawerContainer" ref={popupRef}>
          <div className="drawer">
            {/* Triangle on top */}
            <div className="triangle"></div>

            {/* Drawer Content */}
            <div className="drawerHeader">
              <img
                src={image1}
                alt="Shahab Hassan"
                className="profileImage"
              />
              <div className="profileDetails">
                <p className="profileName">Shahab Hassan</p>
                <p className="profileLocation">Islamabad, Pakistan</p>
              </div>
            </div>
            <div className="drawerMenu">
              <Link onClick={toggleDrawer} to={isSeller ? '/sellerProfile' : '/profilePage'}>My Profile</Link>
              <Link onClick={toggleDrawer} to="/myReviews">My Reviews</Link>
              <Link 
                onClick={toggleDrawer} 
                to="/settingsPage"
                state={isSeller?{ isSellerAccount: true }:{isSellerAccount:false}}
              >
                Settings
              </Link>
              {isSeller && (
                <Link onClick={toggleDrawer} to="/catalogue">Catalogue</Link>
              )}
              <Link onClick={()=> {toggleDrawer(); logout()}}>Logout</Link>
            </div>
            <button className="switchToSelling">
              <Link onClick={toggleDrawer} to={isSeller ? '/' : '/sellerDashboard'}>
                {isSeller ? 'Switch to Buying' : 'Switch to Selling'}
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}