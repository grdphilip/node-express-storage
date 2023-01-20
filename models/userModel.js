const mongoose = require('mongoose');

/*
Rule 1: embed unless there is a compelling reason not to
Rule 2: avoid JOINS if they can be avoided
Rule 3: array should never grow without bound
Rule 4: an object should not be embedded if it needs to be accessed individually

16MB per document limit in mongo db
HOST DOCUMENT
.populate()

Call the function: not User.sayHi(), User.find().sayHi because query- 

Validate only runs on create() or save() which is a problem
*/ 

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
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 11,
        required: true,
    }
    
}, { timestamps: true });



userSchema.methods.present = function() {
    console.log(this)
}

userSchema.

module.exports = mongoose.model('User', userSchema)
