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

    if(!oldPassword){
        throw new ApiError(401,"password is required to make any changes")
    }
    const isAuthenticate=await existedUser.isPasswordCorrect(oldPassword)

    if(!isAuthenticate){
        throw new ApiError(400,"Wrong password, cannot make any updates")
    }

    let link=existedUser.profilePicture
    console.log(req.file);
    if(req.file){
        
        const deleted=await deleteFromCloudinary(existedUser.profilePicture)
        console.log(deleted);
        const response=await uploadOnCloudinary(req.file.path)
        link=response.url
    }

    // let password=oldPassword
    if(newPassword?.trim()!==""){
        console.log("got new Password");
        
        // password=await bcrypt.hash(newPassword,10);
        existedUser.password=newPassword
    }
    // const updatedUser=await User.findByIdAndUpdate(req.user._id,
    //     {
    //         $set:{
    //             username,
    //             email,
    //             password,
    //             profilePicture:link

    //         }
    //     },
    //     {returnDocument:"after"}
    // )
    existedUser.username=username
    existedUser.email=email
    existedUser.profilePicture=link

    await existedUser.save()

    existedUser.password=undefined
    return res.status(200).json(
        new ApiResponse(200,existedUser,"user is updated successfully")
    )
    
})

export const deleteUser=asyncHandler(async(req,res)=>{
    // console.log("deleting...");
    
    const {userId}=req.params

    if(req.user._id!=userId){
        throw new ApiError(403,"Dont have access to delete account, Unauthorized attempt")
    }

    const deletedUser=await User.findByIdAndDelete(req.user._id)

    if(!deletedUser){
        throw new ApiError(404,"user not found")
    }

    return res.clearCookie("accessToken").status(200).json(
        new ApiResponse(200,{},"user has been deleted successfully")
    )
})