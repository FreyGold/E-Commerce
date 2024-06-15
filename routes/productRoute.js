import express from 'express';
import {
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  addProductValidator,
} from '../utils/validators/productValidator.js';
import {
  getAllProduct,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService.js';
import {
  multiUpload,
  resizeMultiImages,
} from '../middlewares/uploadImagesMiddleware.js';
import { protect, restrictTo } from '../services/authService.js';

const router = express.Router();

router
  .route('/')
  .get(getAllProduct)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    multiUpload,
    resizeMultiImages,
    addProductValidator,
    addProduct,
  );
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .patch(
    protect,
    restrictTo('admin', 'manager'),
    updateProductValidator,
    updateProduct,
  )
  .delete(
    protect,
    restrictTo('admin', 'manager'),
    deleteProductValidator,
    deleteProduct,
  );

export default router;
