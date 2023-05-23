const express = require("express");
const bcrypt = require("bcrypt");
// imprting controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateProfile,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/userControllers");

// importing middlewares
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

// set up router
const router = express.Router();
registerUser;

// user routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forget-password", resetPassword);

// protected routes
// user dashboard
router.get("/user-dashboard", isAuthenticated, (req, res) => {
  // accessing dashboard on the basis of ok
  res.status(200).send({ ok: true });
});

// admin dashboard
router.get("/admin-dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// profile update
router.put("/update-profile", isAuthenticated, updateProfile);

// user orderes
router.get("/my-orders", isAuthenticated, getUserOrders);

// admin orders
router.get("/admin-orders", isAuthenticated, isAdmin, getAllOrders);

// update order status
router.put("/update-order/:id", isAuthenticated, isAdmin, updateOrderStatus);
module.exports = router;
