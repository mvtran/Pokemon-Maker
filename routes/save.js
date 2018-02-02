const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/save', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
