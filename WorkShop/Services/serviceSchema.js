const mongoose= require("mongoose");

const serviceSchema=mongoose.Schema({

    serviceName: {
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
    }
});
    module.exports=mongoose.model('services',serviceSchema)
