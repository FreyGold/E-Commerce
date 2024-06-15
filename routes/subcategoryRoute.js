import express from 'express';
import {
  addSubcategoryValidator,
  getSubcategoryValidator,
  deleteSubcategoryValidator,
  patchSubcategoryValidator,
} from '../utils/validators/subcategoryValidator.js';
import {
  addSubcategory,
  getSubcategory,
  getAllSubcategories,
  deleteSubcategory,
  updateSubcategory,
  assignCategoryIdToBody,
} from '../services/subcategoryService.js';
import { protect, restrictTo } from '../services/authService.js';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllSubcategories)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    assignCategoryIdToBody,
    addSubcategoryValidator,
    addSubcategory,
  );
router
  .route('/:id')
  .get(getSubcategoryValidator, getSubcategory)
  .post(
    protect,
    restrictTo('admin', 'manager'),
    addSubcategoryValidator,
    addSubcategory,
  )
  .patch(
    protect,
    restrictTo('admin', 'manager'),
    patchSubcategoryValidator,
    updateSubcategory,
  )
  .delete(
    protect,
    restrictTo('admin', 'manager'),
    deleteSubcategoryValidator,
    deleteSubcategory,
  );

export default router;
