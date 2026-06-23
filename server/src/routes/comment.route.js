import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, getPostComments } from "../controllers/comment.controller.js";

const router=Router()



router.route("/create").post(verifyJWT,createComment)

router.route("/getPostComments/:postId").get(getPostComments)

export default router