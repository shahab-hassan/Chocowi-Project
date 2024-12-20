import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from '../../Components/seller/ImageUpload';
import VariableModal from '../../Components/seller/VariableModal';
import mapImage from '../../images/pngs/map.png';
import { FaInfoCircle } from 'react-icons/fa';
import { showToast } from '../../Components/utils/ShowToast';

const ProductDetailsStep = ({ formData, handleInputChange, errors, setFormData }) => (
    <div className="createProductContainer">
        <h2 className="createProductSectionTitle">Product Details</h2>
        <div className="createProductContent">
            <div className="productFormContainer">
                <div className="formGroup">
                    <label className="label">Product Title</label>
                    <input
                        type="text"
                        className={`inputField ${errors.productTitle ? 'error' : ''}`}
                        name="productTitle"
                        value={formData.productTitle}
                        onChange={handleInputChange}
                        placeholder="Enter a Title e.g '3-tier Cake'"
                    />
                    {errors.productTitle && <span className="errorText">{errors.productTitle}</span>}
                </div>

                <div className="formGroup">
                    <label className="label">Product Description</label>
                    <textarea
                        className={`inputField ${errors.productDescription ? 'error' : ''}`}
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        placeholder="Description of your Product (You can add details)"
                        maxLength={400}
                    />
                    {errors.productDescription && <span className="errorText">{errors.productDescription}</span>}
                    <div className="wordLimit">* Max 400 words</div>
                </div>

                <div className="formGroup">
                    <label className="label">Ingredients</label>
                    <input
                        type="text"
                        className={`inputField ${errors.ingredients ? 'error' : ''}`}
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleInputChange}
                        placeholder="Enter the ingredients of your product"
                    />
                    {errors.ingredients && <span className="errorText">{errors.ingredients}</span>}
                </div>

                <div className="formGroup">
                    <label className="label">Allergy Info</label>
                    <input
                        type="text"
                        className="inputField"
                        name="allergyInfo"
                        value={formData.allergyInfo}
                        onChange={handleInputChange}
                        placeholder="Enter Allergy Information(if any)"
                    />
                </div>

                <div className="formGroup">
                    <label className="label">Minimum days</label>
                    <input
                        type="number"
                        className={`inputField ${errors.minimumDays ? 'error' : ''}`}
                        name="minimumDays"
                        value={formData.minimumDays}
                        onChange={handleInputChange}
                        placeholder="Enter minimum days required"
                    />
                    {errors.minimumDays && <span className="errorText">{errors.minimumDays}</span>}
                </div>

                <label className="label">Product Images</label>
                <ImageUpload
                    onImagesChange={(imageData) => {
                        setFormData(prev => ({
                            ...prev,
                            images: imageData.images,
                            thumbnail: imageData.thumbnail
                        }));
                    }}
                    currentImage={formData.thumbnail}
                />
            </div>
        </div>
    </div>
);

