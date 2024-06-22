const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
    },
  sparepartid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "spareparts",
    required: true,
},
  quantity:{
    type: Number,
    required: true,
},
  price:{
    type: Number,
    required: true,
},
shopid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "workshops",
    required: true,
},
date:Date
       
});
module.exports=mongoose.model('sparepartBookings',schema)