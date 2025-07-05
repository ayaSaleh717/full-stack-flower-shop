import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import { getCategories, addProduct } from '../../api/api';
import { useSelector } from 'react-redux';

const AddProduct = ({ onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    farm: '',
    price: '',
    category: '',
    image: null,
    imageUrl: '',
    qunty:null
  });
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'url'
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.auth); // Get user from Redux store

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // console.log(data);
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(product.category)
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0], imageUrl: '' });
  };

  const handleImageUrlChange = (e) => {
    setProduct({ ...product, imageUrl: e.target.value, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user.id; // Retrieve userId from local storage
    if (!userId) {
      alert('You must be logged in to add a product.');
      return;
    }

    const finalProduct = {
      ...product,
      userId: user.id,
      imageUrl: imageSource === 'url' ? product.imageUrl : '', // Only send imageUrl if source is 'url'
    };

    // Remove the 'image' property if it's a file object, as we are sending imageUrl
    delete finalProduct.img;

    try {
      await addProduct(finalProduct);
      alert('New product added successfully!');
      onAddProduct(finalProduct); // Optionally update the UI
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      alert(error.message || 'Failed to add product.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="farm">Farm</label>
            <input type="text" id="farm" name="farm" value={product.farm} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={product.category} onChange={handleChange} required>
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.catId} value={cat.catId}>{cat.catName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="qunty">Quantity</label>
            <input type="number" id="qunty" name="qunty" value={product.qunty} onChange={handleChange} required />
          </div>

          <div className="form-group image-options">
            <label>Product Image</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="imageSource"
                  value="upload"
                  checked={imageSource === 'upload'}
                  onChange={() => setImageSource('upload')}
                />
                Upload File
              </label>
              <label>
                <input
                  type="radio"
                  name="imageSource"
                  value="url"
                  checked={imageSource === 'url'}
                  onChange={() => setImageSource('url')}
                />
                Use URL
              </label>
            </div>
          </div>

          {imageSource === 'upload' ? (
            <div className="form-group">
              <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" required={!product.imageUrl} />
            </div>
          ) : (
            <div className="form-group">
              <input type="url" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleImageUrlChange} placeholder="https://example.com/image.jpg" required={!product.image} />
            </div>
          )}

          <div className="form-buttons">
            <button type="submit" className="submit-button">Add Product</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
