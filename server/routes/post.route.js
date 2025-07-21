import express from 'express'
import upload from '../config/fileUpload.js'
import { createPost, deletePostById, updatePostById, viewPosts, viewSinglePost, addLikes } from '../controllers/post.controller.js'
import { auth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/add", auth, upload.single('content_pic') , createPost)
router.get("/getall",auth, viewPosts)
router.get("/:id", auth, viewSinglePost)
router.put("/edit/:id", auth, updatePostById)
router.delete("/delete/:id", auth, deletePostById)
router.post('/clap/:postId',auth, addLikes)

export default router