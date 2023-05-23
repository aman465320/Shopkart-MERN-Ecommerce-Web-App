const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  createProduct,
  getAllProducts,
  singleProduct,
  getProductImage,
  deleteProduct,
  updateProduct,
  filterProduct,
  searchProduct,
  similarProducts,
  categoryProducts,
  getBraintreeToken,
  makePayment,
  addProductReview,
  getProductReviews,
} = require("../controllers/productControllers");

const router = express.Router();
const formidable = require("express-formidable");

router.post(
  "/create-product",
  isAuthenticated,
  isAdmin,
  formidable(),
  createProduct
);

router.get("/all-products", getAllProducts);

router.get("/particular-product/:id", singleProduct);

router.get("/product-image/:id", getProductImage);

router.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct);

router.put(
  "/update-product/:id",
  isAuthenticated,
  isAdmin,
  formidable(),
  updateProduct
);

router.post("/filter-product", filterProduct);

router.get("/search-product/:keyword", searchProduct);

router.get("/similar-products/:pid/:catid", similarProducts);

router.get("/category-products/:id", categoryProducts);

router.get("/get-reviews/:pid", getProductReviews);

router.post("/add-review/:pid", isAuthenticated, addProductReview);

// payment routes
router.get("/braintree/token", getBraintreeToken);

router.post("/braintree/payment", isAuthenticated, makePayment);

module.exports = router;
