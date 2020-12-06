
const express = require('express');
const User = require('../models/user');
const app = express();


app.get('/', ( req, res ) => {
    res.json('Hello word');
});

app.post('/user', ( req, res ) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });
    user.save()
        .then( response => {
            res.json({
                ok: true,
                user: response
            });
            res.end();
        }).catch( err => {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        });

});

// app.get('/user', ( req, res ) => {
//     res.json('get user local');
// });

// app.post('/user', ( req, res ) => {
//     let data = {body: req.body};

//     if ( data.body.nombre === undefined ) {
//         res.status(400).json({
//             ok: false,
//             mensaje: 'El nombre es necesario.'
//         })
//     }
//     res.send({persona: data.body});
// });

module.exports = app;