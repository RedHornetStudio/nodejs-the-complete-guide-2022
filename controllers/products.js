const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { path: '/admin/add-product', pageTitle: 'Add product' });
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title).save(() => {
    res.redirect('/');
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', { path: '/', pageTitle: 'Shop', prods: products });
  });
};