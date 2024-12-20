import React from 'react';
import { Star } from 'lucide-react';

const ReviewHistoryContainer = ({ reviews, isMyReview = true, isProductReview = false }) => {
  const renderStars = (score) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < score ? "gold" : "none"}
        stroke="gold"
      />
    ));
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="myReviewsHistoryItem">
          <div className="myReviewsHistoryHeader">
            {!isProductReview && (
              <img src={review.image} alt={review.title} className="myReviewsHistoryImage" />
            )}
            <div className="myReviewsHistoryHeaderContent">
              {!isProductReview && (
                <>
                  <h3 className="myReviewsHistoryTitle">{review.title}</h3>
                  {isMyReview ? (
                    <p className="myReviewsHistorySellerName">By {review.sellerName}</p>
                  ) : (
                    <p className="myReviewsHistorySellerName">By {review.sellerName}</p>
                  )}
                </>
              )}
              {(!isMyReview || isProductReview) && (
                <p className="myReviewsHistoryReviewerName text-lg font-medium mb-3">
                  Review by {review.reviewerName}
                </p>
              )}
              <div className="myReviewsHistoryRating">
                {renderStars(Math.floor(review.overallRating))}
                <span>{review.overallRating}</span>
              </div>
              {isMyReview && review.tipPaid && !isProductReview && (
                <p className="myReviewsHistoryTip">Tip paid: ${review.tipAmount}</p>
              )}
            </div>
          </div>
          {review.ratings.map((rating, index) => (
            <div key={index} className="myReviewsHistoryRatingRow">
              <span>{rating.question}</span>
              <div className="myReviewsHistoryStars">
                {renderStars(rating.score)}
                <span>{rating.text}</span>
              </div>
            </div>
          ))}
          <div className="myReviewsHistoryReviewText">
            <p>"{review.reviewText}"</p>
            {review.attachedImages && review.attachedImages.length > 0 && (
              <div className="myReviewsHistoryAttachedImages">
                {review.attachedImages.map((imgSrc, index) => (
                  <img key={index} src={imgSrc} alt={`Attached image ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewHistoryContainer;