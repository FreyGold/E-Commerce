import express from 'express';
import { protect } from '../services/authService.js';
import {
  getAllFavourite,
  addFavourite,
  deleteFavourite,
} from '../services/favouriteService.js';

const router = express.Router();

router.post('/:id', protect, addFavourite);
router.get('/', protect, getAllFavourite);
router.delete('/:id', protect, deleteFavourite);

export default router;
