import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a category must have a name!'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'too short name'],
      maxlength: [20, 'too long name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
