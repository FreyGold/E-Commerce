import express from 'express';

// import {
//   getUserValidator,
//   patchUserValidator,
//   deleteUserValidator,
//   createUserValidator,
//   changeUserPasswordValidator,
// } from '../utils/validators/userValidator.js';

import {
  protect,
  signIn,
  signUp,
  resetPassword,
  sendResetToken,
  getCurrentUser,
  changeUserPassword,
  updateUser,
  deleteUser,
} from '../services/authService.js';

const router = express.Router();

router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);
router.route('/sendResetCode').post(sendResetToken);
router.route('/resetPassword/:resetCode').post(resetPassword);
router.route('/resetPassword/').post(resetPassword);
router.route('/getCurrentUser/').get(protect, getCurrentUser);
router.route('/updateCurrentUser').patch(protect, updateUser);
router.route('/updateCurrentUserPassword').patch(protect, changeUserPassword);
router.route('/deactivateCurrentUser').delete(protect, deleteUser);

export default router;
