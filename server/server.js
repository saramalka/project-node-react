require('dotenv').config()
const express=require('express')
const cors = require("cors")
const mongoose=require('mongoose')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const PORT=process.env.PORT||1000
const app=express()
connectDB()

app.use(express.static("public"))
app.use(cors(corsOptions))
app.use(express.json())


app.use("/api/user",require("./routes/user"))
app.use("/api/photo",require("./routes/photo"))
app.use("/api/post",require("./routes/post"))
app.use("/api/task",require("./routes/task"))

mongoose.connection.once('open',()=>{
    console.log('connect to DB');
    
    app.listen(PORT,()=>console.log(`servr running at port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})
