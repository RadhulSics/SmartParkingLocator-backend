const mongoose= require("mongoose");

const shopSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
    contact:{
        type:Number,
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
  city:{
    type:String,
    required:true
}
  ,
  district:{
    type:String,
    required:true
},
    
    aadhar:{
        type:Number,
        required:true
    },regno:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('workshops',shopSchema)
