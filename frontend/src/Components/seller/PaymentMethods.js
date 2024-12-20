import React, { useState } from 'react';

const PaymentMethods = () => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [formData, setFormData] = useState({
    stripeId: '',
    wiseAccountId: '',
    paypalEmail: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToggle = (method) => {
    // Only allow one method to be active at a time
    setActiveMethod(prevMethod => prevMethod === method ? null : method);
  };

  const handleModalOpen = (method) => {
    setCurrentModal(method);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log('Saved:', currentModal, formData);
    setModalOpen(false);
  };

  const modalContent = {
    stripe: {
      title: 'Add Stripe',
      field: 'stripeId',
      label: 'Stripe ID',
      warning: 'Make sure you enter correct Stripe ID, otherwise you may not receive your funds!'
    },
    wise: {
      title: 'Add Wise',
      field: 'wiseAccountId',
      label: 'Wise Account ID',
      warning: 'Make sure you enter correct Account ID, otherwise you may not receive your funds!'
    },
    paypal: {
      title: 'Add Paypal',
      field: 'paypalEmail',
      label: 'Paypal Email',
      warning: 'Make sure you enter correct Paypal Email, otherwise you may not receive your funds!'
    }
  };

  return (
    <div className="paymentMethodContainer">
      <h3 className="paymentMethodTitle">Payment Methods</h3>
      
      <div className="paymentMethods">
        {/* Stripe */}
        <div className="paymentMethodItem">
          <div className="paymentMethodLeft">
            <div className="paymentMethodIcon">S</div>
            <span className="paymentMethodName">Stripe</span>
          </div>
          <div className="paymentMethodRight">
            <label className="toggleSwitch">
              <input
                type="checkbox"
                checked={activeMethod === 'stripe'}
                onChange={() => handleToggle('stripe')}
              />
              <span className="toggleSlider"></span>
            </label>
            <button 
              className="primaryBtn"
              onClick={() => handleModalOpen('stripe')}
            >
              Connect
            </button>
          </div>
        </div>

        {/* Wise */}
        <div className="paymentMethodItem">
          <div className="paymentMethodLeft">
            <div className="paymentMethodIcon">W</div>
            <span className="paymentMethodName">Wise</span>
          </div>
          <div className="paymentMethodRight">
            <label className="toggleSwitch">
              <input
                type="checkbox"
                checked={activeMethod === 'wise'}
                onChange={() => handleToggle('wise')}
              />
              <span className="toggleSlider"></span>
            </label>
            <button 
              className="primaryBtn"
              onClick={() => handleModalOpen('wise')}
            >
              Add Wise
            </button>
          </div>
        </div>

        {/* Paypal */}
        <div className="paymentMethodItem">
          <div className="paymentMethodLeft">
            <div className="paymentMethodIcon">P</div>
            <span className="paymentMethodName">Paypal</span>
          </div>
          <div className="paymentMethodRight">
            <label className="toggleSwitch">
              <input
                type="checkbox"
                checked={activeMethod === 'paypal'}
                onChange={() => handleToggle('paypal')}
              />
              <span className="toggleSlider"></span>
            </label>
            <button 
              className="primaryBtn"
              onClick={() => handleModalOpen('paypal')}
            >
              Add Paypal
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && currentModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2 className="modalTitle">{modalContent[currentModal].title}</h2>
            <div className="modalBody">
              <label className="modalLabel">
                {modalContent[currentModal].label}
              </label>
              <input
                type="text"
                name={modalContent[currentModal].field}
                value={formData[modalContent[currentModal].field]}
                onChange={handleInputChange}
                className="inputField"
                placeholder={`Enter your ${modalContent[currentModal].label}`}
              />
              <p className="modalWarning">
                {modalContent[currentModal].warning}
              </p>
              <div className="modalActions">
                <button className="primaryBtn" onClick={handleSave}>
                  Save
                </button>
                <button 
                  className="primaryBtn3" 
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;