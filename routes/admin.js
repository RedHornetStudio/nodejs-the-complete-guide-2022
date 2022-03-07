const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log(path.join(__dirname, '..', 'Views', 'add-product.html'));
  res.sendFile(path.join(__dirname, '..', 'Views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;