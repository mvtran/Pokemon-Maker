const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/pokemon/:name', (req, res) => {
  var name = req.params.name;
  console.log("You searched for " + name);
});

module.exports = router;
