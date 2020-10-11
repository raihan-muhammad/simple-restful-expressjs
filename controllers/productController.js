const Product = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res) => {
  const { type, stock } = req.body;

  if (!type || !stock) {
    res.status(422).json({
      status: 'Fail',
      message: 'Please provide all fields',
    });
  }

  const checkType = await Product.findOne({ type });
  if (checkType) {
    res.status(422).json({
      status: 'Fail',
      message: 'Type already exists',
    });
  }

  const newProduct = new Product({
    type,
    stock,
  });

  const saveProduct = await newProduct.save();
  res.status(200).json({
    status: 'success',
    message: 'Product added successfully',
    data: saveProduct,
  });
});

exports.getAllProduct = catchAsync(async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.productId });
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        return res
          .status(422)
          .json({ status: 'Fail', message: 'Type already exists' });
      }
      res.status(200).json({
        status: 'success',
        message: 'Stock was successfully updated',
        data: result,
      });
    }
  );
});

exports.deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);

  res.status(200).json({
    message: 'success',
    data: {
      data: null,
    },
  });
});
