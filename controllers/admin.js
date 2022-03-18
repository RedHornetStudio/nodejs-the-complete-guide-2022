const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { path: '/admin/add-product', pageTitle: 'Add product', editing: false });
};

exports.postAddProduct = (req, res, next) => {
  new Product(null, req.body.title, req.body.imageUrl, req.body.price, req.body.description).save()
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', { path: '/admin/products', pageTitle: 'Admin products', prods: products });
  });
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.productId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { path: 'admin/edit-product', pageTitle: 'Edit product', editing: true, product: product })
  });
};

exports.postEditProduct = (req, res, next) => {
  new Product(req.body.productId, req.body.title, req.body.imageUrl, req.body.price, req.body.description).save(() => {
    res.redirect('/admin/products');
  });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.id, () => {
    res.redirect('/admin/products');
  });
};