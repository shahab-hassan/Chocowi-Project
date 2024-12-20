import React, { useState, useEffect, useRef, useContext } from 'react';
import image1 from '../../images/pngs/signUp1.png';
import image2 from '../../images/pngs/signUp5.png';
import image3 from '../../images/pngs/signUp4.png';
import articleImage1 from '../../images/pngs/articleImage1.png';
import articleImage2 from '../../images/pngs/articleImage2.png';
import articleImage3 from '../../images/pngs/articleImage3.png';
import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from 'react-icons/fa';
import seller1 from '../../images/pngs/seller1.png';
import seller2 from '../../images/pngs/seller2.png';
import empanadasImage from '../../images/svgs/heroBG.svg';
import VendorCard from '../../Components/buyer/VendorCard';
import ArticleCard from '../../Components/buyer/ArticleCard';
import { LoginContext } from '../../Contexts/LoginContext';
import CategoryRow from '../../Components/buyer/CategoryRow';
import SearchBar from '../../Components/utils/SearchBar';
import { sweetsCategory } from '../../data/data';
import { Link, useNavigate } from 'react-router-dom';
import HomeBanner from "../../images/pngs/HomeBanner.png"
import HomeBanner2 from "../../images/pngs/HomeBanner2.png"
import { FaArrowRight } from 'react-icons/fa';


