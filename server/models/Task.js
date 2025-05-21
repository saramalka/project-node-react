const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
        title:{
            type:String,
            required:true,
        },
        // id:{

        // },
        tags:{
            type:String,
            min:0,
            max:5,
            
        },
        complete:{
            type:Boolean,
            default:false
        }
       
        
},{})

module.exports=mongoose.model("Task",TaskSchema)