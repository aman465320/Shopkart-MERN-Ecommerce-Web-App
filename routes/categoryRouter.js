const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  createCategory,
  updateCategory,
  getAllCategories,
  singleCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const router = express.Router();

// category routes
router.post("/create-category", isAuthenticated, isAdmin, createCategory);
router.put("/update-category/:id", isAuthenticated, isAdmin, updateCategory);
router.get("/all-categories", getAllCategories);
router.get("/particular-category/:id", singleCategory);
router.delete("/delete-category/:id", isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
