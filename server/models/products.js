
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let productSchema = new Schema(
    {
        name: String,
        description: String,
        inventory: String,
        category: String,
        price: Number,
        imgPath: String
    }
);

module.exports = mongoose.model('Products', productSchema);
