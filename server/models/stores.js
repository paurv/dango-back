const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let storeSchema = new Schema(
    {
        owner: { type: mongoose.ObjectId, ref: "User", required: true, unique: true },
        name: { type: String, trim: true, required: true },
        storeUrl: { type: String, required: true, trim: true, unique: true },
        blocked: { type: Boolean, default: false },
        site: {
            description: { type: String, trim: true },
            keyWords: [{ type: String, trim: true }],
            pathLogo: { type: String, trim: true },
            pathFavicon: { type: String, trim: true }
        },
        header: {
            title: {type: String, default: ""},
            subtitle: {type: String, default: ""},
            backgroundUrl: {type: String, default: ""}
        },
        footer: {
            email: String,
            tel: String
        },
        media: {type: mongoose.ObjectId, ref: "Media"},
        products: {type: mongoose.ObjectId, ref: "Products"},
        pages: [{
            pageUrl: String,
            pageName: String,
            description: String,
            mainPage: Boolean,
            codeBlock: {
                js: String,
                css: String,
                htmlBlocks: [{ html: String }]
            }
        }],
    },
    {
        versionKey: false
    }
);

storeSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' } );  

module.exports = mongoose.model('Store', storeSchema);
