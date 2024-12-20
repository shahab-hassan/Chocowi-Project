import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../buyer/ProductCard';

const CategoryRow = ({ categoryName, products, isCategory }) => {
  const productsContainerRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300; 
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="categoryRow">
      {!isCategory && (
        <div className="vendorsHeading">
          <div className="homePageSectionsHeading">
            <h2>{categoryName}</h2>
            <div className="dotLine left"></div>
            <div className="dotLine right"></div>
          </div>
        </div>
      )}
      {!isCategory && (
        <div className="seeAllBtnWrapper">
          <Link to="/products" state={{ category: categoryName }}> 
            <button className="seeAllBtn">See All</button>
          </Link>
        </div>
      )}
      <div className="productsWrapper">
        {!isCategory && (
          <button className="chevronBtn left" onClick={() => scroll(-1)}>
            <FaChevronLeft />
          </button>
        )}
        <div className={`productsContainer ${isCategory ? 'wrap' : ''}`} ref={productsContainerRef}>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product} // Passing entire product object
            />
          ))}
        </div>
        {!isCategory && (
          <button className="chevronBtn right" onClick={() => scroll(1)}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryRow;
