import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},{timestamps:true})

userSchema.pre("save",async function(){  // do not use arrow function because it does not have this reference
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
})

userSchema.methods.isPasswordCorrect=async function(password){  //  custom document instance method. all user instances have this method
    console.log(password);
    
    return await bcrypt.compare(password,this.password)
}

// userSchema.methods.generateAccessToken=function(){
//     return jwt.sign(
//         {
//             _id:this._id,
//             email:this.email,
//             username:this.username
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }
export const User=mongoose.model("User",userSchema)