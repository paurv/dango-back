const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let planSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is necessary'],
            trim: true
        },
        pages: {
            type: Number,
            required: [true, 'Pages is necesary'],
            trim: true
        },
        themes: {
            type: Number,
            required: [true, 'theme is necessary'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'theme is necessary'],
            trim: true
        },
        imgUrl: {
            type: String,
            trim: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Plans', planSchema);