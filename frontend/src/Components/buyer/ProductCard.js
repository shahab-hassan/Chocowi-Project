import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/productDetail', { state: { product } });
  };

  return (
    <div className="productCard" onClick={handleCardClick}>
      <div className="distanceTag">{product.distance} km away</div> {/* Vertical Distance Tag */}
      <div className="productImage">
        <img src={product.images[0]} alt="Product" />
        {product.isDiscounted && <div className="saleTag">SALE</div>}
      </div>
      <div className="productDetails">
        <div className="profile">
          <img className="profileImage" src={product.profileImageUrl} alt={product.name} />
          <div className="profileInfo">
            <h3 className="name">{product.name}</h3>
            <p className="location">{product.location}</p>
          </div>
          <div className="ratingReviewContainer">
            <span className="rating">{product.rating}</span>
            <span className="reviews">({product.reviews})</span>
            <span className="star">&#9733;</span>
          </div>
        </div>
        <p className="productDescription">{product.description}</p>
        <div className="price">
          {product.isDiscounted ? (
            <>
              <span>From</span>
              <span className="discountedPrice"> ${product.price}</span>
              <span className="originalPrice"> ${product.originalPrice}</span>
            </>
          ) : (
            <span className="discountedPrice">From ${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
