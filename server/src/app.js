import express from "express"

const app=express()


// routes
import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter);
export {app}