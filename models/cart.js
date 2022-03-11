const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice, callback) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log(err);
        callback();
      });
    });
  }

  static deleteProduct(id, productPrice, callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback();
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)}
      const product = updatedCart.products.find(product => product.id === id);
      if (!product) {
        callback();
        return;
      }
      updatedCart.products = updatedCart.products.filter(product => product.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * product.qty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (err) console.log(err);
        callback();
      });
    });
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback({ products: [], totalPrice:0 });
        return;
      }
      callback(JSON.parse(fileContent));
    });
  }
};