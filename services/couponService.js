import couponModel from '../models/couponModel.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';

// @desc get all coupouns
// @route GET api/v1/coupon
// access Private Admin
const getAllCoupon = getAll(couponModel);

// @desc get specific coupon
// @route GET api/v1/coupon/:id
// @access Private
const getCoupon = getOne(couponModel);

// @desc add new coupon
// @route POST api/v1/coupon
// @access Private Admin
const addCoupon = addOne(couponModel);

// @desc Update specific coupon
// @route PATCH api/v1/coupon/:id
// @access Private Admin
const updateCoupon = updateOne(couponModel);

// @desc delete specific coupon
// @route DELETE api/v1/coupon/:id
// @access Private Admin
const deleteCoupon = deleteOne(couponModel);

export { getAllCoupon, addCoupon, getCoupon, updateCoupon, deleteCoupon };
