import { catchAsync } from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';
import { updateOne, deleteOne, getAll } from './handlersFactory.js';
import { populate } from 'dotenv';

const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.Productid };
  req.filterObj = filterObject;
  next();
};

// @desc gets review by id
// @route Get api/v1/review/:id
// @access Private
const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'user',
    populate: {
      path: 'product',
    },
  });

  res.status(201).json({
    status: 'success',
    review,
  });
});

// @desc add a product to the wishlist
// @route Post api/v1/review/:productId
// @access Private

const addReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  if (!req.body.product && req.params.productId) {
    req.body.product = req.params.productId;
  }
  req.user;
  res.status(201).json({
    status: 'success',
  });
});

// @desc delete a review by id
// @route Delete api/v1/review/:id
// @access Private
const deleteReview = deleteOne(Review);

// @desc get a product reviews by id
// @route Delete api/v1/review/product/:productId
// @access Private
const getProductAllReviews = getAll(Review);

// @desc delete a review by id
// @route Delete api/v1/review/remove/:id
// @access Private
const updateReview = updateOne(Review);

export {
  getReview,
  addReview,
  deleteReview,
  getProductAllReviews,
  createFilterObj,
  updateReview,
};
