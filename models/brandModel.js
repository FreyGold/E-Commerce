import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short for a Brand name'],
      maxlength: [32, 'Too long for a Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
