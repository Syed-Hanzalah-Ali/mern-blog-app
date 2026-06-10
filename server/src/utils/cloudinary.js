import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// console.log("cloud name: ",process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localFilePath)=>{
    console.log("local file path: ",localFilePath);
    
    try {
        if(!localFilePath){
            console.error("No file found");
            return null;
        }    
        console.log("uploading");
        
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        console.log("File has been uploaded");
        console.log("response after uploading: ",response);
        fs.unlinkSync(localFilePath);
        return response; 
        
        
    } 
    catch (error) {
        console.log(error);
        
        fs.unlinkSync(localFilePath); // remove the locally save temporary file as the upload operation fail
        return null;
    }
}

const deleteFromCloudinary=async (fileLink)=>{
    
    try {
        if(!fileLink){
            console.error("No file found");
            return null;
        }
    
        const urlParts=fileLink.split("/");
        const publicID=(urlParts[urlParts.length-1]).split(".")[0]; // extract public_id from URL
        console.log("publicID: ",typeof publicID); // wuxbo4micudvfnsvmmhy
        
        const response=await cloudinary.uploader.destroy(publicID);
        // console.log(response);
        
        return response;
    } 
    catch (error) {
        console.log("getting here; delete error");
        
        return null
    }

}

export {uploadOnCloudinary,deleteFromCloudinary};