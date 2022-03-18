const db = require('../util/database');

module.exports = class Order {
  static async createOrderAsync(userId, cartProducts) {
    await db.execute('INSERT INTO orders (userId) VALUES (?)', [userId]);
    const orderId = await db.execute('SELECT LAST_INSERT_ID()');
    for (const cartProduct of cartProducts) {
      await db.execute('INSERT INTO orderitems (quantity, orderId, productId) VALUES (?, ?, ?)', [cartProduct.quantity, orderId[0][0]['LAST_INSERT_ID()'], cartProduct.productId]);
    }
  }

  static async getOrdersAsync(userId) {
    const [orders] = await db.execute('SELECT * FROM orders WHERE userId = ?', [userId]);
    if(orders.length !== 0) {
      for (let i = 0; i < orders.length; i++) {
        const [orderProducts] = await db.execute('SELECT products.id, products.title, products.price, products.imageUrl, products.description, products.userId, orderitems.quantity, orderitems.orderId, orderitems.productId FROM products INNER JOIN orderitems ON products.id = orderitems.productId AND orderitems.orderId = ?' , [orders[i].id]);
        orders[i].products = orderProducts;
      }
      return orders;
    } else {
      return [];
    }
  }
}