import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../images/pngs/Logo.png';
import { LoginContext } from '../../Contexts/LoginContext'; 
import ProfileDrawer from '../../Components/buyer/ProfileDrawer'; 
import NotificationPopup from '../buyer/Notifications';
import { FaCommentDots } from 'react-icons/fa';

export default function SellerHeader() {
  const { isLogin } = useContext(LoginContext); 
  const headerLinks = isLogin 
    ? ['dashboard', 'postings', 'your orders', 'analytics', 'trade lead'] 
    : ['dashboard', 'postings'];

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your order #1234 is ready for pickup!", time: "2h ago", read: false },
    { id: 2, message: "New deal: 20% off on all cupcakes!", time: "1d ago", read: false },
    { id: 3, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true },
    { id: 4, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true },
    { id: 5, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true },
    { id: 6, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true },
  ]);

  const handleNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const renderNavLink = (link) => {
    if (link === 'your orders') {
      return (
        <NavLink
          to="/yourOrders"
          state={{ isSeller: true }}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Orders
        </NavLink>
      );
    }

    return (
      <NavLink
        to={link === 'dashboard' ? 'sellerDashboard' : `/${link.replace(/\s+/g, '')}`}
        className={({ isActive }) => (isActive ? 'active' : '')}
        end={link === 'dashboard'}
      >
        {link.charAt(0).toUpperCase() + link.slice(1)}
      </NavLink>
    );
  };
  
  return (
    <header className="buyerHeader">
      <div className="buyerHeaderLogo">
        <img src={Logo} alt="Seller Logo" />
      </div>

      <ul className="buyerHeaderLinks">
        {headerLinks.map((link) => (
          <li key={link}>
            {renderNavLink(link)}
          </li>
        ))}
      </ul>

      {isLogin ? (
        <div className="buyerHeaderIcons">
          <NotificationPopup
            notifications={notifications}
            onNotificationsRead={handleNotificationsRead}
          />
          <NavLink to="/sellerChatPage" state={{isSeller:true}}><FaCommentDots /></NavLink>

          <ProfileDrawer isSeller={true}/> 
        </div>
      ) : (
        <div className="buyerHeaderAuth">
          <Link to="/signin" className="signin">Sign In</Link>
          <Link to="/signup" className="signup">Sign Up</Link>
        </div>
      )}
    </header>
  );
}