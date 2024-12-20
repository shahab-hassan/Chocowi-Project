import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useBookmarkContext } from '../../Contexts/BookmarkProvider';
import { toast } from 'react-toastify'; 
import { showToast } from '../utils/ShowToast';

const VendorCard = ({ vendor }) => {
    const navigate = useNavigate();
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarkContext();

    const handleCardClick = () => {
      navigate('/vendorDetail')
    };

    const handleBookmarkToggle = (e) => {
      e.stopPropagation(); 
      
      if (isBookmarked(vendor.id)) {
        removeBookmark(vendor.id);
        showToast("Seller removed from bookmarks","success")
      } else {
        addBookmark(vendor);
        showToast("Seller added to bookmarks","success")
        
    
      }
    };

    return (
        <div className="vendorCard" onClick={handleCardClick}>
            <div className="vendorImageContainer">
                <img src={vendor.imageSrc} alt={vendor.title} className="vendorImage" />
                <div 
                  className="bookmarkIcon" 
                  onClick={handleBookmarkToggle}
                >
                    {isBookmarked(vendor.id) ? <FaBookmark /> : <FaRegBookmark />}
                </div>
            </div>
            <div className="vendorContent">
                <div className="titleRating">
                    <h3>{vendor.name}</h3>
                    <div className="ratingReviewContainer">
                    <span className="rating">{vendor.rating}</span>
                   <span className="reviews">({vendor.totalReviews})</span>
                   <span className="star">&#9733;</span>
                    </div>
                </div>
                <p>{vendor.description}</p>
            </div>
        </div>
    );
};

export default VendorCard;