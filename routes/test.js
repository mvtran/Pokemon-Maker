const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/test', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/dist/testpage.html`));
});

module.exports = router;
