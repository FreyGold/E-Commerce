import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
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
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'subcategory must belong to a parent category'],
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

subcategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;
