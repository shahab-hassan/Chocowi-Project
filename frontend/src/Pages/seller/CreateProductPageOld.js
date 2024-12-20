// import React, { useState, useEffect } from 'react';
// import { X, Plus, Minus, Trash2 } from 'lucide-react';
// import mapImage from '../../images/pngs/map.png';
// import ImageUpload from '../../Components/seller/ImageUpload';
// import { useNavigate, useParams,useLocation } from 'react-router-dom';
// import VariableModal from '../../Components/seller/VariableModal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateProductPage = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('variable');
//   const [showVariableModal, setShowVariableModal] = useState(false);
//   const [basePrice, setBasePrice] = useState('');
//   const [variables, setVariables] = useState([]);
//   const [deliveryType, setDeliveryType] = useState(['pickup']);
//   const [discounts, setDiscounts] = useState([{ quantity: '', discount: '' }]);
//   const [errors, setErrors] = useState({});
//   const { id } = useParams();
//   const isEditing = Boolean(id && id !== 'new');
//   console.log('ID from params:', id); 

 

//   const [formData, setFormData] = useState({
//     productTitle: '',
//     productDescription: '',
//     ingredients: '',
//     allergyInfo: '',
//     minimumDays: '',
//     quantityUnits: '',
//     quantity: '',
//     cancellable: 'yes',
//     images: [],
//     thumbnail: null,
//   });
//   const presetVariables = ['Decoration', 'Shape', 'Packaging'];
//   useEffect(() => {
//     if (isEditing) {
//       try {
//         const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
//         console.log('Existing posts:', existingPosts); 
        
//         const productToEdit = existingPosts.find(post => post.id === parseInt(id));
//         console.log('Product to edit:', productToEdit); 

//         if (productToEdit) {
//           setFormData({
//             productTitle: productToEdit.product?.name || '',
//             productDescription: productToEdit.productDescription || '',
//             ingredients: productToEdit.ingredients || '',
//             allergyInfo: productToEdit.allergyInfo || '',
//             minimumDays: productToEdit.minimumDays || '',
//             quantityUnits: productToEdit.quantityUnits || '',
//             quantity: productToEdit.quantity || '',
//             cancellable: productToEdit.cancellable || 'yes',
//             thumbnail:productToEdit.product.image || ''
//           });

//           // Update other state
//           setBasePrice(String(productToEdit.basePrice || ''));
//           setVariables(productToEdit.variables || []);
//           setDeliveryType(productToEdit.deliveryType || ['pickup']);
//           setDiscounts(
//             productToEdit.discounts?.length > 0 
//               ? productToEdit.discounts 
//               : [{ quantity: '', discount: '' }]
//           );

//           // Set appropriate tab
//           setActiveTab(productToEdit.variables?.length > 0 ? 'variable' : 'withoutVariable');

//           // Set delivery/pickup fields with a delay to ensure DOM is ready
//           setTimeout(() => {
//             // Handle pickup address fields
//             if (deliveryType.includes('pickup')) {
//               const pickupAddressField = document.querySelector('input[placeholder="Enter full address"]');
//               const pickupStateField = document.querySelector('input[placeholder="Enter the name of your state and province"]');
//               const pickupCountryField = document.querySelector('input[placeholder="Enter the name of your country"]');
//               const pickupTimeField = document.querySelector('input[placeholder="Time frame for customers to pickup products"]');

//               if (pickupAddressField) pickupAddressField.value = productToEdit.pickupAddress || '';
//               if (pickupStateField) pickupStateField.value = productToEdit.pickupState || '';
//               if (pickupCountryField) pickupCountryField.value = productToEdit.pickupCountry || '';
//               if (pickupTimeField) pickupTimeField.value = productToEdit.pickupTimeFrame || '';
//             }

