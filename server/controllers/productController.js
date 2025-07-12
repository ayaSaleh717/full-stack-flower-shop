const db = require("./../config/db");

// 📋 get all users
const getProducts = async (req, res) => {
  try {
      const [rows] = await db.query('SELECT * FROM product');
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await db.query('SELECT * FROM product WHERE catId = ?', [categoryId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const addProduct = async (req, res) => {
  try {
    const {
      name,
      farm,
      price,
      category,
      qunty,
      imageUrl,
      userId // Assuming userId is sent in the request body
    } = req.body;

    if (!name || !farm || !price || !category || !qunty || !userId) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // The category ID is sent directly from the frontend, no need to look it up.
    const categoryId = category;

    const data = await db.query(
      "INSERT INTO product (proName, img , price, catId,userId,qunty,farm) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, imageUrl, price, categoryId, userId, qunty, farm]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error in creating product",
      });
    }

    res.status(201).send({
      success: true,
      message: "Product created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Cannot create product",
      details: err.message,
    });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query('SELECT * FROM product WHERE userId = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await db.query('DELETE FROM product WHERE proId = ?', [productId]);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

module.exports = { getProducts, addProduct, getProductsByUser, deleteProduct, getProductsByCategory };
