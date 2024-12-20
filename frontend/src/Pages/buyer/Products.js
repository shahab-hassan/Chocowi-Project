import React, { useState, useEffect } from 'react';
import SearchBar from '../../Components/utils/SearchBar';
import { sweetsCategory } from '../../data/data';
import CategoryRow from '../../Components/buyer/CategoryRow';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../Components/buyer/BreadCrumb';
import Dropdown from '../../Components/utils/Dropdown'; // Import the custom Dropdown component

const Products = () => { 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [sortOption, setSortOption] = useState({ value: 'Best selling', label: 'Sort by: Best selling' });
    const categories = [...new Set(sweetsCategory.map(item => item.categoryName))];
    const location = useLocation();
    const initialCategory = location.state?.category || 'Cakes';

    useEffect(() => {
        const initialProducts = sweetsCategory.filter(item => item.categoryName === initialCategory);
        setFilteredCategory(initialProducts);
    }, [initialCategory]);

    const handleCategoryChange = (category) => {
        const newProducts = sweetsCategory.filter(item => item.categoryName === category);
        setFilteredCategory(newProducts);
        setSearchQuery('');
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const category = categories.find(cat => cat.toLowerCase() === searchQuery.toLowerCase());
            if (category) {
                handleCategoryChange(category);
            }
        }
    };

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);

        let sortedProducts = [...filteredCategory];
        
        switch (selectedOption.value) {
            case 'Best selling':
                // Logic to be added
                break;
            case 'Price (low to high)':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price (high to low)':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        
        setFilteredCategory(sortedProducts);
    };

    const sortOptions = [
        { value: 'Best selling', label: 'Sort by: Best selling' },
        { value: 'Price (low to high)', label: 'Sort by: Price (low to high)' },
        { value: 'Price (high to low)', label: 'Sort by: Price (high to low)' },
        { value: 'Rating', label: 'Sort by: Rating' }
    ];

    const priceRangeOptions = [{ value: 'Price Range', label: 'Price Range' }];
    const distanceOptions = [{ value: 'Distance', label: 'Distance' }];
    const categoryOptions = [{ value: 'Categories', label: 'Categories' }];
    const ratingsOptions = [{ value: 'Ratings', label: 'Ratings' }];
    const sellerGradeOptions = [{ value: 'Seller Grade', label: 'Seller Grade' }];
    const originOptions = [{ value: 'Origin', label: 'Origin' }];

    return (
        <div className="productsPage">
            <section className='mainSection'>
                <SearchBar 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    isCategory={true} 
                    categories={categories} 
                    onSearchKeyDown={handleSearchKeyDown} 
                    onSuggestionClick={handleCategoryChange} 
                />

                <BreadCrumb  />
                <h1 className='pageMainHeading'>{filteredCategory.length > 0 ? filteredCategory[0].categoryName : initialCategory}</h1>
                <div className = "filtersContainer">
                <div className="filtersContent">
                    <Dropdown options={priceRangeOptions} placeholder="Price Range" />
                    <Dropdown options={distanceOptions} placeholder="Distance" />
                    <Dropdown options={categoryOptions} placeholder="Categories" />
                    <Dropdown options={ratingsOptions} placeholder="Ratings" />
                    <Dropdown options={sellerGradeOptions} placeholder="Seller Grade" />
                    <Dropdown options={originOptions} placeholder="Origin" />
                </div>
                </div>

                <div className="totalItemsSort">
                    <p>{filteredCategory.length} results</p>
                    <div className='sortBy'>
                    <Dropdown
                        options={sortOptions}
                        value={sortOption}
                        onChange={handleSortChange}
                        placeholder="Sort by"
                    />
                    </div>
                </div>
            
                {filteredCategory.length > 0 && (
                    <CategoryRow categoryName={filteredCategory[0].categoryName} products={filteredCategory} isCategory={true} />
                )}
            </section>
        </div>
    );
};

export default Products;