//             // Handle delivery fields
//             if (deliveryType.includes('delivery')) {
//               const deliveryFields = document.querySelectorAll('.locationFormContainer input');
//               if (deliveryFields.length >= 4) {
//                 deliveryFields[0].value = productToEdit.deliveryAddress || '';
//                 deliveryFields[1].value = productToEdit.deliveryState || '';
//                 deliveryFields[2].value = productToEdit.deliveryCountry || '';
//                 deliveryFields[3].value = productToEdit.deliveryFee || '';
//               }
//             }
//           }, 100); // Increased delay to ensure DOM elements are mounted

//           console.log('Form data set:', formData); // Debug log
//         } else {
//           console.log('Product not found for ID:', id); // Debug log
//           toast.error('Product not found');
//           navigate('/postings');
//         }
//       } catch (error) {
//         console.error('Error loading product data:', error);
//         toast.error('Error loading product data');
//       }
//     }
//   }, [id, isEditing, navigate]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productTitle.trim()) newErrors.productTitle = 'Product title is required';
//     if (!formData.productDescription.trim()) newErrors.productDescription = 'Description is required';
//     if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
//     if (!formData.minimumDays) newErrors.minimumDays = 'Minimum days is required';

//     if (activeTab === 'variable') {
//       if (!basePrice) newErrors.basePrice = 'Base price is required';
//       if (variables.length === 0) newErrors.variables = 'At least one variable is required';

//       // Validate discounts
//       discounts.forEach((discount, index) => {
//         if (discount.quantity && !discount.discount) {
//           newErrors[`discount_${index}`] = 'Please specify discount percentage';
//         }
//         if (discount.quantity && isNaN(discount.quantity)) {
//           newErrors[`discount_${index}`] = 'Quantity must be a number';
//         }
//         if (discount.discount && (isNaN(discount.discount) || discount.discount < 0 || discount.discount > 100)) {
//           newErrors[`discount_${index}`] = 'Invalid discount percentage';
//         }
//       });
//     }

//     if (deliveryType.includes('pickup')) {
//       if (!document.querySelector('[placeholder="Enter full address"]').value) {
//         newErrors.pickupAddress = 'Pickup address is required';
//       }
//       if (!document.querySelector('[placeholder="Enter the name of your state and province"]').value) {
//         newErrors.pickupState = 'State is required';
//       }
//       if (!document.querySelector('[placeholder="Enter the name of your country"]').value) {
//         newErrors.pickupCountry = 'Country is required';
//       }
//       if (!document.querySelector('[placeholder="Time frame for customers to pickup products"]').value) {
//         newErrors.pickupTime = 'Time frame is required';
//       }
//     }

//     if (deliveryType.includes('delivery')) {
//       const deliveryFields = document.querySelectorAll('.locationFormContainer input');
//       if (!deliveryFields[0].value) newErrors.deliveryAddress = 'Delivery address is required';
//       if (!deliveryFields[1].value) newErrors.deliveryState = 'State is required';
//       if (!deliveryFields[2].value) newErrors.deliveryCountry = 'Country is required';
//       if (!deliveryFields[3].value) newErrors.deliveryFee = 'Delivery fee is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleTabClick = (tab) => setActiveTab(tab);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDeliveryTypeChange = (type) => {
//     if (deliveryType.includes(type)) {
//       setDeliveryType(deliveryType.filter(t => t !== type));
//     } else {
//       setDeliveryType([...deliveryType, type]);
//     }
//   };

//   const handleAddDiscount = () => {
//     setDiscounts([...discounts, { quantity: '', discount: '' }]);
//   };

//   const handleDiscountChange = (index, field, value) => {
//     const newDiscounts = discounts.map((discount, i) => {
//       if (i === index) {
//         return { ...discount, [field]: value };
//       }
//       return discount;
//     });
//     setDiscounts(newDiscounts);
//   };

//   const handleRemoveDiscount = (index) => {
//     if (discounts.length > 1) {
//       const newDiscounts = discounts.filter((_, i) => i !== index);
//       setDiscounts(newDiscounts);
//     }
//   };

