const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', { path: '/', pageTitle: 'Shop', prods: products });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', { path: '/products', pageTitle: 'Products list', prods: products });
  });
};

exports.getProductsDetail = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-detail', { path: '/product-detail', pageTitle: 'Product detail' });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { path: '/cart', pageTitle: 'Cart' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};