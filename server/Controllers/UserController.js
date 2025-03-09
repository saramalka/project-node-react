const User=require("../models/User")

const createUser=async(req,res)=>{
    const{name,username,email,address,phone}=req.body
    if(!name||!username)
        res.status(400).json('name and username are required fields')

    const user=await User.create({name,username,email,address,phone})

    if (user) { 
        return res.status(201).json({ message: 'New user created' })
    } 
    else {
        return res.status(400).json({ message: 'Invalid user ' })
    }
}

const getAllUsers= async (req, res) => {
    
    const users = await User.find().lean()
   
    if (!users?.length) {
         return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
}

const apdateUser=async(req,res)=>{
    const{name,username,email,address,phone}=req.body
    if(!name||!username)
        res.status(400).json('name and username are required fields')
    
    const user=User.find(username).lean()
    if(!user)
        res.status(400).json('uswe is not exist')

    user.name=name
    user.username=username
    user.email=email
    user.address=address
    user.phone=phone

    const apdateUser= await User.save()
    res.json(`${apdateUser} updated`)
}

const deleteUser = async (req, res) => {
    const { username } = req.body
    
    const user = await User.find(username).exec()
    if (!user) {
    return res.status(400).json({ message: 'User not found' })
    }
    const result = await user.deleteOne()
    const reply=`User '${result.name}' UserName ${result.username} deleted`
    res.json(reply)
    }

const getUserByUserName = async (req, res) => {
        const {username} = req.params
        
        const user = await User.find(username).lean()
       
        if (!user) {
        return res.status(400).json({ message: 'No user found' })
        }
        res.json(user)
        }
module.exports={createUser,getAllUsers,apdateUser,deleteUser,getUserByUserName}