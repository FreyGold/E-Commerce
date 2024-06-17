import express from 'express';
import {
    protect,
  } from '../services/authService.js';
import {
    getAllFavourite,
    addFavourite,
    deleteFavourite,
} from '../services/favouriteService.js'

const router = express.Router();

router.post(protect, '/:id', addFavourite);
router.get(protect, '/', getAllFavourite);
router.delete(protect, '/remove/:id', deleteFavourite)

export default router