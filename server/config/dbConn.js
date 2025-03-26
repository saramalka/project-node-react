const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{

        await mongoose.connect(process.env.connectDB)

    }catch(err){
        console.log('faild connect to DB',err);
        
    }
}
module.exports=connectDB