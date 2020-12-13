
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let mediaSchema = new Schema(
    {
        owner: { 
            type: mongoose.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        media: {
            name: String,
            path: String,
            type: String
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Media', mediaSchema);
