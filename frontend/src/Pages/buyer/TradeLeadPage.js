import React, { useState } from 'react';
import { FaPlusCircle,FaChevronUp,FaChevronDown,FaEdit,FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image from '../../images/pngs/cakecard.png'
import seller1 from '../../images/pngs/seller1.png'
import seller2 from '../../images/pngs/seller2.png'
import seller3 from '../../images/pngs/seller1.png'
import BreadCrumb from '../../Components/buyer/BreadCrumb';
import OfferView from './OfferView';

const TradeLeadsTable = () => {
  const navigate = useNavigate();
  const [viewingOffers, setViewingOffers] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const mockData = [
    {
      id: 1,
      product: {
        name: 'Deliciously Custom Pancake Creations for Any Occasion',
        image: image
      },
      category: 'Cakes',
      subCategory: 'Custom Cakes',
      expiryDate: '2024-01-19',
      quotedAmount: '200',
      quantity: '10',
      requirementDetails: 'Need custom pancakes for a birthday party',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      location: 'Downtown',
      deliveryOption: 'Home Delivery',
      sellerOffers: [
        { id: 1, name: 'Nafees B', amount: '210$', avatar: seller1 },
        { id: 2, name: 'Layer Bakes', amount: '210$', avatar: seller2 },
        { id: 3, name: 'Shahab Hassan', amount: '210$', avatar: seller3 }
      ]
    },
    // ... other mock data items
  ];

  const handleEdit = (item) => {
    // Navigate to the TradeLeadForm page with the item data
    navigate('/tradeLeadForm', { state: { editData: item } });
  };


  const toggleRow = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleViewOffer = (item, offer) => {
    setViewingOffers({ item, offers: [offer], viewAll: false });
  };

  const handleViewAllOffers = (item) => {
    setViewingOffers({ item, offers: item.sellerOffers, viewAll: true });
  };

  if (viewingOffers) {
    return (
      <OfferView
        offers={viewingOffers.offers}
        singleOffer={!viewingOffers.viewAll ? viewingOffers.offers[0] : null}
        yourAmount={viewingOffers.item.quotedAmount}
        product = {viewingOffers.item.product}
      />
    );
  }


  return (
    <div className="tradeLeadsTableContainer">
      <section className='mainSection'>
      <BreadCrumb  />
      <h1 className="pageMainHeading">Tradeleads</h1>
      <table className="tradeLeadsMainTable">
        <thead>
          <tr className="tradeLeadsTableHeader">
            <th>Product</th>
            <th>Category</th>
            <th>Expiry Date</th>
            <th>Quoted Amount</th>
            <th>Seller Offers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="tradeLeadsTableRow">
                <td>
                  <div className="tradeLeadsProductCell">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="tradeLeadsProductImage"
                    />
                    <span className="tradeLeadsProductName">{item.product.name}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.expiryDate}</td>
                <td>{item.quotedAmount}</td>
                <td>
                  <div className="tradeLeadsOffersCount">
                    <span>{item.sellerOffers.length}</span>
                    <button 
                      className="tradeLeadsExpandButton"
                      onClick={() => toggleRow(item.id)}
                    >
                      {expandedRows.has(item.id) ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="tradeLeadsActionButtons">
                    <button className="tradeLeadsEditButton" onClick={() => handleEdit(item)}>
                      <FaEdit size={16} />
                      <span>Edit</span>
                    </button>
                    <button className="tradeLeadsWithdrawButton">
                      <FaTrash size={16} />
                      <span>Withdraw</span>
                    </button>
                  </div>
                </td>
              </tr>
              {expandedRows.has(item.id) && item.sellerOffers.length > 0 && (
                <tr className="tradeLeadsOffersRow">
                  <td colSpan="6">
                    <div className="tradeLeadsOffersContainer">
                      {item.sellerOffers.map((offer, index) => (
                        <div key={offer.id} className="tradeLeadsOfferItem">
                          <div className="tradeLeadsOfferInfo">
                            <span className="tradeLeadsOfferNumber">{index + 1}</span>
                            <img 
                              src={offer.avatar} 
                              alt={offer.name} 
                              className="tradeLeadsOfferAvatar"
                            />
                            <span className="tradeLeadsOfferName">{offer.name}</span>
                            <span className="tradeLeadsOfferAmount">{offer.amount}</span>
                          </div>
                          <button className="tradeLeadsViewOfferButton"onClick={() => handleViewOffer(item, offer)}>View Offer</button>
                        </div>
                      ))}
                      {item.sellerOffers.length > 2 && (
                        <button className="tradeLeadsViewAllButton"     onClick={() => handleViewAllOffers(item)}>View All</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button 
        className="tradeLeadsFloatingActionButton"
        onClick={() => navigate('/tradeLeadForm')}
      >
        <FaPlusCircle size={24} />
      </button>
      </section>
    </div>
  );
};

export default TradeLeadsTable;