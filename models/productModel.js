const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Provide your type'],
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, 'Provide your stock'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
