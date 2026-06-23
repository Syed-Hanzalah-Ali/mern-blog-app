import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createComment=asyncHandler(async(req,res)=>{
    // console.log("commenting...");
    
    const {postId,userId,content}=req.body

    if(!content?.trim()){
        throw new ApiError(400,"comment box cannot be empty")
    }

    if(req.user._id!=userId){
        throw new ApiError(403,"unauthorized access - cannot make a comment")
    }

    const post=await Post.findById(postId)
    if(!post){
        throw new ApiError(404,"no post found")
    }

    const newComment=await Comment.create({
        post:postId,
        wroteBy:userId,
        content
    })

    return res.status(201).json(
        new ApiResponse(200,newComment,"comment created successfully")
    )


})