const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
      },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 11,
        required: true,
    }
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
