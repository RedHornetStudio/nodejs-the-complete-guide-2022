const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const db = require('../util/database');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', { path: '/', pageTitle: 'Shop', prods: rows });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', { path: '/products', pageTitle: 'Products list', prods: rows });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(([rows]) => {
      res.render('shop/product-detail', { path: '/products', pageTitle: 'Product detail', product: rows[0] });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCartAsync(1 /* id of logged user */)
    .then(products => {
      res.render('shop/cart', { path: '/cart', pageTitle: 'Cart', products: products });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(([rows]) => {
      return Cart.addProductAsync(rows[0].id, 1 /* id of logged user */);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(([rows]) => {
      return Cart.deleteProduct(rows[0].id);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.getOrdersAsync(1 /* id of logged user */)
  .then(orders => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders', orders: orders});
  })
  .catch(error => {
    console.log(error);
  })
};

exports.postOrders = (req, res, next) => {
  Cart.getCartAsync(1 /* id of logged user */)
    .then(products => {
      return Order.createOrderAsync(1 /* id of logged user */, products);
    })
    .then(() => {
      return Cart.deleteAllItems(1 /* id of logged user */);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};