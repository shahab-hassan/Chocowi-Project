import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        i => i.id === item.id && 
        JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
      );

      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id && 
          JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId, selectedOptions) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
    );
  };

  const updateQuantity = (itemId, selectedOptions, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}