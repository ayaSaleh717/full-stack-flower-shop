import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import AddProduct from './AddProduct'; // Import the new component
import { getProductsByUser, deleteProduct } from '../../api/api'; // Import API functions

// Mock activity data - can be removed if not used
const mockActivity = [
  { id: 1, type: 'sale', description: 'Sale of "Sunny Bouquet"', amount: 45.00, date: '2023-10-26' },
  { id: 2, type: 'listing', description: 'New Listing: "Winter Rose Arrangement"', amount: null, date: '2023-10-25' },
  { id: 3, type: 'cashout', description: 'Withdrawal to bank account', amount: -500.00, date: '2023-10-24' },
  { id: 4, type: 'sale', description: 'Sale of "Tulip Medley"', amount: 35.50, date: '2023-10-22' },
];

const Profile = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux store

  const [activeTab, setActiveTab] = useState('listings');
  const [isModalOpen, setModalOpen] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (user) {
      setActiveTab(user.role === 'Saler' ? 'listings' : 'orders');
    }
  }, [user]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user && user.role === 'Saler' && activeTab === 'listings') {
        try {
          const products = await getProductsByUser(user.id);
          setUserProducts(products);
        } catch (error) {
          console.error('Failed to fetch user products:', error);
        }
      }
    };

    fetchUserProducts();
  }, [user, activeTab]);

  const handleCashout = () => {
    alert(`Cashing out $${user.balance}.`);
    // In a real app, trigger an API call and update state here
  };

  const handleAddProduct = (newProduct) => {
    // Re-fetch products to show the new one
    if (user && user.role === 'Saler') {
      getProductsByUser(user.id)
        .then(setUserProducts)
        .catch(err => console.error('Failed to refresh products:', err));
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setUserProducts(userProducts.filter(p => p.proId !== productId));
        alert('Product deleted successfully.');
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <div className="tab-content">
            <div className="listings-header">
              <h3>Your Listings</h3>
              <button className="add-product-button" onClick={() => setModalOpen(true)}>+ Add New Product</button>
            </div>
            {userProducts.length > 0 ? (
              <ul className="product-list">
                {userProducts.map(product => (
                  <li key={product.proId} className="product-item">
                    <img src={product.img} alt={product.proName} className="product-image" />
                    <div className="product-details">
                      <span className="product-name">{product.proName}</span>
                      <span className="product-price">${product.price}</span>
                    </div>
                    <button onClick={() => handleDeleteProduct(product.proId)} className="delete-button">Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your product listings will appear here.</p>
            )}
          </div>
        );
      case 'orders':
        return <div className="tab-content">Your order history will appear here.</div>;
      case 'activity':
        return (
          <div className="tab-content">
            <ul className="activity-log">
              {mockActivity.map(item => (
                <li key={item.id} className={`activity-item activity-${item.type}`}>
                  <div className="activity-description">{item.description}</div>
                  <div className="activity-details">
                    <span className="activity-date">{item.date}</span>
                    {item.amount !== null && (
                      <span className={`activity-amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
                        {item.amount > 0 ? '+' : ''}${item.amount.toFixed(2)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'settings':
        return <div className="tab-content">Account settings and options will be here.</div>;
      default:
        return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Or a redirect to login
  }

  return (
    <div className="profile-container">
      {isModalOpen && <AddProduct onClose={() => setModalOpen(false)} onAddProduct={handleAddProduct} />}
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.img} alt="User Avatar" className="profile-avatar" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <span className="profile-role">{user.role}</span>
        </div>

        {/* Wallet Section for Sellers */}
        {user.role === 'Saler' && (
          <div className="profile-wallet">
            <div className="balance-info">
              <span className="balance-label">Available Balance</span>
              <span className="balance-amount">${user.balance}</span>
            </div>
            <button className="cashout-button" onClick={handleCashout}>Cash Out</button>
          </div>
        )}

        <div className="profile-tabs">
          {user.role === 'Saler' ? (
            <button
              className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings
            </button>
          ) : (
            <button
              className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
          )}
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        <div className="profile-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;