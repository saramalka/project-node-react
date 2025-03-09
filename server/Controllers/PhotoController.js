const Photo=require("../models/Photo")

const createPhoto=async(req,res)=>{
    const{title,imgURL}=req.body
    if(!title||!imgURL)
        res.status(400).json('title,imgURL are required fields')

    const photo=await Photo.create({title,imgURL})

    if (photo) { 
        return res.status(201).json({ message: 'New Photo created' })
    } 
    else {
        return res.status(400).json({ message: 'Invalid Photo ' })
    }
}

const getAllPhotos= async (req, res) => {
    
    const photos = await Photo.find().lean()
   
    if (!photos?.length) {
         return res.status(400).json({ message: 'No photos found' })
    }
    res.json(photos)
}

const apdatePhoto=async(req,res)=>{
    const{title,imgURL}=req.body
    if(!title||!imgURL)
        res.status(400).json('title,imgURL are required fields')
    
    const photo=Photo.find(title).lean()
    if(!photo)
        res.status(400).json('photo is not exist')

    photo.title=title
    photo.imgURL=imgURL

    const apdatePhoto= await Photo.save()
    res.json(`${apdatePhoto} updated`)
}

const deletePhoto = async (req, res) => {
    const { title } = req.body
    
    const photo = await Photo.find(title).exec()
    if (!photo) {
    return res.status(400).json({ message: 'Photo not found' })
    }
    const result = await Photo.deleteOne()
    const reply=`Photo '${result.title}' deleted`
    res.json(reply)
}
const getPhotoByTitle = async (req, res) => {
    const {title} = req.params
        
    const photo = await Photo.find(title).lean()
       
     if (!photo) {
       
        return res.status(400).json({ message: 'No photo found' })
        }
    res.json(photo)
}
module.exports={createPhoto,getAllPhotos,apdatePhoto,deletePhoto,getPhotoByTitle}