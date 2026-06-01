import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const signup=asyncHandler(async(req,res)=>{

    const{username,email,password}=req.body;

    if([username,email,password].some((field)=>{return !field?.trim()})){
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

export const signin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!(email?.trim() && password?.trim())){
        throw new ApiError(400,"Email and password are required")
    }

    const existedUser=await User.findOne({email}).select("+password");

    if(!existedUser){
        throw new ApiError(404,"User not found")
    }

    const isAuthenticate=await existedUser.isPasswordCorrect(password)

    if(!isAuthenticate){
        throw new ApiError(400,"Wrong credentials")
    }

    const cookieOption={
        httpOnly:true,
        secure:true
    }

    const accessToken=existedUser.generateAccessToken()

    existedUser.password=undefined

    return res.cookie("accessToken",accessToken,cookieOption).status(200)
    .json(
        new ApiResponse(200,existedUser,"User logged in successfully")
    )
})