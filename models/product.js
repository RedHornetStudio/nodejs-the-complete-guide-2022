const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, price, description, userId) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.userId = userId;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description, userId) VALUES (?, ? ,? ,?, ?)',
      [this.title, this.price, this.imageUrl, this.description, this.userId]
    );
  }

  update() {
    return db.execute(
      'UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ?',
      [this.title, this.price, this.imageUrl, this.description, this.id]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE id = ?', [id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  static fetchAdminProducst(userId) {
    return db.execute('SELECT * FROM products WHERE userId = ?', [userId]);
  }

  static findByIdAdminProduct(id, userId) {
    return db.execute('SELECT * FROM products WHERE id = ? AND userId = ?', [id, userId]);
  }
};