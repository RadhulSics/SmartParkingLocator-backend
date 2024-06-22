const mongoose= require("mongoose");

const sparepartSchema=mongoose.Schema({

    partName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shopid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'workshops',
        required: true
    },
    img:{
        type: Object
    },
    count:{
        type: Number,
        required: true
    },
    manufacturer:{
        type: String,
        required: true
    }
});
    module.exports=mongoose.model('spareparts',sparepartSchema)
