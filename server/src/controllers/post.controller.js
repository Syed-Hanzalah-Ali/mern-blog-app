import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
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
    const order=req.query.sort==='asc'?1:-1

    const {userId,postId,search,category,slug}=req.query
    console.log(Date.now(),req.query);
    

    const matchStage={
        ...(userId&&{author:new mongoose.Types.ObjectId(userId)}),
        ...(postId&&{_id:new mongoose.Types.ObjectId(postId)}),
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

export const deletePost=asyncHandler(async(req,res)=>{
    const {userId,postId}=req.params
    if(req.user._id!=userId){
        throw new ApiError(401,"unauthorized attempt")
    }
    if(!req.user.isAdmin){
        throw new ApiError(403,"only admin can delete this post")
    }

    const post=await Post.findOne({
        _id:postId,
        author:userId
    })

    const result=await deleteFromCloudinary(post.image)
    // console.log(result);
    

    await post.deleteOne()
    return res.status(200).json(
        new ApiResponse(200,{},"post deleted successfully")
    )
})

export const UpdatePost=asyncHandler(async(req,res)=>{
    const {userId,postId}=req.params
    
    if(req.user._id!=userId){
        throw new ApiError(401,"unauthorized attempt")
    }
    if(!req.user.isAdmin){
        throw new ApiError(403,"Unauthorized attemp - only admin can make a post")
    }

    const {title,content,category}=req.body;
    // console.log(req.body);
    
    if(!title?.trim() || !content?.trim()){
        throw new ApiError(400,"Title and content cannot be empty")
    }
    // console.log(req.body);

    const post=await Post.findById(postId)
    
    let link=post.image
    if(req.file){
        console.log(req.file);
        await deleteFromCloudinary(post.image)
        const result=await uploadOnCloudinary(req.file?.path)
        
        link=result?.url        
    }

    const updatedPost=await Post.findByIdAndUpdate(postId,{
        $set:{
            title:title,
            content:content,
            category:category,
            image:link
        }
    },{returnDocument:"after"}
    )

    return res.status(201).json(
        new ApiResponse(200,updatedPost,"new post created successfully")
    )
})