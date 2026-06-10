import express from "express"
import cookieParser from "cookie-parser";
const app=express()

app.use(express.json());

app.use(cookieParser())
// routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/auth",authRouter);

export {app}