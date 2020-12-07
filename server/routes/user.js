
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/auth');
const app = express();

app.get('/', verifyToken, ( req, res ) => {
    User.find()
        .exec()
        .then( users => {        // response.password = null;
            User.countDocuments(( err, quantity ) => {
                res.json({
                    ok: true,
                    users,
                    quantity
                });
                // res.end();
            });
        }).catch( err => {
            return res.status(400).json({
                ok: false,
                message: err
            });
        });
});

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
            res.end();
        }).catch( err => {
            return res.status(400).json({
                ok: false,
                message: err
            });
        });

});

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

app.delete('/:id', [verifyToken, verifyAdmin_Role], ( req, res ) => {
    let id =  req.params.id;
    User.findByIdAndRemove( id )
        .then( deletedUser => {
            if ( !deletedUser ) {
                return res.status(400).json({
                    ok: false,
                    err: {message: 'User not found'}
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