import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware.js';

const addSubcategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('please provide a name')
    .isLength({ min: 3 })
    .withMessage('name must exceed 3 letters')
    .isLength({ max: 20 })
    .withMessage('name must not exceed 20 letters'),
  check('category')
    .isMongoId()
    .withMessage('please provide a valid parent category id'),
  validatorMiddleware,
];
const getSubcategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
const deleteSubcategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
const patchSubcategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
export {
  addSubcategoryValidator,
  getSubcategoryValidator,
  deleteSubcategoryValidator,
  patchSubcategoryValidator,
};
