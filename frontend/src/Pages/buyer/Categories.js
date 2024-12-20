import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import necessary hooks/components from React Router
import SearchBar from '../../Components/utils/SearchBar';
import { sweetsCategory } from '../../data/data';
import CategoryRow from '../../Components/buyer/CategoryRow';
import BreadCrumb from '../../Components/buyer/BreadCrumb'; 

const Categories = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const categories = [...new Set(sweetsCategory.map(item => item.categoryName))]; 
    const location = useLocation(); 

    useEffect(() => {
        const groupedCategories = categories.map(category => ({
            categoryName: category,
            products: sweetsCategory.filter(item => item.categoryName === category),
        }));
        setFilteredCategories(groupedCategories);
    }, [categories]);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const category = categories.find(cat => cat.toLowerCase() === searchQuery.toLowerCase());
            if (category) {
                const newFilteredCategories = [
                    {
                        categoryName: category,
                        products: sweetsCategory.filter(item => item.categoryName === category),
                    },
                ];
                setFilteredCategories(newFilteredCategories);
            } else {
                const groupedCategories = categories.map(category => ({
                    categoryName: category,
                    products: sweetsCategory.filter(item => item.categoryName === category),
                }));
                setFilteredCategories(groupedCategories);
            }
            setSearchQuery(''); 
        }
    };

    const handleSuggestionClick = (category) => {
        const newFilteredCategories = [
            {
                categoryName: category,
                products: sweetsCategory.filter(item => item.categoryName === category),
            },
        ];
        setFilteredCategories(newFilteredCategories);
    };


    return (
        <div className="categoriesPage">
            <section className='mainSection'>

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isCategory={true}
                categories={categories}
                onSearchKeyDown={handleSearchKeyDown}
                onSuggestionClick={handleSuggestionClick}
            />

            <BreadCrumb  />

            {filteredCategories.map((categoryGroup, index) => (
                <CategoryRow
                    key={index}
                    categoryName={categoryGroup.categoryName}
                    products={categoryGroup.products}
                    isCategory={false} 
                />
            ))}
            </section>
        </div>
    );
};

export default Categories;
