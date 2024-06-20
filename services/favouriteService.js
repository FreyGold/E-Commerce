import { catchAsync } from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import { addOne, deleteOne, getAll } from './handlersFactory.js';

// @desc get all products from the wishlist for current user
// @route Get api/v1/wishlist/
// @access Private
const getAllFavourite = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'wishlist',
  });

  res.status(201).json({
    status: 'success',
    wishlist: user.wishlist,
  });
});

// @desc add a product to the wishlist
// @route Post api/v1/wishlist/:id
// @access Private
const addFavourite = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  user.wishlist.push(req.params.id);
  user.save();
  res.status(201).json({
    status: 'success',
  });
});

// @desc delete a product from the wishlist
// @route Delete api/v1/wishlist/remove/:id
// @access Private
const deleteFavourite = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.id },
    },
    { new: true }
  );
  res.status(201).json({
    status: 'success',
  });
});

export { addFavourite, deleteFavourite, getAllFavourite };
