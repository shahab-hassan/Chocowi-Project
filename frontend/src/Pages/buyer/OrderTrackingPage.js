import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaCheck, 
  FaSync, 
  FaBox, 
  FaTruck, 
  FaDownload, 
  FaShoppingBag, 
  FaClock, 
  FaUserClock,
  FaEdit,
  FaTimes,
  FaInfoCircle,
} from 'react-icons/fa';

const OrderTracking = () => {
  const location = useLocation();
  const { delivery, isSeller } = location.state || { delivery: false, isSeller: false };
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [note, setNote] = useState('');
  const [statusHistory, setStatusHistory] = useState(
    delivery ? [
      { status: 'Delivered', timestamp: '08 Jan 2023, 16:53', description: 'Your package has been delivered.' },
      { status: 'Out for delivery', timestamp: '06 Jan 2023, 16:53' },
      { status: 'Processed and Ready to Deliver', timestamp: '06 Jan 2023, 16:53' },
      { status: 'Handled by Seller', timestamp: '02 Jan 2023, 16:53', description: 'Your order has been received by Seller.' },
      { status: 'Confirmed', timestamp: '02 Jan 2023, 16:53', description: 'Your order has been confirmed, awaiting response from the seller.' },
    ] : [
      { status: 'Ready for Pickup', timestamp: '08 Jan 2023, 16:53', description: 'Your order is ready for pickup at the store.' },
      { status: 'Preparing Order', timestamp: '06 Jan 2023, 16:53', description: 'Your order is being prepared.' },
      { status: 'Order Accepted', timestamp: '04 Jan 2023, 16:53', description: 'The seller has accepted your order and started processing.' },
      { status: 'Order Placed', timestamp: '02 Jan 2023, 16:53', description: 'Your order has been placed successfully.' },
    ]
  );

  const [currentStatus, setCurrentStatus] = useState(statusHistory[0].status);

  const deliveryData = {
    deliveryPartner: 'PK-TCS',
    trackingNumber: '340394930',
    status: currentStatus
  };

  const pickupData = {
    orderNumber: '340394930',
    status: currentStatus
  };

  const data = delivery ? deliveryData : pickupData;

  const getDeliveryStatuses = () => [
    { name: 'Confirmed', icon: <FaCheck />, order: 1 },
    { name: 'Processing', icon: <FaSync />, order: 2 },
    { name: 'Packed', icon: <FaBox />, order: 3 },
    { name: 'Shipped', icon: <FaTruck />, order: 4 },
    { name: 'Delivered', icon: <FaDownload />, order: 5 }
  ];

  const getPickupStatuses = () => [
    { name: 'Order Placed', icon: <FaShoppingBag />, order: 1 },
    { name: 'Order Accepted', icon: <FaCheck />, order: 2 },
    { name: 'Preparing Order', icon: <FaSync />, order: 3 },
    { name: 'Ready for Pickup', icon: <FaClock />, order: 4 },
    { name: 'Picked Up', icon: <FaUserClock />, order: 5 }
  ];

  const statuses = delivery ? getDeliveryStatuses() : getPickupStatuses();

  const getStatusOrder = (statusName) => {
    const status = statuses.find(s => s.name === statusName);
    return status ? status.order : 0;
  };

  const handleStatusUpdate = (status) => {
    const selectedStatusOrder = getStatusOrder(status);
    const currentStatusOrder = getStatusOrder(currentStatus);

    if (selectedStatusOrder > currentStatusOrder) {
      setSelectedStatus(status);
      setStatusUpdateOpen(true);
    } else {
      alert("You can only move forward to the next status.");
    }
  };

  const submitStatusUpdate = () => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newStatusUpdate = {
      status: selectedStatus,
      timestamp,
      description: note.trim() || undefined
    };

    const newStatusHistory = [newStatusUpdate, ...statusHistory];

    setStatusHistory(newStatusHistory);
    setCurrentStatus(selectedStatus);
    setStatusUpdateOpen(false);
    setNote('');
  };

  return (
    <div className="trackingDetailsPage">
      <h1 className="pageMainHeading">Tracking Details</h1>
      <section className="mainSection">
      
        <div className="trackingDetails">
          <div className="deliveryInfo">
            <div className="packageIcon">
              {delivery ? <FaTruck /> : <FaShoppingBag />}
            </div>
            <div className="deliveryText">
              <div className="deliveryRow">
                <span>{delivery ? 'Delivery Info' : 'Pickup Info'}</span>
                <span>{delivery ? 'Tracking Number' : 'Order Number'}</span>
              </div>
              <div className="deliveryRow">
                <span>
                  {delivery 
                    ? `Delivery Partner: ${data.deliveryPartner}`
                    : 'Pickup Location: Store'
                  }
                </span>
                <span>{delivery ? data.trackingNumber : data.orderNumber}</span>
              </div>
            </div>
          </div>
          {isSeller && (
        <div className="sellerOrderStatusNote">
          <FaInfoCircle className="orderStatusIcon" />
          <p className="orderStatusText">
            Click on the status boxes to update the order status. You can only progress to the next status.
          </p>
        </div>
      )}

          <div className="statusTracker">
            {statuses.map((step) => (
              <div 
                key={step.name} 
                className={`statusStep ${data.status === step.name ? 'active' : ''} ${isSeller ? 'clickable' : ''}`}
                onClick={() => isSeller && handleStatusUpdate(step.name)}
              >
                <div className="statusIcon">{step.icon}</div>
                <p>{step.name}</p>
              </div>
            ))}
          </div>

          {statusUpdateOpen && (
            <>
              <div className="modalOverlay" onClick={() => setStatusUpdateOpen(false)} />
              <div className="statusUpdateModal">
                <div className="modalHeader">
                  <h3>Update Status to {selectedStatus}</h3>
                  <button className="modalCloseButton" onClick={() => setStatusUpdateOpen(false)}>
                    <FaTimes />
                  </button>
                </div>
                <textarea
                  className="modalTextarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note (optional)"
                />
                <div className="modalActions">
                  <button className="modalButton cancel" onClick={() => setStatusUpdateOpen(false)}>
                    Cancel
                  </button>
                  <button className="modalButton submit" onClick={submitStatusUpdate}>
                    Update Status
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="statusHistory">
            {statusHistory.map((item, index) => (
              <div key={index} className="historyItem">
                <div className="historyTimeStamp">{item.timestamp}</div>
                <div className={`historyDot ${index === 0 ? 'active' : ''}`} />
                <div className="historyContent">
                  <p className="historyStatus">{item.status}</p>
                  {item.description && (
                    <p className="historyDescription">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderTracking;
