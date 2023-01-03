const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    interests: {
        type: String,
         },
    countryCode: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);