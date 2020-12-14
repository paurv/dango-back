const { response } = require('express');
const express = require('express');
const { verifyToken, verify_AdminComp } = require('../middlewares/auth');
const Products = require('../models/products');
const { path } = require('./category');
const app = express();

// Agregar producto
app.post('/', [verifyToken], ( req, res ) => {
    const find = { user: req.user._id };
    const update = { 
            $push: {
                products: {
                    category: req.body.category,
                    name: req.body.name,
                    stock: req.body.stock,
                    price: req.body.price
                }
            }};
    const options = { upsert: true, new: true };
    Products.findOneAndUpdate( find, update, options )
            .then( product => {
                res.json({
                    ok: true,
                    product
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

// Obtener Productos
app.get('/', [verifyToken], ( req, res) => {
    const filter =  { user: req.user._id }
    Products.findOne( filter )
            .exec()
            .then( products => {
                res.json({
                    ok: true,
                    products
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

// Eliminar producto
app.put('/:idProd', [verifyToken], ( req, res ) => {
    const conditions = { user: req.user._id, 'products._id': req.params.idProd };
    const update = {'$pull':{ products: { _id: req.params.idProd }}};
    const options = { new: true, runValidators: true };
    Products.findOneAndUpdate( conditions, update, options )
            .then( deletedProd => {
                res.json({
                    ok: true,
                    deletedProd
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

// Editar producto


module.exports = app;