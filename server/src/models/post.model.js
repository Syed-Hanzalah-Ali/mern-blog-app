import mongoose,{Schema} from "mongoose";

const postSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        default:"Uncategorized"
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=809&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    slug:{
        type:String,
        lowercase:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true})

postSchema.pre("save",function(){
    let slug=this.title.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    console.log(slug);
    
    this.slug=slug
})


export const Post=mongoose.model("Post",postSchema)