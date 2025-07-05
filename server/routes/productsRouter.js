const express = require("express");
const { addProduct, getProducts, getProductsByUser, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCTS BY USER
router.get("/user/:userId", getProductsByUser);

// ADD A NEW PRODUCT
router.post("/add", addProduct);

// DELETE A PRODUCT
router.delete("/:productId", deleteProduct);

module.exports = router;
