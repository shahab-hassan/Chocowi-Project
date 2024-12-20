import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../../Components/utils/Dropdown';
import tradeLeadImage from '../../images/pngs/tradeLead.png';
import BreadCrumb from '../../Components/buyer/BreadCrumb';

const TradeLeadForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.editData;

  const [formData, setFormData] = useState({
    tradeLeadProduct: '',
    tradeLeadCategory: '',
    tradeLeadSubCategory: '',
    tradeLeadCountry: '',
    tradeLeadState: '',
    tradeLeadCity: '',
    location: '',
    requirementDetails: '',
    tradeLeadBudget: '',
    tradeLeadQuantity: '',
    tradeLeadDate: '',
    tradeLeadTime: '',
    tradeLeadExpiryDate: '',
    tradeLeadDeliveryOption: 'Pick up',
    tradeLeadEvent: '',  // Adding tradeLeadEvent to the state
    kilometersAway: '',  // Adding kilometersAway to the state
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        tradeLeadProduct: editData.product.name,
        tradeLeadCategory: editData.category,
        tradeLeadSubCategory: editData.subCategory,
        tradeLeadCountry: editData.country,
        tradeLeadState: editData.state,
        tradeLeadCity: editData.city,
        location: editData.location,
        requirementDetails: editData.requirementDetails,
        tradeLeadBudget: editData.quotedAmount,
        tradeLeadQuantity: editData.quantity,
        tradeLeadDate: editData.expiryDate.split('T')[0], 
        tradeLeadTime: '',
        tradeLeadExpiryDate: editData.expiryDate.split('T')[0],
        tradeLeadDeliveryOption: editData.deliveryOption,
        tradeLeadEvent: editData.event || '',  // Update this with correct value from editData
        kilometersAway: editData.kilometersAway || '',  // Update this with correct value from editData
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/tradeLeads');
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  return (
    <div className="tradeLeadPage">
      <section className="mainSection">
        <BreadCrumb />
        <h1 className="pageMainHeading">
          {editData ? 'Edit Trade Lead' : 'Tell us your Requirement'}
        </h1>

        <div className="tradeLeadContainer">
          <div className="tradeLeadImage">
            <img src={tradeLeadImage} alt="Trade Lead" />
          </div>

          <div className="tradeLeadFormContainer">
            <form onSubmit={handleSubmit}>
              {/* Product Details */}
              <div className="tradeLeadGroup">
                <h2 className="tradeLeadSectionLabel">Product Details</h2>
                <div className="tradeLeadField">
                  <label htmlFor="tradeLeadProduct">Product</label>
                  <input
                    id="tradeLeadProduct"
                    type="text"
                    className="inputField"
                    placeholder="Product you are looking for"
                    name="tradeLeadProduct"
                    value={formData.tradeLeadProduct}
                    onChange={handleChange}
                  />
                </div>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadCategory">Category</label>
                    <Dropdown
                      id="tradeLeadCategory"
                      options={options}
                      value={formData.tradeLeadCategory}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadCategory: value,
                        }))
                      }
                      placeholder="Select Category"
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadSubCategory">Sub-Category</label>
                    <Dropdown
                      id="tradeLeadSubCategory"
                      options={options}
                      value={formData.tradeLeadSubCategory}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadSubCategory: value,
                        }))
                      }
                      placeholder="Select Sub-Category"
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadEvent">Event</label>
                    <Dropdown
                      id="tradeLeadEvent"
                      options={options}
                      value={formData.tradeLeadEvent}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadEvent: value,
                        }))
                      }
                      placeholder="Event"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Area Section */}
              <div className="tradeLeadGroup">
                <h2 className="tradeLeadSectionLabel">Preferred Area</h2>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadCountry">Country</label>
                    <Dropdown
                      id="tradeLeadCountry"
                      options={options}
                      value={formData.tradeLeadCountry}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadCountry: value,
                        }))
                      }
                      placeholder="Country"
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadState">State</label>
                    <Dropdown
                      id="tradeLeadState"
                      options={options}
                      value={formData.tradeLeadState}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadState: value,
                        }))
                      }
                      placeholder="State"
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadCity">City</label>
                    <Dropdown
                      id="tradeLeadCity"
                      options={options}
                      value={formData.tradeLeadCity}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeLeadCity: value,
                        }))
                      }
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="location">Location/Area</label>
                    <input
                      id="location"
                      type="text"
                      className="inputField"
                      placeholder="Location/Area"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="kilometersAway">Kilometers Away</label>
                    <Dropdown
                      id="kilometersAway"
                      options={options}
                      value={formData.kilometersAway}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          kilometersAway: value,
                        }))
                      }
                      placeholder="Kilometers Away"
                    />
                  </div>
                </div>
              </div>

              <div className="tradeLeadGroup">
                <h2 className="tradeLeadSectionLabel">Requirement Details</h2>
                <div className="tradeLeadField">
                  <label htmlFor="requirementDetails">Requirements</label>
                  <textarea
                    id="requirementDetails"
                    className="inputField"
                    name="requirementDetails"
                    value={formData.requirementDetails}
                    onChange={handleChange}
                    placeholder="Enter your requirements"
                  />
                </div>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadBudget">Targeted Budget</label>
                    <input
                      id="tradeLeadBudget"
                      type="text"
                      className="inputField"
                      placeholder="Enter Targeted Budget"
                      name="tradeLeadBudget"
                      value={formData.tradeLeadBudget}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadQuantity">Quantity</label>
                    <input
                      id="tradeLeadQuantity"
                      type="text"
                      className="inputField"
                      placeholder="Enter Quantity"
                      name="tradeLeadQuantity"
                      value={formData.tradeLeadQuantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadAllergy">Allergy</label>
                    <input
                      id="tradeLeadAllergy"
                      type="text"
                      className="inputField"
                      placeholder="Enter Allergy (if any)"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="tradeLeadGroup">
                <h2 className="tradeLeadSectionLabel">Date & Time</h2>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadDate">Date</label>
                    <input
                      id="tradeLeadDate"
                      type="date"
                      className="inputField"
                      name="tradeLeadDate"
                      value={formData.tradeLeadDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadTime">Time</label>
                    <input
                      id="tradeLeadTime"
                      type="time"
                      className="inputField"
                      name="tradeLeadTime"
                      value={formData.tradeLeadTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="tradeLeadRow">
                  <div className="tradeLeadField">
                    <label htmlFor="tradeLeadExpiryDate">Expiry Date</label>
                    <input
                      id="tradeLeadExpiryDate"
                      type="date"
                      className="inputField"
                      name="tradeLeadExpiryDate"
                      value={formData.tradeLeadExpiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <p className="expiryNote">
                  Note: After this date, the posting will be automatically deleted.
                </p>
              </div>

              {/* Delivery Options */}
              <div className="tradeLeadGroup">
                <h2 className="tradeLeadSectionLabel">How will you receive?</h2>
                <div className="deliveryOptions">
                  <label>
                    <input
                      type="radio"
                      name="tradeLeadDeliveryOption"
                      value="Pick up"
                      checked={formData.tradeLeadDeliveryOption === 'Pick up'}
                      onChange={handleChange}
                    />{' '}
                    Pick Up
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tradeLeadDeliveryOption"
                      value="Home Delivery"
                      checked={formData.tradeLeadDeliveryOption === 'Home Delivery'}
                      onChange={handleChange}
                    />{' '}
                    Home Delivery
                  </label>
                </div>
              </div>

              <div className="tradeLeadRow">
                <button type="submit" className="primaryBtn">
                  {editData ? 'Update' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TradeLeadForm;