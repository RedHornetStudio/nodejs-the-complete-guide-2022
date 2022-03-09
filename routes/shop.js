const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', { path: '/', pageTitle: 'Shop', prods: adminData.products });
});

module.exports = router;