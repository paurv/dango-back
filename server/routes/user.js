
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/auth');
const app = express();

// obtener un solo usuario
app.get('/userid', verifyToken, ( req, res ) => {
    User.findById( req.user._id )
        .exec()
        .then( user => {
            res.json({
                ok: true,
                user
            });
        }).catch( err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

// Obtener todos los usuarios
app.get('/', verifyToken, ( req, res ) => {
    User.find()
        .populate('plan', {})
        .then( users => {        // response.password = null;
            User.countDocuments(( err, quantity ) => {
                res.json({
                    ok: true,
                    users,
                    quantity
                });
            });
        }).catch( err => {
            return res.status(400).json({
                ok: false,
                message: err
            });
        });
});

// Crear usuario como administrador
app.post('/', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    });
    user.save()
        .then( response => {        // response.password = null;
            res.json({
                    ok: true,
                    user: response
                });
        }).catch( err => {
            return res.status(400).json({
                ok: false,
                message: err
            });
        });
});

// Modificar usuairo como administrador
app.put('/:id', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    let id = req.params.id;
    let data = _.pick( req.body, ['name', 'email', 'role'] );

    User.findByIdAndUpdate( id, data, { new: true, runValidators: true })
    .then( resp => {
        res.json({
            ok: true,
            user: resp
        })
    })
    .catch( err => {
        res.status(400).json({
            ok: false,
            message: err
        })
    });
});

// Eliminar usuario como administrador
app.delete('/:id', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    let id =  req.params.id;
    User.findByIdAndRemove( id )
        .then( deletedUser => {
            if ( !deletedUser ) {
                return res.status(400).json({
                    ok: false,
                    err: {message: 'Usuario no encontrado'}
                });                
            }
            res.json({
                status: true,
                deletedUser
            });
        })
        .catch( err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        });
});

module.exports = app;