//   const handleRemoveVariable = (index) => {
//     const newVariables = variables.filter((_, i) => i !== index);
//     setVariables(newVariables);
//   };


//   const handleSubmit = () => {
//     if (validateForm()) {
//       const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
//       const productData = {
//         id: isEditing ? parseInt(id) : Date.now(),
//         product: {
//           name: formData.productTitle,
//           image: formData.thumbnail,
//         },
//         productDescription: formData.productDescription,
//         ingredients: formData.ingredients,
//         allergyInfo: formData.allergyInfo,
//         minimumDays: formData.minimumDays,
//         basePrice,
//         variables,
//         deliveryType,
//         discounts,
//         cancellable: formData.cancellable,
//         impressions: isEditing ? existingPosts.find(post => post.id === parseInt(id))?.impressions || 0 : 0,
//         clicks: isEditing ? existingPosts.find(post => post.id === parseInt(id))?.clicks || 0 : 0,
//         orders: isEditing ? existingPosts.find(post => post.id === parseInt(id))?.orders || 0 : 0
//       };
  
//       if (activeTab !== 'variable') {
//         localStorage.setItem('tempProductData', JSON.stringify({ ...productData, isEditing }));
//         navigate(`/packages/${productData.id.toString()}`);  
//       } else {
//         // Original product creation logic
//         if (isEditing) {
//           const updatedPosts = existingPosts.map(post =>
//             post.id === parseInt(id) ? productData : post
//           );
//           localStorage.setItem('sellerPosts', JSON.stringify(updatedPosts));
//         } else {
//           localStorage.setItem('sellerPosts', JSON.stringify([...existingPosts, productData]));
//         }
//         navigate('/postings');
//         toast.success(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
//       }
//     } else {
//       toast.error('Please fill all required fields');
//     }
//   };
  
  
//   const renderVariables = () => {
//     if (variables.length === 0) return null;

//     return (
//       <div className="variablesList">
//         {variables.map((variable, index) => (
//           <div key={index} className="variableCard">
//             <div className="variableHeader">
//               <h4 className="variableName">
//                 Variable {index + 1}: {variable.name}
//               </h4>
//               <button
//                 className="removeVariableButton"
//                 onClick={() => handleRemoveVariable(index)}
//               >
//                 <Trash2 size={18} />
//               </button>
//             </div>
//             <div className="optionsList">
//               {variable.options.map((option, optIndex) => (
//                 <div key={optIndex} className="optionTag">
//                   <span className="optionName">Option {optIndex + 1}: {option.name}</span>
//                   <span className="optionPrice">+${option.price}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="createProductPage">
//       <ToastContainer />
//       <section className="mainSection">
//         <h1 className="pageMainHeading">Create New Product</h1>
//         {!isEditing && <div className="tabsContainer">
//           <button
//             className={`tabButton ${activeTab === 'variable' ? 'activeTab' : 'tab'}`}
//             onClick={() => handleTabClick('variable')}
//           >
//             Product with Variable
//           </button>
//           <button
//             className={`tabButton ${activeTab === 'withoutVariable' ? 'activeTab' : 'tab'}`}
//             onClick={() => handleTabClick('withoutVariable')}
//           >
//             Product Without Variable
//           </button>
//         </div> }

//         <div className="createProductContainer">
//           <h2 className="createProductSectionTitle">Product details</h2>
//           <div className="createProductContent">
//             <div className="productFormContainer">
//               <div className="formGroup">
//                 <label className="label">Product Title</label>
//                 <input
//                   type="text"
//                   className={`inputField ${errors.productTitle ? 'error' : ''}`}
//                   name="productTitle"
//                   value={formData.productTitle}
//                   onChange={handleInputChange}
//                   placeholder="Enter a Title e.g '3-tier Cake'"
//                 />
//                 {errors.productTitle && <span className="errorText">{errors.productTitle}</span>}
//               </div>

