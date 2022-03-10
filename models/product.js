const fs = require('fs');
const path = require('path');

const rootDir = require('../util/rootDir');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      callback([]);
      return;
    }
    callback(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save(callback) {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
        callback();
      });
    });
  }
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};