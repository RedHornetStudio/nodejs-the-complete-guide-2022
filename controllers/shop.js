const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      products.forEach(product => {
        const carProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
        if (carProductData) cartProducts.push({ productData: product, qty: carProductData.qty });
      });
      res.render('shop/cart', { path: '/cart', pageTitle: 'Cart', products: cartProducts });
    });
  });
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId, product => {
    Cart.addProduct(product.id, product.price, () => {
      res.redirect('/cart');
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
Product.findById(req.body.productId, product => {
  Cart.deleteProduct(req.body.productId, product.price, () => {
    res.redirect('/cart');
  });
});
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};