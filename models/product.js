const fs = require('fs');
const path = require('path');

const rootDir = require('../util/rootDir');
const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
      return;
    }
    callback(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save(callback) {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) console.log(err);
          callback();
        });
      } else {
        this.id = new Date().getTime().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
          callback();
        });
      }
    });
  }
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
  static deleteById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      const updatedProducts = products.filter(product => product.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.log(err);
          callback();
        } else {
          Cart.deleteProduct(id, product.price, () => {
            callback();
          });
        }
      });
    });
  }
};