import React, { useState } from 'react';
import { FaStar, FaBookmark } from 'react-icons/fa';
import { useBookmarkContext } from '../../Contexts/BookmarkProvider';
import DummyImage from "../../images/pngs/articleImage2.png"

const BookmarkSellers = () => {
  const { bookmarkedSellers, removeBookmark } = useBookmarkContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);

  const handleBookmarkClick = (sellerId) => {
    setSelectedSellerId(sellerId);
    setShowModal(true);
  };

  const handleRemoveBookmark = () => {
    removeBookmark(selectedSellerId);
    setShowModal(false);
  };

  return (
    <div className="bookmarkSellersContainer">
      <section className="mainSection">
        <h1 className='pageMainHeading'>Bookmarked Sellers</h1>
        {bookmarkedSellers.length > 0 ? (
          bookmarkedSellers.map((seller) => (
            <div key={seller.id} className="sellerCardContainer">
              <div className="sellerCard">
                <div className="bookmarkIcon">
                  <FaBookmark onClick={() => handleBookmarkClick(seller.id)} />
                </div>
                <div className="sellerInfoSection">
                  <div className="sellerProfileImageContainer">
                    <img src={DummyImage} alt={seller.name} className="sellerProfileImage" />
                  </div>
                  <div className="sellerDetailsContainer">
                    <div className="sellerDetailsColumn">
                      <p className="detailLabel">Seller Name</p>
                      <p className="detailValue">{seller.name}</p>
                    </div>
                    <div className="sellerDetailsColumn">
                      <p className="detailLabel">Languages</p>
                      <p className="detailValue">{seller.languages.join(', ')}</p>
                    </div>
                    <div className="sellerDetailsColumn">
                      <p className="detailLabel">Address</p>
                      <p className="detailValue">{seller.address}</p>
                    </div>
                    <div className="sellerDetailsColumn">
                      <p className="detailLabel">Completed</p>
                      <p className="detailValue">{seller.completedOrders} orders</p>
                    </div>
                    <div className="sellerRatingContainer">
                      <span className="ratingValue">{seller.rating}</span>
                      <FaStar className="starIcon" />
                      <span className="totalReviews">({seller.totalReviews})</span>
                    </div>
                  </div>
                </div>
                <div className="sellerDescriptionSection">
                  <h3>Description:</h3>
                  <p>{seller.description}</p>
                </div>
                <div className="bookmarkActionButtons">
                  <button className="primaryBtn">Contact Seller</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="noSellersText">Nothing to show here...</p>
        )}
      </section>

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Remove Bookmark</h2>
            <p>Are you sure you want to remove this seller from bookmarks?</p>
            <div className="modalButtons">
              <button className="removeBtn" onClick={handleRemoveBookmark}>Remove</button>
              <button className="cancelBtn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkSellers;