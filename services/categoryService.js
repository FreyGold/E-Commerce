import categoryModel from '../models/categoryModel.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';

//
// @desc get all categories
// @route GET api/v1/category
// access Public
const getAllCategory = getAll(categoryModel);

// @desc get specific category
// @route GET api/v1/category/:id
// @access Public
const getCategory = getOne(categoryModel);

// @desc add new category
// @route POST api/v1/category
// @access Private
const addCategory = addOne(categoryModel);

// @desc Update specific category
// @route PATCH api/v1/category/:id
// @access Private
const updateCategory = updateOne(categoryModel);

// @desc delete specific category
// @route DELETE api/v1/category/:id
// @access Private
const deleteCategory = deleteOne(categoryModel);

export {
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
