import express from 'express';
import {
  getBrandValidator,
  patchBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} from '../utils/validators/brandValidator.js';
import {
  getAllBrand,
  addBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} from '../services/brandService.js';
import {
  singleUpload,
  resizeSingleImage,
} from '../middlewares/uploadImagesMiddleware.js';
import { protect, restrictTo } from '../services/authService.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBrand)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    singleUpload('image'),
    resizeSingleImage('brands'),
    createBrandValidator,
    addBrand,
  );
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .patch(
    protect,
    restrictTo('admin', 'manager'),
    singleUpload('image'),
    resizeSingleImage('brands'),
    patchBrandValidator,
    updateBrand,
  )
  .delete(
    protect,
    restrictTo('admin', 'manager'),
    deleteBrandValidator,
    deleteBrand,
  );

export default router;
