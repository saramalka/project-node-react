const Task=require("../models/Task")

const createTask=async(req,res)=>{
    const{title,tags,complete}=req.body
    complete=complete==on?true:false
    if(!title)
        res.status(400).json('title is required field')

    const task=await Task.create({title,tags,complete})

    if (task) { 
        return res.status(201).json({ message: 'New task created' })
    } 
    else {
        return res.status(400).json({ message: 'Invalid task ' })
    }
}

const getAllTasks= async (req, res) => {
    
    const tasks = await Task.find().lean()
   
    if (!tasks?.length) {
         return res.status(400).json({ message: 'No tasks found' })
    }
    res.json(tasks)
}

const apdateTask=async(req,res)=>{
    const{title,tags,complete,_id}=req.body
    if(!title||!_id)
        return res.status(400).json({ error: "title and _id are required fields" });
    
    const task=await Task.findById(_id).exec()
    if(!task)
       return res.status(400).json('task is not exist')

    task.title=title
    task.tags=tags
    task.complete=complete
    task._id=_id

    const apdateTask= await task.save()
    res.json(`${apdateTask} updated`)
}

const deleteTask = async (req, res) => {
    const { _id } = req.body
    
    const task = await Task.findById(_id).exec()
    if (!task) {
    return res.status(400).json({ message: 'Task not found' })
    }
    const result = await Task.deleteOne()
    const reply=`Task '${result.title}' deleted`
    res.json(reply)
    }

const getTaskById = async (req, res) => {
        const {id} = req.params
        
        const task = await Task.findById(id).lean()
       
        if (!task) {
        return res.status(400).json({ message: 'No Task found' })
        }
        res.json(task)
        }

const updateTaskComplete = async (req, res) => {
        const { id } = req.params
            
         const task = await Task.findById(id).exec()
            if (!task) {
              return res.status(400).json({ message: 'Task not found' })
            }
        task.complete = !task.complete
        const updatedTask = await task.save()
        res.json(`'${updatedTask.title}' updated`)
    }      
module.exports={createTask,getAllTasks,apdateTask,deleteTask,getTaskById,updateTaskComplete}