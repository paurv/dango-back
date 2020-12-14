const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const user = require('../models/user');
const app = express();

app.post('/login', ( req, res ) => {
    let data = req.body;
    let condition = { email: data.email };

    User.findOne( condition  )
        .then( userDB => {
            if ( !userDB ) {
                return res.status(400).json({
                    ok: false,
                    message: "Clave o usuario equivocado"
                });
            }
            if ( !bcrypt.compareSync(data.password, userDB.password) ) {
                return res.status(400).json({
                    ok: false,
                    message: "Clave o usuario equivocado"
                });
            }
            let token = jwt.sign(   // generate payload
                    { user: userDB },
                    process.env.SEED,
                    { expiresIn: process.env.EXP_TOKEN 
                });
            res.json({
                ok: true,
                user: userDB,
                token
            })
        })
        .catch( err => {
            res.status(500).json({
                ok: false,
                message: err
            });
        });
});

app.post('/register', ( req, res ) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role,
        plan: body.plan
    });
    user.save()
        .then( response => {
            let token = jwt.sign( 
                { user: user },
                process.env.SEED,
                { expiresIn: process.env.EXP_TOKEN } 
            );
            res.json({
                ok: true,
                user: response,
                token
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        })
});

// verificar si correo ya existe
app.put('/', ( req, res ) => {
    const body = req.body;
    const filter = { email: body.email };

    User.findOne( filter )
        .exec()
        .then( resp => {
            if ( resp ) {
                res.json({
                    ok: false,
                    message: `Lo sentimos este email ya fue registrado con otro usuario`,
                    resp
                });                
            } else {
                res.json({
                    ok: true,
                    message: `Usuario correcto`,
                    resp
                });
            }
        }).then( err => {
            res.status(400).json({
                ok: false,
                err
            })
        });
});

module.exports = app;