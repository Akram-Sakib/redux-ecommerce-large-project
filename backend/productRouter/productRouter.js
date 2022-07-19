const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createdProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  creatingProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../productController/productController");

const router = express.Router();
router.route("/products").get(getAllProducts);
///get all products
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
//create-product
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createdProduct);
//update-product-route-and-delete
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, creatingProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