const CancellationStep = ({ formData, handleInputChange }) => (
    <div className="createProductContainer">
        <h2 className="createProductSectionTitle">Cancellation Policy</h2>
        <div className="createProductContent">
            <label className="label">Can order be cancelled?</label>
            <div className="radioGroup">
                <button
                    className={`radioButton ${formData.cancellable === 'yes' ? 'active' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'cancellable', value: 'yes' } })}
                >
                    Yes
                </button>
                <button
                    className={`radioButton ${formData.cancellable === 'no' ? 'active' : ''}`}
                    onClick={() => handleInputChange({ target: { name: 'cancellable', value: 'no' } })}
                >
                    No
                </button>
            </div>
            <p className="noteText">Note: If you select 'No' then no refund will be given to Buyer</p>
        </div>
    </div>
);

const PricingStep = ({ basePrice, setBasePrice, variables, setVariables, errors, presetVariables }) => {
    const [showVariableModal, setShowVariableModal] = useState(false);

    const handleRemoveVariable = (index) => {
        const newVariables = variables.filter((_, i) => i !== index);
        setVariables(newVariables);
    };

    return (
        <div className="createProductContainer">
            <h2 className="createProductSectionTitle">Pricing and Variables</h2>
            <div className="pricingSection">
                <input
                    type="number"
                    className={`inputField ${errors.basePrice ? 'error' : ''}`}
                    placeholder="Set Price for your product"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                />
                {errors.basePrice && <span className="errorText">{errors.basePrice}</span>}

                <div className="variablesList">
                    {variables.map((variable, index) => (
                        <div key={index} className="variableCard">
                            <div className="variableHeader">
                                <h4 className="variableName">
                                    Variable {index + 1}: {variable.name}
                                </h4>
                                <button
                                    className="removeVariableButton"
                                    onClick={() => handleRemoveVariable(index)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="optionsList">
                                {variable.options.map((option, optIndex) => (
                                    <div key={optIndex} className="optionTag">
                                        <span className="optionName">Option {optIndex + 1}: {option.name}</span>
                                        <span className="optionPrice">+${option.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {errors.variables && <span className="errorText">{errors.variables}</span>}
                <button
                    className="primaryBtn"
                    onClick={() => setShowVariableModal(true)}
                >
                    Add Variable
                </button>
            </div>

            {showVariableModal && (
                <VariableModal
                    onClose={() => setShowVariableModal(false)}
                    onSave={(newVariable) => {
                        setVariables([...variables, newVariable]);
                        setShowVariableModal(false);
                    }}
                    presetVariables={presetVariables}
                />
            )}
        </div>
    );
};

const DeliveryStep = ({ deliveryType, setDeliveryType, errors, formData, setFormData }) => {
    const handleDeliveryTypeChange = (type) => {
        if (deliveryType.includes(type)) {
            setDeliveryType(deliveryType.filter(t => t !== type));
        } else {
            setDeliveryType([...deliveryType, type]);
        }
    };

    const handleDeliveryInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="createProductContainer">
            <h2 className="createProductSectionTitle">Location & Delivery Options</h2>
            <div className="locationDeliverySection">
                <div className="formGroup">
                    <label className="label">Select Delivery Options</label>
                    <div className="deliveryOptionsGroup">
                        <button
                            className={`radioButton ${deliveryType.includes('pickup') ? 'active' : ''}`}
                            onClick={() => handleDeliveryTypeChange('pickup')}
                        >
                            Pickup
                        </button>
                        <button
                            className={`radioButton ${deliveryType.includes('delivery') ? 'active' : ''}`}
                            onClick={() => handleDeliveryTypeChange('delivery')}
                        >
                            Delivery
                        </button>
                    </div>
                </div>

                {deliveryType.includes('pickup') && (
                    <div className="locationSection">
                        <h4 className="createProductSectionTitle">Pickup Details</h4>
                        <div className="locationContainer">
                        <div className="mapContainer">
                                <img src={mapImage} alt="Location map" className="mapImage" />
                            </div>
                            <div className="locationFormContainer">
                                <div className="formGroup">
                                    <label className="label">Full Address</label>
                                    <input
                                        type="text"
                                        name="pickupAddress"
                                        value={formData.pickupAddress || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.pickupAddress ? 'error' : ''}`}
                                        placeholder="Enter full address"
                                    />
                                    {errors.pickupAddress && <span className="errorText">{errors.pickupAddress}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">State / Province</label>
                                    <input
                                        type="text"
                                        name="pickupState"
                                        value={formData.pickupState || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.pickupState ? 'error' : ''}`}
                                        placeholder="Enter the name of your state and province"
                                    />
                                    {errors.pickupState && <span className="errorText">{errors.pickupState}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">Country</label>
                                    <input
                                        type="text"
                                        name="pickupCountry"
                                        value={formData.pickupCountry || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.pickupCountry ? 'error' : ''}`}
                                        placeholder="Enter the name of your country"
                                    />
                                    {errors.pickupCountry && <span className="errorText">{errors.pickupCountry}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">Pickup Time Frame (hours)</label>
                                    <input
                                        type="number"
                                        name="pickupTimeFrame"
                                        value={formData.pickupTimeFrame || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.pickupTime ? 'error' : ''}`}
                                        placeholder="Time frame for customers to pickup products"
                                    />
                                    {errors.pickupTime && <span className="errorText">{errors.pickupTime}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {deliveryType.includes('delivery') && (
                    <div className="locationSection">
                        <h4 className="createProductSectionTitle">Delivery Details</h4>
                        <div className="locationContainer">
                        <div className="mapContainer">
                                <img src={mapImage} alt="Location map" className="mapImage" />
                            </div>
                            <div className="locationFormContainer">
                                <div className="formGroup">
                                    <label className="label">Full Address</label>
                                    <input
                                        type="text"
                                        name="deliveryAddress"
                                        value={formData.deliveryAddress || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.deliveryAddress ? 'error' : ''}`}
                                        placeholder="Enter full address"
                                    />
                                    {errors.deliveryAddress && <span className="errorText">{errors.deliveryAddress}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">State / Province</label>
                                    <input
                                        type="text"
                                        name="deliveryState"
                                        value={formData.deliveryState || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.deliveryState ? 'error' : ''}`}
                                        placeholder="Enter the name of your state and province"
                                    />
                                    {errors.deliveryState && <span className="errorText">{errors.deliveryState}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">Country</label>
                                    <input
                                        type="text"
                                        name="deliveryCountry"
                                        value={formData.deliveryCountry || ''}
                                        onChange={handleDeliveryInputChange}
                                        className={`inputField ${errors.deliveryCountry ? 'error' : ''}`}
                                        placeholder="Enter the name of your country"
                                    />
                                    {errors.deliveryCountry && <span className="errorText">{errors.deliveryCountry}</span>}
                                </div>
                                <div className="formGroup">
                                    <label className="label">Delivery Fee</label>
                                    <div className="deliveryFeeContainer">
                                        <input
                                            type="number"
                                            name="deliveryFee"
                                            value={formData.deliveryFee || ''}
                                            onChange={handleDeliveryInputChange}
                                            className="inputField"
                                            placeholder="Delivery fee"
                                        />
                                        <span className="orText">or</span>
                                        <button 
                                            type="button"
                                            className="primaryBtn"
                                            onClick={() => setFormData(prev => ({...prev, deliveryFee: 0}))}
                                        >
                                            Free delivery
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const DiscountStep = ({ discounts, setDiscounts, errors }) => {
    const handleAddDiscount = () => {
        setDiscounts([...discounts, { quantity: '', discount: '' }]);
    };

    const handleDiscountChange = (index, field, value) => {
        const newDiscounts = discounts.map((discount, i) => {
            if (i === index) {
                return { ...discount, [field]: value };
            }
            return discount;
        });
        setDiscounts(newDiscounts);
    };

    const handleRemoveDiscount = (index) => {
        if (discounts.length > 1) {
            const newDiscounts = discounts.filter((_, i) => i !== index);
            setDiscounts(newDiscounts);
        }
    };

    return (
        <div className="createProductContainer">
            <h2 className="createProductSectionTitle">Discount Offers</h2>
            <div className="discountSection">
                {discounts.map((discount, index) => (
                    <div key={index} className="discountGroup">
                        <div className="formGroup">
                            <label className="label">Enter Quantity</label>
                            <input
                                type="number"
                                className="inputField"
                                placeholder="Quantity on which discount can be availed"
                                value={discount.quantity}
                                onChange={(e) => handleDiscountChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Discount %</label>
                            <div className="discountInputGroup">
                                <input
                                    type="number"
                                    className="inputField"
                                    placeholder="e.g. 30%, 40%"
                                    value={discount.discount}
                                    onChange={(e) => handleDiscountChange(index, 'discount', e.target.value)}
                                />
                                {discounts.length > 1 && (
                                    <button
                                        className="removeDiscountButton"
                                        onClick={() => handleRemoveDiscount(index)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <button className="primaryBtn" onClick={handleAddDiscount}>
                    Add more discounts
                </button>
            </div>
        </div>
    );
};

// Progress indicator component
const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="stepIndicatorContainer">
        {Array.from({ length: totalSteps }, (_, index) => (
            <div
                key={index}
                className={`stepDot ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''
                    }`}
            >
                <div className="stepNumber">{index + 1}</div>
                <div className="stepLabel">
                    {index === 0 && 'Product Details'}
                    {totalSteps==3? (index === 1 && 'Delivery'): (index === 1 && 'Cancellation')}
                    {index === 2 && 'Pricing'}
                    {index === 3 && 'Delivery'}
                    {index === 4 && 'Discounts'}
                </div>
            </div>
        ))}
    </div>
);


const CreateProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id && id !== 'new');
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState('variable');
    const [basePrice, setBasePrice] = useState('');
    const [variables, setVariables] = useState([]);
    const [deliveryType, setDeliveryType] = useState(['pickup']);
    const [discounts, setDiscounts] = useState([{ quantity: '', discount: '' }]);
    const [errors, setErrors] = useState({});
    const presetVariables = ['Decoration', 'Shape', 'Packaging'];

    // Packages related state
    const [packages, setPackages] = useState([
        {
            name: 'Basic',
            subtitle: 'STARTING PACK',
            description: 'Perfect for simple occasions',
            options: {
                timeToDeliver: '1 hours',
                variable: 'Cake',
                quantity: '1',
                originOfProduct: 'Italy',
                cancellation: true,
                timeframe: '1.5 hours',
                delivery: 'No',
                offerings: [],
                basePrice: 0,
                totalPrice: 0,
                discount: 0
            }
        },
        {
            name: 'Standard',
            subtitle: 'PRO PACK (RECOMMENDED)',
            description: 'Great for small gatherings',
            options: {
                timeToDeliver: '2 hours',
                variable: 'Cake',
                quantity: '2',
                originOfProduct: 'Italy',
                cancellation: true,
                timeframe: '2.5 hours',
                delivery: 'Can Discuss',
                offerings: [],
                basePrice: 0,
                totalPrice: 0,
                discount: 0
            }
        },
        {
            name: 'Premium',
            subtitle: 'VIP PACK (COMPLETE PACK)',
            description: 'Ideal for special events',
            options: {
                timeToDeliver: '4 hours',
                variable: 'Cake',
                quantity: '3',
                originOfProduct: 'Italy',
                cancellation: true,
                timeframe: '4.5 hours',
                delivery: 'Yes',
                offerings: [],
                basePrice: 0,
                totalPrice: 0,
                discount: 0
            }
        }
    ]);

    // Package modal state
    const [isOfferingModalOpen, setIsOfferingModalOpen] = useState(false);
    const [currentPackageIndex, setCurrentPackageIndex] = useState(null);
    const [newOfferings, setNewOfferings] = useState(['']);

    const [formData, setFormData] = useState({
        productTitle: '',
        productDescription: '',
        ingredients: '',
        allergyInfo: '',
        minimumDays: '',
        quantityUnits: '',
        quantity: '',
        cancellable: 'yes',
        images: [],
        thumbnail: null,
        // New delivery-related fields
        pickupAddress: '',
        pickupState: '',
        pickupCountry: '',
        pickupTimeFrame: '',
        deliveryAddress: '',
        deliveryState: '',
        deliveryCountry: '',
        deliveryFee: '',
    });

    useEffect(() => {
        if (isEditing) {
            try {
                const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
                const productToEdit = existingPosts.find(post => post.id === parseInt(id));

                if (productToEdit) {
                    setFormData({
                        productTitle: productToEdit.product?.name || '',
                        productDescription: productToEdit.productDescription || '',
                        ingredients: productToEdit.ingredients || '',
                        allergyInfo: productToEdit.allergyInfo || '',
                        minimumDays: productToEdit.minimumDays || '',
                        quantityUnits: productToEdit.quantityUnits || '',
                        quantity: productToEdit.quantity || '',
                        cancellable: productToEdit.cancellable || 'yes',
                        thumbnail: productToEdit.product.image || '',
                        pickupAddress: productToEdit.pickupAddress || '',
                        pickupState: productToEdit.pickupState || '',
                        pickupCountry: productToEdit.pickupCountry || '',
                        pickupTimeFrame: productToEdit.pickupTimeFrame || '',
                        deliveryAddress: productToEdit.deliveryAddress || '',
                        deliveryState: productToEdit.deliveryState || '',
                        deliveryCountry: productToEdit.deliveryCountry || '',
                        deliveryFee: productToEdit.deliveryFee || '',
                    });

                    setBasePrice(String(productToEdit.basePrice || ''));
                    setVariables(productToEdit.variables || []);
                    setDeliveryType(productToEdit.deliveryType || ['pickup']);
                    setDiscounts(
                        productToEdit.discounts?.length > 0
                            ? productToEdit.discounts
                            : [{ quantity: '', discount: '' }]
                    );

                    if (productToEdit.packages) {
                        setPackages(productToEdit.packages);
                    }

                    setActiveTab(productToEdit.variables?.length > 0 ? 'variable' : 'withoutVariable');
                } else {
                    toast.error('Product not found');
                    navigate('/postings');
                }
            } catch (error) {
                console.error('Error loading product data:', error);
                toast.error('Error loading product data');
            }
        }
    }, [id, isEditing, navigate]);

    // Package-related functions
    const handlePackageFieldChange = (index, field, value) => {
        const updatedPackages = [...packages];
        updatedPackages[index].options[field] = value;
        setPackages(updatedPackages);
        calculatePackagePrice(index);
    };

    const handlePackageDescriptionChange = (index, value) => {
        const updatedPackages = [...packages];
        updatedPackages[index].subtitle = value;
        setPackages(updatedPackages);
    };

    const handlePackageBasePriceChange = (index, value) => {
        const updatedPackages = [...packages];
        updatedPackages[index].options.basePrice = parseFloat(value) || 0;
        setPackages(updatedPackages);
        calculatePackagePrice(index);
    };


    // Function to add new offering input field
    const addOfferingInput = () => {
        if (newOfferings.length > 5)
            return;
        if (
            packages[currentPackageIndex] &&
            Array.isArray(newOfferings) &&
            (packages[currentPackageIndex].options.offerings.length + newOfferings.length) > 5
        ) {
            return;
        }

        setNewOfferings([...newOfferings, '']);
    };

    // Function to update offering at specific index
    const updateOffering = (index, value) => {
        const updatedOfferings = [...newOfferings];
        updatedOfferings[index] = value;
        setNewOfferings(updatedOfferings);
    };

    // Function to remove offering input at specific index
    const removeOfferingInput = (index) => {
        const updatedOfferings = newOfferings.filter((_, i) => i !== index);
        setNewOfferings(updatedOfferings);
    };

    // Function to open modal
    const openOfferingModal = (index) => {
        setCurrentPackageIndex(index);
        setIsOfferingModalOpen(true);
        setNewOfferings(['']);
    };

    // Function to close modal
    const closeOfferingModal = () => {
        setIsOfferingModalOpen(false);
        setNewOfferings(['']);
    };

    // Function to save offerings
    const saveOfferings = () => {
        if (currentPackageIndex !== null) {
            const validOfferings = newOfferings.filter(offering => offering.trim() !== '');
            const updatedPackages = [...packages];
            const currentOfferings = updatedPackages[currentPackageIndex].options.offerings || [];

            // Ensure total offerings don't exceed 6
            const remainingSlots = 6 - currentOfferings.length;
            const offeringsToAdd = validOfferings.slice(0, remainingSlots);

            if (offeringsToAdd.length < validOfferings.length) {
                toast.error('Maximum of 6 offerings allowed per package');
            }

            updatedPackages[currentPackageIndex].options.offerings = [
                ...currentOfferings,
                ...offeringsToAdd.map(description => ({ description }))
            ];

            setPackages(updatedPackages);
            closeOfferingModal();
        }
    };

    // Function to remove offering from package
    const removeOffering = (packageIndex, offeringIndex) => {
        const updatedPackages = [...packages];
        updatedPackages[packageIndex].options.offerings.splice(offeringIndex, 1);
        setPackages(updatedPackages);
    };


    const calculatePackagePrice = (index) => {
        const updatedPackages = [...packages];
        const pkg = updatedPackages[index].options;

        const quantity = parseInt(pkg.quantity) || 1;
        const initialTotalPrice = pkg.basePrice * quantity;

        const discountPercentage = parseInt(pkg.discount) || 0;
        const discountAmount = (initialTotalPrice * discountPercentage) / 100;

        pkg.totalPrice = initialTotalPrice - discountAmount;

        setPackages(updatedPackages);
    };

    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 0:
                if (!formData.productTitle.trim()) newErrors.productTitle = 'Product title is required';
                if (!formData.productDescription.trim()) newErrors.productDescription = 'Description is required';
                if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
                if (!formData.minimumDays) newErrors.minimumDays = 'Minimum days is required';
                if (!formData.thumbnail) newErrors.thumbnail = 'Product image is required';
                break;

                case 1: // Delivery step
                if (activeTab !='variable' && deliveryType.includes('pickup')) {
                    if (!formData.pickupAddress) newErrors.pickupAddress = 'Pickup address is required';
                    if (!formData.pickupState) newErrors.pickupState = 'Pickup state is required';
                    if (!formData.pickupCountry) newErrors.pickupCountry = 'Pickup country is required';
                    if (!formData.pickupTimeFrame) newErrors.pickupTime = 'Pickup time frame is required';
                }

                if (activeTab !='variable' && deliveryType.includes('delivery')) {
                    if (!formData.deliveryAddress) newErrors.deliveryAddress = 'Delivery address is required';
                    if (!formData.deliveryState) newErrors.deliveryState = 'Delivery state is required';
                    if (!formData.deliveryCountry) newErrors.deliveryCountry = 'Delivery country is required';
                }
                break;
        

            case 2:
                if (activeTab === 'variable') {
                    if (!basePrice) newErrors.basePrice = 'Base price is required';
                    if (variables.length === 0) newErrors.variables = 'At least one variable is required';
                } else {
                    // Validate each package individually
                    packages.forEach((pkg, index) => {
                        if (!pkg.options.basePrice || pkg.options.basePrice <= 0) {
                            newErrors[`package_${index}_basePrice`] = 'Base price is required and must be greater than 0';
                        }
                        if (!pkg.subtitle.trim()) {
                            newErrors[`package_${index}_subtitle`] = 'Package Name is required';
                        }
                    });
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (activeTab === 'variable') {
                setCurrentStep(prev => Math.min(prev + 1, 4));
            } else {
                setCurrentStep(prev => Math.min(prev + 1, 2));
            }
        } else {
            showToast("Please fill all the fields before proceeding","error")
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            const productData = {
                id: isEditing ? parseInt(id) : Date.now(),
                product: {
                    name: formData.productTitle,
                    image: formData.thumbnail,
                },
                productDescription: formData.productDescription,
                ingredients: formData.ingredients,
                allergyInfo: formData.allergyInfo,
                minimumDays: formData.minimumDays,
                basePrice,
                variables,
                deliveryType,
                discounts,
                cancellable: formData.cancellable,
                pickupAddress: formData.pickupAddress,
                pickupState: formData.pickupState,
                pickupCountry: formData.pickupCountry,
                pickupTimeFrame: formData.pickupTimeFrame,
                deliveryAddress: formData.deliveryAddress,
                deliveryState: formData.deliveryState,
                deliveryCountry: formData.deliveryCountry,
                deliveryFee: formData.deliveryFee,
                packages: activeTab === 'withoutVariable' ? packages : undefined,
                impressions: isEditing ? JSON.parse(localStorage.getItem('sellerPosts') || '[]')
                    .find(post => post.id === parseInt(id))?.impressions || 0 : 0,
                clicks: isEditing ? JSON.parse(localStorage.getItem('sellerPosts') || '[]')
                    .find(post => post.id === parseInt(id))?.clicks || 0 : 0,
                orders: isEditing ? JSON.parse(localStorage.getItem('sellerPosts') || '[]')
                    .find(post => post.id === parseInt(id))?.orders || 0 : 0
            };

            const existingPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
            if (isEditing) {
                const updatedPosts = existingPosts.map(post =>
                    post.id === parseInt(id) ? productData : post
                );
                localStorage.setItem('sellerPosts', JSON.stringify(updatedPosts));
            } else {
                localStorage.setItem('sellerPosts', JSON.stringify([...existingPosts, productData]));
            }

            navigate('/postings');
            toast.success(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFieldChange = (index, field, value) => {
        const updatedPackages = [...packages];
        updatedPackages[index].options[field] = value;
        setPackages(updatedPackages);
        calculatePrice(index);
    };

    const toggleCancellation = (index) => {
        const updatedPackages = [...packages];
        updatedPackages[index].options.cancellation = !updatedPackages[index].options.cancellation;
        setPackages(updatedPackages);
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




    const renderPackagesStep = () => (
        <div className="packagesContainer">
            <h1 className='pageMainHeading'>Packages and Pricing</h1>

            <div className="packagesTable">
                {/* Header Row */}
                <div className="packagesRow">
                    <div className="packagesLabel">Packages</div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="packageColumn">
                            <div className="packageName">{pkg.name}</div>
                        </div>
                    ))}
                </div>

                {/* Description Row */}
                <div className="packagesRow">
                    <div className="packagesLabel">Package Name</div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="packageCell">
                            <input
                                type="text"
                                value={pkg.subtitle}
                                onChange={(e) => handlePackageDescriptionChange(index, e.target.value)}
                                className={`inputField ${errors[`package_${index}_subtitle`] ? 'error' : ''}`}
                                placeholder="Enter package name"
                            />
                            {errors[`package_${index}_subtitle`] && (
                                <div className="errorMessage">{errors[`package_${index}_subtitle`]}</div>
                            )}
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
                                onChange={(e) => handlePackageBasePriceChange(index, e.target.value)}
                                min="0"
                                className={`inputField ${errors[`package_${index}_basePrice`] ? 'error' : ''}`}
                                placeholder="0"
                            />
                            {errors[`package_${index}_basePrice`] && (
                                <div className="errorMessage">{errors[`package_${index}_basePrice`]}</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Discount Row */}
                <div className="packagesRow">
                    <div className="packagesLabel">Discount %</div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="packageCell">
                            <input
                                type="number"
                                value={pkg.options.discount}
                                onChange={(e) => handlePackageFieldChange(index, 'discount', e.target.value)}
                                min="0"
                                className="inputField"
                                placeholder="0"
                            />
                        </div>
                    ))}
                </div>

                {/* Other rows... */}
                <div className="packagesRow">
                    <div className="packagesLabel">Time to Deliver</div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="packageCell">
                            <select
                                value={pkg.options.timeToDeliver}
                                className="inputField"
                                onChange={(e) => handlePackageFieldChange(index, 'timeToDeliver', e.target.value)}
                            >
                                <option>1 hours</option>
                                <option>2 hours</option>
                                <option>4 hours</option>
                            </select>
                        </div>
                    ))}
                </div>

                {/* Offerings Row */}
                <div className="packagesRow">
                    <div className="packagesLabel">Package Offerings</div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="packageCell">
                            <button
                                className="primaryBtn"
                                onClick={() => pkg.options.offerings.length < 6 && openOfferingModal(index)}
                                disabled={pkg.options.offerings.length >= 6}

                            >
                                Add Offering
                            </button>

                            {pkg.options.offerings.length > 0 && (
                                <div className="variablesList">
                                    {pkg.options.offerings.map((offering, oIndex) => (
                                        <div key={oIndex} className="variableItem">
                                            <span>{offering.description}</span>
                                            <button
                                                className="removeVariableBtn"
                                                onClick={() => removeOffering(index, oIndex)}
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
            {/* Offerings Modal */}
            {isOfferingModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <div className="modalHeader">
                            <h3>Add Offerings</h3>
                            <button className="closeButton" onClick={closeOfferingModal}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modalBody">
                            {newOfferings.map((offering, index) => (
                                <div key={index} className="optionGroup">
                                    <input
                                        type="text"
                                        placeholder="Enter offering description"
                                        value={offering}
                                        onChange={(e) => updateOffering(index, e.target.value)}
                                        className="inputField"
                                    />
                                    {newOfferings.length > 1 && (
                                        <button
                                            className="removeOptionButton"
                                            onClick={() => removeOfferingInput(index)}
                                        >
                                            <Minus size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                className="addOptionButton"
                                onClick={addOfferingInput}
                            >
                                <Plus size={16} />
                                Add Another Offering
                            </button>
                        </div>

                        <div className="modalFooter">
                            <button
                                className="primaryBtn"
                                onClick={saveOfferings}
                                disabled={newOfferings.every((offering) => offering.trim() === '')}
                            >
                                Save Offerings
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <ProductDetailsStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        setFormData={setFormData}
                    />
                );
            case 1:
                return (
                    activeTab === 'variable' ? (
                        <CancellationStep
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />
                    ) : (
                        <DeliveryStep
                        deliveryType={deliveryType}
                        setDeliveryType={setDeliveryType}
                        errors={errors}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    )
                );
                
            case 2:
                if (activeTab === 'variable') {
                    return (
                        <PricingStep
                            basePrice={basePrice}
                            setBasePrice={setBasePrice}
                            variables={variables}
                            setVariables={setVariables}
                            errors={errors}
                            presetVariables={presetVariables}
                        />
                    );
                } else {
                    return renderPackagesStep();
                }
            case 3:
                return (
                    <DeliveryStep
                    deliveryType={deliveryType}
                    setDeliveryType={setDeliveryType}
                    errors={errors}
                    formData={formData}
                    setFormData={setFormData}
                    />
                );
            case 4:
                return (
                    <DiscountStep
                        discounts={discounts}
                        setDiscounts={setDiscounts}
                        errors={errors}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="createProductPage">
            <ToastContainer />
            <section className="mainSection">
                <h1 className="pageMainHeading">{isEditing ? 'Edit Product' : 'Create New Product'}</h1>

                {!isEditing && (
                    <div className="tabsContainer">
                        <button
                            className={`tabButton ${activeTab === 'variable' ? 'activeTab' : 'tab'}`}
                            onClick={() => setActiveTab('variable')}
                        >
                            Product with Variable
                        </button>
                        <button
                            className={`tabButton ${activeTab === 'withoutVariable' ? 'activeTab' : 'tab'}`}
                            onClick={() => setActiveTab('withoutVariable')}
                        >
                            Product Without Variable
                        </button>
                    </div>
                )}
                {activeTab=='variable'? (
        <div className="sellerOrderStatusNote">
          <FaInfoCircle className="orderStatusIcon" />
          <p className="orderStatusText">
          Allows sellers to offer product variations like size, add-ons, or toppings, enabling buyers to customize their purchase.          </p>
        </div>
      ): 
        <div className="sellerOrderStatusNote">
          <FaInfoCircle className="orderStatusIcon" />
          <p className="orderStatusText">
          Sellers can create up to three fixed packages with unique combinations or offers, catering to different customer preferences.          </p>
        </div>
      }

                <StepIndicator
                    currentStep={currentStep}
                    totalSteps={activeTab === 'variable' ? 5 : 3}
                />

                {renderStep()}

                <div className="navigationButtons">
                    {currentStep > 0 && (
                        <button className="primaryBtn3" onClick={handlePrevious}>
                            Previous
                        </button>
                    )}

                    {((activeTab === 'variable' && currentStep < 4) ||
                        (activeTab === 'withoutVariable' && currentStep < 2)) ? (
                        <button className="primaryBtn" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button className="primaryBtn" onClick={handleSubmit}>
                            Confirm
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CreateProductPage;