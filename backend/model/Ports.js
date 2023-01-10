
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portSchema = new Schema({
    workspaceName:{
        type: String,
        required: true
    } ,
     port: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model("Ports",portSchema );

