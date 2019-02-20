const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  return res.sendFile('index.html', { root: path.join(__dirname, '../') });
});

module.exports = router;
