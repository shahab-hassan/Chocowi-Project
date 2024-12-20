import EmptyState from '../../Components/utils/EmptyContainer'; 
import { FaRedo } from 'react-icons/fa';
import { useState } from 'react';
import DummyImage from "../../images/pngs/articleImage2.png"

const tradeLeadsData = [
  {
    id: 1,
    name: 'Raheel Ahmed',
    location: 'Islamabad, Pakistan',
    product: 'Chocolate Pancakes',
    category: 'Pancakes',
    subCategory: 'XYZ',
    preferredArea: 'Margalla Town Phase 2, Islamabad, Pakistan',
    pickupDelivery: 'Pickup',
    range: '29Km',
    requirements:
      'To get a quote for a chocolate cake, please provide the cake size, type (e.g., classic or dark chocolate), and any specific frosting or filling preferences. Include details about decoration style, whether you need delivery or pickup, and any dietary restrictions. Specify your budget range, the occasion for the cake, and the required date and time. If you have any custom requests or special considerations, please mention those as well.',
    budget: '$90',
    quantity: '70',
    allergy: 'Lactose intolerance',
    neededDate: '12/1/2024',
    neededTime: '19:00 GMT',
    expiryDate: '15/1/2024',
  },
  // Additional trade leads here
];

const SellerTradeLead = () => {
  const [tradeLeads, setTradeLeads] = useState(tradeLeadsData);
  const [selectedLead, setSelectedLead] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');

  const handleQuoteClick = (lead) => {
    setSelectedLead(lead);
    setQuoteMessage(''); // Reset the message input for each new quote
  };

  const handleSendQuote = () => {
    if (quoteAmount && quoteMessage) {
      setTradeLeads(tradeLeads.filter((lead) => lead.id !== selectedLead.id));
      setSelectedLead(null); // Close the popup
      setQuoteAmount(''); // Reset the amount
      setQuoteMessage(''); // Reset the message
    }
  };

  const handleRefreshLeads = () => {
    // This could be replaced with an actual API call to fetch new leads
    console.log("Refreshing leads...");
  };

  // Render Empty State if no trade leads
  if (tradeLeads.length === 0) {
    return (
      <div className="sellerTradeContainer">
        <section className="mainSection">
          <EmptyState 
            title="No Trade Leads Available"
            description="Currently, there are no active trade leads. Check back later or refresh to see new opportunities."
            actionLabel="Refresh Leads"
            onActionClick={handleRefreshLeads}
            ActionIcon = {FaRedo}
          />
        </section>
      </div>
    );
  }
  return (
    <div className="sellerTradeContainer">
      <section className="mainSection">
        <h1 className="pageMainHeading">TradeLeads</h1>

        {tradeLeads.map((lead) => (
          <div key={lead.id} className="sellerTradeCard">
            <div className="sellerCardHeader">
              <div className="sellerProfileInfo">
                <img src={DummyImage} alt={lead.name} className="sellerProfileImage" />
                <div className="sellerProfileText">
                  <h2 className="sellerProfileName">{lead.name}</h2>
                  <p className="sellerProfileLocation">{lead.location}</p>
                </div>
              </div>
              <button className="sellerQuoteButton" onClick={() => handleQuoteClick(lead)}>
                Quote
              </button>
            </div>

            <div className="sellerCardContent">
              <div className="sellerTradeRow">
                <div className="sellerColumn">
                  <p className="sellerLabel">Product</p>
                  <p className="sellerValue">{lead.product}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Category</p>
                  <p className="sellerValue">{lead.category}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Sub Category</p>
                  <p className="sellerValue">{lead.subCategory}</p>
                </div>
              </div>

              <div className="sellerTradeRow">
                <div className="sellerColumn">
                  <p className="sellerLabel">Preferred Area</p>
                  <p className="sellerValue">{lead.preferredArea}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Pickup/delivery</p>
                  <p className="sellerValue">{lead.pickupDelivery}</p>
                </div>
                <div className="sellerColumn sellerInRange">
                  <p className="sellerRangeCircle">In range</p>
                  <p className="sellerDistance">{lead.range}</p>
                </div>
              </div>

              <div className="sellerRequirements">
                <p className="sellerLabel">Requirements</p>
                <p className="sellerValue">{lead.requirements}</p>
              </div>

              <div className="sellerTradeRow">
                <div className="sellerColumn">
                  <p className="sellerLabel">Targeted Budget</p>
                  <p className="sellerValue">{lead.budget}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Quantity</p>
                  <p className="sellerValue">{lead.quantity}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Allergy</p>
                  <p className="sellerValue">{lead.allergy}</p>
                </div>
              </div>

              <div className="sellerTradeRow">
                <div className="sellerColumn">
                  <p className="sellerLabel">Date (on which the product is needed)</p>
                  <p className="sellerValue">{lead.neededDate}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Time (on which the product is needed)</p>
                  <p className="sellerValue">{lead.neededTime}</p>
                </div>
                <div className="sellerColumn">
                  <p className="sellerLabel">Expiry Date</p>
                  <p className="sellerValue">{lead.expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {selectedLead && (
          <div className="modalOverlay">
            <div className="modalContent">
              <h2 className="modalTitle">Send a Quote</h2>
              <textarea
                placeholder="Write your custom message here..."
                value={quoteMessage}
                onChange={(e) => setQuoteMessage(e.target.value)}
                className="inputField"
              />
              <div className="inputSection">
                <label className="label" htmlFor="quoteAmount">Your amount</label>
                <input
                  id="quoteAmount"
                  type="number"
                  placeholder="270$"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="inputField"
                />
              </div>
              <div className="modalActions">
                <button className="primaryBtn" onClick={handleSendQuote}>Send offer to Customer</button>
                <button className="primaryBtn3" onClick={() => setSelectedLead(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerTradeLead;
