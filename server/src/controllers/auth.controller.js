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

export const google=asyncHandler(async(req,res)=>{
    const {name,email,photoURL}=req.body;
    console.log(name);
    
    const cookieOptions={
        httpOnly:true,
        secure:true
    }

    // check whether user already signIn before or not
    const existedUser=await User.findOne({email})
    if(existedUser){
        console.log("user already exist");
        
        const token=existedUser.generateAccessToken();
        
        return res.status(200).cookie("accessToken",token,cookieOptions)
        .json(new ApiResponse(200,existedUser,"user successfully signIn with google"))
    }

    else{
        const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)

        const newUser=await User.create({
            username:name.replace(" ","")+Math.random().toString(9).slice(-5),
            email,
            password:generatePassword,
            profilePicture:photoURL
        })
        
        if(!newUser){
            throw new ApiError(500,"something went wrong while signIn with google")
        }
        const token=newUser.generateAccessToken()

        newUser.password=undefined

        return res.status(200).cookie("accessToken",token,cookieOptions)
        .json(new ApiResponse(200,newUser,"user successfully signIn with google"))
    }


})

export const signout=asyncHandler(async(req,res)=>{

    return res.clearCookie("accessToken").status(200).json(
        new ApiResponse(200,{},"user signout successfully")
    )
})