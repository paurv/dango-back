
const express = require('express');
const app = express();

const userRouter = require('./user');
const authRouter = require('./auth');
const plansRouter = require('./plans');
const storesRouter = require('./stores');
const mediaRouter = require('./media');
const categoriesRouter = require('./category');
const productsRouter = require('./products');

// routers
app.use( '/user', userRouter );
app.use( '/auth', authRouter );
app.use( '/plans', plansRouter );
app.use( '/stores', storesRouter );
app.use( '/media', mediaRouter );
app.use( '/categ', categoriesRouter );
app.use( '/products', productsRouter );

module.exports = app;