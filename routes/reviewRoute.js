import express from 'express';
import {
  getReview,
  createFilterObj,
  getProductAllReviews,
  updateReview,
  deleteReview,
  addReview,
} from '../services/reviewService.js';
import { protect } from '../services/authService.js';

const router = express.Router();

router
  .route('/review/:id')
  .get(getReview)
  .post(addReview)
  .delete(protect, deleteReview)
  .update(protect, updateReview);

router
  .route('/review/:id')
  .get(getReview)
  .delete(protect, deleteReview)
  .update(protect, updateReview);

export default router;
