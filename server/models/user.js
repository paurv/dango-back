const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let validRoles = {
    values: ['Admin', 'Empresa', 'Cliente'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema;
let userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is necessary'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is necessary'],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is necessary'],
            trim: true
        },
        role: { // tipo usuario
            type: String,
            trim: true,
            enum: validRoles
        }
        // ,
        // plan: {
        //     type: {type: mongoose.ObjectId, ref: "usuarios", require: true},
        //     ref: "plan",
        //     required: false
        // }
    },
    {
        versionKey: false
    }
);

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' } );  

module.exports = mongoose.model('User', userSchema);