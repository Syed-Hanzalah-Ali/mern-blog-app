export const asyncHandler=(func)=>{
    return async(req,res,next)=>{
        try {
            await func(req,res,next);
        } 
        catch (error) {
            console.log("getting here",error);
            
            res.status(error.statusCode||500).json({
                success:false,
                statusCode:error.statusCode,
                message:error.message
            })
        }
    }
}