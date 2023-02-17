const express = require("express");
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController.js");
const router = express.Router();

const { isAuthenticatedUser, authorizeUser } = require('../middleware/auth.js');

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeUser("admin"), getAllOrders);
router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeUser("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeUser("admin"), deleteOrder);

module.exports = router;