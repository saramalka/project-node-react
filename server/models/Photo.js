const mongoose=require('mongoose')

const PhotoSchema=new mongoose.Schema({
        title:{
            type:String,
            required:false,
            default:"image"
        },
        imgURL:{
            type:String,
            required:true,
        }
        
},{})

module.exports=mongoose.model("Photo",PhotoSchema)