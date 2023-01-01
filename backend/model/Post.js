const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        default: null
    } ,
    token:{
        type: String,
        default: null
    } ,
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'READY'

    } ,
    userID:{
        type: String,
        required: true
    } ,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: null
      },
    scheduledTime:{
        type: String,
        default: Date.now
    } 

});

module.exports = mongoose.model("Posts",postSchema );