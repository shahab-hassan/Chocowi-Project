import React from 'react';
import { FaStar } from 'react-icons/fa';

const OfferView = ({ offers, singleOffer, yourAmount,product }) => {
  const offersToDisplay = singleOffer ? [singleOffer] : offers;

  return (
    <div className="offerViewContainer">
      <section className="mainSection">
      <h1 className='pageMainHeading'>     
          {product.name}
      </h1>

      {offersToDisplay.map((offer) => (
        <div key={offer.id} className="sellerCardContainer">
          <div className="sellerCard">
            <div className="sellerInfoSection">
              <div className="sellerProfileImageContainer">
                <img src={offer.avatar} alt={offer.name} className="sellerProfileImage" />
              </div>
              <div className="sellerDetailsContainer">
                <div className="sellerDetailsColumn">
                  <p className="detailLabel">Seller Name</p>
                  <p className="detailValue">{offer.name}</p>
                </div>
                <div className="sellerDetailsColumn">
                  <p className="detailLabel">Languages</p>
                  <p className="detailValue">Urdu, English</p>
                </div>
                <div className="sellerDetailsColumn">
                  <p className="detailLabel">Address</p>
                  <p className="detailValue">Islamabad, Pakistan</p>
                </div>
                <div className="sellerDetailsColumn">
                  <p className="detailLabel">Completed</p>
                  <p className="detailValue">7 orders</p>
                </div>
                <div className="sellerRatingContainer">
                  <span className="ratingValue">4.7</span>
                  <FaStar className="starIcon" />
                  <span className="totalReviews">(120)</span>
                </div>
              </div>
            </div>
            <div className="sellerDescriptionSection">
              <h3>Description:</h3>
              <p>Hi... elizajhones here, a Professional Graphic designer with great experience and having extra-ordinary skills in Adobe Photoshop and Adobe illustrator. I'm a Freelance Graphic Designer & logo designer with strong experience in corporate designs. I am a proud perfectionist when it comes to watercolor real estate logo and eyelashes design</p>
            </div>
            <div className="offerAmountSection">
              <div className="amountColumn">
                <p className="amountLabel">Proposed Amount by Seller</p>
                <p className="amountValue">${offer.amount}</p>
              </div>
              <div className="amountColumn">
                <p className="amountLabel">Your Amount</p>
                <p className="amountValue">${yourAmount}</p>
              </div>
            </div>
            <div className="offerActionButtons">
              <button className="primaryBtn">Accept Offer</button>
              <button className="primaryBtn3">Contact Seller</button>
            </div>
          </div>
        </div>
      ))}
      </section>
    </div>
  );
};

export default OfferView;