import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, deletePost, getPosts, UpdatePost } from "../controllers/post.controller.js";

const router=Router()

// router.use(verifyJWT)

router.route("/create").post(verifyJWT,upload.single('image'),createPost)

router.route("/getposts").get(getPosts)

router.route("/delete/:userId/:postId").delete(verifyJWT,deletePost)

router.route("/update/:userId/:postId").patch(verifyJWT,upload.single('image'),UpdatePost)
export default router