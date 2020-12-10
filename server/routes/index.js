
const express = require('express');
const app = express();

// routers
app.use( '/user', require('./user') );
app.use( '/auth', require('./auth') );
app.use( '/plans', require('./plans') );
app.use( '/stores', require('./stores') );

module.exports = app;