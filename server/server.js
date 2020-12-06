require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', ( req, res ) => {
    res.json('Hello word');
});

app.post('/usuario', ( req, res ) => {
    let data = {body: req.body};

    if ( data.body.nombre === undefined ) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario.'
        })
    }
    res.send({persona: data.body});
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto : ', process.env.PORT);
});
