import React, { useState } from 'react';
import { FaSearch, FaFilter, FaGlobe, FaMapMarkerAlt, FaFlag } from 'react-icons/fa';
import Dropdown from './Dropdown';  // Importing the Dropdown component

const SearchBar = ({ isHome, searchQuery, setSearchQuery, isCategory, categories, onSearchKeyDown, onSuggestionClick }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (isCategory) {
            const filteredSuggestions = categories.filter(category =>
                category.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (category) => {
        setSearchQuery(category);
        onSuggestionClick(category);
        setSuggestions([]);
    };

    const languageOptions = [
        { value: 'English-CAD', label: 'English-CAD' },
        { value: 'French-CAD', label: 'French-CAD' }
    ];

    const locationOptions = [
        { value: 'Alberta', label: 'Alberta' },
        { value: 'Ontario', label: 'Ontario' }
    ];

    const currencyOptions = [
        { value: 'CAD', label: 'CAD' },
        { value: 'USD', label: 'USD' }
    ];

    return (
        <div className={isHome ? "topBar" : "topBar2"}>
            <div className="searchContainer">
                <FaSearch className="searchIcon" />
                <input
                    type="text"
                    placeholder={isCategory ? "Search categories..." : "What services do you need today"}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={onSearchKeyDown}
                />
                {isCategory && suggestions.length > 0 && (
                    <div className="suggestions">
                        {suggestions.map((category, index) => (
                            <div
                                key={index}
                                className="suggestion"
                                onClick={() => handleSuggestionClick(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
                <button className="filterBtn">
                    Filter <FaFilter />
                </button>
            </div>

            {/* Updated Location Filters with Dropdown Component */}
            <div className="locationFilters">
                <div className="defaultDropdown">
                    <Dropdown
                        options={languageOptions}
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                        placeholder="Language"
                    />
                </div>
                <div className="defaultDropdown">
                    <Dropdown
                        options={locationOptions}
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        placeholder="Location"
                    />
                </div>
                <div className="defaultDropdown">
                    <Dropdown
                        options={currencyOptions}
                        value={selectedCurrency}
                        onChange={setSelectedCurrency}
                        placeholder="Currency"
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
