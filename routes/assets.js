const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/assets/placeholder.png', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/assets/placeholder.png`));
});

router.get('/assets/pencil.png', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/assets/pencil.png`));
});

module.exports = router;
