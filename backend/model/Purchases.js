const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    paymentAmount:{
        type: String,
        required: true
    } ,
    paymentDay:{
        type: String,
        default: Date.now
    } ,
    buyer:{
        type: String,
        required: true
    } ,
    suitName: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model("Purchases",purchaseSchema );