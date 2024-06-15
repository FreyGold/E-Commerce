import fs from 'fs';
import 'colors';
import dotenv from 'dotenv';
import Product from '../../models/productModel.js';
import { connectDB } from '../../config/db.js';

dotenv.config({ path: '../../.env' });

// connect to DB
connectDB(process.env.DB);

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -insert | -delete
if (process.argv[2] === '-insert') {
  insertData();
} else if (process.argv[2] === '-delete') {
  destroyData();
}
