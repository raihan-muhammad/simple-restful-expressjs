const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = productController;

router.route('/').post(createProduct).get(getAllProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
