const express=require('express')
const router=express.Router()
const postController=require("../Controllers/PostController")

router.get("/",postController.getAllPosts)
router.get("/:id",postController.getPostById)
router.post("/",postController.createPost)
router.put("/",postController.apdatePost)
router.delete("/",postController.deletePost)


module.exports=router