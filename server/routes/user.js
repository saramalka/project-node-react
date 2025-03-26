const express=require('express')
const router=express.Router()
const userController=require("../Controllers/UserController")

router.get("/",userController.getAllUsers)
router.get("/:id",userController.getUserByID)
router.post("/",userController.createUser)
router.put("/",userController.apdateUser)
router.delete("/",userController.deleteUser)


module.exports=router