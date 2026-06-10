import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt"



export const test=(req,res)=>{
    res.json({message:"api is working.."})
}

export const update=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    if(userId!=req.user._id){
        throw new ApiError(401,"Dont have access to make change, Unauthorized attempt")
    }
    
    const {username,email,oldPassword,newPassword}=req.body;
    
    if(!username?.trim() || !email?.trim()){
        throw new ApiError(400,"username and email cannot be empty")
    }

    const existedUser=await User.findById(userId).select("+password")

    const isAuthenticate=await existedUser.isPasswordCorrect(oldPassword)

    if(!isAuthenticate){
        throw new ApiError(400,"Wrong password, cannot make any updates")
    }

    let link=existedUser.profilePicture
    if(req.file){

        const deleted=await deleteFromCloudinary(existedUser.profilePicture)
        console.log(deleted);
        const response=await uploadOnCloudinary(req.file.path)
        link=response.url
    }

    let password=oldPassword
    if(newPassword?.trim()!==""){
        console.log("got new Password");
        
        password=await bcrypt.hash(newPassword,10);
    }
    const updatedUser=await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                username,
                email,
                password,
                profilePicture:link

            }
        },
        {returnDocument:"after"}
    )

    return res.status(200).json(
        new ApiResponse(200,updatedUser,"user is updated successfully")
    )
    
})