
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const databaseSchema = new Schema({
    databaseName:{
        type: String,
        required: true
    } ,
    rootPassword:{
        type: String,
        required: true
    } ,
    adminEmail:{
        type: String,
        required: true
    },
    uri:{
        type: String,
        required: true
    },
    port: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'unpaid'
    }


});

module.exports = mongoose.model("Databases",databaseSchema );

