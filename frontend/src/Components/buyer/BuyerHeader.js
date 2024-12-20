import React, { useContext, useState } from 'react'; 
import { NavLink, Link } from 'react-router-dom'; 
import { FaBookmark, FaShoppingCart, FaCommentDots } from 'react-icons/fa';  
import Logo from '../../images/pngs/Logo.png'; 
import { LoginContext } from '../../Contexts/LoginContext';  
import { useBookmarkContext } from '../../Contexts/BookmarkProvider'; 
import { useCart } from '../../Contexts/CartContext'; 
import ProfileDrawer from '../../Components/buyer/ProfileDrawer';  
import CartDrawer from '../../Components/buyer/CartDrawer'; 
import NotificationPopup from './Notifications'; 
 
export default function BuyerHeader() { 
  const { isLogin } = useContext(LoginContext);  
  const headerLinks = isLogin 
    ? ['home', 'categories', 'products', 'post Your Requirements', 'deals', 'orders', 'blogs']
    : ['home', 'categories', 'products', 'deals', 'blogs']; 

  const { cartItems } = useCart(); 
  const { bookmarkedSellers } = useBookmarkContext(); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
 
  const [notifications, setNotifications] = useState([ 
    { id: 1, message: "Your order #1234 is ready for pickup!", time: "2h ago", read: false }, 
    { id: 2, message: "New deal: 20% off on all cupcakes!", time: "1d ago", read: false }, 
    { id: 3, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true }, 
    { id: 4, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true }, 
    { id: 5, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true }, 
    { id: 6, message: "Your favorite baker just posted a new item!", time: "3d ago", read: true }, 
  ]); 
 
  const toggleCartDrawer = () => { 
    setIsCartOpen(!isCartOpen); 
  }; 
 
  const handleNotificationsRead = () => { 
    setNotifications(notifications.map(n => ({ ...n, read: true }))); 
  }; 
 
  return ( 
    <header className="buyerHeader"> 
      <div className="buyerHeaderLogo"> 
        <img src={Logo} alt="Chocow" /> 
      </div> 
 
      <ul className="buyerHeaderLinks"> 
       { headerLinks.map((link) => ( 
          <li key={link}> 
            <NavLink 
              to={link === 'home' ? '/' : `/${link.replace(/\s+/g, '')}`} 
              className={({ isActive }) => (isActive ? 'active' : '')} 
              end={link === 'home'} 
            > 
              {link.charAt(0).toUpperCase() + link.slice(1)} 
            </NavLink> 
          </li> 
        ))} 
      </ul> 
 
      {isLogin ? ( 
        <div className="buyerHeaderIcons"> 
          <NavLink to="/bookmarkSellers" className="cartIconButton">
            <FaBookmark />
            {bookmarkedSellers.length > 0 && ( 
              <span className="cartItemCount">{bookmarkedSellers.length}</span> 
            )}
          </NavLink>
          <button onClick={toggleCartDrawer} className="cartIconButton"> 
            <FaShoppingCart /> 
            {cartItems.length > 0 && ( 
              <span className="cartItemCount">{cartItems.length}</span> 
            )} 
          </button> 
          <NavLink to="/chatPage"><FaCommentDots /></NavLink> 
          <NotificationPopup  
            notifications={notifications} 
            onNotificationsRead={handleNotificationsRead} 
          /> 
          <ProfileDrawer /> 
        </div> 
      ) : ( 
        <div className="buyerHeaderAuth"> 
          <Link to="/signin" className="signin">Sign In</Link> 
          <Link to="/signup" className="signup">Sign Up</Link> 
        </div> 
      )} 
       
      <CartDrawer  
        isOpen={isCartOpen}  
        toggleDrawer={toggleCartDrawer} 
      /> 
    </header> 
  ); 
}