const Post=require("../models/Post")

const createPost=async(req,res)=>{
    const{title,body}=req.body
    if(!title||!body)
        res.status(400).json('title,body are required fields')

    const post=await Post.create({title,body})

    if (post) { 
        return res.status(201).json({ message: 'New post created' })
    } 
    else {
        return res.status(400).json({ message: 'Invalid post ' })
    }
}

const getAllPosts= async (req, res) => {
    
    const posts = await Post.find().lean()
   
    if (!posts?.length) {
         return res.status(400).json({ message: 'No posts found' })
    }
    res.json(posts)
}

const apdatePost=async(req,res)=>{
    const{title,body,_id}=req.body
    if(!title||!body,_id)
        res.status(400).json('title,body are required fields')
    
    const post=Post.findById(id).lean()
    if(!post)
        res.status(400).json('post is not exist')

    post.title=title
    post.body=body
    post._id=_id

    const apdatePost= await post.save()
    res.json(`${apdatePost} updated`)
}

const deletePost = async (req, res) => {
    const { id } = req.body
    
    const post = await Post.findById(id).exec()
    if (!post) {
    return res.status(400).json({ message: 'Post not found' })
    }
    const result = await Post.deleteOne()
    const reply=`Post '${result.title}' deleted`
    res.json(reply)
    }

const getPostById = async (req, res) => {
        const {id} = req.params
        
        const post = await Post.findById(id).exec()
       
        if (!post) {
        return res.status(400).json({ message: 'No post found' })
        }
        res.json(post)
        }
module.exports={createPost,getAllPosts,apdatePost,deletePost,getPostById}