const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    custid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
    },
    
    shopid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workshops",
        required: true,
    },
    bookingid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "servicebookings",
        required: true,

    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services",
        required: true,
    },
    servicedate: {
        type: Date,
        required: true
    },
    currentdate:{

    },
    finaldate:{

    },
    mechid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "mechanics",
    },
    image:Object,
    comments:String

});
module.exports = mongoose.model('serviceupdates', Schema)