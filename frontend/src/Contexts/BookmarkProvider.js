import React, { createContext, useState, useContext } from 'react';

// Create the BookmarkContext
const BookmarkContext = createContext();

// Create a provider component
export const BookmarkProvider = ({ children }) => {
  // State to store bookmarked sellers
  const [bookmarkedSellers, setBookmarkedSellers] = useState([
    {
      id: 1,
      name: 'Nafees Bakers',
      avatar: '/path/to/seller1.png',
      languages: ['Urdu', 'English'],
      address: 'Islamabad, Pakistan',
      completedOrders: 7,
      rating: 4.7,
      totalReviews: 120,
      description: 'Professional Graphic designer with great experience...',
    },
    {
      id: 2,
      name: 'Layer\'s Bakeshop',
      avatar: '/path/to/seller2.png',
      languages: ['Urdu', 'English'],
      address: 'Islamabad, Pakistan',
      completedOrders: 10,
      rating: 4.6,
      totalReviews: 120,
      description: 'Professional Graphic designer with great experience...',
    }
  ]);

  // Function to add a seller to bookmarks
  const addBookmark = (seller) => {
    // Check if seller is already bookmarked
    const isAlreadyBookmarked = bookmarkedSellers.some(
      (bookmarkedSeller) => bookmarkedSeller.id === seller.id
    );

    // If not already bookmarked, add the seller
    if (!isAlreadyBookmarked) {
      setBookmarkedSellers([...bookmarkedSellers, seller]);
    }
  };

  // Function to remove a seller from bookmarks
  const removeBookmark = (sellerId) => {
    setBookmarkedSellers(
      bookmarkedSellers.filter((seller) => seller.id !== sellerId)
    );
  };

  // Function to check if a seller is bookmarked
  const isBookmarked = (sellerId) => {
    return bookmarkedSellers.some((seller) => seller.id === sellerId);
  };

  // Provide the context with state and functions
  return (
    <BookmarkContext.Provider 
      value={{ 
        bookmarkedSellers, 
        addBookmark, 
        removeBookmark, 
        isBookmarked 
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use the BookmarkContext
export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  
  // Throw an error if the hook is used outside of the provider
  if (!context) {
    throw new Error('useBookmarkContext must be used within a BookmarkProvider');
  }
  
  return context;
};