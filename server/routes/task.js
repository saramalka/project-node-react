const express=require('express')
const router=express.Router()
const taskController=require("../Controllers/TaskController")

router.get("/",taskController.getAllTasks)
router.get("/:title",taskController.getTaskById)
router.post("/",taskController.createTask)
router.put("/",taskController.apdateTask)
router.put("/:id",taskController.updateTaskComplete)
router.delete("/",taskController.deleteTask)


module.exports=router