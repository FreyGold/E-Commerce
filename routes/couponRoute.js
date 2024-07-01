import express from 'express';

import {
  getCoupon,
  getAllCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
} from '../services/couponService.js';

import { restrictTo, protect } from '../services/authService.js';

const router = express.Router();

router.use(protect, restrictTo('admin', 'manager'));
router.route('/').get(getAllCoupon).post(addCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

export default router;
