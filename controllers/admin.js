const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', { path: '/admin/add-product', pageTitle: 'Add product' });
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description).save(() => {
    res.redirect('/');
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', { path: '/admin/products', pageTitle: 'Admin products', prods: products });
  });
};