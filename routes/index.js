import categoryRoute from './categoryRoute.js';
import brandRoute from './brandRoute.js';
import productRoute from './productRoute.js';
import subcategoryRoute from './subcategoryRoute.js';
import userRoute from './userRoute.js';
import authRoute from './authRoute.js';
import favouriteRoute from './favouriteRoute.js';
import couponRoute from './couponRoute.js';

export default function (app) {
  app.use('/api/v1/category/', categoryRoute);
  app.use('/api/v1/brand/', brandRoute);
  app.use('/api/v1/product/', productRoute);
  app.use('/api/v1/subcategory/', subcategoryRoute);
  app.use('/api/v1/user/', userRoute);
  app.use('/api/v1/auth/', authRoute);
  app.use('/api/v1/wishlist/', favouriteRoute);
  app.use('/api/v1/coupon/', couponRoute);
}
