import bcrypt from 'bcrypt';

import userModel from '../models/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';
import AppError from '../utils/appError.js';

//
// add the user upload functionality in the routes

// @desc get all Users
// @route GET api/v1/user
// access Public
const getAllUser = getAll(userModel);

// @desc get specific User
// @route GET api/v1/user/:id
// @access Public
const getUser = getOne(userModel);

// @desc add new User
// @route POST api/v1/user
// @access Private
const addUser = addOne(userModel);
// @desc Update specific User
// @route PATCH api/v1/user/:id
// @access Private
const updateUser = catchAsync(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new AppError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc Update specific User Password
// @route PATCH api/v1/user/:id/updatePassword
// @access Private

const changeUserPassword = catchAsync(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new AppError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc delete specific User
// @route DELETE api/v1/user/:id
// @access Private
const deleteUser = deleteOne(userModel);

export {
  getAllUser,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
};
