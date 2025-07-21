import { Post } from "../models/post.model.js";

// export const createPost = async(req,res)=>{
//     try {
//         const {title,author,profile_pic,views,claps,category,description,date} = req.body
//         const newPost = await Post.create({title,author,profile_pic,views,claps,category,description,date})
//         if(!newPost){
//             return res.status(400).json("Failed to create post.")
//         }
//         res.status(200).json({msg:"Post created successfully."})
//     } catch (error) {
//         console.log(error)
//     }
// }

export const createPost = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, description, date } =
      req.body;
    const content_pic = req.file?.path;

    const newPost = await Post.create({
      title,
      description,
      date,
      content_pic,
    });

    res.status(200).json({ msg: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res
      .status(500)
      .json({ msg: "Failed to create post", error: error.message });
  }
};


export const viewSinglePost = async(req,res)=>{
    try {
       const id = req.params.id
       const post = await Post.findById(id)
       if(!post){
        return res.status(404).json({msg:"Post not found."})
       }
       res.status(200).json(post)
    } catch (error) {
        console.log(first)
    }
}

// export const viewPosts = async(req,res)=>{
//     try {
//         const limit = parseInt(req.query._limit);
//         const getAllPost = await Post.find().limit(limit)
//         res.status(201).json(getAllPost)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const viewPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit) || 6;
    const page = parseInt(req.query._page) || 1;

    const skip = (page - 1) * limit;

    const getAllPost = await Post.find().skip(skip).limit(limit);
    res.status(200).json(getAllPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const updatePostById = async(req,res)=>{
    try {
        const id = req.params.id

    } catch (error) {
        console.log(error)
    }
}

export const deletePostById = async(req,res)=>{
    try {
        const id = req.params.id
        await Post.findByIdAndDelete(id)
        res.status(200).json({msg:"Post deleted successfully."})
    } catch (error) {
        console.log(error)
    }
}


export const addLikes = async(req,res)=>{
  try {
    const userId = req.id
    const postId = req.params.id

    const post = await Post.findById(postId)
    if(!post) return res.status(404).json({message:'Post not found'})
    const index = post.claps.indexOf(userId)
    if(index===-1){
      post.claps.push(userId)
    }else{
      post.claps.splice(index,1)
    }
    await post.save()
    res.status(200).json({claps: post.claps.length, clapped: index===-1})
  } catch (error) {
    console.log(error)
  }
}