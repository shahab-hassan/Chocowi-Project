import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaLanguage } from 'react-icons/fa';
import profileImage from '../../images/pngs/profile.png';
import { sweetsCategory } from '../../data/data';
import ProductCard from '../../Components/buyer/ProductCard';
import image from '../../images/pngs/cakecard.png';
import image2 from '../../images/pngs/cakecard2.png';
import ReviewHistoryContainer from '../../Components/buyer/ReviewHistoryContainer';

const VendorDetail = () => {
  const productsContainerRef = useRef(null);
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
      tipPaid: true,      
      tipAmount: 10.00       
    },
    {
      id: 2,
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
      attachedImages: [image],
      tipPaid: false,       
      tipAmount: 0.00        
    }
  ]);
  

  const skills = ['Baking', 'Cooking', 'Baking', 'Baking'];

  return (
    <div className="vendorDetailContainer">
        <section className='mainSection'>
        <h1 className='pageMainHeading'>Vendor Profile</h1>
      <div className="vendorDetailNewSection">
        <div className="vendorDetailLeftSection">
          <div className="vendorDetailCardContainer">
            <div className="vendorDetailCard">
              {/* Seller Info Section */}
              <div className="sellerInfoSection">
                <div className="sellerProfileImageContainer">
                  <img src={profileImage} alt="Shahab Hassan" className="sellerProfileImage" />
                  <span className="crownIcon">👑</span>
                </div>
                <div className="sellerDetailsContainer">
                  <h2 className="sellerName">Shahab Hassan</h2>
                  <p className="sellerLocation">Islamabad, Pakistan</p>
                  <p className="onlineStatus"><span className="onlineDot"></span>Online (Accepting orders)</p>
                </div>
              </div>

              {/* Seller Description */}
              <div className="sellerDescription">
                <p>
                  Hi... elizajhones here, a Professional Graphic designer with great experience
                  and having extra-ordinary skills in Adobe Photoshop and Adobe Illustrator. I'm a
                  Freelance Graphic Designer & logo designer with strong experience in
                  corporate designs. I am a proud perfectionist when it comes to
                  watercolor real estate logo and eyelash design. I can give you attractive,
                  unique, clean and custom designs. I can make beauty and cosmetic product
                  designs, hair logos, Skincare logos, jewelry designs, fashion
                  logos, graphic designs, and high-end twistc. I just won't stop till I'm 100%
                  satisfied thanks.
                </p>
              </div>

              {/* Additional Info */}
              <div className="sellerInfoContainer">
                <div className="sellerInfoSection">
                  <div className="infoIcon"><FaLanguage/></div>
                  <div className="infoContent">
                    <h3>Languages</h3>
                    <p>Urdu, English</p>
                  </div>
                </div>
                <div className="sellerInfoSection">
                  <div className="infoIcon">
                    <Star className="VendorStarIcon" fill="currentColor" />
                  </div>
                  <div className="infoContent">
                    <h3>Rating</h3>
                    <div className="sellerRatingContainer">
                      <span className="VendorRatingValue">4.7</span>
                      <span className="VendorTotalReviews">(120)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Seller Button */}
              <div className="actionButtonContainer">
                <button className="primaryBtn">Contact Seller</button>
              </div>
            </div>
          </div>
          
          {/* Skills Card */}
          <div className="infoCard">
              <h3 className="infoCardTitle">Skills</h3>
              <div className="skillsContainer">
                {skills.map((skill, index) => (
                  <div key={index} className="skillTag">{skill}</div>
                ))}
              </div>
            </div>

          
        </div>
        <div className="vendorDetailRightSection">
          <div className="postingsContainer">
            <div className="postingsHeader">
              <h2>Postings</h2>
              <Link to="/vendor-postings" className="viewAllLink">View All</Link>
            </div>
            <div className="productsCarousel">
              <button className="chevronBtn left" onClick={() => scroll(-1)}>
                <ChevronLeft size={24} />
              </button>
              <div className="vendorProductsWrapper" ref={productsContainerRef}>
                {sweetsCategory.slice(0, 6).map((product, index) => (
                  <ProductCard
                    key={index}
                    product = {product}
                  />
                ))}
              </div>
              <button className="chevronBtn right" onClick={() => scroll(1)}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className='myReviewsHistoryContainer'>
          {/* New Reviews Display Section */}
          <ReviewHistoryContainer reviews={historyReviews} isMyReview = {false}/>
          </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default VendorDetail;