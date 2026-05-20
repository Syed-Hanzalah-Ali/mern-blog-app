import "dotenv/config"
import { app } from "./app.js";
import { connectDB } from "./DB/db.config.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is listening on port: ",process.env.PORT);
        
    })

})
.catch((error)=>{
    console.log("MongoDB connection failed: ",error);
    
})
