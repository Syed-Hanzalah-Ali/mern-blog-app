import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment } from "../controllers/comment.controller.js";

const router=Router()

router.use(verifyJWT)

router.route("/create").post(createComment)

export default router