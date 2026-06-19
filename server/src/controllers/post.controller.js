import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

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

export const getPosts=asyncHandler(async(req,res)=>{
    const startIndex=parseInt(req.query.startIndex) ||0
    const limit=parseInt(req.query.limit)||9
    const order=req.query.order==='asc'?1:-1

    const {userId,postId,search,category,slug}=req.query

    const matchStage={
        ...(userId&&{author:userId}),
        ...(postId&&{_id:postId}),
        ...(category&&{category}),
        ...(slug&&{slug}),
        ...(search && {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        })
    }

    const posts=await Post.aggregate([
        {
            $match:matchStage,
           
        },
        {
            $sort:{
                updatedAt:order
            }
        },
        {
            $skip:startIndex
        },
        {
            $limit:limit
        }
        
        
    ])
    const totalPosts=await Post.countDocuments()
    // console.log("total: ",totalPosts);
    
    // last month
    const now=new Date()
    const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    )
    // console.log(now);
    
    // console.log(oneMonthAgo);

    const lastMonthTotalPost=await Post.countDocuments({
      createdAt:{$gte:oneMonthAgo}  
    })
    

    return res.status(200).json(
        new ApiResponse(200,{posts,totalPosts,lastMonthTotalPost},"post fetched successfully")
    );
})