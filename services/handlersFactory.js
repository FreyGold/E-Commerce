import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import slugify from 'slugify';
import ApiFeatures from '../utils/apiFeatures.js';

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ msg: 'not found' });
    }
    res.status(200).json({
      status: 'success',
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ msg: 'not found' });
    }
    res.status(200).json({
      status: 'success',
      doc,
    });
  });

const addOne = (Model, modelName = '') =>
  catchAsync(async (req, res, next) => {
    let doc = '';
    if (modelName == 'Product') {
      req.body.slug = slugify(req.body.title);
      doc = await Model.create(req.body);
    } else if (modelName == 'Favourite') {
      req.body.userId = req.user._id;
      req.body.slug = slugify(req.body.title);
      doc = await Model.create(req.body);
    } else {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
      doc = await Model.create(req.body);
    }

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = null;
    doc = await Model.findOne({ _id: req.params.id });
    if (!doc) {
      return next(new AppError('not found', 401));
    }
    res.status(200).json({
      status: 'success',
      doc,
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let docs = null;
    let filter = { ...req.query };
    if (req.filterObj) {
      filter = { ...req.filterObj };
    }
    const apiFeatures = new ApiFeatures(req.query, Model.find())
      .filter()
      .search()
      .fields()
      .sort()
      .paginate();
    const { mongooseQuery } = apiFeatures;
    docs = await mongooseQuery;
    const { page } = apiFeatures.paginate;
    res.status(200).json({
      status: 'success',
      page,
      total: docs.length,
      docs,
    });
  });

export { deleteOne, updateOne, addOne, getOne, getAll };
