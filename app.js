import path from 'path';
import { fileURLToPath } from 'url';
import express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { connectDB } from './config/db.js';
import categoryRoute from './routes/categoryRoute.js';
import brandRoute from './routes/brandRoute.js';
import productRoute from './routes/productRoute.js';
import subcategoryRoute from './routes/subcategoryRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import AppError from './utils/appError.js';
import globalHandler from './middlewares/globalHandler.js';

/////////////////////
/////////////////////
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
dotenv.config({ path: './.env' });
const app = express();
const port = 3000;
connectDB(process.env.DB);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads/')));

app.use(morgan('dev'));
app.use('/api/v1/category/', categoryRoute);
app.use('/api/v1/brand/', brandRoute);
app.use('/api/v1/product/', productRoute);
app.use('/api/v1/subcategory/', subcategoryRoute);
app.use('/api/v1/user/', userRoute);
app.use('/api/v1/auth/', authRoute);

/////////////////////
/////////////////////

/* @desc handle non-existing routes, any request that doesn't
 belong to any route will end up here */
app.all('*', (req, res, next) => {
  return next(new AppError("route doesn't exist", 401));
});

// app.use(globalHandler);

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// handle rejection outside of express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
