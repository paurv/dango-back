
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let mediaSchema = new Schema(
    {
        name: String,
        path: String,
        type: String
    }
);

module.exports = mongoose.model('Media', mediaSchema);
