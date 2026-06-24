import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, getPostComments, likeComment } from "../controllers/comment.controller.js";

const router=Router()



router.route("/create").post(verifyJWT,createComment)

router.route("/getPostComments/:postId").get(getPostComments)

router.route("/likeComment/:commentId").put(verifyJWT,likeComment)

export default router