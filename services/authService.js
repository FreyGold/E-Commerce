import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import userModel from '../models/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import {
  addOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
} from './handlersFactory.js';
import signToken from '../utils/signToken.js';
import AppError from '../utils/appError.js';

// @desc Sign Up and provide a JWT token
// @route Post api/v1/auth/signUp
// @access Private

const signUp = catchAsync(async (req, res, next) => {
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //sign token
  const token = signToken(user._id);
  res.status(201).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
});

// @desc Sign In and provide a JWT token
// @route Post api/v1/auth/signIn
// @access Private

const signIn = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!user || !correctPassword) {
    return res.status(400).json({
      status: 'fail',
      msg: 'invalid email or password!',
    });
  }
  const token = signToken(user._id);

  delete user.password;
  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
});

// @desc protect the route using JWT token
// @route used on any route requiring authentication
// @access Private

const protect = catchAsync(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError(
        'You are not login, Please login to get access this route',
        401,
      ),
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user exists
  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError(
        'The user that belong to this token does no longer exist',
        401,
      ),
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new AppError(
          'User recently changed his password. please login again..',
          401,
        ),
      );
    }
  }
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('you are not priviliged!', 403));
    }
    next();
  });

// @desc first step of password resetting, sending the reset code , takes (email)
// @route POST api/v1/auth/sendResetCode
// @access Private

const sendResetToken = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`There is no user with that email ${req.body.email}`, 404),
    );
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');
  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  res.status(201).json({
    status: 'success',
    data: {
      resetCode: resetCode,
    },
  });
});

// @desc last step of password resetting after confirming the reset code, takes (resetCode in params or in body, newPassword in body)
// @route POST api/v1/auth/resetPassword/:resetCode
// @access Private

const resetPassword = catchAsync(async (req, res, next) => {
  let passwordResetCode;
  if (req.params.resetCode) {
    passwordResetCode = crypto
      .createHash('sha256')
      .update(req.params.resetCode)
      .digest('hex');
  } else if (req.body.resetCode) {
    passwordResetCode = crypto
      .createHash('sha256')
      .update(req.body.resetCode)
      .digest('hex');
  }
  const user = await userModel.findOne({
    passwordResetCode: passwordResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('invalid reset token!'));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = null;
  user.passwordResetExpires = null;
  user.passwordResetVerified = null;

  await user.save();

  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});

const getCurrentUser = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: {
      email: req.user.email,
      name: req.user.name,
      phone: req.user.name,
    },
  });
});

const changeUserPassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    },
  );

  if (!user) {
    return next(new AppError(`No document for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
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

  if (!user) {
    return next(new AppError(`No user for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: user });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = userModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(200).json({ status: 'success' });
});
export {
  protect,
  deleteUser,
  restrictTo,
  signIn,
  signUp,
  sendResetToken,
  resetPassword,
  getCurrentUser,
  changeUserPassword,
  updateUser,
};
