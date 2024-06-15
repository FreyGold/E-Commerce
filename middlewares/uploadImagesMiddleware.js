import multer from 'multer';
import sharp from 'sharp';
import { catchAsync } from '../utils/catchAsync.js';

// local storage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/categories');
//   },
//   filename: function (req, file, cb) {
//     const type = file.mimetype.split('/')[1];
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + `.${type}`);
//   },
// });

// memory storage
const storage = multer.memoryStorage();
const multerFilter = function (req, file, cb) {
  const type = file.mimetype.split('/')[0];
  if (type == 'image') {
    cb(null, true);
  } else {
    cb(new AppError('only images are allowed!', 403), false);
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });

const singleUpload = (image) => upload.single(image);
const multiUpload = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

const resizeSingleImage = (modelName) =>
  catchAsync(async (req, res, next) => {
    if (req.file) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName = modelName + '-' + uniqueSuffix + '.jpeg';
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/${modelName}/${fileName}`);
      req.body.image = fileName;
    }
    next();
  });

const resizeMultiImages = catchAsync(async (req, res, next) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  if (req.files.imageCover) {
    const fileName = req.files.fieldname + '-' + uniqueSuffix + '.jpeg';
    await sharp(req.files.imageCover[0].buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${fileName}`);
    req.body.imageCover = fileName;
  }
  if (req.files.images) {
    req.body.images = [];
    Promise.all(
      req.files.images.forEach(async (el, index) => {
        const fileName =
          el.fieldname + '-' + uniqueSuffix + `${index + 1}` + '.jpeg';
        await sharp(el.buffer)
          .resize(600, 600)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${fileName}`);
        req.body.images.push(fileName);
      }),
    );
  }
  next();
});
export { singleUpload, multiUpload, resizeSingleImage, resizeMultiImages };
