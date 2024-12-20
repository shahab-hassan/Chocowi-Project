import React, { useState,useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PackagesPage = () => {
    const [packages, setPackages] = useState([
    { 
      name: 'Basic',
      subtitle: 'STARTING PACK',
      description: 'Perfect for simple occasions',
      options: {
        bakingTime: '1 hours',
        variable: 'Cake',
        quantity: '1',
        originOfProduct: 'Italy',
        cancellation: true,
        timeframe: '1.5 hours',
        delivery: 'No',
        variables: [],
        basePrice: 0,
        totalPrice: 0,
        discount:0
      }
    },
    {
      name: 'Standard',
      subtitle: 'PRO PACK (RECOMMENDED)',
      description: 'Great for small gatherings',
      options: {
        bakingTime: '2 hours',
        variable: 'Cake',
        quantity: '2',
        originOfProduct: 'Italy',
        cancellation: true,
        timeframe: '2.5 hours',
        delivery: 'Can Discuss',
        variables: [],
        basePrice: 0,
        totalPrice: 0,
        discount:0

      }
    },
    {
      name: 'Premium',
      subtitle: 'VIP PACK (COMPLETE PACK)',
      description: 'Ideal for special events',
      options: {
        bakingTime: '4 hours',
        variable: 'Cake',
        quantity: '3',
        originOfProduct: 'Italy',
        cancellation: true,
        timeframe: '4.5 hours',
        delivery: 'Yes',
        variables: [],
        basePrice: 0,
        totalPrice: 0,
        discount:0

      }
    }
  ]);

  const navigate = useNavigate();
  const { id } = useParams(); 
  useEffect(() => {
    const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
    const postToEdit = existingPosts.find(post => post.id === parseInt(id));

    if (postToEdit) {
      setPackages(postToEdit.packages || []); // Set packages from sellerPosts if found
    } else {
      console.log("Data not found for the provided ID. Keeping default packages.");
      // Default packages remain unchanged
    }
  }, [id, navigate]);

  const handleConfirm = () => {
    const tempProductData = JSON.parse(localStorage.getItem('tempProductData') || '{}');
    
    if (!tempProductData || tempProductData.id !== parseInt(id)) {
      toast.error('Error: Temp data not found or ID mismatch.');
      return;
    }
    
    // Update packages in tempProductData before saving
    tempProductData.packages = packages;

    const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
    const postIndex = existingPosts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex !== -1) {
      existingPosts[postIndex] = tempProductData; // Update the existing post
      toast.success('Product with packages updated successfully!');
    } else {
      existingPosts.push(tempProductData); // Add new post if not found
      toast.success('New product with packages added successfully!');
    }

    localStorage.setItem('sellerPosts', JSON.stringify(existingPosts)); // Save updated posts
    navigate('/postings'); // Navigate back to postings
  };
  const [isVariableModalOpen, setIsVariableModalOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(null);
  const [newVariable, setNewVariable] = useState({ name: '', price: '' });

  const handleFieldChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index].options[field] = value;
    setPackages(updatedPackages);
    calculatePrice(index);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index].description = value;
    setPackages(updatedPackages);
  };

  const handleBasePriceChange = (index, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index].options.basePrice = parseFloat(value) || 0;
    setPackages(updatedPackages);
    calculatePrice(index);
  };

  const toggleCancellation = (index) => {
    const updatedPackages = [...packages];
    updatedPackages[index].options.cancellation = !updatedPackages[index].options.cancellation;
    setPackages(updatedPackages);
  };

  const openVariableModal = (index) => {
    setCurrentPackageIndex(index);
    setIsVariableModalOpen(true);
  };

  const closeVariableModal = () => {
    setIsVariableModalOpen(false);
    setNewVariable({ name: '', price: '' });
  };

  const addVariable = () => {
    if (newVariable.name && newVariable.price && currentPackageIndex !== null) {
      const updatedPackages = [...packages];
      updatedPackages[currentPackageIndex].options.variables.push({
        name: newVariable.name,
        price: parseFloat(newVariable.price)
      });
      setPackages(updatedPackages);
      calculatePrice(currentPackageIndex);
      closeVariableModal();
    }
  };

  const removeVariable = (packageIndex, variableIndex) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].options.variables.splice(variableIndex, 1);
    setPackages(updatedPackages);
    calculatePrice(packageIndex);
  };

  const calculatePrice = (index) => {
    const updatedPackages = [...packages];
    const pkg = updatedPackages[index].options;

    const variablesTotal = pkg.variables.reduce(
      (total, variable) => total + parseFloat(variable.price),
      0
    );

    const quantity = parseInt(pkg.quantity) || 1;
    const initialTotalPrice = (pkg.basePrice + variablesTotal) * quantity;

    const discountPercentage = parseInt(pkg.discount) || 0;
    const discountAmount = (initialTotalPrice * discountPercentage) / 100;

    pkg.totalPrice = initialTotalPrice - discountAmount;

    setPackages(updatedPackages);
  };

  return (
    <div className="packagesContainer">
        <section className='mainSection'>
        <h1 className='pageMainHeading'>Packages and Pricing</h1>
      
      <div className="packagesTable">
        {/* Header Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Packages</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageColumn">
              <div className="packageName">{pkg.name}</div>
              <div className="packageSubtitle">{pkg.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Description Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Description</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <input
                type="text"
                value={pkg.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="inputField"
                placeholder="Enter package description"
              />
            </div>
          ))}
        </div>

        {/* Base Price Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Base Price ($)</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <input
                type="number"
                value={pkg.options.basePrice}
                onChange={(e) => handleBasePriceChange(index, e.target.value)}
                min="0"
                className="inputField"
                placeholder="0"
              />
            </div>
          ))}
        </div>

         {/* Base Price Row */}
         <div className="packagesRow">
          <div className="packagesLabel">Discount %</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <input
                type="number"
                value={pkg.options.discount}
                onChange={(e) => handleFieldChange(index, 'discount', e.target.value)}
                min="0"
                className="inputField"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        {/* Baking Time Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Baking Time</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <select 
                value={pkg.options.bakingTime}
                className="inputField"
                onChange={(e) => handleFieldChange(index, 'bakingTime', e.target.value)}
              >
                <option>1 hours</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
          ))}
        </div>

        {/* Select Variable Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Select Variable</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <button className="primaryBtn" onClick={() => openVariableModal(index)}>
                Add Variable
              </button>
              {pkg.options.variables.length > 0 && (
                <div className="variablesList">
                  {pkg.options.variables.map((variable, vIndex) => (
                    <div key={vIndex} className="variableItem">
                      <span>{variable.name} (${variable.price})</span>
                      <button 
                        className="removeVariableBtn"
                        onClick={() => removeVariable(index, vIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quantity Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Quantity</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <div className="quantityContainer">
                <input
                  type="number"
                  value={pkg.options.quantity}
                  onChange={(e) => handleFieldChange(index, 'quantity', e.target.value)}
                  min="1"
                  className="inputField"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Origin of Product Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Origin of Product</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <select
                value={pkg.options.originOfProduct}
                className="inputField"
                onChange={(e) => handleFieldChange(index, 'originOfProduct', e.target.value)}
              >
                <option>Italy</option>
              </select>
            </div>
          ))}
        </div>

        {/* Cancellation Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Cancellation of order allowed?</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <div 
                className="checkmarkContainer"
                onClick={() => toggleCancellation(index)}
              >
                <span className={`checkmark ${pkg.options.cancellation ? 'active' : ''}`}>
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeframe Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Timeframe to collect order</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <select
                className="inputField"
                value={pkg.options.timeframe}
                onChange={(e) => handleFieldChange(index, 'timeframe', e.target.value)}
              >
                <option>1.5 hours</option>
                <option>2.5 hours</option>
                <option>4.5 hours</option>
              </select>
            </div>
          ))}
        </div>

        {/* Delivery Row */}
        <div className="packagesRow">
          <div className="packagesLabel">Do You Offer Delivery?</div>
          {packages.map((pkg, index) => (
            <div key={index} className="packageCell">
              <select
                className="inputField"
                value={pkg.options.delivery}
                onChange={(e) => handleFieldChange(index, 'delivery', e.target.value)}
              >
                <option>No</option>
                <option>Can Discuss</option>
                <option>Yes</option>
              </select>
            </div>
          ))}
        </div>

        {/* Final Price Row */}
        <div className="priceRow">
          <div className="packagesLabel">Total Price (with variables)</div>
          {packages.map((pkg, index) => (
            <div key={index} className="priceCell">
              $ {pkg.options.totalPrice}
            </div>
          ))}
        </div>
      </div>

      {/* Variable Modal */}
      {isVariableModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalHeader">
              <h3>Add Variable</h3>
              <button className="closeButton" onClick={closeVariableModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modalBody">
              <input
                type="text"
                placeholder="Variable name"
                value={newVariable.name}
                onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                className="inputField"
              />
              <input
                type="number"
                placeholder="Price"
                value={newVariable.price}
                onChange={(e) => setNewVariable({ ...newVariable, price: e.target.value })}
                className="inputField"
              />
            </div>

            <div className="modalFooter">
              <button className="primaryBtn" onClick={addVariable}>
                Save Variable
              </button>
            </div>
          </div>
        </div>
        
      )}
      <div className='nextBtnContainer'>
          <button className="primaryBtn2" onClick={handleConfirm} >
            Confirm
          </button>
        </div>
        </section>
    </div>
  );
};

export default PackagesPage;