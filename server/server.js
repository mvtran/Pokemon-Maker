"use strict;"

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));

// https://github.com/expressjs/session#options
app.use(session({
    rolling: true,
    saveUninitialized: true,
    resave: true,
    secret: "boneless wings are nuggets",
    cookie: {
      maxAge: 36000000,
      httpOnly: false
    }
}));

app.all('*', function(req, res, next) {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
   res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   if ('OPTIONS' == req.method) return res.send(200);
   next();
});

/* GET routes */
const testRoute = require('../routes/test.js');
app.get('/test', testRoute);

/* POST routes */
const saveRoute = require('../routes/save.js');
app.post('/save', saveRoute);

/* Fallback route */
app.use(function(req, res, next) {
    res.status(404).json({errorCode: 404, errorMsg: "route not found"});
});

/* Start server */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
