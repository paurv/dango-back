

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let categorySchema = new Schema(
    {
        categories: [{ name: String }],
        user: { type: mongoose.ObjectId, ref: "User", unique: true }
    },
    {
        versionKey: false
    }
);

categorySchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' } );  

module.exports = mongoose.model('Category', categorySchema);
