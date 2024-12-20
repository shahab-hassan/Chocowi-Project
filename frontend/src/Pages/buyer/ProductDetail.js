import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryRow from '../../Components/buyer/CategoryRow';
import { sweetsCategory } from '../../data/data';
import BreadCrumb from '../../Components/buyer/BreadCrumb';
import ReviewHistoryContainer from '../../Components/buyer/ReviewHistoryContainer';
import image from '../../images/pngs/cakecard.png'
import image2 from '../../images/pngs/cakecard2.png'
import Dropdown from '../../Components/utils/Dropdown';
import { showToast } from '../../Components/utils/ShowToast';
import { useCart } from '../../Contexts/CartContext';


const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const isVariable = product.isVariable || false;
  
  const initialPrice = isVariable 
    ? (Number(product.price) || 10.74)
    : (product.packages?.basic?.price || Number(product.price) || 10.74);
    
  const { addToCart } = useCart();
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [neededOn, setNeededOn] = useState('');
  const [minDate, setMinDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariables, setSelectedVariables] = useState({});
  const [totalPrice, setTotalPrice] = useState(initialPrice);
  const images = Array.isArray(product.images) ? product.images :
    product.imageUrl ? [product.imageUrl, product.imageUrl, product.imageUrl] :
      [];

  const [packageDetails, setPackageDetails] = useState(() => {
    if (!isVariable && product.packages) {
      return {
        name: product.packages.basic?.name || "Basic Assortment",
        price: product.packages.basic?.price || initialPrice,
        features: product.packages.basic?.features || []
      };
    }
    return {
      name: "Standard Package",
      price: initialPrice,
      features: []
    };
  });


  const validateDate = () => {
    if (!neededOn) {
      showToast('Please select a delivery date', 'error');
      return false;
    }

    const selectedDate = new Date(neededOn);
    const minimumDate = new Date(minDate);

    selectedDate.setHours(0, 0, 0, 0);
    minimumDate.setHours(0, 0, 0, 0);

    if (selectedDate < minimumDate) {
      const formattedMinDate = new Date(minDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      showToast(`Please select a date on or after ${formattedMinDate}`, 'error');
      return false;
    }

    return true;
  };


  const handlePackageSelect = (packageType) => {
    if (isVariable || !product.packages) return;
    
    setSelectedPackage(packageType);
    const newPackage = product.packages[packageType];
    if (newPackage) {
      setPackageDetails({
        name: newPackage.name || `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package`,
        price: newPackage.price || initialPrice,
        features: newPackage.features || []
      });
      setTotalPrice(newPackage.price * quantity);
    }
  };

  useEffect(() => {
    setTotalPrice(packageDetails.price * quantity);
  }, [quantity, packageDetails.price]);

  const productVariables = isVariable ? product.variableData : null;

const handleAddToCart = () => {
    if (!validateDate()) {
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.description,
      quantity: quantity,
      price: totalPrice,
      selectedOptions: isVariable ? selectedVariables : null,
      productImage: images[currentImageIndex],
      sellerInfo: product.sellerDetails,
      pickupLocation: product.pickupLocation,
      neededOn: neededOn 
    };

    addToCart(cartItem);
    showToast('Added to cart successfully!', "success");
  };

  const handleBuyNow = () => {
    if (!validateDate()) {
      return;
    }

    const orderItem = {
      name: product.description,
      quantity: quantity,
      price: totalPrice,
      selectedOptions: isVariable ? selectedVariables : null,
      productImage: images[currentImageIndex],
      sellerInfo: product.sellerDetails,
      pickupLocation: product.pickupLocation,
      neededOn: neededOn 
    };

    navigate('/checkoutPage', {
      state: {
        orderItems: [orderItem],
        orderSummary: {
          subtotal: totalPrice,
          serviceFee: totalPrice * 0.05,
          deliveryFee: 6,
          tax: totalPrice * 0.05,
          total: totalPrice + (totalPrice * 0.10) + 6,
          daysToMake: product.minDaysToMake
        }
      }
    });
  };
  useEffect(() => {
    if (isVariable && productVariables) {
      const initialVariables = {};
      Object.keys(productVariables).forEach(key => {
        const variable = productVariables[key];
        const defaultIndex = variable.defaultIndex || 0;
        initialVariables[key] = {
          value: variable.options[defaultIndex],
          price: variable.prices[defaultIndex]
        };
      });
      setSelectedVariables(initialVariables);
      calculateTotalPrice(initialVariables);
    }
  }, []);

  const calculateTotalPrice = (variables) => {
    const basePrice = Number(product.price) || 10.74;
    const variablePrices = Object.values(variables).reduce((sum, variable) => sum + Number(variable.price), 0);
    const total = (basePrice + variablePrices) * quantity;
    setTotalPrice(total);
  };

  const handleVariableChange = (variableName, optionIndex) => {
    const newVariables = {
      ...selectedVariables,
      [variableName]: {
        value: productVariables[variableName].options[optionIndex],
        price: productVariables[variableName].prices[optionIndex]
      }
    };
    setSelectedVariables(newVariables);
    calculateTotalPrice(newVariables);
  };


  const [reviews, setReviews] = useState([
    {
      id: 1,
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


  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handlePrevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const [sortOption, setSortOption] = useState('newest');
  const [ratingOption, setRatingOption] = useState(1);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const ratingOptions = [
    { value: 4, label: '4 stars & up' },
    { value: 3, label: '3 stars & up' },
    { value: 2, label: '2 stars & up' },
    { value: 1, label: '1 star & up' },
  ];

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption.value);
  };

  const handleRatingChange = (selectedOption) => {
    setRatingOption(selectedOption.value);
  };

  useEffect(() => {
    const calculateMinDate = () => {
      const today = new Date();
      let minDays = 0;
      let minHours = 0;
  
      if (isVariable) {
        const minDaysOrHours = product.minDaysToMake || '0';
        const parsedTime = parseTime(minDaysOrHours);
        minDays = parsedTime.days;
        minHours = parsedTime.hours;
      } else {
        const deliveryTime = product.packages[selectedPackage]?.deliveryTime || '0';
        const parsedTime = parseTime(deliveryTime);
        minDays = parsedTime.days;
        minHours = parsedTime.hours;
      }
  
      // Calculate the minimum allowed date
      const minAllowedDate = new Date(today);
      minAllowedDate.setDate(minAllowedDate.getDate() + minDays);
      minAllowedDate.setHours(minAllowedDate.getHours() + minHours);
  
      return minAllowedDate.toISOString().split('T')[0];
    };
  
    const parseTime = (timeString) => {
      let days = 0;
      let hours = 0;
  
      if (timeString.includes('day')) {
        days = parseInt(timeString.match(/(\d+)\s*day/)?.[1] || '0', 10);
      }
      if (timeString.includes('hour')) {
        hours = parseInt(timeString.match(/(\d+)\s*hour/)?.[1] || '0', 10);
      }
  
      return { days, hours };
    };
  
    setMinDate(calculateMinDate());
  }, [isVariable, selectedPackage, product.minDaysToMake]);
  

  useEffect(() => {
    if (!isVariable && product.packages) {
      const deliveryTime = product.packages[selectedPackage]?.deliveryTime || '0 days';
      const { days, hours } = parseTime(deliveryTime); // Parse the delivery time into days and hours
  
      const today = new Date();
      const minAllowedDate = new Date(today);
      minAllowedDate.setDate(minAllowedDate.getDate() + days); // Add days
      minAllowedDate.setHours(minAllowedDate.getHours() + hours); // Add hours
  
      setMinDate(minAllowedDate.toISOString().split('T')[0]);
    }
  }, [selectedPackage, isVariable, product.packages]);
  
  const handleDateChange = (e) => {
    setNeededOn(e.target.value);
  };
  
  const parseTime = (timeString) => {
    let days = 0;
    let hours = 0;
  
    if (timeString.includes('day')) {
      days = parseInt(timeString.match(/(\d+)\s*day/)?.[1] || '0', 10);
    }
    if (timeString.includes('hour')) {
      hours = parseInt(timeString.match(/(\d+)\s*hour/)?.[1] || '0', 10);
    }
  
    return { days, hours };
  };
  


  return (
    <div className="productDetailContainer">
      <BreadCrumb currentCategory={product.categoryName} />

      <div className="productDetailTitleContainer">
        <h1 className="productDetailTitle">{product.description}</h1>
      </div>

      <div className="productDetailInfo">
        <img src={product.profileImageUrl} alt="Seller" className="productDetailSellerImage" />
        <div className="productDetailSellerText">
          <p className="productDetailSellerName">
            {product.sellerDetails.name}
            <span className="ratingReviewContainer">
              <span className="rating">{product.sellerDetails.sellerRating}</span>
              <span className="star">★</span>
            </span>
          </p>
          <p className="productDetailSellerLocation">{product.location}</p>
        </div>
      </div>

      <p className="productDetailPickupLocation">
        <span role="img" aria-label="location">📍</span> {product.pickupLocation}
      </p>

      <div className="productDetailNewSection">
        <div className="productDetailLeftSection">
          <div className="productDetailImageContainer">
            <img
              src={images[currentImageIndex]}
              alt={`Product view ${currentImageIndex + 1}`}
              className="productDetailImage"
            />
            {images.length > 1 && (
              <>
                <button
                  className="prevImageBtn"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button
                  className="nextImageBtn"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}
            <div className="imageCounter">
              {images.length > 0 ? `${currentImageIndex + 1}/${images.length}` : 'No images'}
            </div>

            {images.length > 1 && (
              <div className="imageThumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="productDetailRightSection">
        {!isVariable && (
          <div className="packageOptions">
            <button 
              className={`packageOption ${selectedPackage === 'basic' ? 'active' : ''}`}
              onClick={() => handlePackageSelect('basic')}
            >
              Basic
            </button>
            <button 
              className={`packageOption ${selectedPackage === 'standard' ? 'active' : ''}`}
              onClick={() => handlePackageSelect('standard')}
            >
              Standard
            </button>
            <button 
              className={`packageOption ${selectedPackage === 'premium' ? 'active' : ''}`}
              onClick={() => handlePackageSelect('premium')}
            >
              Premium 🎉
            </button>
          </div>
        )}

        <div className="priceInfo">
          <p>{packageDetails.name}</p>
          <h2>${totalPrice.toFixed(2)}</h2>
        </div>

        {!isVariable && (
          <ul className="packageFeatures">
            {packageDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}

          {isVariable && productVariables && Object.entries(productVariables).map(([variableName, variable]) => (
            <div key={variableName} className="variableSelector">
              <select
                value={selectedVariables[variableName]?.value}
                onChange={(e) => handleVariableChange(variableName, e.target.selectedIndex)}
                className="variableSelect"
              >
                {variable.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option} {variable.prices[index] > 0 ? `(+$${variable.prices[index].toFixed(2)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}
           <div className="dateSelector">
          <label htmlFor="neededOn" className="label">
            Needed On
          </label>
          <input
            type="date"
            id="neededOn"
            name="neededOn"
            value={neededOn}
            min={minDate}
            onChange={handleDateChange}
            className="inputField"
          />
          {isVariable ? (
            <p className="dateSelectorHelper">
              Minimum {product.minDaysToMake} days required for preparation
            </p>
          ) : (
            <p className="dateSelectorHelper">
              Delivery time: {product.packages[selectedPackage]?.deliveryTime}
            </p>
          )}
        </div>

          <div className="quantitySelector">
            <button className="quantityBtn" onClick={decreaseQuantity}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantityBtn" onClick={increaseQuantity}>
              +
            </button>
          </div>

          <div className="deliveryOptions">
            <label>
              <input type="radio" name="deliveryOption" value="pickup" defaultChecked />
              Pick Up
            </label>
            <label>
              <input type="radio" name="deliveryOption" value="delivery" />
              Home Delivery
            </label>
          </div>

          <p className="disclaimer">This order cannot be cancelled once made</p>

          <div className="actionButtons">
            <button className="primaryBtn" onClick={() => handleBuyNow()}>
              Buy Now
            </button>
            <button onClick={() => handleAddToCart()} className="primaryBtn3">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="productAdditionalInfo">
        <div className="additionalInfoSection">
          <h3>Main Ingredients</h3>
          <p>{product.ingredients}</p>
        </div>
        <div className="additionalInfoSection">
          <h3>Allergy Information</h3>
          <p>{product.allergyInfo}</p>
        </div>
        <div className="additionalInfoSection">
          <h3>Minimum Days it takes to make</h3>
          <p>{product.minDaysToMake} days</p>
        </div>
        <div className="additionalInfoSection">
          <h3>Events</h3>
          <p>{product.events.join(', ')}</p>
        </div>
        <div className="additionalInfoSection">
          <h3>Product Description</h3>
          <p>{product.fullDescription}</p>
        </div>
      </div>

      <div className="sellerCardContainer">
        <div className="sellerCard">
          <div className="sellerInfoSection">
            <div className="sellerProfileImageContainer">
              <img src={product.profileImageUrl} alt="Seller" className="sellerProfileImage" />
            </div>
            <div className="sellerDetailsContainer">
              <div className="sellerDetailsColumn">
                <p className="detailLabel">Name</p>
                <p className="detailValue">{product.sellerDetails.name}</p>
              </div>
              <div className="sellerDetailsColumn">
                <p className="detailLabel">Languages</p>
                <p className="detailValue">{product.sellerDetails.languages.join(', ')}</p>
              </div>
              <div className="sellerDetailsColumn">
                <p className="detailLabel">Contact</p>
                <p className="detailValue">{product.sellerDetails.contact}</p>
              </div>
              <div className="sellerDetailsColumn">
                <p className="detailLabel">Completed</p>
                <p className="detailValue">{product.sellerDetails.ordersCompleted} orders</p>
              </div>
              <div className="sellerRatingContainer">
                <span className="ratingValue">{product.sellerDetails.sellerRating}</span>
                <span className="starIcon">★</span>
                <span className="totalReviews">({product.reviews})</span>
              </div>
            </div>
          </div>

          <div className="sellerDescription">
            <p>{product.fullDescription}</p>
          </div>

          <div className="actionButtonContainer">
            <div className="actionButtons">
              <button className="primaryBtn">Request Custom Order</button>
              <button style={{ backgroundColor: "#ff6b81" }} className="primaryBtn">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      <CategoryRow
        key="deals"
        categoryName="Other Postings"
        products={sweetsCategory}
        isCategory={false}
      />

      <div className="reviewsSectionContainer">
        <h1 className='pageMainHeading'>Reviews</h1>
        <div className="reviewsFilterContainer">
          <div className="filterOptions">
            <div className="defaultDropdown">
              <label htmlFor="sortOption">Sort</label>
              <Dropdown
                options={sortOptions}
                value={sortOptions.find(option => option.value === sortOption)}
                onChange={handleSortChange}
                placeholder="Select Sort"
              />
            </div>

            <div className="defaultDropdown">
              <label htmlFor="ratingOption">Rating</label>
              <Dropdown
                options={ratingOptions}
                value={ratingOptions.find(option => option.value === ratingOption)}
                onChange={handleRatingChange}
                placeholder="Select Rating"
              />
            </div>
          </div>
        </div>
        <ReviewHistoryContainer
          reviews={reviews}
          isMyReview={false}
          isProductReview={true}
        />


      </div>
    </div>
  );
};

export default ProductDetail;