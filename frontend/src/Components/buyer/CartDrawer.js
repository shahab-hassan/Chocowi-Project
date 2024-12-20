import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../images/pngs/cakecard2.png';
import { useCart } from '../../Contexts/CartContext';

export default function CartDrawer({ isOpen, toggleDrawer }) {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const serviceFee = subtotal * 0.05;
  const tax = subtotal * 0.05;
  
  const total = subtotal + serviceFee + tax;

  const [deliveryType, setDeliveryType] = useState('delivery'); 

  const increaseQuantity = (id, selectedOptions) => {
    const item = cartItems.find(item => 
      item.id === id && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );
    if (item) {
      updateQuantity(id, selectedOptions, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id, selectedOptions) => {
    const item = cartItems.find(item => 
      item.id === id && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(id, selectedOptions, item.quantity - 1);
      } else {
        removeFromCart(id, selectedOptions);
      }
    }
  };

  const handleCheckout = () => {
    const orderSummary = {
      subtotal,
      serviceFee,
      deliveryFee: 6,
      tax,
      total: total + 6,
      deliveryType
    };

    navigate('/checkoutPage', {
      state: {
        orderItems: cartItems,
        orderSummary
      }
    });
    toggleDrawer(); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && isOpen) {
        toggleDrawer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);

  return (
    <div className={`cartDrawer ${isOpen ? 'open' : ''}`} ref={drawerRef}>
      <div className="cartDrawerHeader">
        <div className="deliveryToggle">
          <button 
            className={deliveryType === 'delivery' ? 'active' : ''}
            onClick={() => setDeliveryType('delivery')}
          >
            Delivery
          </button>
          <button 
            className={deliveryType === 'pickup' ? 'active' : ''}
            onClick={() => setDeliveryType('pickup')}
          >
            Pickup
          </button>
        </div>
        <button className="closeButton" onClick={toggleDrawer}>×</button>
      </div>
      
      <div className="cartItems">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="cartItem">
              <div className="cartItemImage">
                <img src={item.productImage || image} alt={item.name} />
              </div>
              <div className="cartItemDetails">
                <h3>{item.name}</h3>
                {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                  <p key={key} className="itemOption">
                    {key}: {value.value}
                  </p>
                ))}
                <div className="cartItemPriceQuantity">
                  <span className="itemPrice">${item.price.toFixed(2)}</span>
                  <div className="quantityControl">
                    <button onClick={() => decreaseQuantity(item.id, item.selectedOptions)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id, item.selectedOptions)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="emptyCart">Your cart is empty</p>
        )}
      </div>

      <div className="checkoutSection">
        <div className="checkoutRow">
          <span>Sub total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="checkoutRow">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="checkoutRow">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="checkoutTotal">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button 
          className="checkoutButton"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
