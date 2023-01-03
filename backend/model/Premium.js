const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const premiumSchema = new Schema({
    suitName:{
        type: String,
        default: null
    } ,
    requesterEmail:{
        type: String,
        default: null
    } 

});

module.exports = mongoose.model("Premium",premiumSchema );