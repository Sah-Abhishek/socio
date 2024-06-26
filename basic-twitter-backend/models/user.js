const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        requried: true
    },
    lastName: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    email: String,
    password: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;