
const express = require('express');
const Plan = require('../models/plans');
const _ = require('underscore');
const { verifyAdmin_Role, verifyToken } = require('../middlewares/auth');
const { json } = require('body-parser');
const app = express();

// Obtener Planes
app.get('/', ( req, res ) => {
    Plan.find()
        .exec()
        .then( plans => {
            res.json({
                ok: true,
                plans
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        });
});

//obtener Plan especifico
app.get('/:idPlan', ( req, res ) => {
    Plan.findById(req.params.idPlan)
        .then( resp => {
            res.json({
                ok: true,
                resp
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            })
        })
});

// Agregrar planes
app.post('/', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    const plan = new Plan({
        name: req.body.name,
        pages: req.body.pages,
        themes: req.body.themes,
        price: req.body.price
    });

    plan.save()
        .then( resp => {
            res.json({
                ok: true,
                plan: resp
            })
        }).catch( err => {
            res.json({
                ok: false,
                message: err
            });
        });
});

// Eliminar planes
app.delete('/:id', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    const id = req.params.id;
    
    Plan.findByIdAndRemove( id )
        .then( deletedPlan => {
            if ( !deletedPlan ) {
                return res.status(404).json({
                    ok: false,
                    err: { message: 'Plan no encontrado' }
                });
            }
            res.json({
                status: true,
                deletedPlan
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        });
});

// actualizar planes
app.put('/:id', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    const id = req.params.id;
    const data = _.pick( req.body, ['name', 'pages', 'themes', 'price'] );

    Plan.findByIdAndUpdate( id, data, {new: true, runValidators: true} )
        .then( updatedPlan => {
            res.json({
                ok: true,
                updatedPlan
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                messaje: err
            });
        });
});

module.exports = app;
