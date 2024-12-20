import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cakeCard from '../../images/pngs/cakecard.png'
import cakeCard2 from '../../images/pngs/cakecard.png'
import { useNavigate } from 'react-router-dom';

const ActiveOrders = () => {
  const navigate = useNavigate();
  const ordersContainerRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (ordersContainerRef.current) {
      ordersContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeOrders = [
    {
      id: 1,
      title: "Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations",
      image: cakeCard
    },
    {
      id: 2,
      title: "Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations",
      image: cakeCard2
    },
    {
      id: 3,
      title: "Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations",
      image:cakeCard
    }
  ];

  return (
    <div className="activeOrdersContainer">
      <div className="postingsHeader">
        <h2>Active Orders</h2>
        <button onClick={()=> navigate('/yourOrders', { state: { isSeller:true } })
} className="viewAllButton">View All</button>
      </div>

      <div className="productsCarousel">
        <button className="chevronBtn left" onClick={() => scroll(-1)}>
          <ChevronLeft size={24} />
        </button>

        <div className="activeOrdersWrapper" ref={ordersContainerRef}>
          {activeOrders.map((order) => (
            <div key={order.id} className="activeOrderCard">
              <img src={order.image} alt={order.title} className="activeOrderImage" />
              <h3 className="activeOrderTitle">{order.title}</h3>
            </div>
          ))}
        </div>

        <button className="chevronBtn right" onClick={() => scroll(1)}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ActiveOrders;