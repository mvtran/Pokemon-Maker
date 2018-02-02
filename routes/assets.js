const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/assets/placeholder.jpg', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/assets/placeholder.jpg`));
});

module.exports = router;
