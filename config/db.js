import mongoose from 'mongoose';

const connectDB = (uri) =>
  mongoose.connect(uri).then(() => {
    console.log('connected to DB succesfully');
  });

export { connectDB };
