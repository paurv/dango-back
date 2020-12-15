
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let productSchema = new Schema(
    {
        user:        { type: mongoose.ObjectId, ref: 'User' },
        products: [{
            category:    { type: String },
            name:        { type: String },
            stock:       { type: Number },
            price:       { type: Number },
            imgPath:     { type: String }
        }]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Products', productSchema);
