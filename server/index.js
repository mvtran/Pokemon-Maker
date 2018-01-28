const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081;
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

app.get('/test', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/dist/testpage.html`));
});

// just throwing out speculation: if we're saving pokemon ids like
// <url>.com/<hash id>, then we GET it from the DB given the id?

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
