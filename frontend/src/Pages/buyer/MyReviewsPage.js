import React, { useState } from 'react';
import { Star } from 'lucide-react';
import image from '../../images/pngs/cakecard.png';
import image2 from '../../images/pngs/cakecard2.png';
import ReviewPopup from '../../Components/buyer/ReviewPopup';
import ReviewHistoryContainer from '../../Components/buyer/ReviewHistoryContainer';

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState('toBeReviewed');
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      image: image, 
      title: 'Marsha Pancakes', 
      description: 'ary skills in Adobe Photoshop and Adobe Illustrator. I\'m a FreelanceGraphic Design',
      sellerName: "SHAHAB HASSAN",
      ratings: [
        { question: "How knowledgeable was the seller?", score: 0, text: "Not rated" },
        { question: "Were the deadlines met?", score: 0, text: "Not rated" },
        { question: "How was the quality of products delivered?", score: 0, text: "Not rated" },
        { question: "Would you recommend this seller to other buyers?", score: 0, text: "Not rated" },
        { question: "How quick the seller responded to your queries?", score: 0, text: "Not rated" },
        { question: "Did the seller meet your expectations?", score: 0, text: "Not rated" },
      ]
    },
    { 
      id: 2, 
      image: image, 
      title: 'Marsha Pancakes', 
      description: 'ary skills in Adobe Photoshop and Adobe Illustrator. I\'m a FreelanceGraphic Desi',
      sellerName: "SHAHAB HASSAN",
      reviewerName:"Ali23",
      ratings: [
        { question: "How knowledgeable was the seller?", score: 0, text: "Not rated" },
        { question: "Were the deadlines met?", score: 0, text: "Not rated" },
        { question: "How was the quality of products delivered?", score: 0, text: "Not rated" },
        { question: "Would you recommend this seller to other buyers?", score: 0, text: "Not rated" },
        { question: "How quick the seller responded to your queries?", score: 0, text: "Not rated" },
        { question: "Did the seller meet your expectations?", score: 0, text: "Not rated" },
      ]
    },
  ]);

  const [historyReviews, setHistoryReviews] = useState([
    {
      id: 1,
      image: image,
      title: "Deliciously Custom Pancake Creations for Any Occasion",
      sellerName: "SHAHAB HASSAN",
      reviewerName: "Ali23",
      overallRating: 4.7,
      ratings: [
        { question: "How knowledgeable was the seller?", score: 4, text: "Satisfactory" },
        { question: "Were the deadlines met?", score: 4, text: "Satisfactory" },
        { question: "How was the quality of products delivered?", score: 3, text: "Neutral" },
        { question: "Would you recommend this seller to other buyers?", score: 4, text: "Probably Yes" },
        { question: "How quick the seller responded to your queries?", score: 5, text: "Very Satisfied" },
        { question: "Did the seller meet your expectations?", score: 4, text: "Satisfactory" },
      ],
      reviewText: "I recently purchased the UltraComfort Ergonomic Chair for my home office, and I couldn't be happier with the upgrade. The chair arrived quickly and was relatively easy to assemble, thanks to the clear instructions provided.",
      attachedImages: [image, image2],
      tipPaid: true,          // Field for whether a tip was paid
      tipAmount: 10.00        // Field for the tip amount
    },
    {
      id: 2,
      image: image,
      title: "Deliciously Custom Pancake Creations for Any Occasion",
      sellerName: "SHAHAB HASSAN",
      reviewerName: "Ali23",  // Added missing reviewerName field
      overallRating: 4.7,
      ratings: [
        { question: "How knowledgeable was the seller?", score: 4, text: "Satisfactory" },
        { question: "Were the deadlines met?", score: 4, text: "Satisfactory" },
        { question: "How was the quality of products delivered?", score: 3, text: "Neutral" },
        { question: "Would you recommend this seller to other buyers?", score: 4, text: "Probably Yes" },
        { question: "How quick the seller responded to your queries?", score: 5, text: "Very Satisfied" },
        { question: "Did the seller meet your expectations?", score: 4, text: "Satisfactory" },
      ],
      reviewText: "I recently purchased the UltraComfort Ergonomic Chair for my home office, and I couldn't be happier with the upgrade. The chair arrived quickly and was relatively easy to assemble, thanks to the clear instructions provided.",
      attachedImages: [image],
      tipPaid: false,         // Field for whether a tip was paid
      tipAmount: 0.00         // Field for the tip amount, which can be zero if no tip was paid
    }
  ]);
  
  

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setShowReviewPopup(true);
  };

  const handleClosePopup = () => {
    setShowReviewPopup(false);
    setSelectedReview(null);
  };

  const handleSubmitReview = (reviewData) => {
    // Remove the reviewed item from the 'toBeReviewed' list
    setReviews(reviews.filter(r => r.id !== selectedReview.id));

    // Calculate the tip amount in dollars
    const tipAmount = reviewData.tipAmount ? parseFloat(reviewData.tipAmount) : 
                      (reviewData.tipPercentage ? (parseFloat(reviewData.tipPercentage) / 100 * selectedReview.price) : 0);

    // Add the new review to the history
    const newHistoryReview = {
      id: Date.now(),
      image: selectedReview.image,
      title: selectedReview.title,
      sellerName: selectedReview.sellerName,
      overallRating: calculateOverallRating(reviewData.ratings),
      ratings: reviewData.ratings,
      reviewText: reviewData.comment,
      attachedImages: reviewData.attachedImages.map(file => URL.createObjectURL(file)),
      tipAmount: tipAmount.toFixed(2),
      tipPaid: reviewData.tipPaid,
    };

    setHistoryReviews([newHistoryReview, ...historyReviews]);
    handleClosePopup();
  };

  const calculateOverallRating = (ratings) => {
    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

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
    <div className="myReviewsContainer">
      <section className='mainSection'>
        <h1 className='pageMainHeading'>My Reviews</h1>
        
        <div className="myReviewsTabs">
          <button 
            className={activeTab === 'toBeReviewed' ? "myReviewsTabActive" : "myReviewsTabInactive"}
            onClick={() => setActiveTab('toBeReviewed')}
          >
            To Be Reviewed
          </button>
          <button 
            className={activeTab === 'history' ? "myReviewsTabActive" : "myReviewsTabInactive"}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
        
        <div className="myReviewsList">
          {activeTab === 'toBeReviewed' ? (
            reviews.map((review) => (
              <div key={review.id} className="myReviewsItem">
                <div className="myReviewsItemContent">
                  <img src={review.image} alt={review.title} className="myReviewsItemImage" />
                  <div className="myReviewsItemText">
                    <h3 className="myReviewsItemTitle">{review.title}</h3>
                    <p className="myReviewsItemDescription">{review.description}</p>
                  </div>
                </div>
                <button className="primaryBtn2" onClick={() => handleReviewClick(review)}>Review</button>
              </div>
            ))
          ) : (
            <ReviewHistoryContainer reviews={historyReviews} isMyReview = {true}/>
          )}
        </div>
      </section>
      {showReviewPopup && selectedReview && (
        <ReviewPopup
          review={selectedReview}
          onClose={handleClosePopup}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default MyReviews;