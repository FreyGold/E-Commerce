import Favourite from '../models/favouriteModel.js';
import favouriteModel from '../models/favouriteModel.js';
import User from '../models/userModel.js';
import {
  addOne,
  deleteOne,
  getAll,
} from './handlersFactory.js';


// @desc get all products from the wishlist for current user
// @route Get api/v1/wishlist/
// @access Private
const getAllFavourite = catchAsync(async (req, res, next) => {
    const wishlist = User.findById(req.user._id).select(wishlist).populate({
      path: 'favourite',
    });;

});

// @desc add a product to the wishlist
// @route Post api/v1/wishlist/:id
// @access Private
const addFavourite = catchAsync(async (req, res, next) => {
  const favourite = Favourite.create(body);
  let user = User.findById(req.user._id);
  user.wishlist.append(favourite._id);
  user.save();

  res.status(201).json({
      status: 'success',
    });
})

// @desc delete a product from the wishlist
// @route Delete api/v1/wishlist/remove/:id
// @access Private
const deleteFavourite = deleteOne(favouriteModel);

export {addProduct, deleteProduct, getAllProduct}