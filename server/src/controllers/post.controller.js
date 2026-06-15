import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPost=asyncHandler(async(req,res)=>{
    if(!req.user.isAdmin){
        throw new ApiError(403,"Unauthorized attemp - only admin can make a post")
    }

    const {title,content,category}=req.body;
    if(!title?.trim() || !content?.trim()){
        throw new ApiError(400,"Title and content cannot be empty")
    }
    console.log(req.body);
    
    let link=''
    if(req.file){
        console.log(req.file);
        const result=await uploadOnCloudinary(req.file?.path)
        
        link=result?.url
        
        
    }

    const newPost=await Post.create({
        title,
        content,
        category,
        image:link.trim() || undefined,
        author:req.user._id
    })

    return res.status(201).json(
        new ApiResponse(200,newPost,"new post created successfully")
    )
})