import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    profile_pic: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    views: String,
    claps: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    category: String,
    description: String,
    date: {type:Date, default: Date.now},
    content_pic: String
})

export const Post = new mongoose.model("Post",postSchema)