import React, { useState, useEffect } from 'react';
import SearchBar from '../../Components/utils/SearchBar'; 
import CategoryRow from '../../Components/buyer/CategoryRow';
import { sweetsCategory } from '../../data/data';
import BreadCrumb from '../../Components/buyer/BreadCrumb';
import Dropdown from '../../Components/utils/Dropdown';

const Deals = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDeals, setFilteredDeals] = useState([]);
    const [sortOption, setSortOption] = useState({ value: 'Best selling', label: 'Sort by: Best selling' });

    useEffect(() => {
        const dealsProducts = sweetsCategory.filter(item => item.isDiscounted === true);
        setFilteredDeals(dealsProducts);
    }, []);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const searchedProducts = sweetsCategory.filter(product =>
                product.isDiscounted === true &&
                product.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDeals(searchedProducts);
        }
    };

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);

        let sortedDeals = [...filteredDeals];
        
        switch (selectedOption.value) {
            case 'Best selling':
                // Logic to be added
                break;
            case 'Price (low to high)':
                sortedDeals.sort((a, b) => a.price - b.price);
                break;
            case 'Price (high to low)':
                sortedDeals.sort((a, b) => b.price - a.price);
                break;
            case 'Rating':
                sortedDeals.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        
        setFilteredDeals(sortedDeals);
    };

    const sortOptions = [
        { value: 'Best selling', label: 'Sort by: Best selling' },
        { value: 'Price (low to high)', label: 'Sort by: Price (low to high)' },
        { value: 'Price (high to low)', label: 'Sort by: Price (high to low)' },
        { value: 'Rating', label: 'Sort by: Rating' }
    ];

    const priceRangeOptions = [
        { value: 'Price Range', label: 'Price Range' },
        { value: 'Up to $50', label: 'Up to $50' },
        { value: 'Up to $100', label: 'Up to $100' },
        { value: 'Up to $200', label: 'Up to $200' },
        { value: 'Up to $500', label: 'Up to $500' }
    ];
    const categoryOptions = [{ value: 'Categories', label: 'Categories' }];
    const distanceOptions = [{ value: 'Distance', label: 'Distance' }];
    const sellerGradeOptions = [{ value: 'Seller Grade', label: 'Seller Grade' }];
    const originOptions = [{ value: 'Origin', label: 'Origin' }];
    const ratingsOptions = [{ value: 'Ratings', label: 'Ratings' }];

    return (
        <div className="dealsPage">
            <section className='mainSection'>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isCategory={false}
                    isHome={false}
                    categories={[]}
                    onSearchKeyDown={handleSearchKeyDown}
                    onSuggestionClick={() => {}}
                />

                <BreadCrumb />
                <h1 className='pageMainHeading'>Deals</h1>

                <div className="filtersContainer">
                    <div className="filtersContent">
                        <Dropdown options={priceRangeOptions} placeholder="Price Range" />
                        <Dropdown options={categoryOptions} placeholder="Categories" />
                        <Dropdown options={distanceOptions} placeholder="Distance" />
                        <Dropdown options={sellerGradeOptions} placeholder="Seller Grade" />
                        <Dropdown options={originOptions} placeholder="Origin" />
                        <Dropdown options={ratingsOptions} placeholder="Ratings" />
                    </div>
                </div>

                <div className="totalItemsSort">
                    <p>{filteredDeals.length} results</p>
                    <div className='sortBy'>
                        <Dropdown
                            options={sortOptions}
                            value={sortOption}
                            onChange={handleSortChange}
                            placeholder="Sort by"
                        />
                    </div>
                </div>

                <div className="dealsResults">
                    {filteredDeals.length > 0 ? (
                        <CategoryRow
                            key="deals"
                            categoryName="Deals"
                            products={filteredDeals}
                            isCategory={true}
                        />
                    ) : (
                        <p>No deals found</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Deals;