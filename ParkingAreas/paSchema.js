const mongoose = require('mongoose');

const parkingAreaSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    slots: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingagents',
        required: true
    },
    freeSlots: {
        type: Number,
    },
    filledSlots: {
        type: Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const ParkingArea = mongoose.model('parkingareas', parkingAreaSchema);

module.exports = ParkingArea;
