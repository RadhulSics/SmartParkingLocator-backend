const mongoose = require('mongoose');

const parkingAreaSchema = new mongoose.Schema({
    paId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingareas',
        required: true
    },

    custId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    date:{
        type:Date,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingagents',
        required: true
    },
  status:{
    type:String,
    default:'pending'
  },
  vehicleNumber:{
    type:String,
    required:true
  },
 
   
});

const ParkingArea = mongoose.model('slotbooking', parkingAreaSchema);

module.exports = ParkingArea;
