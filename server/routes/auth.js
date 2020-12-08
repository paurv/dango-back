const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

app.post('/login', ( req, res ) => {
    
    let data = req.body;
    let condition = { email: data.email };

    User.findOne( condition  )
        .then( userDB => {
            if ( !userDB ) {
                return res.status(400).json({
                    ok: false,
                    message: "Wrong user or password"
                });
            }
            if ( !bcrypt.compareSync(data.password, userDB.password) ) {
                return res.status(400).json({
                    ok: false,
                    message: "Wrong user or password"
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
        role: "Empresa",
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

module.exports = app;