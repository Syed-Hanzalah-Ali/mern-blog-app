import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  // console.log("commenting...");

  const { postId, userId, content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "comment box cannot be empty");
  }

  if (req.user._id != userId) {
    throw new ApiError(403, "unauthorized access - cannot make a comment");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "no post found");
  }

  const newComment = await Comment.create({
    post: postId,
    wroteBy: userId,
    content,
  });
  const populatedComment = await Comment.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(newComment._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "wroteBy",
        foreignField: "_id",
        as: "WroteBy",
        pipeline: [
          {
            $project: {
              username: 1,
              profilePicture: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        WroteBy: { $first: "$WroteBy" },
      },
    },
    {
      $project: {
        wroteBy: 0,
      },
    },
  ]);

  return res
    .status(201)
    .json(
      new ApiResponse(200, populatedComment, "comment created successfully"),
    );
});

export const getPostComments = asyncHandler(async (req, res) => {
  console.log("getting all comments..");

  const { postId } = req.params;
  console.log(mongoose.isValidObjectId(postId));

  const postComments = await Comment.aggregate([
    {
      $match: {
        post: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "wroteBy",
        foreignField: "_id",
        as: "WroteBy",
        pipeline: [
          {
            $project: {
              username: 1,
              profilePicture: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        WroteBy: { $first: "$WroteBy" },
      },
    },
    {
      $project: {
        wroteBy: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, postComments, "comments fetched successfully"));
});

export const likeComment=asyncHandler(async(req,res)=>{

  const {commentId}=req.params

  const comment=await Comment.findById(commentId)
  console.log(comment);
  
  if(!comment){
    throw new ApiError(404,"comment not found")
  }

  const isLiked=comment.likeBy.indexOf(req.user._id)
  // const isLiked=await Comment.findOne({
  //   _id:commentId,
  //   likeBy:{$in:[req.user._id]}
  // })

  if(isLiked===-1){
    const commentLiked=await Comment.findByIdAndUpdate(commentId,
      {
        $addToSet:{
          likeBy:req.user._id
        }
      },
      {returnDocument:'after'}
    )
    return res.status(200).json(
      new ApiResponse(200,commentLiked,"user Liked the comment")
    )
    
  }
  const commentUnliked=await Comment.findByIdAndUpdate(commentId,
    {
      $pull:{
        likeBy:req.user._id
      }
    },
    {returnDocument:'after'}
  )

  return res.status(200).json(
      new ApiResponse(200,commentUnliked,"user unLiked the comment")
    )


})

export const editComment=asyncHandler(async(req,res)=>{
  const {commentId}=req.params;

  const comment=await Comment.findById(commentId)
  if(!comment){
    throw new ApiError(404,"comment not found")
  }
  // console.log(comment.wroteBy," ",req.user._id);
  
  if(comment.wroteBy.toString()!==req.user._id.toString() && !req.user.isAdmin){
    throw new ApiError(403,"unauthorized attempt - you cannot edit this comment")
  }

  const {content}=req.body
  if(!content?.trim()){
    throw new ApiError(400,"comment box cannot be empty")
  }

  const editedComment=await Comment.findByIdAndUpdate(commentId,
    {
      content
    },
    {returnDocument:'after'}
  )
  return res.status(200).json(
    new ApiResponse(200,editedComment,"comment is edited successfully")
  )

})

export const deleteComment=asyncHandler(async(req,res)=>{
  const {commentId}=req.params;

  const comment=await Comment.findById(commentId)
  if(!comment){
    throw new ApiError(404,"comment not found")
  }
  // console.log(comment.wroteBy," ",req.user._id);


  
  if(comment.wroteBy.toString()!==req.user._id.toString() && !req.user.isAdmin){
    throw new ApiError(403,"unauthorized attempt - you cannot edit this comment")
  }


  const deletedComment=await Comment.findByIdAndDelete(commentId)
  return res.status(200).json(
    new ApiResponse(200,{},"comment is edited successfully")
  )
})

export const getComments=asyncHandler(async(req,res)=>{
  if(!req.user.isAdmin){
    throw new ApiError(403,"unauthorized attempt - not allowed to see comments")
  }
  const startIndex=parseInt(req.query.startIndex) ||0
  const limit=parseInt(req.query.limit)||9
  const order=req.query.order==='asc'?1:-1

  const comments=await Comment.find().sort({updatedAt:order}).skip(startIndex).limit(limit)
  const totalComments=await Comment.countDocuments()

  const now=new Date()
  const oneMonthAgo=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
  )
  const lastMonthTotalComments=await Comment.countDocuments({
      createdAt:{$gte:oneMonthAgo}  
  })

  return res.status(200).json(
    new ApiResponse(200,{comments,totalComments,lastMonthTotalComments},"comments fetched successfully")
  );
})
