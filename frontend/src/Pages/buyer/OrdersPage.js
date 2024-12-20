import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import BreadCrumb from '../../Components/buyer/BreadCrumb';
import { useNavigate,useLocation} from 'react-router-dom';
import image from '../../images/pngs/seller1.png'
const OrdersPage = () => {
  const location = useLocation();
  const isSeller = location.state?.isSeller || false;
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const navigateTo = (item) => {
    isSeller?
    navigate('/sellerOrderDetailPage', { state: { orderData: item, isSeller } }):
    navigate('/orderDetailPage', { state: { orderData: item, isSeller } });
  };

  const mockData = [
    {
      id: 1,
      orderId: '01',
      sellerInfo: {
        name: 'Shahab Hassan',
        avatar: image,
        email: 'shahabhassan@gmail.com',
        phone: '+920123403249'
      },
      buyerInfo: {
        name: 'John Doe',
        avatar: image,
        email: 'johndoe@gmail.com',
        phone: '+920123456789'
      },
      datePlace: '19/1/2024',
      dueDate: '30/1/2024',
      quotedAmount: '200$',
      depositAmount: '80$',
      depositDate: '22/1/2024',
      remainingDeposit: '30$',
      remainingDate: '23/1/2024',
      buyersPaidAmount: '120$',
      dateBuyerMadePayment: '25/1/2024',
      status: 'active',
      address: 'House321, Street22, Margalla Town, Phase 3, Islamabad, Pakistan',
      items: [
        { name: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations', price: 30 },
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
      delivery:true,

    },

    {
      id: 2,
      orderId: '01',
      sellerInfo: {
        name: 'Shahab Hassan',
        avatar: image,
        email: 'shahabhassan@gmail.com',
        phone: '+920123403249'
      },
      buyerInfo: {
        name: 'John Doe',
        avatar: image,
        email: 'johndoe@gmail.com',
        phone: '+920123456789'
      },
      datePlace: '19/1/2024',
      dueDate: '30/1/2024',
      quotedAmount: '200$',
      depositAmount: '80$',
      depositDate: '22/1/2024',
      remainingDeposit: '30$',
      remainingDate: '23/1/2024',
      buyersPaidAmount: '120$',
      dateBuyerMadePayment: '25/1/2024',
      status: 'past-due',
      address: 'House321, Street22, Margalla Town, Phase 3, Islamabad, Pakistan',
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
      delivery:false,

    },
    {
      id: 3,
      orderId: '01',
      sellerInfo: {
        name: 'Shahab Hassan',
        avatar: image,
        email: 'shahabhassan@gmail.com',
        phone: '+920123403249'
      },
      buyerInfo: {
        name: 'John Doe',
        avatar: image,
        email: 'johndoe@gmail.com',
        phone: '+920123456789'
      },
      datePlace: '19/1/2024',
      dueDate: '30/1/2024',
      quotedAmount: '200$',
      depositAmount: '80$',
      depositDate: '22/1/2024',
      remainingDeposit: '30$',
      remainingDate: '23/1/2024',
      buyersPaidAmount: '120$',
      delivery:false,
      dateBuyerMadePayment: '25/1/2024',
      status: 'need-resolution',
      address: 'House321, Street22, Margalla Town, Phase 3, Islamabad, Pakistan',
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
      paymentType: 'GooglePay'
    },
    {
      id: 4,
      orderId: '01',
      sellerInfo: {
        name: 'Shahab Hassan',
        avatar: image,
        email: 'shahabhassan@gmail.com',
        phone: '+920123403249'
      },
      buyerInfo: {
        name: 'John Doe',
        avatar: image,
        email: 'johndoe@gmail.com',
        phone: '+920123456789'
      },
      datePlace: '19/1/2024',
      dueDate: '30/1/2024',
      quotedAmount: '200$',
      depositAmount: '80$',
      depositDate: '22/1/2024',
      remainingDeposit: '30$',
      remainingDate: '23/1/2024',
      buyersPaidAmount: '120$',
      dateBuyerMadePayment: '25/1/2024',
      status: 'completed',
      address: 'House321, Street22, Margalla Town, Phase 3, Islamabad, Pakistan',
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
      delivery:true,

    }
  ];

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

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'active':
        return mockData.filter(order => order.status === 'active');
      case 'pastDue':
        return mockData.filter(order => order.status === 'past-due');
      case 'resolution':
        return mockData.filter(order => order.status === 'need-resolution');
      case 'completed':
        return mockData.filter(order => order.status === 'completed');
      case 'cancelled':
        return mockData.filter(order => order.status === 'cancelled');
      case 'all':
        return mockData;
      default:
        return [];
    }
  };

  const getDisplayStatus = (status) => {
    const statusDisplay = {
      'active': 'Active',
      'past-due': 'Past Due',
      'need-resolution': 'Need Resolution',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return statusDisplay[status] || status;
  };

  return (
    <div className="ordersPage">
      <section className="mainSection">
        <BreadCrumb />
        
        <div className="tabsContainer" style={{ maxWidth: '1000px' }}>
          <button
            className={activeTab === 'active' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={activeTab === 'pastDue' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('pastDue')}
          >
            Active (Past-due)
          </button>
          <button
            className={activeTab === 'resolution' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('resolution')}
          >
            Need Resolution
          </button>
          <button
            className={activeTab === 'completed' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('completed')}
          >
            Completed Orders
          </button>
          <button
            className={activeTab === 'cancelled' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
          <button
            className={activeTab === 'all' ? 'activeTab' : 'tab'}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>

        <div className="ordersTableWrapper">
          <table className="ordersMainTable">
            <thead>
              <tr className="ordersTableHeader">
                <th>{isSeller ? "Buyer Name & Pic" : "Seller Name & Pic"}</th>
                <th>Order #</th>
                <th>Date Place Order</th>
                <th>Delivery Date</th>
                <th>Quoted Amount</th>
                {isSeller ? (
                  <>
                    <th>Deposit Paid (if any) & Date</th>
                    <th>Remaining Deposit & Date</th>
                    <th>Buyer's Paid Amount</th>
                    <th>Date buyer Made Payment</th>
                  </>
                ) : (
                  <th>Amount Paid</th>
                )}
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getFilteredOrders().map((item) => (
                <tr key={item.id} className="ordersTableRow">
                  <td>
                    <div className="ordersSellerCell">
                      <img 
                        src={isSeller ? item.buyerInfo.avatar : item.sellerInfo.avatar} 
                        alt={isSeller ? item.buyerInfo.name : item.sellerInfo.name} 
                        className="ordersSellerAvatar"
                      />
                      <span className="ordersSellerName">
                        {isSeller ? item.buyerInfo.name : item.sellerInfo.name}
                      </span>
                    </div>
                  </td>
                  <td>{item.orderId}</td>
                  <td>{item.datePlace}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.quotedAmount}</td>
                  {isSeller ? (
                    <>
                      <td>{`${item.depositAmount} - ${item.depositDate}`}</td>
                      <td>{`${item.remainingDeposit} - ${item.remainingDate}`}</td>
                      <td>{item.buyersPaidAmount}</td>
                      <td>{item.dateBuyerMadePayment}</td>
                    </>
                  ) : (
                    <td>{item.buyersPaidAmount}</td>
                  )}
                  <td>
                    <span className={getStatusStyle(item.status)}>
                      {getDisplayStatus(item.status)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="ordersViewDetailsButton" 
                      onClick={() => navigateTo(item)}
                    >
                      View Details <FaChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;