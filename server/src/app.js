import express from "express"

const app=express()

app.use(express.json());

// routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/auth",authRouter);

export {app}