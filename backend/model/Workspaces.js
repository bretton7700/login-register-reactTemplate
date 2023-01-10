
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspacesSchema = new Schema({
    workspaceName:{
        type: String,
        required: true
    } ,
    workspaceDescription:{
        type: String,
        required: true
    } ,
    workspaceLink:{
        type: String,
        required: true
    },
    workspaceEmail:{
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    suitName: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'Trial'
    },
    paymentFlag: {
        type: String,
        default: 'Trial'
    },
    users: {
        type: String,
        default: 1
    },
    dateCreated: {
        type: String,
        default: Date.now
    },
    datePaid:{
        type: String,
        default: Date.now
    },
    timePaid: {
        type: String,
        required: true
    },
    expired: {
        type: String,
        default: 'notYet'
    },
    expiryDate:{
        type: String,
        default: Date.now
    },
    workspaceTrialBeginning: {
        type: String,
        default: Date.now
    }

});

module.exports = mongoose.model("Workspaces",workspacesSchema );

