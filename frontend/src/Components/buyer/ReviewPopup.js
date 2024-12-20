import React, { useState, useRef } from 'react';
import { Star, X } from 'lucide-react';

const ReviewPopup = ({ review, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState(review.ratings);
  const [comment, setComment] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);
  const [tipPaid, setTipPaid] = useState(false);
  const fileInputRef = useRef(null);

  const handleRatingChange = (index, score) => {
    const newRatings = [...ratings];
    newRatings[index].score = score;
    newRatings[index].text = getTextForScore(score);
    setRatings(newRatings);
  };

  const getTextForScore = (score) => {
    switch (score) {
      case 1: return "Very Unsatisfied";
      case 2: return "Unsatisfied";
      case 3: return "Neutral";
      case 4: return "Satisfactory";
      case 5: return "Very Satisfied";
      default: return "Not rated";
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ratings,
      comment,
      tipAmount,
      tipPercentage,
      attachedImages,
      tipPaid,
    });
    onClose();
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachedImages([...attachedImages, ...files].slice(0, 5));
  };

  const removeImage = (index) => {
    setAttachedImages(attachedImages.filter((_, i) => i !== index));
  };

  const handleTipChange = (field, value) => {
    if (field === 'amount') {
      setTipAmount(value);
      setTipPercentage('');
    } else {
      setTipPercentage(value > 100 ? '100' : value);
      setTipAmount('');
    }
  };

  const handlePayTip = () => {
    setTipPaid(true);
  };

  return (
    <div className="reviewPopup">
      <div className="reviewPopupContent">
        <h2>Rate and Review the Purchased Product</h2>
        <div className="reviewPopupHeader">
          <img src={review.image} alt={review.title} className="reviewPopupProductImage" />
          <div className="reviewPopupProductInfo">
            <h3>{review.title}</h3>
            <p>By {review.sellerName}</p>
          </div>
          <div className="reviewPopupProductInfoSellerInfo">
            <img src={review.sellerImage} alt={review.sellerName} className="sellerImage" />
            <p>Sold by</p>
            <h4>{review.sellerName}</h4>
            <p>{review.sellerLocation}</p>
          </div>
        </div>
        <div className="reviewPopupBody">
          <div className="reviewPopupMain">
            <div className="ratingsSection">
              {ratings.map((rating, index) => (
                <div key={index} className="ratingRow">
                  <span>{rating.question}</span>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        onClick={() => handleRatingChange(index, star)}
                        fill={star <= rating.score ? "gold" : "none"}
                        stroke={star <= rating.score ? "gold" : "currentColor"}
                      />
                    ))}
                    <span>{rating.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <textarea
              placeholder="Add comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="inputField"
            />
            <div className="imageUploadSection">
              <h4 className='subHeading'>Upload Images</h4>
              <div className="imageUploadPlaceholder" onClick={() => fileInputRef.current.click()}>
                <span>+</span>
              </div>
              <p>
                • Can add up to 5 images<br />
                • Maximum image size is 5 MB
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <div className="attachedImagesGallery">
                {attachedImages.map((image, index) => (
                  <div key={index} className="attachedImageContainer">
                    <img src={URL.createObjectURL(image)} alt={`Attached ${index}`} />
                    <X className="removeIcon" onClick={() => removeImage(index)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="tipSection">
            <h4 className='subHeading'>Pay Tip to Seller</h4>
            <input
              type="number"
              className='inputField'
              placeholder="Write Amount $"
              value={tipAmount}
              onChange={(e) => handleTipChange('amount', e.target.value)}
              disabled={tipPaid}
            />
            <span className="orDivider">OR</span>
            <input
              type="number"
              className='inputField'
              placeholder="Write % of the Total Payment Amount"
              value={tipPercentage}
              onChange={(e) => handleTipChange('percentage', e.target.value)}
              max="100"
              disabled={tipPaid}
            />
            <button className="primaryBtn" onClick={handlePayTip} disabled={tipPaid}>
              {tipPaid ? 'Tip Paid' : 'Pay Tip'}
            </button>
          </div>
        </div>
        <div className="popupButtons">
          <button onClick={handleSubmit} className="primaryBtn">Submit Review</button>
          <button onClick={onClose} className="primaryBtn3">Cancel Submit/Discard</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;