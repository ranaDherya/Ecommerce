const express = require('express');
const {createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeUser } = require('../middleware/auth.js');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeUser("admin"), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeUser("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeUser("admin"), deleteProduct)
    .get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;