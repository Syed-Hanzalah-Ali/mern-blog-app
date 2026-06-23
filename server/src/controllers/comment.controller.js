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
