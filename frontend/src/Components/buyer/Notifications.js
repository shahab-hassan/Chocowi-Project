import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';

export default function NotificationPopup({ notifications, onNotificationsRead }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const togglePopup = () => {
    if (isOpen && unreadCount > 0) {
      onNotificationsRead();
    }
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && isOpen) {
        togglePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, togglePopup]);

  return (
    <div className="notificationPopupContainer" ref={popupRef}>
      <div className="notificationIconWrapper">
        <FaBell className="notificationIcon" onClick={togglePopup} />
        {unreadCount > 0 && (
          <span className="notificationItemCount">{unreadCount}</span>
        )}
      </div>
      
      {isOpen && (
        <div className="popupContainer">
          <div className="popup">
            <div className="triangle"></div>
            <div className="popupHeader">
              <h2>Notifications</h2>
            </div>
            <div className="notificationList">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notificationItem ${notification.read ? 'read' : 'unread'}`}>
                  <p>{notification.message}</p>
                  <span className="notificationTime">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}