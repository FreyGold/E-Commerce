import brandModel from '../models/brandModel.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';

// @desc get all brands
// @route GET api/v1/brand
// access Public
const getAllBrand = getAll(brandModel);

// @desc get specific brand
// @route GET api/v1/brand/:id
// @access Public
const getBrand = getOne(brandModel);

// @desc add new brand
// @route POST api/v1/brand
// @access Private
const addBrand = addOne(brandModel);

// @desc Update specific brand
// @route PATCH api/v1/brand/:id
// @access Private
const updateBrand = updateOne(brandModel);

// @desc delete specific brand
// @route DELETE api/v1/brand/:id
// @access Private
const deleteBrand = deleteOne(brandModel);

export { getAllBrand, addBrand, getBrand, updateBrand, deleteBrand };
