const express=require('express')
const router=express.Router()
const photoController=require("../Controllers/PhotoController")

router.get("/",photoController.getAllPhotos)
router.get("/:title",photoController.getPhotoByTitle)
router.post("/",photoController.createPhoto)
router.put("/",photoController.apdatePhoto)
router.delete("/",photoController.deletePhoto)


module.exports=router