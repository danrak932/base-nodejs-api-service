const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`Invalid ${Model.modelName.toLowerCase()}`, 404)
      );
    }

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.modelName.toLowerCase();
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.modelName.toLowerCase();
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: newDoc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const modelName = Model.modelName.toLowerCase();
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      [modelName]: { doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.nestedParams) filter = req.nestedParams;

    //execute query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query; //.explain() statistics

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs },
    });
  });

exports.nestedRoute = function (...nestedParamsOptions) {
  return (req, res, next) => {
    const nestedParams = {};
    const paramsKey = Object.keys(req.params);

    if (paramsKey.length === 0 || nestedParamsOptions.length === 0) {
      return next();
    }

    const filteredOptions = nestedParamsOptions.filter((el) =>
      paramsKey.includes(el.param)
    );

    filteredOptions.forEach((el) => {
      nestedParams[el.modelField] = req.params[el.param];
    });

    req.nestedParams = nestedParams;
    next();
  };
};
