const path = require('path');
const express = require('express');

const rootDir = require('../util/rootDir');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'Views', 'shop.html'));
});

module.exports = router;