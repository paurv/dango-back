
const express = require('express');
const app = express();

// routers
app.use( '/user', require('./user') );
app.use( '/login', require('./login') );

module.exports = app;