import express from 'express';
import {
  getUserValidator,
  patchUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeUserPasswordValidator,
} from '../utils/validators/userValidator.js';
import {
  getAllUser,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} from '../services/userService.js';
import {
  singleUpload,
  resizeSingleImage,
} from '../middlewares/uploadImagesMiddleware.js';
import { protect, restrictTo } from '../services/authService.js';

const router = express.Router();

router.use(protect, restrictTo('admin', 'manager'));

router
  .route('/')
  .get(getUserValidator, getAllUser)
  .post(
    singleUpload('profileImg'),
    resizeSingleImage('users'),
    createUserValidator,
    addUser,
  );
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .patch(
    singleUpload('profileImg'),
    resizeSingleImage('users'),
    patchUserValidator,
    updateUser,
  )
  .delete(deleteUserValidator, deleteUser);
router
  .route('/:id/updatePassword')
  .patch(changeUserPasswordValidator, changeUserPassword);
export default router;
