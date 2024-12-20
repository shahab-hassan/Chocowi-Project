import React, { useState } from 'react';
import { MapPin, Edit2 } from 'lucide-react';
import mapImage from '../../images/pngs/map.png'
import { useNavigate,useLocation } from 'react-router-dom';
import { showToast } from '../../Components/utils/ShowToast';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, orderSummary } = location.state || {
    orderItems: [],
    orderSummary: {
      subtotal: 0,
      serviceFee: 0,
      deliveryFee: 0,
      tax: 0,
      total: 0
    }
  };
  const [editMode, setEditMode] = useState({
    delivery: false,
    personal: false,
    payment: false
  });

  const [formData, setFormData] = useState({
    address: '',
    state: '',
    country: '',
    date: '',
    note: '',
    paymentMethod: 'Stripe',
    personalDetails: {
      name: 'Shahab hassan',
      email: 'Shahabhassan@gmail.com',
      phone: '+920123403249'
    }
  });


  const handleClick = ()=>{
    //idr payment ka logic
    //CONfimration ke baad
    showToast("Order Placed Successfully",'success')
    navigate('/orders')
  }

  const handleEdit = (section) => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonalDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    handleEdit(section);
  };

  const handleCancel = (section) => {
    setEditMode(prev => ({
      ...prev,
      [section]: false
    }));
  };

  return (
    <div className="checkoutPage">
            <h1 className='pageMainHeading'>Checkout</h1>

      <div className="checkoutCard">
        <div className="checkoutHeader">
          <div className="checkoutSubtitle">
            <MapPin size={20} />
            <span>Delivery</span>
            <span className="checkoutChargesNote">(delivery charges may apply)</span>
          </div>
          <button 
            className="checkoutEditButton"
            onClick={() => handleEdit('delivery')}
          >
            {editMode.delivery ? 'Cancel' : <Edit2 size={16} />}
          </button>
        </div>
        <div className="checkoutContent">
          <div className="checkoutMapContainer">
            <img 
              src={mapImage}
              alt="Map"
              className="checkoutMapImage"
            />
          </div>
          <div className="checkoutFormContainer">
            <div>
              <label className="checkoutFormLabel">Full Address</label>
              <input
                type="text"
                placeholder="Enter Full Address"
                className="inputField"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!editMode.delivery} 
              />
            </div>
            
            <div>
              <label className="checkoutFormLabel">State / Province</label>
              <input
                type="text"
                placeholder="State / Province"
                className="inputField"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={!editMode.delivery} 
              />
            </div>

            <div>
              <label className="checkoutFormLabel">Country</label>
              <input
                type="text"
                placeholder="Country"
                className="inputField"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={!editMode.delivery} 
              />
            </div>

            <div>
              <label className="checkoutFormLabel">Delivery Date</label>
              <input
                type="date"
                className="inputField"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                disabled={!editMode.delivery} 
              />
            </div>

            <div>
              <label className="checkoutFormLabel">Note for rider</label>
              <textarea
                placeholder="Write Note for rider"
                className="inputField checkoutTextarea"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                rows={4}
                disabled={!editMode.delivery} 
              />
            </div>

            {editMode.delivery && (
              <div>
                <button className="primaryBtn" onClick={() => handleSave('delivery')}>Save</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="checkoutTwoColumnLayout">
        <div className="checkoutLeftColumn">
        <div className="checkoutSection">
  <div className="checkoutSectionHeader">
    <h2 className="checkoutSectionTitle">Personal details</h2>
    <button 
      className="checkoutEditButton"
      onClick={() => handleEdit('personal')}
    >
      {editMode.personal ? 'Cancel' : <Edit2 size={16} />}
    </button>
  </div>
  <div className="checkoutPersonalDetailsEdit">
    <div className="checkoutPersonalDetailsField">
      <label className="checkoutPersonalDetailsLabel">Full Name</label>
      <input
        type="text"
        className="inputField"
        value={formData.personalDetails.name}
        onChange={(e) => handlePersonalDetailsChange('name', e.target.value)}
        disabled={!editMode.personal}
      />
    </div>
    <div className="checkoutPersonalDetailsField">
      <label className="checkoutPersonalDetailsLabel">Email Address</label>
      <input
        type="email"
        className="inputField"
        value={formData.personalDetails.email}
        onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
        disabled={!editMode.personal}
      />
    </div>
    <div className="checkoutPersonalDetailsField">
      <label className="checkoutPersonalDetailsLabel">Phone Number</label>
      <input
        type="tel"
        className="inputField"
        value={formData.personalDetails.phone}
        onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
        disabled={!editMode.personal}
      />
    </div>
    {editMode.personal && (
      <button className="primaryBtn" onClick={() => handleSave('personal')}>Save</button>
    )}
  </div>
</div>

          <div className="checkoutSection">
            <div className="checkoutSectionHeader">
              <h2 className="checkoutSectionTitle">Payment</h2>
              <button 
                className="checkoutEditButton"
                onClick={() => handleEdit('payment')}
              >
                {editMode.payment ? 'Cancel' : <Edit2 size={16} />}
              </button>
            </div>
            {editMode.payment ? (
              <div className="checkoutPaymentMethods">
                {['GooglePay', 'Paypal', 'Stripe'].map((method) => (
                  <label key={method} className="checkoutPaymentMethod">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <span className="checkoutPaymentMethodName">{method}</span>
                  </label>
                ))}
                <button className="primaryBtn" onClick={() => handleSave('payment')}>Save</button>
              </div>
            ) : (
              <div className="checkoutPaymentSelected">
                <p>Selected payment method: {formData.paymentMethod}</p>
              </div>
            )}
          </div>
        </div>

        <div className="checkoutRightColumn">
          <div className="checkoutSection checkoutOrderSummary">
          <div className="checkoutSectionHeader">
            <h2 className="checkoutSectionTitle">Order Details</h2>
            </div>
            <div className="checkoutOrderItems">
              {orderItems.map((item, index) => (
                <div key={index} className="checkoutOrderItem">
                  <span><span  className='checkoutOrderItemsQuantity'>{item.quantity}x</span> {item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
            <div className="checkoutOrderTotals">
              <div className="checkoutOrderTotal">
                <span>SubTotal</span>
                <span>${orderSummary.subtotal}</span>
              </div>
              <div className="checkoutOrderTotal">
                <span>Service Fee</span>
                <span>${orderSummary.serviceFee}</span>
              </div>
              <div className="checkoutOrderTotal">
                <span>Delivery Fee</span>
                <span>${orderSummary.deliveryFee}</span>
              </div>
              <div className="checkoutOrderTotal">
                <span>Tax</span>
                <span>${orderSummary.tax}</span>
              </div>
            </div>
            <div className="checkoutOrderTotal checkoutOrderTotalFinal">
              <span>Total</span>
              <span>${orderSummary.total}</span>
            </div>
            <button onClick={()=>handleClick()} className="primaryBtn">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
