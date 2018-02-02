const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/save', (req, res) => {
  res.send(req.body);
});

module.exports = router;
