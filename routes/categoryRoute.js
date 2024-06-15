import express from 'express';
import subcategoryRoute from './subcategoryRoute.js';
import {
  getCategoryValidator,
  patchCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} from '../utils/validators/categoryValidator.js';
import {
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';
import {
  resizeSingleImage,
  singleUpload,
} from '../middlewares/uploadImagesMiddleware.js';
import { protect, restrictTo } from '../services/authService.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCategory)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    singleUpload('image'),
    resizeSingleImage('categories'),
    createCategoryValidator,
    addCategory,
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .patch(
    protect,
    restrictTo('admin', 'manager'),
    singleUpload('image'),
    resizeSingleImage('categories'),
    patchCategoryValidator,
    updateCategory,
  )
  .delete(
    protect,
    restrictTo('admin', 'manager'),
    deleteCategoryValidator,
    deleteCategory,
  );

// nested route for subcategories

router.use('/:categoryId/subcategories', subcategoryRoute);

export default router;
