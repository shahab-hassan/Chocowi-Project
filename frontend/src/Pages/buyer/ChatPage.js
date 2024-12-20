import React, { useState, useRef, useEffect } from 'react';
import {Paperclip, Search, Trash2, Video, Phone, MoreHorizontal, PlayCircle, Edit, Trash, Send, Check, X } from 'lucide-react';
import productCard from '../../Components/buyer/ProductCard'
import DummyImage from '../../images/pngs/articleImage2.png'
import postingImage from '../../images/pngs/cakecard.png'
import { useLocation } from 'react-router-dom';
import Dropdown from '../../Components/utils/Dropdown';

const ChatComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('regularChat');
  const [selectedChat, setSelectedChat] = useState(null);
  const [showQuoteOptions, setShowQuoteOptions] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const messagesContainerRef = useRef(null);
  const quoteOptionsRef = useRef(null);
  const location = useLocation();
  const isSeller = location.state?.isSeller || false;
  const [sellerProducts, setSellerProducts] = useState([
    { id: 1, title: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations', price: 50,imageUrl:postingImage, },
    { id: 2, title: 'Flaky Croissants with Rich Chocolate Filling', price: 45,imageUrl:postingImage },
    { id: 3, title: 'Delight your taste buds with our flaky croissants filled with rich chocolate', price: 150,imageUrl:postingImage },
  ]);

  
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Nafees Bakers', 
      lastMessage: 'On for 12:30 PM then?', 
      time: '3:40 PM', 
      unreadCount: 2, 
      lastSeen: '45 minutes ago', 
      avatar: 'NB' 
    },
    { 
      id: 2, 
      name: "Layer's Bakeshop", 
      lastMessage: 'Would you like to pay online or in-pers...', 
      time: '3:40 PM', 
      lastSeen: '1 hour ago', 
      avatar: 'LB' 
    },
  ]);

  const [orderChats, setOrderChats] = useState([
    { 
      id: 1, 
      title: 'Deliciously Custom Pancakes', 
      sellerName: 'Nafees Bakers',
      status: 'Active',
      lastMessage: 'Your order is being prepared', 
      time: '3:40 PM', 
      imageUrl: ''
    },
    { 
      id: 2, 
      title: 'Birthday Cake Special', 
      sellerName: 'Sweet Treats Bakery',
      status: 'Completed',
      lastMessage: 'Hope you enjoyed your cake!', 
      time: '2:15 PM', 
      imageUrl: '/api/placeholder/100/100'
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeTab === 'regularChat' && chats.length > 0) {
      handleSelectChat(chats[0]);
    } else if (activeTab === 'orderChatRoom' && orderChats.length > 0) {
      handleSelectOrderChat(orderChats[0]);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quoteOptionsRef.current && !quoteOptionsRef.current.contains(event.target)) {
        setShowQuoteOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const handleDeleteChat = (id) => {
    if (activeTab === 'regularChat') {
      setChats(chats.filter(chat => chat.id !== id));
    } else {
      setOrderChats(orderChats.filter(chat => chat.id !== id));
    }
  };

  const sampleMessages = [
    { id: 1, text: "Hi, I'm interested in your cakes!", sender: "user", time: "12:34 PM" },
    { id: 2, text: "Would love to get a quote for a birthday cake", sender: "user", time: "12:35 PM" },
    { 
      id: 3, 
      type: 'quote',
      sender: 'Nafees Bakers',
      time: "12:36 PM",
      quoteData: {
        selectedPosting: 'Birthday Cake',
        description: 'Two-tier chocolate cake with vanilla frosting',
        dueDate: '2024-11-01',
        deliveryType: 'delivery',
        price: '45',
        productImage: '/api/placeholder/100/100',
        status: 'pending'
      }
    }
  ];

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowQuoteOptions(false);
    setMessages(sampleMessages);
  };

  const handleSelectOrderChat = (chat) => {
    setSelectedChat(chat);
    setShowQuoteOptions(false);
    setMessages([
      { id: 1, text: "Your order has been received!", sender: chat.sellerName, time: "10:00 AM" },
      { id: 2, text: "We'll start preparing your custom cake soon.", sender: chat.sellerName, time: "10:01 AM" },
      { id: 3, text: "Great, thank you! Can't wait!", sender: "user", time: "10:05 AM" },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleQuoteSubmit = (quoteData) => {
    const newQuoteMessage = {
      id: messages.length + 1,
      type: 'quote',
      sender: isSeller ? selectedChat.name : 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quoteData: {
        selectedPosting: quoteData.selectedPostingTitle,  // Extracting the product ID
        description: quoteData.description,
        dueDate: quoteData.dueDate,
        deliveryType: quoteData.deliveryType,
        price: quoteData.price,
        productImage: quoteData.productImage,
        status: 'pending',
      },
    };
  
    setMessages([...messages, newQuoteMessage]);
    setIsQuoteModalOpen(false);
  };
  


  const handleQuoteAction = (messageId, action) => {
    setMessages(messages.map(message => {
      if (message.id === messageId && message.type === 'quote') {
        return {
          ...message,
          quoteData: {
            ...message.quoteData,
            status: action
          }
        };
      }
      return message;
    }));
  };

  const renderQuoteMessage = (message) => {
    return (
      <div className={`message quoteMessage ${isSeller ? 'userMessage' : 'otherMessage'}`}>
        <div className="quoteContent">
          <div className="quoteHeader">
            <div className="quoteHeaderContent">
              <img 
                src={DummyImage} 
                alt={message.quoteData.selectedPosting} 
                className="quoteProductImage"
              />
              <h4>Quote for {message.quoteData.selectedPosting}</h4>
            </div>
          </div>
          <div className="quoteDetails">
            <p className="quoteDescription">{message.quoteData.description}</p>
            <div className="quoteInfo">
              <div className="quoteInfoItem">
                <span className="quoteLabel">Due Date : </span>
                <span className="quoteValue">{message.quoteData.dueDate}</span>
              </div>
              <div className="quoteInfoItem">
                <span className="quoteLabel">Delivery Type : </span>
                <span className="quoteValue">{message.quoteData.deliveryType}</span>
              </div>
              <div className="quoteInfoItem">
                <span className="quoteLabel">Price : </span>
                <span className="quoteValue">${message.quoteData.price}</span>
              </div>
            </div>
            <div className={`quoteStatus ${message.quoteData.status}`}>
              {message.quoteData.status === 'pending' ? (
                !isSeller ? (
                  <div className="quoteActions">
                    <button 
                      className="acceptButton"
                      onClick={() => handleQuoteAction(message.id, 'accepted')}
                    >
                      <Check size={16} /> Accept
                    </button>
                    <button 
                      className="rejectButton"
                      onClick={() => handleQuoteAction(message.id, 'rejected')}
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                ) : (
                  "Waiting for buyer's response..."
                )
              ) : (
                `Quote ${message.quoteData.status}`
              )}
            </div>
          </div>
        </div>
        <span className="messageTime">{message.time}</span>
      </div>
    );
  };



  const renderMessage = (message) => {
     if (message.type === 'quote') {
      return renderQuoteMessage(message);
    }
    
    // Regular message rendering remains the same
    return (
      <div className={`message ${message.sender === 'user' ? 'userMessage' : 'otherMessage'}`}>
        <div className="messageContent">
          <p>{message.text}</p>
          <span className="messageTime">{message.time}</span>
        </div>
      </div>
    );
  };

  // Update the chat header actions to show different options for seller
  const renderChatHeaderActions = () => {
    if (activeTab === 'regularChat') {
      return (
        <div className="chatHeaderActions">
          {isSeller ? (
            <button 
              className="headerActionButton quoteButton"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Send Quote
            </button>
          ) : (
            <div className="quoteOptionsContainer" ref={quoteOptionsRef}>
              <button 
                className="headerActionButton quoteOptionsButton" 
                onClick={() => setShowQuoteOptions(!showQuoteOptions)}
              >
                Quote Options
              </button>
              {showQuoteOptions && (
                <div className="quoteOptionsPopup">
                  <button className="quoteOption">
                    <PlayCircle size={16} /> Ask For Quote
                  </button>
                  <button className="quoteOption">
                    <Edit size={16} /> Ask to Edit Quote
                  </button>
                  <button className="quoteOption decline">
                    <Trash size={16} /> Decline Quote
                  </button>
                </div>
              )}
            </div>
          )}
          {/* <button className="headerActionButton"><Video size={20} /></button> */}
          {/* <button className="headerActionButton"><Phone size={20} /></button> */}
          <button className="headerActionButton"><MoreHorizontal size={20} /></button>
        </div>
      );
    }
    return (
      <div className="chatHeaderActions">
        <p>View Order Details {'>'}</p>
        {/* <button className="headerActionButton"><Video size={20} /></button> */}
        {/* <button className="headerActionButton"><Phone size={20} /></button> */}
        <button className="headerActionButton"><MoreHorizontal size={20} /></button>
      </div>
    );
  };


  const filteredChats = activeTab === 'regularChat' 
    ? chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : orderChats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="chatComponent">
      <div className="chatSidebar">
        <div className="sidebarHeader">
          <div className="chatSearchContainer">
            <Search className="chatSearchIcon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="chatSearchInput"
            />
          </div>
          <div className="chatTabContainer">
            <button
              className={`chatTabButton ${activeTab === 'regularChat' ? 'active' : ''}`}
              onClick={() => handleTabChange('regularChat')}
            >
              Regular Chat
            </button>
            <button
              className={`chatTabButton ${activeTab === 'orderChatRoom' ? 'active' : ''}`}
              onClick={() => handleTabChange('orderChatRoom')}
            >
              Order Chat Room
            </button>
          </div>
        </div>
        
        <div className="chatList">
          {filteredChats.map(chat => (
            <div 
              key={chat.id} 
              className={`chatItem ${selectedChat && selectedChat.id === chat.id ? 'selected' : ''}`} 
              onClick={() => activeTab === 'regularChat' ? handleSelectChat(chat) : handleSelectOrderChat(chat)}
            >
              <div className="chatItemContent">
                {activeTab === 'regularChat' ? (
                  <div className="chatAvatar">{chat.avatar}</div>
                ) : (
                  <img src={DummyImage} alt={chat.title} className="orderChatImage" />
                )}
                <div className="chatInfo">
                  <div className="chatName">{activeTab === 'regularChat' ? chat.name : chat.title}</div>
                  {activeTab === 'orderChatRoom' && 
                    <div className="sellerName">{chat.sellerName}</div>
                  }
                  <div className="chatLastMessage">{chat.lastMessage}</div>
                </div>
                <div className="chatMeta">
                  <div className="chatTime">{chat.time}</div>
                  {activeTab === 'regularChat' && chat.unreadCount && (
                    <div className="unreadCount">{chat.unreadCount}</div>
                  )}
                  {activeTab === 'orderChatRoom' && (
                    <div className={`orderStatus ${chat.status.toLowerCase()}`}>
                      {chat.status}
                    </div>
                  )}
                </div>
              </div>
              <button 
                className="deleteButton" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDeleteChat(chat.id); 
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="chatContent">
        {selectedChat && (
          <>
            <div className="chatHeader">
              <div className="chatHeaderInfo">
                {activeTab === 'regularChat' ? (
                  <>
                    <div className="chatHeaderAvatar">{selectedChat.avatar}</div>
                    <div>
                      <div className="chatHeaderName">{selectedChat.name}</div>
                      <div className="chatHeaderLastSeen">
                        last seen {selectedChat.lastSeen}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={DummyImage} 
                      alt={selectedChat.title} 
                      className="orderChatHeaderImage" 
                    />
                    <div>
                      <div className="chatHeaderName">{selectedChat.title}</div>
                      <div className="chatHeaderSellerName">
                        {selectedChat.sellerName}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {renderChatHeaderActions()}

            </div>
            <div className="chatMessages" ref={messagesContainerRef}>
              {messages.map((message) => renderMessage(message))}
            </div>
            <div className="chatInputContainer">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chatInput"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="sendButton" onClick={handleSendMessage}>
                <Paperclip size={20} />
              </button>
              <button className="sendButton" onClick={handleSendMessage}>
                <Send size={20} />
              </button>

              
            </div>
          </>
        )}
      </div>
      <QuoteModal 
      isOpen={isQuoteModalOpen}
      onClose={() => setIsQuoteModalOpen(false)}
      onSubmit={handleQuoteSubmit}
      products={sellerProducts}
     />
    </div>
  );
};

export default ChatComponent;

const QuoteModal = ({ isOpen, onClose, onSubmit, products }) => {
  const [quoteData, setQuoteData] = useState({
    selectedPosting: null,  
    description: '',
    dueDate: '',
    deliveryType: 'delivery',
    price: '',
    productImage: '',
    selectedPostingTitle: '', // Add a field for the selected product title
  });

  const productOptions = products.map(product => ({
    value: product.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          style={{ width: '20px', height: '20px', marginRight: '8px', borderRadius: '4px' }}
        />
        {`${product.title} - $${product.price}`}
      </div>
    ),
  }));

  const handleProductSelect = (selectedOption) => {
    const selectedProduct = products.find(p => p.id === selectedOption.value);
    if (selectedProduct) {
      setQuoteData({
        ...quoteData,
        selectedPosting: selectedOption,  // Store selected option here
        price: selectedProduct.price.toString(),
        productImage: selectedProduct.imageUrl,
        selectedPostingTitle: selectedProduct.title, // Store the title of the selected product
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(quoteData); // Send the updated quoteData which now includes the title
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h3>Send Quote</h3>
          <button onClick={onClose} className="closeButton">×</button>
        </div>
        <form onSubmit={handleSubmit} className="quoteForm">
          <div className="formGroup">
            <label>Select Product</label>
            <Dropdown
              options={productOptions}
              value={quoteData.selectedPosting}  // Pass the selected option object
              onChange={handleProductSelect}
              placeholder="Select a product"
            />
          </div>
         
          <div className="formGroup">
            <label>Description</label>
            <textarea
              value={quoteData.description}
              onChange={(e) => setQuoteData({...quoteData, description: e.target.value})}
              className="inputField"
              placeholder="Enter quote details"
            />
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label>Due Date</label>
              <input
                type="date"
                value={quoteData.dueDate}
                onChange={(e) => setQuoteData({...quoteData, dueDate: e.target.value})}
                className="inputField"
              />
            </div>
            <div className="formGroup">
              <label>Delivery Type</label>
              <Dropdown
                options={[
                  { value: 'delivery', label: 'Delivery' },
                  { value: 'pickup', label: 'Pickup' },
                ]}
                value={{ value: quoteData.deliveryType, label: quoteData.deliveryType }}
                onChange={(selected) =>
                  setQuoteData({ ...quoteData, deliveryType: selected.value })
                }
                placeholder="Select delivery type"
              />
            </div>
          </div>
          <div className="formGroup">
            <label>Price ($)</label>
            <input
              type="number"
              value={quoteData.price}
              onChange={(e) => setQuoteData({...quoteData, price: e.target.value})}
              className="inputField"
              placeholder="Enter price"
            />
          </div>
          <div className="modalActions">
            <button type="submit" className="primaryBtn">Send Quote</button>
            <button type="button" onClick={onClose} className="primaryBtn3">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
