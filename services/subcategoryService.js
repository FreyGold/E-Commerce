import { catchAsync } from '../utils/catchAsync.js';
import subcategoryModel from '../models/subcategoryModel.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';

// @desc assign category id to the body of the request
// @route ANY api/v1/:categoryId/subcategories
// @access Hybrid

const assignCategoryIdToBody = catchAsync(async (req, res, next) => {
  //// for nested route
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
});

// @desc get all subcategories
// @route GET api/v1/subcategory
// access Public
const getAllSubcategories = getAll(subcategoryModel);

// @desc get specific subcategory
// @route GET api/v1/subcategory/:id
// @access Public
const getSubcategory = getOne(subcategoryModel);

// @desc add new category
// @route POST api/v1/subcategory
// @access Private
const addSubcategory = addOne(subcategoryModel);

// @desc Update specific subcategory
// @route PATCH api/v1/subcategory/:id
// @access Private
const updateSubcategory = updateOne(subcategoryModel);

// @desc delete specific subcategory
// @route DELETE api/v1/subcategory/:id
// @access Private
const deleteSubcategory = deleteOne(subcategoryModel);

export {
  addSubcategory,
  getSubcategory,
  getAllSubcategories,
  deleteSubcategory,
  updateSubcategory,
  assignCategoryIdToBody,
};
