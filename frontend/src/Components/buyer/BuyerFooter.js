import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const BuyerFooter = () => {
  return (
    <footer className="buyerFooter">
      <div className="buyerFooterBackground"></div>
      <div className="buyerFooterContent">
        <div className="buyerFooterSection">
          <h4>ABOUT</h4>
          <ul>
            <li>ABOUT US</li>
            <li>OUR SERVICES</li>
            <li>OUR COMMITMENTS</li>
            <li>TERMS AND CONDITIONS</li>
            <li>FEE STRUCTURE</li>
            <li>HOW IT WORKS</li>
            <li>CATEGORIES</li>
          </ul>
        </div>
        <div className="buyerFooterSection">
          <h4>HELP</h4>
          <ul>
            <li>CONTACT US</li>
            <li>REPORT FRAUD</li>
            <li>REPORT ABUSE</li>
          </ul>
        </div>
        <div className="buyerFooterSection">
          <h4>SELLER</h4>
          <ul>
            <li>BECOME A SELLER</li>
            <li>POST A SERVICE</li>
          </ul>
        </div>
        <div className="buyerFooterSection">
          <h4>BUYER</h4>
          <ul>
            <li>REGISTER AS A BUYER</li>
            <li>POST YOUR REQUIREMENTS</li>
          </ul>
        </div>
      </div>
      <div className="buyerFooterSocial">
        <div className="socialIcon"><FaFacebookF /></div>
        <div className="socialIcon"><FaInstagram /></div>
        <div className="socialIcon"><FaYoutube /></div>
        <div className="socialIcon"><FaTwitter /></div>
      </div>
    </footer>
  );
};

export default BuyerFooter;
