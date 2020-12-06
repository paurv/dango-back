require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( user );

mongoose.connect('mongodb://localhost:27017/dango', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto : ', process.env.PORT);
});
