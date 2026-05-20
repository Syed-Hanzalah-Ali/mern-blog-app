import "dotenv/config"
import { app } from "./app.js";
import { connectDB } from "./DB/db.config.js";

connectDB()
.then(()=>{
    app.listen(3000,()=>{
        console.log("server is listening");
        
    })

})
.catch((error)=>{
    console.log("MongoDB connection failed: ",error);
    
})