const Home = () => {
    const { isLogin } = useContext(LoginContext);
    const vendorCardsContainerRef = useRef(null);
    const articleCardsContainerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const totalSteps = 4;
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        product: '',
        category: '',
        location: '',
        budget: '',
        details: '',
        quantity: '',
        allergies: '',
        dateNeeded: '',
        timeNeeded: '',
        deliveryMethod: '',
        eventDetails: '',
        validUntil: ''
    });
    const vendors = [
        {
            id: 1,
            imageSrc: seller1,
            avatar: seller1, // Used for the seller's profile image
            name: "Layer's Bakeshop",
            description: "Artisan Chocolates: Handcrafted Truffles, Gourmet Cakes: Signature Layer Cakes, Delectable Cookies: Gourmet Cookie Assortments, Frozen Desserts: Creamy Gelato Flavors.",
            languages: ["English", "French"],
            address: "123 Chocolate Ave, Sweet City",
            completedOrders: 128,
            rating: "4.7",
            totalReviews: "246",
        },
        {
            id: 2,
            imageSrc: seller2,
            avatar: seller2,
            name: "Shahab Hassan",
            description: "Master Pastry Chef, Exquisite French Macarons.",
            languages: ["English", "Urdu"],
            address: "45 Pastry Lane, Gourmet Town",
            completedOrders: 200,
            rating: "4.9",
            totalReviews: "300",
        },
        {
            id: 3,
            imageSrc: seller2,
            avatar: seller2,
            name: "Nafees Bakers",
            description: "Artisan Gelato Maker, Signature Gelato Flavors, Handcrafted Sorbets, Unique Frozen Dessert Creations.",
            languages: ["English", "Punjabi"],
            address: "78 Baker's Street, Dessert Valley",
            completedOrders: 350,
            rating: "4.8",
            totalReviews: "400",
        },
        {
            id: 4,
            imageSrc: seller1,
            avatar: seller1,
            name: "Sweet Treats Co.",
            description: "Specialized in cupcakes, custom cakes, and seasonal desserts.",
            languages: ["English", "Spanish"],
            address: "89 Sweet Spot Rd, Cakeville",
            completedOrders: 150,
            rating: "4.6",
            totalReviews: "180",
        },
        {
            id: 5,
            imageSrc: seller1,
            avatar: seller1,
            name: "Dessert Haven",
            description: "Premium desserts and confections made with organic ingredients.",
            languages: ["English"],
            address: "101 Sugar Hill, Dessert Valley",
            completedOrders: 175,
            rating: "4.5",
            totalReviews: "220",
        },
    ];

    const articles = [
        {
            title: 'How to Make The Ultimate Chocolate Lava Cake',
            date: 'August 20, 2022',
            image: articleImage1,
            category: 'Recipes',
            slug: 'chocolate-lava-cake',
            content: {
                description: "If there's one dessert that captures the hearts of chocolate lovers worldwide...",
                ingredients: ["4 ounces (115 grams) of semi-sweet chocolate", "1/2 cup (115 grams) of unsalted butter"],
                instructions: ["Preheat oven to 425°F (220°C)", "Butter and lightly flour four 6-ounce ramekins"]
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage2,
            category: 'Healthy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage3,
            category: 'Healthy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage1,
            category: 'Healthy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage1,
            category: 'Healthy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },

        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage2,
            category: 'Yummy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage2,
            category: 'Yummy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage2,
            category: 'Yummy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        },
        {
            title: 'Healthy Smoothie Recipes',
            date: 'October 15, 2023',
            image: articleImage3,
            category: 'Yummy',
            slug: 'healthy-smoothie-recipes',
            content: {
                description: "Start your day with these nutritious smoothies...",
                ingredients: [],
                instructions: []
            }
        }
    ];

    const slides = [
        { text: "Chocolate", image: image2 },
        { text: "Ice cream", image: image1 },
        { text: "Cupcake", image: image3 },
        { text: "Candy", image: image2 },
        { text: "Cake", image: image1 },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [featureImage, setFeatureImage] = useState(image1);
    const [animateFeatureImage, setAnimateFeatureImage] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1)); // Looping back to the first slide after the last one
        }, 4500);

        return () => clearInterval(timer);
    }, [slides.length]);


    useEffect(() => {
        setAnimateFeatureImage(true);

        const animationTimeout = setTimeout(() => {
            setFeatureImage(slides[currentSlide !== (slides.length - 1)? currentSlide + 1 : 0].image);
        }, 300);

        const resetAnimationTimeout = setTimeout(() => {
            setAnimateFeatureImage(false);
        }, 500);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(resetAnimationTimeout);
        };
    }, [currentSlide, slides]);




    const scrollVendors = (direction) => {
        const scrollAmount = 1000;
        if (vendorCardsContainerRef.current) {
            vendorCardsContainerRef.current.scrollBy({
                top: 0,
                left: direction * scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const scrollArticles = (direction) => {
        const scrollAmount = 1000;
        if (articleCardsContainerRef.current) {
            articleCardsContainerRef.current.scrollBy({
                top: 0,
                left: direction * scrollAmount,
                behavior: 'smooth',
            });
        }
    };



    const fieldConfig = [
        { name: 'product', placeholder: 'Product Looking For', type: 'text' },
        { name: 'category', placeholder: 'Category (Main)', type: 'dropdown', options: ['Cakes', 'Pastries', 'Sweets', 'Snacks'] },
        { name: 'requirementDetails', placeholder: 'Requirement Details', type: 'text' },
        { name: 'postalCode', placeholder: 'Postal Code', type: 'text' },
        { name: 'country', placeholder: 'Country', type: 'text' },
        { name: 'state', placeholder: 'State', type: 'text' },
        { name: 'city', placeholder: 'City', type: 'text' },
        { name: 'distance', placeholder: 'Distance', type: 'dropdown', options: ['5 km', '10 km', '15 km'] },
        { name: 'budget', placeholder: 'Targeted Budget', type: 'number' },
        { name: 'quantity', placeholder: 'Quantity Looking For', type: 'number' },
        { name: 'allergy', placeholder: 'Allergy Details', type: 'text' },
        { name: 'dateNeeded', placeholder: 'Date Products Needed', type: 'date' },
        { name: 'timeNeeded', placeholder: 'Time Product Needs to Be Ready', type: 'time' },
        { name: 'deliveryMethod', placeholder: 'Select Pick Up or Delivery', type: 'dropdown', options: ['Pick Up', 'Delivery'] },
        { name: 'event', placeholder: 'Event Details', type: 'text' },
        { name: 'validUntil', placeholder: 'Posting Valid Until', type: 'date' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const isFieldValid = () => {
        const currentField = fieldConfig[currentFieldIndex];
        return formData[currentField.name] && formData[currentField.name].trim() !== '';
    };

    const handleNextField = () => {
        if (isFieldValid()) {
            if (currentFieldIndex < fieldConfig.length - 1) {
                setCurrentFieldIndex(currentFieldIndex + 1);
                if ((currentFieldIndex + 1) % 3 === 0 && currentStep < totalSteps) {
                    setCurrentStep(currentStep + 1);
                }
            }
        } else {
            alert('Please fill in the required field.');
        }
    };

    const handlePrevField = () => {
        if (currentFieldIndex > 0) {
            setCurrentFieldIndex(currentFieldIndex - 1);
            if (currentFieldIndex % 3 === 0 && currentStep > 1) {
                setCurrentStep(currentStep - 1);
            }
        }
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            setCurrentFieldIndex(currentFieldIndex + 3);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setCurrentFieldIndex(currentFieldIndex - 3);
        }
    };

    const renderField = (field) => (
        <div className="inputContainer" key={field.name}>
            {(() => {
                switch (field.type) {
                    case 'dropdown':
                        return (
                            <select
                                name={field.name}
                                className="inputField"
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select an option</option> { }
                                {field.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                                l</select>
                        );
                    case 'date':
                        return (
                            <input
                                type="date"
                                className="inputField"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                                required
                            />
                        );
                    case 'number':
                        return (
                            <input
                                type="number"
                                className="inputField"
                                name={field.name}
                                value={formData[field.name] || ''}
                                placeholder={field.placeholder}
                                onChange={handleInputChange}
                                required
                            />
                        );
                    default:
                        return (
                            <input
                                type="text"
                                className="inputField"
                                name={field.name}
                                value={formData[field.name] || ''} // Set value from formData
                                placeholder={field.placeholder}
                                onChange={handleInputChange}
                                required
                            />
                        );
                }
            })()}
        </div>
    );


    const renderStepProgress = () => (
        <div className="stepContainer">
            {[1, 2, 3, 4].map(step => (
                <div key={step} className={`stepBlock ${currentStep >= step ? 'active' : ''}`}>
                    <div className={`step ${currentStep >= step ? 'active' : ''}`}>{step}</div>
                    {step < totalSteps && <div className={`stepLine ${currentStep > step ? 'filled' : ''}`}></div>}
                </div>
            ))}
        </div>
    );

    const renderLoggedInContent = () => (
        <>
            <SearchBar isHome={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="tradeLeadForm">
                {renderStepProgress()}

                <div className="formStep">
                    <h3 className='label'>{`Step ${currentStep} ${fieldConfig[currentFieldIndex].placeholder}`}</h3>
                    <div className="formRow">
                        {renderField(fieldConfig[currentFieldIndex])}
                    </div>

                    <div className="navButtons">
                        <button className="navBtn doubleArrow" onClick={handlePrevStep} disabled={currentStep === 1}>«</button>
                        <button className="navBtn" onClick={handlePrevField} disabled={currentFieldIndex === 0}>←</button>

                        {currentStep === totalSteps && currentFieldIndex === fieldConfig.length - 1 ? (
                            <button className="primaryBtn2" onClick={() => alert('Form submitted!')}>Submit</button>
                        ) : (
                            <>
                                <button className="navBtn" onClick={handleNextField} disabled={currentFieldIndex >= fieldConfig.length - 1}>→</button>
                                <button className="navBtn doubleArrow" onClick={handleNextStep} disabled={currentStep === totalSteps}>»</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );


    const renderLoggedOutContent = () => (
        <button className="primaryBtn2">JOIN NOW</button>
    );

    return (
        <div className="homePage">
            <section className="heroSectionContainer">
                <section className='mainSection'>
                    <div className="heroContent">
                        {isLogin && renderLoggedInContent()}

                        <h1>Discover a World of <span className="highlight">Delectable Treats</span></h1>
                        <p>Explore our diverse range of mouth-watering sweets and pastries crafted by top vendors.</p>

                        {!isLogin && renderLoggedOutContent()}

                        <div className="slider">
                            <div className="sliderTrack" style={{ transform: `translateX(-${currentSlide * 33.33}%)`, transition: `transform 0.5s ease-in-out` }}>
                                {slides.concat(slides.slice(0, 2)).map((slide, index) => (
                                    <div key={index} className="sliderItem">
                                        <div className="circleWrapper">
                                            <img src={slide.image} draggable={false} alt={slide.text} className="sliderImage selectDisable" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dottedLine left"></div>
                            <div className="dottedLine right"></div>
                        </div>
                        <div className="paginationDots">
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                ></span>
                            ))}
                        </div>

                    </div>
                    <div className="imageWrapper">
                        <img src={empanadasImage} draggable={false} alt="Delicious Empanadas Background" className="fixedBackground selectDisable" />
                        <img src={featureImage} draggable={false} alt="Delicious Treat" className={`featureImage selectDisable ${animateFeatureImage ? 'slideIn' : ''}`} />
                    </div>
                </section>
            </section>

            {!isLogin && <section className="whyChooseUsSection">
                <section className='mainSection'>
                    <div className="homePageSectionsHeading">
                        <h2>Why Choose Us</h2>
                        <div className="dotLine left"></div>
                        <div className="dotLine right"></div>
                    </div>
                    <img src={HomeBanner} className='homeBannerImg selectDisable' draggable={false} alt="Error" />
                </section>
            </section>}

            {isLogin && <section className="featuredSection">
                <section className='mainSection'>
                    <div className="homeBannerAfterLogin">
                        <div className='featuredSectionLeft'>
                            <Link to="/categories" className='featuredSectionBtn'>See Categories <FaArrowRight /></Link>
                            <p>Dive into our diverse selection of sweets and treats</p>
                        </div>
                        <img src={HomeBanner2} className='homeBannerImg2 selectDisable' draggable={false} alt="Error" />
                    </div>
                </section>
            </section>}

            {/* {!isLogin && <section className="whyChooseUsSection">
                <section className='mainSection'>
                    <div className="homePageSectionsHeading">
                        <h2>Why Choose Us</h2>
                        <div className="dotLine left"></div>
                        <div className="dotLine right"></div>
                    </div>
                    <div className="cardContainer">
                        <div className="chooseCard">
                            <img src={image1} alt="Premium Desserts" />
                            <p>Diverse Selection of Premium Desserts</p>
                        </div>
                        <div className="chooseCard">
                            <img src={image2} alt="Quality Craftsmanship" />
                            <p>Exceptional Quality and Craftsmanship</p>
                        </div>
                        <div className="chooseCard">
                            <img src={image3} alt="Custom Orders" />
                            <p>Custom Orders to Suit Your Needs</p>
                        </div>
                    </div>
                </section>
            </section>} */}

            <section className="vendorsSection">
                <section className='mainSection'>
                    <div className="vendorsHeading">
                        <div className="homePageSectionsHeading">
                            <h2>Our Top Vendors</h2>
                            <div className="dotLine left"></div>
                            <div className="dotLine right"></div>
                        </div>
                    </div>
                    <div className="seeAllBtnWrapper">
                    </div>
                    <div className="vendorCardsWrapper">
                        <button className="chevronBtn left" onClick={() => scrollVendors(-1)}>
                            <FaChevronLeft />
                        </button>
                        <div className="vendorCardsContainer" ref={vendorCardsContainerRef}>
                            {vendors.map((vendor, index) => (
                                <VendorCard
                                    vendor={vendor}
                                />
                            ))}
                        </div>
                        <button className="chevronBtn right" onClick={() => scrollVendors(1)}>
                            <FaChevronRight />
                        </button>
                    </div>
                </section>
            </section>

            <section className="articlesSection">
                <section className='mainSection'>
                    <div className="vendorsHeading">
                        <div className="homePageSectionsHeading">
                            <h2>Our Top Articles</h2>
                            <div className="dotLine left"></div>
                            <div className="dotLine right"></div>
                        </div>
                    </div>
                    <div className="seeAllBtnWrapper">
                        <button onClick={() => navigate('blogs')} className="seeAllBtn">See All</button>
                    </div>
                    <div className="articlesContainerWrapper">
                        <button className="chevronBtn left" onClick={() => scrollArticles(-1)}>
                            <FaChevronLeft />
                        </button>
                        <div className="articlesContainer" ref={articleCardsContainerRef}>
                            {articles.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    title={article.title}
                                    date={article.date}
                                    image={article.image}
                                    category={article.category}
                                    slug={article.slug}
                                />
                            ))}
                        </div>
                        <button className="chevronBtn right" onClick={() => scrollArticles(1)}>
                            <FaChevronRight />
                        </button>
                    </div>
                </section>
            </section>

            <section className='mainSection'>
                <div className='categoryRowContainer'>
                    <CategoryRow
                        categoryName="Cakes"
                        products={sweetsCategory.filter(product => product.categoryName === 'Cakes')}
                    />
                </div>
                <div className='categoryRowContainer'>

                    <CategoryRow
                        categoryName="Pastries"
                        products={sweetsCategory.filter(product => product.categoryName === 'Pastries')}
                    />
                </div>
            </section>

        </div>
    );
};

export default Home;