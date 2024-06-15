import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware.js';
const getCategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
const deleteCategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
const patchCategoryValidator = [
  check('id').isMongoId(24).withMessage('invalid category id'),
  validatorMiddleware,
];
const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('please provide a name')
    .isLength({ min: 3 })
    .withMessage('name must exceed 3 letters')
    .isLength({ max: 20 })
    .withMessage('name must not exceed 20 letters'),
  validatorMiddleware,
];
export {
  getCategoryValidator,
  patchCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
};
