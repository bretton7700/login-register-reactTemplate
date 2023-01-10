
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
    } 


});

module.exports = mongoose.model("Databases",databaseSchema );

