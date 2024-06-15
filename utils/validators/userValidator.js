import { body, check } from 'express-validator';
import bcrypt from 'bcrypt';
import validatorMiddleware from '../../middlewares/validatorMiddleware.js';
import User from '../../models/userModel.js';
const getUserValidator = [
  check('id').isMongoId(24).withMessage('invalid User id'),
  validatorMiddleware,
];
const deleteUserValidator = [
  check('id').isMongoId(24).withMessage('invalid User id'),
  validatorMiddleware,
];
const patchUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('please provide a name')
    .isLength({ min: 1 })
    .withMessage('name must exceed 3 letters')
    .isLength({ max: 20 })
    .withMessage('name must not exceed 20 letters'),
  check('password')
    .notEmpty()
    .withMessage('please provide a password')
    .isLength({ min: 8 })
    .withMessage('password must exceed 8 characters'),
  check('email')
    .notEmpty()
    .withMessage('please provide an email')
    .isEmail()
    .withMessage('invalid Email!')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('email already exists!'));
        }
      }),
    ),
  check('phone')
    .optional()
    .isMobilePhone('ar-EG')
    .withMessage('invalid phone number'),
  check('role').optional(),
  // .custom(val => {
  //     if(val != 'user'){
  //         Promise.reject(new Error('only admin can do that'))
  //     }
  //   }),
  validatorMiddleware,
];

const changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  body('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),
  body('password')
    .notEmpty()
    .withMessage('You must enter new password')
    .isLength({ min: 8 })
    .withMessage('password must exceed 8 characters')
    .custom(async (val, { req }) => {
      // 1) Verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error('There is no user for this id');
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new Error('Incorrect current password');
      }

      // 2) Verify password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),
  validatorMiddleware,
];
const createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('please provide a name')
    .isLength({ min: 1 })
    .withMessage('name must exceed 3 letters')
    .isLength({ max: 20 })
    .withMessage('name must not exceed 20 letters'),
  check('password')
    .notEmpty()
    .withMessage('please provide a password')
    .isLength({ min: 8 })
    .withMessage('password must exceed 8 characters')
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error("password confirmation doesn't match!");
      }
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('please provide an email')
    .isEmail()
    .withMessage('invalid Email!')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('email already exists!'));
        }
      }),
    ),
  check('phone')
    .optional()
    .isMobilePhone('ar-EG')
    .withMessage('invalid phone number'),
  check('role').optional(),
  // .custom(val => {
  //     if(val != 'user'){
  //         Promise.reject(new Error('only admin can do that'))
  //     }
  //   }),
  validatorMiddleware,
];
export {
  changeUserPasswordValidator,
  getUserValidator,
  patchUserValidator,
  deleteUserValidator,
  createUserValidator,
};
