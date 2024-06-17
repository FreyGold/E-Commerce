import mongoose from 'mongoose';
import User from './userModel';

const favouriteSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
  });

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
