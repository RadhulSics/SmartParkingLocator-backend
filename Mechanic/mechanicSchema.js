const mongoose= require("mongoose");

const mechSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
  
    contact:{
        type:Number,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },image:{
        type:Object
    },
    gender:{
        type:String,
        required:true
    },
    certificate: {
        type:Object
    },
    aadhar:{
        type:Number,
        required:true
    },
    shopid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'workshops'
    }
});
module.exports=mongoose.model('mechanics',mechSchema)
