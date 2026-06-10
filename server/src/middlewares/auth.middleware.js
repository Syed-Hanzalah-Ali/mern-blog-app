import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        // console.log("t:",req);
        
        const token=req.cookies.accessToken || req.header.authorization?.split(" ")[1]

        if(!token){
            throw new ApiError(401, "unauthorized access")
        }

        const decodedToken=jwt.decode(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToken._id)

        if(!user){
            throw new ApiError(401,"Invalid Access token")
        }

        req.user=user

        next()
    } 
    catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})