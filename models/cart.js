const db = require('../util/database');

module.exports = class Cart {
  static async addProductAsync(productId, userId) {
    const [carts] = await db.execute('SELECT * FROM carts WHERE userId = ?', [userId]);
    const [existingProducts] = await db.execute('SELECT * FROM cartitems WHERE productId = ? AND cartId = ?', [productId, carts[0].id]);
    if (existingProducts.length > 0) {
      await db.execute('UPDATE cartitems SET quantity = ? WHERE id = ?', [existingProducts[0].quantity + 1, existingProducts[0].id]);
    } else {
      await db.execute('INSERT INTO cartitems (cartId, productId, quantity) VALUES (?, ?, ?)', [carts[0].id, productId, 1]);
    }
  }

  static deleteProduct(productId) {
    return db.execute('DELETE FROM cartitems WHERE productId = ?', [productId]);
  }

  static async getCartAsync(userId) {
    const [carts] = await db.execute('SELECT * FROM carts WHERE userId = ?', [userId]);
    if(carts.length !== 0) {
      const [cartProducts] = await db.execute('SELECT products.id, products.title, products.price, products.imageUrl, products.description, products.userId, cartitems.quantity, cartitems.cartId, cartitems.productId FROM products INNER JOIN cartitems ON products.id = cartitems.productId AND cartitems.cartId = ?' , [carts[0].id]);
      return cartProducts;
    } else {
      return [];
    }
  }

  static deleteAllItems(userId) {
    return db.execute('DELETE FROM carts WHERE userId = ?', [userId]);
  }
};