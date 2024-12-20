import React, { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { FaLanguage } from 'react-icons/fa';
import profileImage from '../../images/pngs/profile.png';
import ProductCard from '../../Components/buyer/ProductCard';
import ReviewHistoryContainer from '../../Components/buyer/ReviewHistoryContainer';
import { sweetsCategory } from '../../data/data';
import image from '../../images/pngs/cakecard.png';
import image2 from '../../images/pngs/cakecard2.png';
import ActiveOrders from '../../Components/seller/ActiveOrders';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate(); 
  const [currentStatus, setCurrentStatus] = useState('online');
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
  


  const chatList = [
    {
      id: 1,
      name: 'Nafees Bakers',
      userType: 'Seller',
      message: 'On for 12:30 PM then ?',
      time: '12:30 PM',
      avatar: profileImage
    },
    {
      id: 2,
      name: 'Nafees Bakers',
      userType: 'Seller',
      message: 'On for 12:30 PM then ?',
      time: '12:05 PM',
      avatar: profileImage
    }
  ];

  return (
    <div className="vendorDetailContainer">
        <section className='mainSection'>
        <h1 className='pageMainHeading'>Dashboard</h1>
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
                  <select 
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    className="onlineStatus"
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="online">Online (Accepting orders)</option>
                    <option value="busy">Busy (Limited availability)</option>
                    <option value="offline">Offline (Not accepting orders)</option>
                  </select>
                </div>
              </div>

              {/* Seller Description */}
              <div className="sellerDescription">
                <p>
                  Hi... elizajhones here, a Professional Graphic designer with great experience
                  and having extra-ordinary skills in Adobe Photoshop and Adobe Illustrator. I'm a
                  Freelance Graphic Designer & logo designer with strong experience in
                  corporate designs.
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

              {/* Edit Profile Button */}
              <div className="actionButtonContainer">
                <button 
                onClick={()=>
                  navigate('/settingsPage', {
                    state: {
                     isSellerAccount:true
                    }
                  })
                }  
                 className="primaryBtn">Edit Profile</button>
              </div>
            </div>
          </div>
          
         
          <div className="infoCard">
              <h3 className="infoCardTitle">Contact info</h3>
              <div className="infoCardContent">
                <div className="infoItem">
                  <Phone className="infoIcon" size={20} />
                  <div className="infoDetails">
                    <span className="infoLabel">Phone No:</span>
                    <span className="infoValue">+92-0000000</span>
                  </div>
                </div>
                <div className="infoItem">
                  <Mail className="infoIcon" size={20} />
                  <div className="infoDetails">
                    <span className="infoLabel">Email</span>
                    <span className="infoValue">Sahab@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Address Card */}
            <div className="infoCard">
              <h3 className="infoCardTitle">Pickup address</h3>
              <div className="infoCardContent">
                <div className="infoItem">
                  <MapPin className="infoIcon" size={20} />
                  <div className="infoDetails">
                    <span className="infoLabel">Pickup Address</span>
                    <span className="infoValue">Margalla Town, Islamabad, Pakistan (1090)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            {/* <div className="infoCard">
              <h3 className="infoCardTitle">Skills</h3>
              <div className="skillsContainer">
                {skills.map((skill, index) => (
                  <div key={index} className="skillTag">{skill}</div>
                ))}
              </div>
            </div> */}

            {/* Latest Chats Card */}
            <div className="infoCard">
              <div className="recentChatHeader">
                <h3 className="infoCardTitle">Latest chats</h3>
                <button onClick={()=>navigate('/sellerChatPage', { state: { isSeller:true } })} className="viewAllButton">View All</button>
              </div>
              <div className="recentChatList">
                {chatList.map((chat) => (
                  <div key={chat.id} className="recentChatItem">
                    <div className="recentChatLogoContainer">
                      <img src={chat.avatar} alt={chat.name} className="recentChatLogo" />
                    </div>
                    <div className="recentChatContent">
                      <div className="recentChatUserInfo">
                        <span className="recentChatName">{chat.name}</span>
                        <span className="recentChatUserType">{chat.userType}</span>
                      </div>
                      <p className="recentChatMessage">{chat.message}</p>
                    </div>
                    <span className="recentChatTime">{chat.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        <div className="vendorDetailRightSection">
          <div className="postingsContainer">
            <div className="postingsHeader">
              <h2>Your Products</h2>
              <button 
                onClick={()=>navigate('/createProduct/new')} 
                className="primaryBtn2"
              >
                Create New Product
                 </button>
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
        
          <ActiveOrders />
          <div className='myReviewsHistoryContainer'>
          <ReviewHistoryContainer reviews={historyReviews} isMyReview = {false}/>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default SellerDashboard;