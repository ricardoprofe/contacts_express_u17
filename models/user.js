const mongoose = require('mongoose');
const validator = require('validator');

let userSchema = new mongoose.Schema({    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: validator.isEmail
        //match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i
    },    
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        trim: true
    }
});

let User = mongoose.model('users', userSchema);
module.exports = User;