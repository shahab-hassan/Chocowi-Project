import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../Components/utils/EmptyContainer';
const SellerPostings = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('sellerPosts') || '[]');
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('sellerPosts', JSON.stringify(updatedPosts));
  };

  const handleEdit = (id) => {
    navigate(`/createProduct/${id.toString()}`);
  };

  const handleCreate = () => {
    navigate('/createProduct/new');
  };

  // Render empty state if no posts
  if (posts.length === 0) {
    return (
      <EmptyState 
       title="No Product Postings Yet"
       description=" Start selling by creating your first product listing. 
              Showcase your items and reach potential buyers."
       actionLabel=" Create First Posting"
       onActionClick={handleCreate}
       ActionIcon = {FaPlusCircle}
     />
       
    );
  }

  return (
    <div className="sellerPostingsContainer">
      <section className="mainSection">
        <h1 className="pageMainHeading">Postings</h1>
        
        <div className="tableContainer">
          <table className="postingsMainTable">
            <thead>
              <tr className="postingsTableHeader">
                <th>Product</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Orders</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="postingsTableRow">
                  <td>
                    <div className="postingsProductCell">
                      <img
                        src={post.product.image}
                        alt={post.product.name}
                        className="postingsProductImage"
                      />
                      <span className="postingsProductName">{post.product.name}</span>
                    </div>
                  </td>
                  <td className="postingsMetricCell">{post.impressions}</td>
                  <td className="postingsMetricCell">{post.clicks}</td>
                  <td className="postingsMetricCell">{post.orders}</td>
                  <td>
                    <div className="postingsActionButtons">
                      <button
                        onClick={() => handleEdit(post.id)}
                        className="postingsEditButton"
                      >
                        <FaEdit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="postingsWithdrawButton"
                      >
                        <FaTrash size={16} />
                        <span>Withdraw</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={handleCreate}
          className="postingsFloatingActionButton"
        >
          <FaPlusCircle size={24} />
        </button>
      </section>
    </div>
  );
};

export default SellerPostings;