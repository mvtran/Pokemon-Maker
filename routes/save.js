const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/save', (req, res) => {
   // is printed in command window running server-dev;
   // takes all name-value pairs of <input> tags and returns it in JSON format
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;
