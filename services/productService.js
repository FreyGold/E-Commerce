import productModel from '../models/productModel.js';
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlersFactory.js';

// @desc get all products
// @route GET api/v1/product
// access Public
const getAllProduct = getAll(productModel);

// @desc get specific product
// @route GET api/v1/product/:id
// @access Public
const getProduct = getOne(productModel);

// @desc add new product
// @route POST api/v1/product
// @access Private
const addProduct = addOne(productModel, 'Product');

// @desc Update specific product
// @route PATCH api/v1/product/:id
// @access Private
const updateProduct = updateOne(productModel);

// @desc delete specific product
// @route DELETE api/v1/product/:id
// @access Private
const deleteProduct = deleteOne(productModel);

export { getAllProduct, addProduct, getProduct, updateProduct, deleteProduct };
