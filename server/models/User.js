const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        mail:{
            type:String,
            trim:true
        },
        adderss:{
            city:{type:String},
            street:{type:String},
            number:{type:Number}
        },
        phone:{
            type:String,
          required:true
        }
        
},{})

module.exports=mongoose.model("User",UserSchema)