//               <div className="formGroup">
//                 <label className="label">Product Description</label>
//                 <textarea
//                   className={`inputField ${errors.productDescription ? 'error' : ''}`}
//                   name="productDescription"
//                   value={formData.productDescription}
//                   onChange={handleInputChange}
//                   placeholder="Description of you Product (You can add details)"
//                   maxLength={400}
//                 />
//                 {errors.productDescription && <span className="errorText">{errors.productDescription}</span>}
//                 <div className="wordLimit">* Max 400 words</div>
//               </div>

//               <div className="formGroup">
//                 <label className="label">Ingredients</label>
//                 <input
//                   type="text"
//                   className={`inputField ${errors.ingredients ? 'error' : ''}`}
//                   name="ingredients"
//                   value={formData.ingredients}
//                   onChange={handleInputChange}
//                   placeholder="Enter the ingredients of your product"
//                 />
//                 {errors.ingredients && <span className="errorText">{errors.ingredients}</span>}
//               </div>

//               <div className="formGroup">
//                 <label className="label">Allergy Info</label>
//                 <input
//                   type="text"
//                   className="inputField"
//                   name="allergyInfo"
//                   value={formData.allergyInfo}
//                   onChange={handleInputChange}
//                   placeholder="Enter Allergy Information(if any)"
//                 />
//               </div>

//               <div className="formGroup">
//                 <label className="label">Minimum days</label>
//                 <input
//                   type="number"
//                   className={`inputField ${errors.minimumDays ? 'error' : ''}`}
//                   name="minimumDays"
//                   value={formData.minimumDays}
//                   onChange={handleInputChange}
//                   placeholder="Enter minimum days required"
//                 />
//                 {errors.minimumDays && <span className="errorText">{errors.minimumDays}</span>}
//               </div>

//               <label className="label">Product Images</label>
//               <ImageUpload
//                 onImagesChange={(imageData) => {
//                   setFormData(prev => ({
//                     ...prev,
//                     images: imageData.images,
//                     thumbnail: imageData.thumbnail
//                   }));
//                 }}
//                 currentImage={formData.thumbnail}
//               />

//               <div className="cancellationSection">
//                 <label className="label">Can order be cancelled ?</label>
//                 <div className="radioGroup">
//                   <button
//                     className={`radioButton ${formData.cancellable === 'yes' ? 'active' : ''}`}
//                     onClick={() => handleInputChange({ target: { name: 'cancellable', value: 'yes' } })}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     className={`radioButton ${formData.cancellable === 'no' ? 'active' : ''}`}
//                     onClick={() => handleInputChange({ target: { name: 'cancellable', value: 'no' } })}
//                   >
//                     No
//                   </button>
//                 </div>
//                 <p className="noteText">Note: If you select 'No' then no refund will be given to Buyer</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {activeTab === 'variable' && (
//           <div className="createProductContainer">
//             <h3 className="createProductSectionTitle">Pricing and Variables</h3>
//             <div className="pricingSection">
//               <input
//                 type="number"
//                 className={`inputField ${errors.basePrice ? 'error' : ''}`}
//                 placeholder="Set Price for your product"
//                 value={basePrice}
//                 onChange={(e) => setBasePrice(e.target.value)}
//               />
//               {errors.basePrice && <span className="errorText">{errors.basePrice}</span>}

//               {renderVariables()}
//               {errors.variables && <span className="errorText">{errors.variables}</span>}
//               <button
//                 className="primaryBtn"
//                 onClick={() => setShowVariableModal(true)}
//               >
//                 Add Variable
//               </button>
//             </div>
//           </div>
//         )}
//         <div className='createProductContainer'>
//           <h3 className="createProductSectionTitle">Location & Delivery Options</h3>
//           <div className="locationDeliverySection">

