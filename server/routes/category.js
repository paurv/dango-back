
const express = require('express');
const Categories = require('../models/category');
const { verifyToken } = require('../middlewares/auth');
const app = express();

app.get('/', [verifyToken], ( req, res ) => {       // Obtener categorias
    const filter = { user: req.user._id }
    Categories.findOne( filter )
            .then( categories => {
                res.json({
                    ok: true,
                    categories
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
});

app.get('/:idCateg', verifyToken, ( req, res ) => {
    const filter = { user: req.user._id, 'categories._id': req.params.idCateg };
    Categories.findOne( filter )
                .then( categ => {
                    categ.categories.forEach( element => {
                        if ( element._id == req.params.idCateg ) {
                            res.json({
                                ok: true,
                                element
                            });
                            return;
                        }
                    });
                    res.json({
                        ok: false,
                        message: 'Not found'
                    });
                }).catch( err => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
});

app.post('/', [verifyToken], ( req, res ) => {      // crear categoria/actualizar
    const find = { user: req.user._id };
    const update = { $push: {categories: { name: req.body.name}} };
    const options = { upsert: true, new: true };
    Categories.findOneAndUpdate( find, update, options )
            .then( result => {
                res.json({
                    ok: true,
                    result
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
})


app.put('/:idCateg', [verifyToken], ( req, res ) => {     // Eliminar categoria
    const conditions = { user: req.user._id, 'categories._id': req.params.idCateg };
    const update = { '$pull':{categories: { _id: req.params.idCateg }}};
    const options = { new: true, runValidators: true };
    Categories.findOneAndUpdate( conditions, update, options)
            .then( deletedCat => {
                res.json({
                    ok: true,
                    deletedCat
                });
            }).catch( err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
})

module.exports = app;
