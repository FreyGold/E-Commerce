import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
  });

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
