import mongoose,{Schema} from "mongoose";

const commentSchema=new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    wroteBy:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    content:{
        type:String,
        required:true
    },
    likeBy:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},{timestamps:true})


export const Comment=mongoose.model("Comment",commentSchema)