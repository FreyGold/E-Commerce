import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatorMiddleware.js';
const getBrandValidator = [
  check('id').isMongoId(24).withMessage('invalid Brand id'),
  validatorMiddleware,
];
const deleteBrandValidator = [
  check('id').isMongoId(24).withMessage('invalid Brand id'),
  validatorMiddleware,
];
const patchBrandValidator = [
  check('id').isMongoId(24).withMessage('invalid Brand id'),
  validatorMiddleware,
];
const createBrandValidator = [
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
  getBrandValidator,
  patchBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
};
