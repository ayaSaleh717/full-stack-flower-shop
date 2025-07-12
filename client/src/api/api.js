import axios from 'axios';

// Define the base URL for your API. Make sure your server is running on this port.
const API_URL = 'http://localhost:3051/api';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: API_URL
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/add', userData);
    return response.data;
  } catch (error) {
    console.log(error)
    // Re-throw a more informative error message
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getProducts = async (category) => {
    const url = category ? `/products/category/${category}` : '/products';
    const response = await api.get(url);
    return response.data;
};

export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products/add', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.details || error.response?.data?.error || 'Failed to add product. Please try again.');
  }
};

export const getProductsByUser = async (userId) => {
  try {
    const response = await api.get(`/products/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user products.');
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product.');
  }
};
