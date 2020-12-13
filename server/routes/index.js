
const express = require('express');
const app = express();

const userRouter = require('./user');
const authRouter = require('./auth');
const plansRouter = require('./plans');
const storesRouter = require('./stores');
const mediaRouter = require('./media');

// routers
app.use( '/user', userRouter );
app.use( '/auth', authRouter );
app.use( '/plans', plansRouter );
app.use( '/stores', storesRouter );
app.use( '/media', mediaRouter );

module.exports = app;