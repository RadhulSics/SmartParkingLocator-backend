const mongoose= require("mongoose");

const custSchema=mongoose.Schema({
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
    }
});
module.exports=mongoose.model('customers',custSchema)