//             <div className="formGroup">
//               <label className="label">Select Delivery Options</label>
//               <div className="deliveryOptionsGroup">
//                 <button
//                   className={`radioButton ${deliveryType.includes('pickup') ? 'active' : ''}`}
//                   onClick={() => handleDeliveryTypeChange('pickup')}
//                 >
//                   Pickup
//                 </button>
//                 <button
//                   className={`radioButton ${deliveryType.includes('delivery') ? 'active' : ''}`}
//                   onClick={() => handleDeliveryTypeChange('delivery')}
//                 >
//                   Delivery
//                 </button>
//               </div>
//             </div>

//             {deliveryType.includes('pickup') && (
//               <div className="locationSection">
//                 <h4 className="createProductSectionTitle">Pickup Details</h4>
//                 <div className="locationContainer">
//                   <div className="mapContainer">
//                     <img
//                       src={mapImage}
//                       alt="Location map"
//                       className="mapImage"
//                     />
//                   </div>
//                   <div className="locationFormContainer">
//                     <div className="formGroup">
//                       <label className="label">Full Address</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter full address"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">State / Province</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter the name of your state and province"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">Country</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter the name of your country"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">Time frame</label>
//                       <input
//                         type="number"
//                         className="inputField"
//                         placeholder="Time frame for customers to pickup products"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}


//             {deliveryType.includes('delivery') && (
//               <div className="locationSection">
//                 <h4 className="createProductSectionTitle">Delivery Details</h4>
//                 <div className="locationContainer">
//                   <div className="mapContainer">
//                     <img
//                       src={mapImage}
//                       alt="Delivery area map"
//                       className="mapImage"
//                     />
//                   </div>
//                   <div className="locationFormContainer">
//                     <div className="formGroup">
//                       <label className="label">Full Address</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter full address"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">State / Province</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter the name of your state and province"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">Country</label>
//                       <input
//                         type="text"
//                         className="inputField"
//                         placeholder="Enter the name of your country"
//                       />
//                     </div>
//                     <div className="formGroup">
//                       <label className="label">Delivery Fee</label>
//                       <div className="deliveryFeeContainer">
//                         <input
//                           type="number"
//                           className="inputField"
//                           placeholder="Delivery fee"
//                         />
//                         <span className="orText">or</span>
//                         <button className="primaryBtn">
//                           Free delivery
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>

//         {activeTab == 'variable' && <div className='createProductContainer'>
//           <h4 className="createProductSectionTitle">Discount Offers</h4>
//           <div className="discountSection">
//             {discounts.map((discount, index) => (
//               <div key={index} className="discountGroup">
//                 <div className="formGroup">
//                   <label className="label">Enter Quantity</label>
//                   <input
//                     type="number"
//                     className="inputField"
//                     placeholder="Quantity on which discount can be availed"
//                     value={discount.quantity}
//                     onChange={(e) => handleDiscountChange(index, 'quantity', e.target.value)}
//                   />
//                 </div>
//                 <div className="formGroup">
//                   <label className="label">Discount %</label>
//                   <div className="discountInputGroup">
//                     <input
//                       type="number"
//                       className="inputField"
//                       placeholder="e.g. 30%, 40%"
//                       value={discount.discount}
//                       onChange={(e) => handleDiscountChange(index, 'discount', e.target.value)}
//                     />
//                     {discounts.length > 1 && (
//                       <button
//                         className="removeDiscountButton"
//                         onClick={() => handleRemoveDiscount(index)}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <button className="primaryBtn" onClick={handleAddDiscount}>
//               Add more discounts
//             </button>
//           </div>

//         </div>
//         }
//         <div className='nextBtnContainer'>
//           <button className="primaryBtn2" onClick={handleSubmit}>
//             {activeTab === 'variable' ? 'Confirm' : 'Next'}
//           </button>
//         </div>

//       </section>


//       {showVariableModal && (
//         <VariableModal
//           onClose={() => setShowVariableModal(false)}
//           onSave={(newVariable) => {
//             setVariables([...variables, newVariable]);
//             setShowVariableModal(false);
//           }}
//           presetVariables={presetVariables}
//         />
//       )}    </div>
//   );
// };

// export default CreateProductPage;