const mongoose = require("mongoose");

const schema = mongoose.Schema({
    custid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
    },
    
    shopid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workshops",
        default:null
    },
    service: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    district:{
        type: String,
        required: true
    },
   
   payment:{
    type: Number,
    default: 0
   },
    paymentstatus: {
        type: Boolean,
        default: false
    },
    mechid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "mechanics",
    },
    adminapproved:{
        type: String,
        default: 'Pending'
    },
    mechAssigned:{
        type: Boolean,
        default: false
    },
    completedStatus:{
        type: Boolean,
        default: false
    },
    issues:{
        type: String,
    }
});
module.exports = mongoose.model('emergencies', schema)