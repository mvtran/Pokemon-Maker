const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

module.exports = router;
