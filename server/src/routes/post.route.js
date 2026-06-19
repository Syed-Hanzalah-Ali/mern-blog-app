import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router=Router()

// router.use(verifyJWT)

router.route("/create").post(verifyJWT,upload.single('image'),createPost)

router.route("/getposts").get(getPosts)
export default router