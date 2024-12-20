import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Filter, X } from 'lucide-react';
import PaymentMethods from '../../Components/seller/PaymentMethods'

const data = [
  { name: 'Jan', sales: 10000 },
  { name: 'Feb', sales: 35000 },
  { name: 'Mar', sales: 25000 },
  { name: 'Apr', sales: 75000 },
  { name: 'May', sales: 35000 },
  { name: 'Jun', sales: 40000 },
  { name: 'Jul', sales: 20000 },
  { name: 'Aug', sales: 35000 },
  { name: 'Sep', sales: 55000 },
  { name: 'Oct', sales: 45000 },
  { name: 'Nov', sales: 40000 },
  { name: 'Dec', sales: 35000 },
];

const salesListData = [
  { 
    activity: 'Purchase',
    orderId: '00001',
    date: '2024-01-12',
    buyer: 'John Doe',
    productName: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations',
    amount: '$350'
  },
  { 
    activity: 'Purchase',
    orderId: '00002',
    date: '2024-01-12',
    buyer: 'Jane Smith',
    productName: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations',
    amount: '$450'
  },
  { 
    activity: 'Refund',
    orderId: '00003',
    date: '2024-01-12',
    buyer: 'Mike Johnson',
    productName: '-',
    amount: '$250'
  },
  { 
    activity: 'Purchase',
    orderId: '00004',
    date: '2024-01-12',
    buyer: 'Sarah Williams',
    productName: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations',
    amount: '$550'
  },
  { 
    activity: 'Purchase',
    orderId: '00005',
    date: '2024-01-12',
    buyer: 'Robert Brown',
    productName: 'Decadent 3-Tier Red Velvet Cake with Cream Cheese Frosting and Elegant Decorations',
    amount: '$350'
  },
];

const dateRangeFilters = {
  'all': { label: 'All Time', days: null },
  'week': { label: 'This Week', days: 7 },
  'month': { label: 'Last Month', days: 30 },
  'sixMonths': { label: 'Last 6 Months', days: 180 },
  'year': { label: 'This Year', days: 365 }
};

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateFilter, setDateFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');

  const stats = [
    { 
      title: 'Available Balance', 
      amount: '$0.00',
      hasWithdraw: true
    },
    { 
      title: 'Total Earnings', 
      amount: '$0.00'
    },
    { 
      title: 'Paid Balance', 
      amount: '$0.00'
    },
    { 
      title: 'Requested for Withdrawal', 
      amount: '$0.00'
    },
    { 
      title: 'Products Sold', 
      amount: '00',
      isCount: true
    }
  ];

  const filterSalesByDate = (sales) => {
    if (dateFilter === 'all') return sales;

    const today = new Date();
    const filterDays = dateRangeFilters[dateFilter].days;
    const cutoffDate = new Date(today.setDate(today.getDate() - filterDays));

    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= cutoffDate;
    });
  };

  const filteredSales = useMemo(() => {
    let filtered = filterSalesByDate(salesListData);

    if (activityFilter !== 'all') {
      filtered = filtered.filter(sale => sale.activity === activityFilter);
    }

    return filtered;
  }, [dateFilter, activityFilter]);

  const resetFilters = () => {
    setDateFilter('all');
    setActivityFilter('all');
  };

  return (
    <div className="dashboardContainer">
      <section className="mainSection">
        <h1 className="pageMainHeading">Analytics</h1>
        <PaymentMethods/>
        
        <div className="statsContainer">
          {stats.map((stat, index) => (
            <div key={index} className="statCard">
              <div className="statTitle">{stat.title}</div>
              <div className="statAmount">{stat.amount}</div>
              {stat.hasWithdraw && (
                <button className="primaryBtn">
                  Withdraw
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="chartContainer">
          <h2 className="chartTitle">Sales Chart</h2>
          <div className="chartWrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `${value/1000}k`}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF6B8A" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#FF6B8A" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="salesListContainer">
          <h2 className="salesListTitle">Sales List</h2>
          <div className="salesListFilterContainer">
            <div className="filterWrapper">
              <Filter size={20} />
              <span className="filterLabel">Filter By</span>
              
              <select 
                className="filterSelect"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                {Object.entries(dateRangeFilters).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>

              <select 
                className="filterSelect"
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
              >
                <option value="all">All Activities</option>
                <option value="Purchase">Purchase</option>
                <option value="Refund">Refund</option>
              </select>

        
            </div>
            
            <button className="resetFilterButton" onClick={resetFilters}>
              <X size={16} />
              Reset Filter
            </button>
          </div>
          
          <div className="salesListTableContainer">
            <table className="salesListTable">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Buyer</th>
                  <th>Product Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.activity}</td>
                    <td>{sale.orderId}</td>
                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                    <td>{sale.buyer}</td>
                    <td>{sale.productName.length > 50 ? sale.productName.substring(0, 50) + '.....' : sale.productName}</td>
                    <td>{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;