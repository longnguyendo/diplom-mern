import mongoose from "mongoose";
// import Image from "./image.model.js";

const commentSchema = new mongoose.Schema({

    content: {
        type: String, 
        require: true,
    },
    postId: {
        type: String,
        require: true,
    },
    userId: {
        type: String, 
        require: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;