import React from 'react';
import { MapPin } from 'lucide-react';
import mapImage from '../../images/pngs/map.png'
import { useLocation,Link } from 'react-router-dom';
import BreadCrumb from '../../Components/buyer/BreadCrumb';

const OrderDetailsPage = () => {
  const location = useLocation();
  const { orderData } = location.state || { orderData: null };
  const {isSeller} = location.state || { isSeller: false };
  console.log(orderData);
  const order = orderData || {
    id: 1,
    orderId: '0921',
    status: 'active',
    datePlace: '1/12/2023',
    dueDate: '1/1/2024',
    address: 'House321, Street22, Margalla Town, Phase 3, Islamabad, Pakistan',
    note: 'Thank you for handling this delivery. Please ensure that you carefully review the order details before heading out.',
    sellerInfo: {
      name: 'Shahab hassan',
      email: 'shahabhassan@gmail.com',
      phone: '+920123403249',
      avatar: '/api/placeholder/48/48' 
    },
    items: [
      { name: 'Creamy Pancakes', price: 30 },
      { name: 'Chocolate Cake', price: 40 },
      { name: 'Vanilla Cupcakes', price: 20 }
    ],
    billing: {
      subtotal: 90,
      serviceFee: 4.5,
      tax: 4.5,
      deliveryFee: 0,
      total: 99
    },
    paymentType: 'GooglePay',
    quotedAmount: '99$',
    amountPaid: '99$'
  };

  const trackingData = {
    deliveryPartner: 'PK-TCS',
    trackingNumber: order.orderId,
    status: 'Confirmed',
    statusHistory: [
      { status: order.status, timestamp: order.datePlace, description: 'Current status' },  
    ]
  };
  const getStatusStyle = (status) => {
    const statusStyles = {
      'active': 'ordersStatus ordersStatusActive',
      'past-due': 'ordersStatus ordersStatusPastDue',
      'need-resolution': 'ordersStatus ordersStatusNeedResolution',
      'completed': 'ordersStatus ordersStatusCompleted',
      'cancelled': 'ordersStatus ordersStatusCancelled'
    };

    return statusStyles[status] || 'ordersStatus';
  };



  return (
    <div className="orderDetailPage">
      <section className="mainSection">
      <BreadCrumb />
      
      <div className="orderDetailCard">
        <div className="orderDetailHeader">
          <h1 className="orderDetailTitle">{orderData.delivery?'Delivery':'Pickup'}</h1>
          <div className='orderDetailTrackAndStatus'>
          <Link 
          to={isSeller?"/sellerOrderTrackingPage":"/orderTrackingPage" }
          state={{ trackingData: trackingData,delivery:orderData.delivery,isSeller:isSeller }}
          className="orderDetailTracking"
        >
          Track Order
        </Link>          <span className={getStatusStyle(order.status)}>
           {order.status.toUpperCase()}
          </span>
          </div>
        </div>

        <div className="orderDetailContent">
          {/* Left Column - Map and Seller Info */}
          <div className="orderDetailLeftColumn">
            <div className="orderDetailMapContainer">
              <img 
                src={mapImage} 
                alt="Map placeholder" 
                className="orderDetailMapImage"
              />
            </div>

            {/* Seller Information */}
            <div className="orderDetailSellerCard">
              <div className="orderDetailSellerAvatar">
                <img 
                  src={order.sellerInfo.avatar}
                  alt={order.sellerInfo.name}
                />
              </div>
              <div className="orderDetailSellerInfo">
                <h3 className="orderDetailSellerName">{order.sellerInfo.name}</h3>
                <p className="orderDetailSellerContact">{order.sellerInfo.email}</p>
                <p className="orderDetailSellerContact">{order.sellerInfo.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="orderDetailPaymentMethod">
            <button className={`primaryBtn3`} >
              Payment Method : {order.paymentType}
            </button>
             {/* Review Button */}
      {order.status === 'completed' && (
        <div className="orderDetailReviewButtonContainer">
          <button className="primaryBtn" style={{backgroundColor:"#ff6b81"}}>Give a review</button>
        </div>
      )}
          </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="orderDetailRightColumn">
            {/* Complete Address */}
            <div className="orderDetailFormGroup">
              <label className="orderDetailFormLabel">Complete address</label>
              <input 
                type="text" 
                className="inputField"
                value={order.address}
                readOnly
              />
            </div>

            {/* Order Details */}
            <div className="orderDetailFormGroup orderDetailOrderDetailsGrid">
              <div>
                <label className="orderDetailFormLabel">Order number</label>
                <input 
                  type="text" 
                  className="inputField"
                  value={order.id}
                  readOnly
                />
              </div>
              <div>
                <label className="orderDetailFormLabel">Date placed</label>
                <input 
                  type="text" 
                  className="inputField"
                  value={order.datePlace}
                  readOnly
                />
              </div>
              <div>
                <label className="orderDetailFormLabel">Date (Selected)</label>
                <input 
                  type="text" 
                  className="inputField"
                  value={order.dueDate}
                  readOnly
                />
              </div>
            </div>

            {/* Note for rider */}
            <div className="orderDetailFormGroup">
              <label className="orderDetailFormLabel">Note for rider</label>
              <textarea 
                className="inputField"
                value={order.note}
                readOnly
                rows={4}
              />
            </div>

            {/* Product Details */}
            <div className="orderDetailFormGroup">
              <label className="orderDetailFormLabel">Product details</label>
              <table className="orderDetailTable">
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="orderDetailTextRight">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Billing Details */}
            <div className="orderDetailFormGroup">
            <label className="orderDetailFormLabel">Billing details</label>
            <table className="orderDetailTable">
              <tbody>
                <tr>
                  <td>Delivery fee</td>
                  <td className="orderDetailTextRight">${order.billing.deliveryFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>SubTotal</td>
                  <td className="orderDetailTextRight">${order.billing.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td className="orderDetailTextRight">${order.billing.serviceFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (5%)</td>
                  <td className="orderDetailTextRight">${order.billing.tax.toFixed(2)}</td>
                </tr>
                <tr className="orderDetailTotalRow">
                  <td><strong>Total</strong></td>
                  <td className="orderDetailTextRight"><strong>${order.billing.total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

            {/* Action Buttons */}
            <div className="orderDetailActionButtons">
              <button className="orderDetailDisputeButton">Start Dispute</button>
              {order.status === 'active' && (
                <button className="orderDetailCancelButton">Cancel order</button>
              )}
            </div>
          </div>
        </div>
      </div>
      
     
          </section>
    </div>
  );
};

export default OrderDetailsPage;