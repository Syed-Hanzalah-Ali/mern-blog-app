import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const signup=asyncHandler(async(req,res)=>{

    const{username,email,password}=req.body;

    if([username,email,password].some((field)=>!field.trim())){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exist");
    }

    const newUser=await User.create({
        username:username.toLowerCase(),
        email:email.toLowerCase(),
        password
    })

    newUser.password=undefined;

    return res.status(201).json(
        new ApiResponse(200,newUser,"User created successfully")
    )
})