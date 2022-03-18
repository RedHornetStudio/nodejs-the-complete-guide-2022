const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { path: '/admin/add-product', pageTitle: 'Add product', editing: false });
};

exports.postAddProduct = (req, res, next) => {
  new Product(null, req.body.title, req.body.imageUrl, req.body.price, req.body.description, 1 /* id of logged user */).save()
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAdminProducst(1 /* id of logged user */)
    .then(([rows]) => {
      res.render('admin/products', { path: '/admin/products', pageTitle: 'Admin products', prods: rows });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  Product.findByIdAdminProduct(req.params.productId, 1 /* id of logged user */)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', { path: 'admin/edit-product', pageTitle: 'Edit product', editing: true, product: rows[0] });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  new Product(req.body.productId, req.body.title, req.body.imageUrl, req.body.price, req.body.description).update()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.id)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(error => {
      console.log(error);
    });
};