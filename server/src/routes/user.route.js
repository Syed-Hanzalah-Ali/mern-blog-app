import { Router } from "express";
import { test, update } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.use(verifyJWT)

router.route("/test").get(test)

router.route("/update/:userId").patch(upload.single('profile'),update)
export default router;