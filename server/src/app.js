import express from "express"
import cookieParser from "cookie-parser";
const app=express()
import path from "path";

const __dirname=path.resolve()
// console.log(__dirname);

app.use(express.json());

app.use(cookieParser())
// routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/comments",commentRouter);

//serve react build- run the index.html 
app.use(express.static(path.join(__dirname,'/client/dist')))

// whatever the path except we define above runs under index.html
app.use( (req, res) => {
  res.sendFile(path.join(__dirname, "client","dist", "index.html"));
});

export {app}
